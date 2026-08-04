import type { Application } from "./store";

/* ------------------------------------------------------------------ *
 * 이메일 자동발송: RESEND_API_KEY 가 있으면 Resend REST API 로 발송,
 * 없으면 콘솔에 로그만 남기고 접수는 정상 진행 (graceful fallback).
 * ------------------------------------------------------------------ */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
// 발신 주소: 도메인 인증 전에는 Resend 제공 주소(onboarding@resend.dev)를 사용할 수 있습니다.
const MAIL_FROM = process.env.MAIL_FROM ?? "AI인터시스 <onboarding@resend.dev>";
// 신규 접수 알림을 받을 관리자 주소 (선택)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
};

async function sendMail({ to, subject, html }: SendArgs): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.log(
      `[email:skipped] RESEND_API_KEY 미설정 → 발송 생략. to=${
        Array.isArray(to) ? to.join(",") : to
      } subject="${subject}"`
    );
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: MAIL_FROM, to, subject, html }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`[email:error] Resend ${res.status}: ${body}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email:error]", err);
    return false;
  }
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function applicantTemplate(app: Application): string {
  return `
  <div style="font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
    <div style="background:linear-gradient(135deg,#1e40af,#172f8a);color:#fff;padding:28px 24px;border-radius:14px 14px 0 0">
      <div style="font-weight:800;font-size:18px">AI인터시스</div>
      <div style="font-size:14px;color:#dbeafe;margin-top:4px">교육과정 수강 신청 접수 확인</div>
    </div>
    <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 14px 14px;padding:28px 24px">
      <p style="margin:0 0 16px"><strong>${esc(app.name)}</strong>님, 수강 신청이 정상 접수되었습니다.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;color:#64748b;width:96px">접수번호</td><td style="padding:8px 0;font-weight:700;color:#1e40af">${esc(app.id)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b">신청 과정</td><td style="padding:8px 0">${esc(app.courseTitle)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b">연락처</td><td style="padding:8px 0">${esc(app.phone)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b">이메일</td><td style="padding:8px 0">${esc(app.email)}</td></tr>
      </table>
      <p style="margin:20px 0 0;font-size:13px;color:#64748b">
        접수 내용 확인 후 담당자가 안내 연락을 드리겠습니다.<br/>
        본 메일은 발신 전용입니다.
      </p>
    </div>
    <div style="text-align:center;color:#94a3b8;font-size:12px;padding:16px 0">
      © AI인터시스 (AIintersys)
    </div>
  </div>`;
}

function adminTemplate(app: Application): string {
  return `
  <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
    <h2 style="color:#1e40af">🆕 새 수강 신청 접수</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:6px 0;color:#64748b;width:96px">접수번호</td><td style="padding:6px 0;font-weight:700">${esc(app.id)}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b">과정</td><td style="padding:6px 0">${esc(app.courseTitle)}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b">이름</td><td style="padding:6px 0">${esc(app.name)}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b">연락처</td><td style="padding:6px 0">${esc(app.phone)}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b">이메일</td><td style="padding:6px 0">${esc(app.email)}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b">소속</td><td style="padding:6px 0">${esc(app.organization) || "-"}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;vertical-align:top">지원 동기</td><td style="padding:6px 0">${esc(app.motivation) || "-"}</td></tr>
    </table>
  </div>`;
}

/**
 * 접수 완료 시 호출. 신청자 확인 메일 + (설정 시) 관리자 알림 메일 발송.
 * 발송 실패는 접수 처리를 막지 않도록 호출부에서 결과만 참고합니다.
 */
export async function sendApplicationEmails(app: Application): Promise<{
  applicant: boolean;
  admin: boolean;
}> {
  const applicant = await sendMail({
    to: app.email,
    subject: `[AI인터시스] 수강 신청이 접수되었습니다 (접수번호 ${app.id})`,
    html: applicantTemplate(app),
  });

  let admin = false;
  if (ADMIN_EMAIL) {
    admin = await sendMail({
      to: ADMIN_EMAIL,
      subject: `[신규 접수] ${app.courseTitle} - ${app.name}`,
      html: adminTemplate(app),
    });
  }

  return { applicant, admin };
}

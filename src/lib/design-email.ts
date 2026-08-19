import { COURSE, experienceLabel } from "./design-course";
import type { DesignApplication } from "./design-store";
import { esc, sendMail } from "./mailer";

/* ------------------------------------------------------------------ *
 * Claude Design 특강 사이트 전용 접수 메일.
 * 발신자 표기와 템플릿을 메인 사이트와 분리해 두었습니다.
 * ------------------------------------------------------------------ */

const MAIL_FROM =
  process.env.DESIGN_MAIL_FROM ??
  process.env.MAIL_FROM ??
  "Claude Design 특강 <onboarding@resend.dev>";

const ADMIN_EMAIL = process.env.DESIGN_ADMIN_EMAIL ?? process.env.ADMIN_EMAIL;

const WRAP =
  "font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;max-width:560px;margin:0 auto;color:#1f1e1d";

function applicantTemplate(app: DesignApplication): string {
  return `
  <div style="${WRAP}">
    <div style="background:#1f1e1d;color:#fff;padding:26px 24px;border-radius:14px 14px 0 0">
      <div style="font-size:12px;letter-spacing:1.4px;color:#d97757;font-weight:700">CLAUDE DESIGN 특강</div>
      <h1 style="margin:8px 0 0;font-size:20px">신청이 접수되었습니다</h1>
    </div>
    <div style="border:1px solid #e6e2da;border-top:none;border-radius:0 0 14px 14px;padding:24px">
      <p style="margin:0 0 16px">${esc(app.name)}님, <strong>${esc(
        COURSE.title
      )}</strong> 신청이 정상 접수되었습니다.</p>
      <div style="background:#faf8f4;border:1px dashed #d97757;color:#b8552f;font-weight:700;
                  padding:12px 16px;border-radius:10px;text-align:center;letter-spacing:1px">
        접수번호 ${esc(app.id)}
      </div>
      <table style="width:100%;border-collapse:collapse;margin-top:18px;font-size:14px">
        <tr><td style="color:#7a7570;padding:6px 0;width:96px">교육 시간</td><td>${esc(
          COURSE.duration
        )}</td></tr>
        <tr><td style="color:#7a7570;padding:6px 0">진행 방식</td><td>${esc(
          COURSE.method
        )}</td></tr>
        <tr><td style="color:#7a7570;padding:6px 0">신청자</td><td>${esc(
          app.name
        )} / ${esc(app.phone)}</td></tr>
        <tr><td style="color:#7a7570;padding:6px 0">디자인 경험</td><td>${esc(
          experienceLabel(app.experience)
        )}</td></tr>
      </table>
      <p style="margin:18px 0 0;font-size:13px;color:#7a7570">
        준비물은 인터넷이 연결된 노트북 한 대면 충분합니다.
        세부 일정과 접속 안내는 이 메일 주소로 다시 보내드립니다.
      </p>
    </div>
    <p style="text-align:center;font-size:12px;color:#a29c95;margin-top:16px">
      ${esc(COURSE.host)}
    </p>
  </div>`;
}

function adminTemplate(app: DesignApplication): string {
  return `
  <div style="${WRAP}">
    <h2 style="font-size:17px;margin:0 0 12px">[Claude Design 특강] 새 신청 접수</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="color:#7a7570;padding:6px 0;width:96px">접수번호</td><td>${esc(
        app.id
      )}</td></tr>
      <tr><td style="color:#7a7570;padding:6px 0">이름</td><td>${esc(
        app.name
      )}</td></tr>
      <tr><td style="color:#7a7570;padding:6px 0">연락처</td><td>${esc(
        app.phone
      )}</td></tr>
      <tr><td style="color:#7a7570;padding:6px 0">이메일</td><td>${esc(
        app.email
      )}</td></tr>
      <tr><td style="color:#7a7570;padding:6px 0">소속</td><td>${esc(
        app.organization || "-"
      )}</td></tr>
      <tr><td style="color:#7a7570;padding:6px 0">디자인 경험</td><td>${esc(
        experienceLabel(app.experience)
      )}</td></tr>
      <tr><td style="color:#7a7570;padding:6px 0;vertical-align:top">신청 목적</td><td>${esc(
        app.goal || "-"
      )}</td></tr>
      <tr><td style="color:#7a7570;padding:6px 0">접수 시각</td><td>${esc(
        app.createdAt
      )}</td></tr>
    </table>
  </div>`;
}

export async function sendDesignApplicationEmails(
  app: DesignApplication
): Promise<{ applicant: boolean; admin: boolean }> {
  const applicant = await sendMail({
    to: app.email,
    from: MAIL_FROM,
    subject: `[접수 완료] ${COURSE.title} — 접수번호 ${app.id}`,
    html: applicantTemplate(app),
  });

  let admin = false;
  if (ADMIN_EMAIL) {
    admin = await sendMail({
      to: ADMIN_EMAIL,
      from: MAIL_FROM,
      subject: `[Claude Design 특강] 새 신청 — ${app.name} (${app.id})`,
      html: adminTemplate(app),
    });
  }

  return { applicant, admin };
}

/* ------------------------------------------------------------------ *
 * 메일 전송 공통 계층.
 * RESEND_API_KEY 가 있으면 Resend REST API 로 발송하고,
 * 없으면 콘솔 로그만 남긴 뒤 false 를 돌려줍니다(접수 자체는 계속 진행).
 * 메인 사이트와 Claude Design 특강 사이트가 함께 사용합니다.
 * ------------------------------------------------------------------ */

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
  /** 사이트별 발신자 표기 (미지정 시 MAIL_FROM 환경변수) */
  from?: string;
};

export async function sendMail({
  to,
  subject,
  html,
  from,
}: SendArgs): Promise<boolean> {
  const sender =
    from ?? process.env.MAIL_FROM ?? "AI인터시스 <onboarding@resend.dev>";

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
      body: JSON.stringify({ from: sender, to, subject, html }),
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

export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

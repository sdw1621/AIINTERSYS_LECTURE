import { courseById } from "./courses";
import type { ApplicationInput } from "./store";

export type ValidationResult =
  | { ok: true; value: ApplicationInput }
  | { ok: false; errors: Record<string, string> };

const PHONE_RE = /^01[016789]-?\d{3,4}-?\d{4}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export function validateApplication(body: unknown): ValidationResult {
  const errors: Record<string, string> = {};
  const b = (body ?? {}) as Record<string, unknown>;

  const courseId = str(b.courseId);
  const name = str(b.name);
  const phone = str(b.phone);
  const email = str(b.email);
  const organization = str(b.organization);
  const motivation = str(b.motivation);
  const privacyAgree = b.privacyAgree === true || b.privacyAgree === "true";

  if (!courseId) {
    errors.courseId = "신청할 과정을 선택해 주세요.";
  } else if (!courseById(courseId)) {
    errors.courseId = "존재하지 않는 과정입니다.";
  }

  if (!name) errors.name = "이름을 입력해 주세요.";
  else if (name.length > 40) errors.name = "이름이 너무 깁니다.";

  if (!phone) errors.phone = "연락처를 입력해 주세요.";
  else if (!PHONE_RE.test(phone))
    errors.phone = "휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)";

  if (!email) errors.email = "이메일을 입력해 주세요.";
  else if (!EMAIL_RE.test(email))
    errors.email = "이메일 형식이 올바르지 않습니다.";

  if (organization.length > 80)
    errors.organization = "소속이 너무 깁니다.";

  if (motivation.length > 1000)
    errors.motivation = "지원 동기는 1000자 이내로 작성해 주세요.";

  if (!privacyAgree)
    errors.privacyAgree = "개인정보 수집·이용에 동의해 주세요.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: { courseId, name, phone, email, organization, motivation },
  };
}

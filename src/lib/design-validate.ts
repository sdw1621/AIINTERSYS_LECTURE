import { EXPERIENCE_LEVELS } from "./design-course";
import type { DesignApplicationInput } from "./design-store";

export type DesignValidationResult =
  | { ok: true; value: DesignApplicationInput }
  | { ok: false; errors: Record<string, string> };

const PHONE_RE = /^01[016789]-?\d{3,4}-?\d{4}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export function validateDesignApplication(
  body: unknown
): DesignValidationResult {
  const errors: Record<string, string> = {};
  const b = (body ?? {}) as Record<string, unknown>;

  const name = str(b.name);
  const phone = str(b.phone);
  const email = str(b.email);
  const organization = str(b.organization);
  const experience = str(b.experience);
  const goal = str(b.goal);
  const privacyAgree = b.privacyAgree === true || b.privacyAgree === "true";

  if (!name) errors.name = "이름을 입력해 주세요.";
  else if (name.length > 40) errors.name = "이름이 너무 깁니다.";

  if (!phone) errors.phone = "연락처를 입력해 주세요.";
  else if (!PHONE_RE.test(phone))
    errors.phone = "휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)";

  if (!email) errors.email = "이메일을 입력해 주세요.";
  else if (!EMAIL_RE.test(email))
    errors.email = "이메일 형식이 올바르지 않습니다.";

  if (organization.length > 80) errors.organization = "소속이 너무 깁니다.";

  if (!experience) {
    errors.experience = "디자인 경험 수준을 선택해 주세요.";
  } else if (!EXPERIENCE_LEVELS.some((e) => e.value === experience)) {
    errors.experience = "선택할 수 없는 항목입니다.";
  }

  if (goal.length > 1000)
    errors.goal = "신청 목적은 1000자 이내로 작성해 주세요.";

  if (!privacyAgree) errors.privacyAgree = "개인정보 수집·이용에 동의해 주세요.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: { name, phone, email, organization, experience, goal },
  };
}

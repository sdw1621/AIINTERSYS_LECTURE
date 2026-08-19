"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EXPERIENCE_LEVELS } from "@/lib/design-course";

type Errors = Record<string, string>;

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  organization: "",
  experience: "",
  goal: "",
  privacyAgree: false,
};

export default function DesignApplyForm() {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    setErrors({});

    try {
      const res = await fetch("/api/design/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        router.push(`/design/complete?id=${encodeURIComponent(data.id)}`);
        return;
      }

      if (data.errors) {
        setErrors(data.errors);
        setFormError("입력값을 다시 확인해 주세요.");
      } else {
        setFormError(data.message ?? "접수 중 오류가 발생했습니다.");
      }
    } catch {
      setFormError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="dc-form" onSubmit={handleSubmit} noValidate>
      {formError && <div className="dc-alert error">{formError}</div>}

      <div className="dc-field">
        <label htmlFor="name">
          이름<span className="req">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="홍길동"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
        {errors.name && <div className="dc-err">{errors.name}</div>}
      </div>

      <div className="dc-field">
        <label htmlFor="phone">
          연락처<span className="req">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          placeholder="010-1234-5678"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        {errors.phone && <div className="dc-err">{errors.phone}</div>}
      </div>

      <div className="dc-field">
        <label htmlFor="email">
          이메일<span className="req">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
        {errors.email && <div className="dc-err">{errors.email}</div>}
      </div>

      <div className="dc-field">
        <label htmlFor="organization">소속 (선택)</label>
        <input
          id="organization"
          type="text"
          placeholder="회사 / 브랜드 / 단체명"
          value={form.organization}
          onChange={(e) => update("organization", e.target.value)}
        />
        {errors.organization && (
          <div className="dc-err">{errors.organization}</div>
        )}
      </div>

      <div className="dc-field">
        <label htmlFor="experience">
          디자인 경험 수준<span className="req">*</span>
        </label>
        <select
          id="experience"
          value={form.experience}
          onChange={(e) => update("experience", e.target.value)}
        >
          <option value="">— 선택해 주세요 —</option>
          {EXPERIENCE_LEVELS.map((lv) => (
            <option key={lv.value} value={lv.value}>
              {lv.label}
            </option>
          ))}
        </select>
        {errors.experience && <div className="dc-err">{errors.experience}</div>}
      </div>

      <div className="dc-field">
        <label htmlFor="goal">특강에서 만들고 싶은 것 (선택)</label>
        <textarea
          id="goal"
          placeholder="예) 우리 카페 신메뉴 포스터와 인스타 카드뉴스를 직접 만들고 싶어요."
          value={form.goal}
          maxLength={1000}
          onChange={(e) => update("goal", e.target.value)}
        />
        <div className="hint">{form.goal.length}/1000자</div>
        {errors.goal && <div className="dc-err">{errors.goal}</div>}
      </div>

      <div className="dc-field">
        <div className="dc-privacy">
          <strong>개인정보 수집·이용 안내</strong>
          <br />· 수집 항목: 이름, 연락처, 이메일, 소속, 디자인 경험 수준, 신청 목적
          <br />· 수집 목적: 특강 접수 확인 및 안내 연락
          <br />· 보유 기간: 접수일로부터 1년 (이후 파기)
          <br />
          동의를 거부할 권리가 있으나, 미동의 시 신청 접수가 제한됩니다.
        </div>
        <div className="dc-check">
          <input
            id="privacyAgree"
            type="checkbox"
            checked={form.privacyAgree}
            onChange={(e) => update("privacyAgree", e.target.checked)}
          />
          <label htmlFor="privacyAgree">
            개인정보 수집·이용에 동의합니다.<span className="req">*</span>
          </label>
        </div>
        {errors.privacyAgree && (
          <div className="dc-err">{errors.privacyAgree}</div>
        )}
      </div>

      <button className="dc-btn block" type="submit" disabled={submitting}>
        {submitting ? "접수 중…" : "신청 접수하기"}
      </button>
    </form>
  );
}

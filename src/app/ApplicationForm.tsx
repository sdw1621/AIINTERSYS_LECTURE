"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Course } from "@/lib/courses";

type Props = {
  courses: Course[];
  initialCourseId?: string;
};

type Errors = Record<string, string>;

export default function ApplicationForm({ courses, initialCourseId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    courseId: initialCourseId ?? "",
    name: "",
    phone: "",
    email: "",
    organization: "",
    motivation: "",
    privacyAgree: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
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
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        router.push(
          `/complete?id=${encodeURIComponent(
            data.id
          )}&course=${encodeURIComponent(data.courseTitle)}`
        );
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
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      {formError && <div className="alert error">{formError}</div>}

      <div className="field">
        <label htmlFor="courseId">
          신청 과정<span className="req">*</span>
        </label>
        <select
          id="courseId"
          value={form.courseId}
          onChange={(e) => update("courseId", e.target.value)}
        >
          <option value="">— 과정을 선택하세요 —</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
        {errors.courseId && <div className="err">{errors.courseId}</div>}
      </div>

      <div className="field">
        <label htmlFor="name">
          이름<span className="req">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          placeholder="홍길동"
          onChange={(e) => update("name", e.target.value)}
        />
        {errors.name && <div className="err">{errors.name}</div>}
      </div>

      <div className="field">
        <label htmlFor="phone">
          연락처<span className="req">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          value={form.phone}
          placeholder="010-1234-5678"
          onChange={(e) => update("phone", e.target.value)}
        />
        {errors.phone && <div className="err">{errors.phone}</div>}
      </div>

      <div className="field">
        <label htmlFor="email">
          이메일<span className="req">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          placeholder="you@example.com"
          onChange={(e) => update("email", e.target.value)}
        />
        {errors.email && <div className="err">{errors.email}</div>}
      </div>

      <div className="field">
        <label htmlFor="organization">소속 (선택)</label>
        <input
          id="organization"
          type="text"
          value={form.organization}
          placeholder="회사 / 학교 / 단체명"
          onChange={(e) => update("organization", e.target.value)}
        />
        {errors.organization && (
          <div className="err">{errors.organization}</div>
        )}
      </div>

      <div className="field">
        <label htmlFor="motivation">지원 동기 (선택)</label>
        <textarea
          id="motivation"
          value={form.motivation}
          placeholder="이 과정을 신청하는 이유나 기대하는 점을 자유롭게 적어 주세요."
          onChange={(e) => update("motivation", e.target.value)}
          maxLength={1000}
        />
        <div className="hint">{form.motivation.length}/1000자</div>
        {errors.motivation && <div className="err">{errors.motivation}</div>}
      </div>

      <div className="field">
        <div className="privacy-box">
          <strong>개인정보 수집·이용 안내</strong>
          <br />· 수집 항목: 이름, 연락처, 이메일, 소속, 지원 동기
          <br />· 수집 목적: 교육과정 접수 확인 및 안내 연락
          <br />· 보유 기간: 접수일로부터 1년 (이후 파기)
          <br />
          동의를 거부할 권리가 있으나, 미동의 시 수강 신청 접수가 제한됩니다.
        </div>
        <div className="checkbox">
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
          <div className="err">{errors.privacyAgree}</div>
        )}
      </div>

      <button className="btn" type="submit" disabled={submitting}>
        {submitting ? "접수 중…" : "수강 신청 접수하기"}
      </button>
    </form>
  );
}

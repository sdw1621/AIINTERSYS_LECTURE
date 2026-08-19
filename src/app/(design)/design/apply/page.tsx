import type { Metadata } from "next";
import { COURSE, FACTS } from "@/lib/design-course";
import DesignApplyForm from "./DesignApplyForm";

export const metadata: Metadata = {
  title: `수강 신청 | ${COURSE.title}`,
  description: `${COURSE.title} 수강 신청 페이지. ${COURSE.capacity}.`,
};

export default function DesignApplyPage() {
  return (
    <main>
      <section className="dc-section dc-apply">
        <div className="dc-wrap">
          <p className="dc-kicker">Apply</p>
          <h2>수강 신청</h2>
          <p className="desc">
            아래 정보를 입력하면 접수번호가 발급되고, 입력하신 이메일로 접수 확인
            메일이 발송됩니다.
          </p>

          <div className="dc-form-grid">
            <aside className="dc-summary">
              <h3>{COURSE.title}</h3>
              <p className="who">주관 · {COURSE.host}</p>
              <dl>
                {FACTS.map((f) => (
                  <div className="row" key={f.k}>
                    <dt>{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
                <div className="row">
                  <dt>준비물</dt>
                  <dd>노트북 1대</dd>
                </div>
              </dl>
            </aside>

            <DesignApplyForm />
          </div>
        </div>
      </section>
    </main>
  );
}

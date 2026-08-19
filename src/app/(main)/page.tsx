import Link from "next/link";
import { COURSES } from "@/lib/courses";
import ApplicationForm from "./ApplicationForm";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <span className="badge">2026 AX 교육과정 수강 신청</span>
          <h1>
            실무에 바로 쓰는 AI 역량,
            <br />
            AI인터시스에서 시작하세요
          </h1>
          <p>
            생성형 AI와 업무 자동화를 현업에 적용하는 실습 중심 교육과정입니다.
            원하는 과정을 선택하고 아래에서 간편하게 수강 신청을 접수하세요.
          </p>
          <a href="#apply" className="cta">
            지금 신청하기 →
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>개설 과정</h2>
          <p className="lead">
            수준과 목적에 맞는 과정을 선택할 수 있습니다.
          </p>
          <div className="course-grid">
            {COURSES.map((c) => (
              <div className="course-card" key={c.id}>
                <h3>{c.title}</h3>
                <p className="sub">{c.subtitle}</p>
                <div className="course-meta">
                  <div className="row">
                    <span className="k">일정</span>
                    <span>{c.schedule}</span>
                  </div>
                  <div className="row">
                    <span className="k">방식</span>
                    <span>{c.format}</span>
                  </div>
                  <div className="row">
                    <span className="k">정원</span>
                    <span>{c.capacity}</span>
                  </div>
                </div>
                <div className="tags">
                  {c.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="side-site">
            <div>
              <strong>Claude Design을 활용한 AI 디자인 실무</strong>
              <p>
                90분 실습 특강은 별도 사이트에서 소개·접수하고 있습니다.
              </p>
            </div>
            <Link href="/design" className="side-site-link">
              특강 사이트 열기 →
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="apply" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2>수강 신청</h2>
          <p className="lead">
            아래 정보를 입력하면 접수번호가 발급됩니다. 접수 확인 후 안내
            메일/연락을 드립니다.
          </p>
          <ApplicationForm courses={COURSES} />
        </div>
      </section>
    </main>
  );
}

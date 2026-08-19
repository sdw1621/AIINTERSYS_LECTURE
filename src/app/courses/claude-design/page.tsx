import type { Metadata } from "next";
import Link from "next/link";
import { courseById } from "@/lib/courses";
import { AUDIENCE, GOALS, OUTPUTS, PARTS, TIMELINE } from "./data";

export const metadata: Metadata = {
  title: "Claude Design을 활용한 AI 디자인 실무 | AI인터시스",
  description:
    "브랜드 콘셉트 설정부터 디자인 시스템 구축, 포스터·카드뉴스·상세페이지 확장까지. 디자인 경험이 없어도 AI와 대화하며 따라오는 90분 실습 특강.",
};

const course = courseById("claude-design");

export default function ClaudeDesignCoursePage() {
  return (
    <main className="course-page">
      <section className="course-hero">
        <div className="container">
          <div className="crumb">
            <Link href="/">교육과정</Link>
            <span>›</span>
            <span>Claude Design을 활용한 AI 디자인 실무</span>
          </div>
          <span className="badge">90분 실습 특강</span>
          <h1>
            Claude Design을 활용한
            <br />
            AI 디자인 실무
          </h1>
          <p className="hero-lead">
            AI와 대화하며 브랜드 디자인을 기획하고, 하나의 디자인 시스템을
            여러 홍보물로 확장하는 방법을 배웁니다. 디자인 경험이 많지 않아도
            따라올 수 있도록 실습 중심으로 진행합니다.
          </p>

          <div className="hero-facts">
            <div className="fact">
              <span className="k">교육 시간</span>
              <strong>{course?.schedule ?? "90분 특강"}</strong>
            </div>
            <div className="fact">
              <span className="k">진행 방식</span>
              <strong>{course?.format ?? "이론 + 시연 + 단계별 실습"}</strong>
            </div>
            <div className="fact">
              <span className="k">정원</span>
              <strong>{course?.capacity ?? "선착순 30명"}</strong>
            </div>
            <div className="fact">
              <span className="k">사전 지식</span>
              <strong>불필요 (입문자 환영)</strong>
            </div>
          </div>

          <div className="hero-actions">
            <Link href="/#apply" className="cta">
              수강 신청하기 →
            </Link>
            <a href="#curriculum" className="cta ghost">
              커리큘럼 보기
            </a>
          </div>
        </div>
      </section>

      {/* 강의 개요 */}
      <section className="section">
        <div className="container">
          <h2>
            <span className="num">01</span> 강의 개요
          </h2>
          <p className="lead">
            Claude Design의 주요 기능을 이해하고, AI를 활용해 브랜드 디자인을
            기획하고 다양한 디자인 결과물로 확장하는 방법을 학습합니다. 디자인
            경험이 많지 않은 사람도 AI와 대화하며 디자인을 제작하고 수정할 수
            있도록 실습 중심으로 진행합니다.
          </p>
          <div className="flow">
            <div className="flow-step">
              <span className="step-no">1</span>
              <strong>브랜드 콘셉트</strong>
              <span>무엇을 파는 브랜드인지 정하기</span>
            </div>
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
            <div className="flow-step">
              <span className="step-no">2</span>
              <strong>디자인 시스템</strong>
              <span>색상·폰트·레이아웃 규칙화</span>
            </div>
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
            <div className="flow-step">
              <span className="step-no">3</span>
              <strong>결과물 확장</strong>
              <span>포스터·카드뉴스·상세페이지</span>
            </div>
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
            <div className="flow-step">
              <span className="step-no">4</span>
              <strong>Skill로 재사용</strong>
              <span>반복 작업 자동화</span>
            </div>
          </div>
        </div>
      </section>

      {/* 교육 대상 */}
      <section className="section alt">
        <div className="container">
          <h2>
            <span className="num">02</span> 교육 대상
          </h2>
          <p className="lead">
            이런 분이라면 90분 안에 바로 쓸 수 있는 결과물을 만들어 갑니다.
          </p>
          <div className="audience-grid">
            {AUDIENCE.map((a) => (
              <div className="audience-card" key={a.text}>
                <span className="emoji" aria-hidden="true">
                  {a.icon}
                </span>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 교육 목표 */}
      <section className="section">
        <div className="container">
          <h2>
            <span className="num">03</span> 교육 목표
          </h2>
          <ul className="check-list">
            {GOALS.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 주요 교육 내용 */}
      <section className="section alt" id="curriculum">
        <div className="container">
          <h2>
            <span className="num">04</span> 주요 교육 내용
          </h2>
          <p className="lead">
            1부에서 5부까지, 하나의 브랜드를 계속 발전시키며 진행합니다.
          </p>
          <div className="parts">
            {PARTS.map((p) => (
              <article className="part-card" key={p.no}>
                <header>
                  <span className="part-no">{p.no}</span>
                  <h3>{p.title}</h3>
                </header>
                <p className="part-summary">{p.summary}</p>
                <ul>
                  {p.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 실습 프로젝트 */}
      <section className="section">
        <div className="container">
          <h2>
            <span className="num">05</span> 실습 프로젝트
          </h2>
          <div className="project-box">
            <p>
              가상의 브랜드 디자인을 만들고, <strong>하나의 디자인 시스템</strong>을
              기반으로 상품 홍보물·포스터·카드뉴스·상세페이지 등 다양한 결과물을
              제작합니다.
            </p>
            <div className="outputs">
              {OUTPUTS.map((o) => (
                <div className="output" key={o.name}>
                  <span aria-hidden="true">{o.icon}</span>
                  {o.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 교육 방식 */}
      <section className="section alt">
        <div className="container">
          <h2>
            <span className="num">06</span> 교육 방식
          </h2>
          <div className="method-grid">
            <div className="method">
              <span className="tag-round">이론</span>
              <p>개념을 먼저 짧게 정리합니다.</p>
            </div>
            <div className="method">
              <span className="tag-round">시연</span>
              <p>강사가 실제로 만드는 과정을 보여 줍니다.</p>
            </div>
            <div className="method">
              <span className="tag-round">단계별 실습</span>
              <p>같은 흐름을 따라 각자 결과물을 만듭니다.</p>
            </div>
          </div>
          <p className="lead" style={{ marginTop: 18 }}>
            기초적인 디자인 개념부터 시작해 하나씩 결과물을 발전시키는 방식으로
            진행하여, 디자인 경험이 없는 수강생도 쉽게 따라올 수 있도록
            구성합니다.
          </p>
        </div>
      </section>

      {/* 기대 효과 */}
      <section className="section">
        <div className="container">
          <h2>
            <span className="num">07</span> 수강 후 기대 효과
          </h2>
          <div className="effect-box">
            <p>
              단순히 AI로 이미지를 생성하는 방법을 넘어,{" "}
              <strong>브랜드의 디자인 방향을 설정하고 일관된 디자인을
              유지하면서</strong>{" "}
              다양한 콘텐츠를 제작하는 AI 활용 방법을 익힐 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 강의 시간표 */}
      <section className="section alt">
        <div className="container">
          <h2>
            <span className="num">08</span> 강의 시간
          </h2>
          <p className="lead">
            총 90분 구성이며, 세팅 및 쉬는 시간 20분 정도가 추가됩니다.
          </p>
          <ol className="timeline">
            {TIMELINE.map((t) => (
              <li key={t.time}>
                <span className="t-time">{t.time}</span>
                <div className="t-body">
                  <strong>{t.label}</strong>
                  <p>{t.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="course-cta">
        <div className="container">
          <h2>90분이면 브랜드 하나가 완성됩니다</h2>
          <p>
            디자인 경험이 없어도 괜찮습니다. 신청 후 접수번호가 발급되며, 확인
            후 안내를 드립니다.
          </p>
          <Link href="/#apply" className="cta">
            수강 신청하기 →
          </Link>
        </div>
      </section>
    </main>
  );
}

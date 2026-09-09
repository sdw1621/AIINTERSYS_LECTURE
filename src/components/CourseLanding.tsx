import Link from "next/link";

/* ------------------------------------------------------------------ *
 * 과정 랜딩 페이지 공용 컴포넌트.
 * 콘텐츠 모듈(lib/*-course.ts)의 값을 받아 화면을 구성합니다.
 * 마크업을 한 곳에 모아 두어 과정이 늘어도 사본이 생기지 않게 합니다.
 * ------------------------------------------------------------------ */

type Fact = { k: string; v: string };
type Card = { icon: string; title: string; text: string };
type Part = { no: string; title: string; summary: string; items: readonly string[] };
type Step = { no: number; title: string; desc: string };
type Slot = { time: string; label: string; detail: string };
type Output = { icon: string; name: string };
type Qa = { q: string; a: string };

export type CourseLandingProps = {
  eyebrow: string;
  /** 히어로 제목. 강조할 부분은 accent 로 분리해 넘깁니다. */
  headline: { before: string; accent: string; after: string };
  intro: string;
  facts: readonly Fact[];
  overview: { heading: string; body: string; flow: readonly Step[] };
  audience: { heading: string; body: string; cards: readonly Card[] };
  goals: { heading: string; items: readonly string[] };
  curriculum: { heading: string; body: string; parts: readonly Part[] };
  project: { heading: string; body: string; outputs: readonly Output[] };
  method: { heading: string; body: string };
  outcome: { heading: string; body: React.ReactNode };
  timeline: { heading: string; body: string; slots: readonly Slot[] };
  faq: { heading: string; items: readonly Qa[] };
  /** 신청 정보. url 이 비어 있으면 신청 버튼 대신 준비 중 안내를 보여 줍니다. */
  registration: {
    courseTitle: string;
    url: string;
    details: readonly Fact[];
    extras: readonly Fact[];
  };
  cta: { heading: string; body: string };
};

function ApplyButton({
  url,
  className = "dc-btn",
}: {
  url: string;
  className?: string;
}) {
  if (!url) {
    return (
      <span className={`${className} is-disabled`} aria-disabled="true">
        신청 페이지 준비 중
      </span>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      이벤터스에서 신청하기
    </a>
  );
}

export default function CourseLanding(p: CourseLandingProps) {
  const { url } = p.registration;

  return (
    <main>
      <section className="dc-hero">
        <div className="dc-wrap">
          <span className="dc-eyebrow">{p.eyebrow}</span>
          <h1>
            {p.headline.before}
            <br />
            <em>{p.headline.accent}</em>
            {p.headline.after}
          </h1>
          <p className="sub">{p.intro}</p>
          <div className="actions">
            <ApplyButton url={url} />
            <Link href="#curriculum" className="dc-btn ghost">
              커리큘럼 보기
            </Link>
          </div>
          <div className="dc-facts">
            {p.facts.map((f) => (
              <div className="fact" key={f.k}>
                <span className="k">{f.k}</span>
                <span className="v">{f.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dc-section paper" id="overview">
        <div className="dc-wrap">
          <p className="dc-kicker">Overview</p>
          <h2>{p.overview.heading}</h2>
          <p className="desc">{p.overview.body}</p>
          <div className="dc-flow">
            {p.overview.flow.map((s) => (
              <div className="step" key={s.no}>
                <span className="n">STEP {s.no}</span>
                <strong>{s.title}</strong>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dc-section" id="audience">
        <div className="dc-wrap">
          <p className="dc-kicker">Who</p>
          <h2>{p.audience.heading}</h2>
          <p className="desc">{p.audience.body}</p>
          <div className="dc-audience">
            {p.audience.cards.map((c) => (
              <div className="card" key={c.title}>
                <span className="emoji" aria-hidden="true">
                  {c.icon}
                </span>
                <strong>{c.title}</strong>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dc-section paper" id="goals">
        <div className="dc-wrap">
          <p className="dc-kicker">Goals</p>
          <h2>{p.goals.heading}</h2>
          <ul className="dc-goals">
            {p.goals.items.map((g, i) => (
              <li key={g}>
                <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="dc-section" id="curriculum">
        <div className="dc-wrap">
          <p className="dc-kicker">Curriculum</p>
          <h2>{p.curriculum.heading}</h2>
          <p className="desc">{p.curriculum.body}</p>
          <div className="dc-parts">
            {p.curriculum.parts.map((part) => (
              <article className="dc-part" key={part.no}>
                <div className="head">
                  <span className="no">{part.no}</span>
                  <h3>{part.title}</h3>
                  <p>{part.summary}</p>
                </div>
                <ul>
                  {part.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dc-section paper" id="project">
        <div className="dc-wrap">
          <div className="dc-project">
            <p className="dc-kicker">Hands-on Project</p>
            <h2>{p.project.heading}</h2>
            <p>{p.project.body}</p>
            <div className="dc-outputs">
              {p.project.outputs.map((o) => (
                <div className="item" key={o.name}>
                  <span aria-hidden="true">{o.icon}</span>
                  {o.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="dc-section" id="method">
        <div className="dc-wrap">
          <p className="dc-kicker">How</p>
          <h2>{p.method.heading}</h2>
          <p className="desc">{p.method.body}</p>
          <div className="dc-methods">
            <div className="m">
              <span className="tag">이론</span>
              <p>필요한 개념만 짧고 분명하게 정리합니다.</p>
            </div>
            <div className="m">
              <span className="tag">시연</span>
              <p>강사가 실제로 하는 과정을 화면으로 보여 줍니다.</p>
            </div>
            <div className="m">
              <span className="tag">단계별 실습</span>
              <p>같은 흐름을 따라 각자 자기 결과물을 만들어 갑니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="dc-section paper" id="effect">
        <div className="dc-wrap">
          <p className="dc-kicker">Outcome</p>
          <h2>{p.outcome.heading}</h2>
          <p className="dc-effect">{p.outcome.body}</p>
        </div>
      </section>

      <section className="dc-section" id="timeline">
        <div className="dc-wrap">
          <p className="dc-kicker">Timetable</p>
          <h2>{p.timeline.heading}</h2>
          <p className="desc">{p.timeline.body}</p>
          <ol className="dc-timeline">
            {p.timeline.slots.map((t) => (
              <li key={t.time}>
                <span className="time">{t.time}</span>
                <div>
                  <strong>{t.label}</strong>
                  <p>{t.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="dc-section paper" id="faq">
        <div className="dc-wrap">
          <p className="dc-kicker">FAQ</p>
          <h2>{p.faq.heading}</h2>
          <div className="dc-faq">
            {p.faq.items.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p className="a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="dc-section" id="apply">
        <div className="dc-wrap">
          <p className="dc-kicker">Registration</p>
          <h2>신청 안내</h2>
          <p className="desc">
            {url
              ? "신청 접수와 결제, 일정 안내는 모두 이벤터스 행사 페이지에서 진행됩니다. 아래 버튼을 눌러 행사 페이지에서 신청해 주세요."
              : "행사 페이지가 열리는 대로 이 자리에 신청 버튼이 표시됩니다. 일정과 참가비도 함께 안내드리겠습니다."}
          </p>
          <div className="dc-event">
            <div className="dc-event-body">
              <span className="dc-event-badge">
                {url ? "이벤터스 행사 페이지" : "신청 준비 중"}
              </span>
              <h3>{p.registration.courseTitle}</h3>
              <dl className="dc-event-meta">
                {[...p.registration.details, ...p.registration.extras].map((d) => (
                  <div className="row" key={d.k}>
                    <dt>{d.k}</dt>
                    <dd>{d.v}</dd>
                  </div>
                ))}
              </dl>
              {url && <p className="dc-event-url">{url}</p>}
            </div>
            <div className="dc-event-action">
              <ApplyButton url={url} />
              {url && <span className="dc-event-hint">새 창으로 열립니다</span>}
            </div>
          </div>
        </div>
      </section>

      <section className="dc-cta">
        <div className="dc-wrap">
          <h2>{p.cta.heading}</h2>
          <p>{p.cta.body}</p>
          <ApplyButton url={url} />
          {url && (
            <p className="dc-cta-note">
              신청 접수는 이벤터스 행사 페이지에서 진행됩니다.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

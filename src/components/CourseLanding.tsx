import Link from "next/link";
import CourseArt, { TerminalArt, type ArtKey } from "./CourseArt";

/* ------------------------------------------------------------------ *
 * 과정 랜딩 페이지 공용 컴포넌트.
 *
 * 섹션 순서는 "결정에 필요한 정보부터" 원칙으로 배치했습니다.
 *   히어로 → 핵심 요약 → 커리큘럼(일정 포함) → 결과물
 *   → 교육 대상 → 진행 방식·기대 효과 → 준비물 → FAQ → 신청
 * 회차 일정은 커리큘럼 카드에 함께 표시하므로 별도 시간표 섹션이 없습니다.
 * ------------------------------------------------------------------ */

type Fact = { k: string; v: string };
type Summary = { k: string; v: string; sub?: string; accent?: boolean };
type Card = { icon: string; title: string; text: string };
type Part = {
  no: string;
  when: string;
  source: string;
  title: string;
  summary: string;
  items: readonly string[];
};
type Step = { no: number; title: string; desc: string };
type Output = { art: string; name: string; desc: string };
type Qa = { q: string; a: string };

export type CourseLandingProps = {
  eyebrow: string;
  headline: { before: string; accent: string; after: string };
  intro: string;
  /** 히어로 우측 일러스트 표시 여부 */
  heroArt?: boolean;
  price?: { original: string; discounted: string; badge?: string; note?: string };
  /** 결정에 필요한 핵심 정보. 히어로 바로 아래 띠로 표시됩니다. */
  summary: readonly Summary[];
  curriculum: { heading: string; body: string; parts: readonly Part[] };
  project: { heading: string; body: string; outputs: readonly Output[] };
  audience: { heading: string; body: string; cards: readonly Card[] };
  method: { heading: string; body: string; flow: readonly Step[] };
  outcome: { heading: string; body: React.ReactNode };
  notice?: {
    title: string;
    body: string;
    itemsTitle?: string;
    items?: readonly string[];
    itemsNote?: string;
  };
  faq: { heading: string; items: readonly Qa[] };
  registration: { courseTitle: string; url: string; details: readonly Fact[] };
  cta: { heading: string; body: string };
};

function ApplyButton({ url, className = "dc-btn" }: { url: string; className?: string }) {
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

function Price({ price }: { price: NonNullable<CourseLandingProps["price"]> }) {
  return (
    <div className="dc-price">
      {price.badge && <span className="dc-price-badge">{price.badge}</span>}
      <span className="dc-price-row">
        <s className="old">{price.original}</s>
        <strong className="new">{price.discounted}</strong>
      </span>
      {price.note && <span className="dc-price-note">{price.note}</span>}
    </div>
  );
}

export default function CourseLanding(p: CourseLandingProps) {
  const { url } = p.registration;

  return (
    <main>
      {/* ── 히어로: 무엇을 배우고 얼마인지 한 화면에 ── */}
      <section className="dc-hero">
        <div className="dc-wrap dc-hero-grid">
          <div className="dc-hero-copy">
            <span className="dc-eyebrow">{p.eyebrow}</span>
            <h1>
              {p.headline.before}
              <br />
              <em>{p.headline.accent}</em>
              {p.headline.after}
            </h1>
            <p className="sub">{p.intro}</p>
            {p.price && <Price price={p.price} />}
            <div className="actions">
              <ApplyButton url={url} />
              <Link href="#curriculum" className="dc-btn ghost">
                커리큘럼 보기
              </Link>
            </div>
          </div>
          {p.heroArt !== false && (
            <div className="dc-hero-art" aria-hidden="false">
              <TerminalArt />
            </div>
          )}
        </div>
      </section>

      {/* ── 핵심 요약 띠 ── */}
      <section className="dc-summary" aria-label="과정 핵심 정보">
        <div className="dc-wrap">
          <dl>
            {p.summary.map((s) => (
              <div className={`cell${s.accent ? " accent" : ""}`} key={s.k}>
                <dt>{s.k}</dt>
                <dd>
                  <b>{s.v}</b>
                  {s.sub && <span>{s.sub}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 커리큘럼 (회차 일정 포함) ── */}
      <section className="dc-section paper" id="curriculum">
        <div className="dc-wrap">
          <p className="dc-kicker">Curriculum</p>
          <h2>{p.curriculum.heading}</h2>
          <p className="desc">{p.curriculum.body}</p>
          <div className="dc-parts">
            {p.curriculum.parts.map((part) => (
              <article className="dc-part" key={part.no}>
                <div className="head">
                  <div className="head-top">
                    <span className="no">{part.no}</span>
                    <span className="src">{part.source}</span>
                  </div>
                  <span className="when">{part.when}</span>
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

      {/* ── 만들어 가는 결과물 ── */}
      <section className="dc-section" id="outputs">
        <div className="dc-wrap">
          <p className="dc-kicker">What You Build</p>
          <h2>{p.project.heading}</h2>
          <p className="desc">{p.project.body}</p>
          <div className="dc-outputs">
            {p.project.outputs.map((o) => (
              <div className="item" key={o.name}>
                <div className="art">
                  <CourseArt name={o.art as ArtKey} />
                </div>
                <strong>{o.name}</strong>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 교육 대상 ── */}
      <section className="dc-section paper" id="audience">
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

      {/* ── 진행 방식 + 기대 효과 ── */}
      <section className="dc-section" id="method">
        <div className="dc-wrap">
          <p className="dc-kicker">How</p>
          <h2>{p.method.heading}</h2>
          <p className="desc">{p.method.body}</p>
          <div className="dc-flow">
            {p.method.flow.map((s) => (
              <div className="step" key={s.no}>
                <span className="n">STEP {s.no}</span>
                <strong>{s.title}</strong>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="dc-outcome">
            <p className="dc-kicker">Outcome</p>
            <h3>{p.outcome.heading}</h3>
            <p className="dc-effect">{p.outcome.body}</p>
          </div>
        </div>
      </section>

      {/* ── 준비물·필수 조건 ── */}
      {p.notice && (
        <section className="dc-section paper" id="prepare">
          <div className="dc-wrap">
            <p className="dc-kicker">Prepare</p>
            <h2>수강 전 준비할 것</h2>
            <div className="dc-notice" role="note">
              <strong>{p.notice.title}</strong>
              <p>{p.notice.body}</p>
              {p.notice.items && p.notice.items.length > 0 && (
                <div className="dc-notice-items">
                  {p.notice.itemsTitle && <b>{p.notice.itemsTitle}</b>}
                  <ul>
                    {p.notice.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  {p.notice.itemsNote && <span className="note">{p.notice.itemsNote}</span>}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="dc-section" id="faq">
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

      {/* ── 신청 ── */}
      <section className="dc-section paper" id="apply">
        <div className="dc-wrap">
          <p className="dc-kicker">Registration</p>
          <h2>신청 안내</h2>
          <p className="desc">
            {url
              ? "신청 접수와 결제, 일정 안내는 모두 이벤터스 행사 페이지에서 진행됩니다."
              : "행사 페이지가 열리는 대로 이 자리에 신청 버튼이 표시됩니다."}
          </p>
          <div className="dc-event">
            <div className="dc-event-body">
              <span className="dc-event-badge">
                {url ? "이벤터스 행사 페이지" : "신청 준비 중"}
              </span>
              <h3>{p.registration.courseTitle}</h3>
              {p.price && <Price price={p.price} />}
              <dl className="dc-event-meta">
                {p.registration.details.map((d) => (
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
        </div>
      </section>
    </main>
  );
}

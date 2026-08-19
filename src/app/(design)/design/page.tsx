import Link from "next/link";
import QRCode from "qrcode";
import {
  AUDIENCE,
  COURSE,
  EVENT,
  FACTS,
  FAQ,
  FLOW,
  GOALS,
  OUTPUTS,
  PARTS,
  TIMELINE,
  eventDetails,
} from "@/lib/design-course";

/** 신청은 이벤터스 행사 페이지에서 접수합니다. */
function ApplyButton({ className = "dc-btn" }: { className?: string }) {
  return (
    <a
      href={EVENT.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      이벤터스에서 신청하기
    </a>
  );
}

export default async function DesignLandingPage() {
  // 행사 URL에서 QR 을 직접 생성하므로, EVENT.url 을 바꾸면 QR 도 함께 바뀝니다.
  const qrSvg = await QRCode.toString(EVENT.url, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#1f1e1d", light: "#ffffff" },
  });

  return (
    <main>
      {/* 히어로 */}
      <section className="dc-hero">
        <div className="dc-wrap">
          <span className="dc-eyebrow">90분 실습 특강 · {COURSE.capacity}</span>
          <h1>
            브랜드 하나를,
            <br />
            <em>90분</em> 만에.
          </h1>
          <p className="sub">
            AI와 대화하며 브랜드 디자인을 기획하고, 하나의 디자인 시스템을
            포스터·카드뉴스·상세페이지로 확장하는 방법을 배웁니다. 디자인 경험이
            많지 않아도 따라올 수 있도록 실습 중심으로 진행합니다.
          </p>
          <div className="actions">
            <ApplyButton />
            <Link href="#curriculum" className="dc-btn ghost">
              커리큘럼 보기
            </Link>
          </div>
          <div className="dc-facts">
            {FACTS.map((f) => (
              <div className="fact" key={f.k}>
                <span className="k">{f.k}</span>
                <span className="v">{f.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 강의 개요 */}
      <section className="dc-section paper" id="overview">
        <div className="dc-wrap">
          <p className="dc-kicker">Overview</p>
          <h2>이미지 한 장이 아니라, 브랜드 한 벌을 만듭니다</h2>
          <p className="desc">
            Claude Design의 주요 기능을 이해하고, AI를 활용해 브랜드 디자인을
            기획하고 다양한 디자인 결과물로 확장하는 방법을 학습합니다. 디자인
            경험이 많지 않은 사람도 AI와 대화하며 디자인을 제작하고 수정할 수
            있도록 실습 중심으로 진행합니다.
          </p>
          <div className="dc-flow">
            {FLOW.map((s) => (
              <div className="step" key={s.no}>
                <span className="n">STEP {s.no}</span>
                <strong>{s.title}</strong>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 교육 대상 */}
      <section className="dc-section" id="audience">
        <div className="dc-wrap">
          <p className="dc-kicker">Who</p>
          <h2>이런 분들을 위한 특강입니다</h2>
          <p className="desc">
            디자이너가 아니어도, 만들어야 할 홍보물이 계속 생기는 분이라면
            90분 안에 바로 쓸 수 있는 결과물을 만들어 가시게 됩니다.
          </p>
          <div className="dc-audience">
            {AUDIENCE.map((a) => (
              <div className="card" key={a.title}>
                <span className="emoji" aria-hidden="true">
                  {a.icon}
                </span>
                <strong>{a.title}</strong>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 교육 목표 */}
      <section className="dc-section paper" id="goals">
        <div className="dc-wrap">
          <p className="dc-kicker">Goals</p>
          <h2>수업이 끝나면 할 수 있게 되는 것</h2>
          <ul className="dc-goals">
            {GOALS.map((g, i) => (
              <li key={g}>
                <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 커리큘럼 */}
      <section className="dc-section" id="curriculum">
        <div className="dc-wrap">
          <p className="dc-kicker">Curriculum</p>
          <h2>1부에서 5부까지, 하나의 브랜드를 계속 키웁니다</h2>
          <p className="desc">
            각 부가 따로 노는 예제가 아니라, 앞에서 만든 결과물을 뒤에서 그대로
            이어 발전시키는 방식으로 진행합니다.
          </p>
          <div className="dc-parts">
            {PARTS.map((p) => (
              <article className="dc-part" key={p.no}>
                <div className="head">
                  <span className="no">{p.no}</span>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                </div>
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
      <section className="dc-section paper" id="project">
        <div className="dc-wrap">
          <div className="dc-project">
            <p className="dc-kicker">Hands-on Project</p>
            <h2>하나의 디자인 시스템, 여섯 가지 결과물</h2>
            <p>
              가상의 브랜드 디자인을 만들고, 하나의 디자인 시스템을 기반으로 상품
              홍보물·포스터·카드뉴스·상세페이지 등 다양한 결과물을 제작합니다.
              이미 운영 중인 브랜드가 있다면 그 소재로 실습하셔도 됩니다.
            </p>
            <div className="dc-outputs">
              {OUTPUTS.map((o) => (
                <div className="item" key={o.name}>
                  <span aria-hidden="true">{o.icon}</span>
                  {o.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 교육 방식 */}
      <section className="dc-section" id="method">
        <div className="dc-wrap">
          <p className="dc-kicker">How</p>
          <h2>이론 · 시연 · 단계별 실습</h2>
          <p className="desc">
            기초적인 디자인 개념부터 시작해 하나씩 결과물을 발전시키는 방식으로
            진행하여, 디자인 경험이 없는 수강생도 쉽게 따라올 수 있도록
            구성합니다.
          </p>
          <div className="dc-methods">
            <div className="m">
              <span className="tag">이론</span>
              <p>필요한 개념만 짧고 분명하게 정리합니다.</p>
            </div>
            <div className="m">
              <span className="tag">시연</span>
              <p>강사가 실제로 만드는 과정을 화면으로 보여 줍니다.</p>
            </div>
            <div className="m">
              <span className="tag">단계별 실습</span>
              <p>같은 흐름을 따라 각자 자기 결과물을 만들어 갑니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 기대 효과 */}
      <section className="dc-section paper" id="effect">
        <div className="dc-wrap">
          <p className="dc-kicker">Outcome</p>
          <h2>수강 후 기대 효과</h2>
          <p className="dc-effect">
            단순히 AI로 이미지를 생성하는 방법을 넘어,{" "}
            <strong>브랜드의 디자인 방향을 설정하고 일관된 디자인을 유지하면서</strong>{" "}
            다양한 콘텐츠를 제작하는 AI 활용 방법을 익힐 수 있습니다.
          </p>
        </div>
      </section>

      {/* 시간표 */}
      <section className="dc-section" id="timeline">
        <div className="dc-wrap">
          <p className="dc-kicker">Timetable</p>
          <h2>90분 진행 순서</h2>
          <p className="desc">
            총 90분 구성이며, 세팅 및 쉬는 시간 20분 정도가 추가됩니다.
          </p>
          <ol className="dc-timeline">
            {TIMELINE.map((t) => (
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

      {/* FAQ */}
      <section className="dc-section paper" id="faq">
        <div className="dc-wrap">
          <p className="dc-kicker">FAQ</p>
          <h2>자주 묻는 질문</h2>
          <div className="dc-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p className="a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 행사 안내 · 신청 */}
      <section className="dc-section" id="apply">
        <div className="dc-wrap">
          <p className="dc-kicker">Registration</p>
          <h2>신청 안내</h2>
          <p className="desc">
            신청 접수와 결제, 일정 안내는 모두 이벤터스 행사 페이지에서
            진행됩니다. 아래 버튼을 눌러 행사 페이지에서 신청해 주세요.
          </p>

          <div className="dc-event">
            <div className="dc-event-body">
              <span className="dc-event-badge">이벤터스 행사 페이지</span>
              <h3>{COURSE.title}</h3>
              <dl className="dc-event-meta">
                {eventDetails().map((d) => (
                  <div className="row" key={d.k}>
                    <dt>{d.k}</dt>
                    <dd>{d.v}</dd>
                  </div>
                ))}
                <div className="row">
                  <dt>교육 시간</dt>
                  <dd>{COURSE.duration}</dd>
                </div>
                <div className="row">
                  <dt>정원</dt>
                  <dd>{COURSE.capacity}</dd>
                </div>
                <div className="row">
                  <dt>준비물</dt>
                  <dd>인터넷이 연결된 노트북 1대</dd>
                </div>
              </dl>
              <p className="dc-event-url">{EVENT.url}</p>
            </div>
            <div className="dc-event-action">
              <a
                href={EVENT.url}
                target="_blank"
                rel="noopener noreferrer"
                className="dc-qr"
                aria-label="이벤터스 행사 페이지 QR 코드"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <span className="dc-event-hint">
                QR을 스캔하면 행사 페이지로 이동합니다
              </span>
              <ApplyButton />
            </div>
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="dc-cta">
        <div className="dc-wrap">
          <h2>{COURSE.tagline}</h2>
          <p>
            디자인 경험이 없어도 괜찮습니다. 신청 후 접수번호가 발급되며, 확인
            메일을 보내드립니다.
          </p>
          <ApplyButton />
          <p className="dc-cta-note">
            신청 접수는 이벤터스 행사 페이지에서 진행됩니다.
          </p>
        </div>
      </section>
    </main>
  );
}

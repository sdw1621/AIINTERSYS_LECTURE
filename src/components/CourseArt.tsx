/* ------------------------------------------------------------------ *
 * 과정 페이지용 인라인 SVG 일러스트.
 * 외부 이미지를 받아오지 않아 로딩 실패나 저작권 문제가 없고,
 * 색은 currentColor 와 CSS 변수를 따라가므로 과정별 강조색에 맞춰집니다.
 * ------------------------------------------------------------------ */

const A = "var(--dc-accent)";
const D = "var(--dc-accent-deep)";
const INK = "var(--dc-ink)";
const LINE = "var(--dc-line)";
const PAPER = "var(--dc-paper)";

type Props = { className?: string };

/** 히어로 — 터미널 창과 대화 말풍선 */
export function TerminalArt({ className }: Props) {
  return (
    <svg viewBox="0 0 420 320" className={className} role="img"
         aria-label="터미널 창에 대화로 요청하면 결과가 만들어지는 모습">
      <rect x="24" y="40" width="300" height="200" rx="14" fill={INK} />
      <circle cx="46" cy="60" r="4.5" fill="#ff5f57" />
      <circle cx="62" cy="60" r="4.5" fill="#febc2e" />
      <circle cx="78" cy="60" r="4.5" fill="#28c840" />
      <rect x="44" y="86" width="14" height="9" rx="2" fill={A} />
      <rect x="66" y="86" width="120" height="9" rx="4.5" fill="rgba(255,255,255,.55)" />
      <rect x="44" y="108" width="14" height="9" rx="2" fill={A} />
      <rect x="66" y="108" width="170" height="9" rx="4.5" fill="rgba(255,255,255,.32)" />
      <rect x="44" y="132" width="200" height="9" rx="4.5" fill="rgba(255,255,255,.18)" />
      <rect x="44" y="154" width="150" height="9" rx="4.5" fill="rgba(255,255,255,.18)" />
      <rect x="44" y="182" width="14" height="9" rx="2" fill={A} />
      <rect x="66" y="182" width="90" height="9" rx="4.5" fill="rgba(255,255,255,.55)" />
      <rect x="160" y="182" width="7" height="11" fill={A} />
      {/* 사용자 말풍선 */}
      <g>
        <rect x="196" y="216" width="200" height="72" rx="18" fill={PAPER}
              stroke={A} strokeWidth="2" />
        <path d="M232 288 l-14 20 l32 -20 z" fill={PAPER} stroke={A} strokeWidth="2" />
        <rect x="216" y="238" width="150" height="8" rx="4" fill={D} opacity=".65" />
        <rect x="216" y="256" width="104" height="8" rx="4" fill={D} opacity=".35" />
      </g>
      <circle cx="336" cy="70" r="26" fill={A} opacity=".16" />
      <circle cx="360" cy="120" r="14" fill={A} opacity=".25" />
    </svg>
  );
}

/** 링크나무 — 링크 목록이 담긴 휴대폰 */
export function LinkTreeArt({ className }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="링크 목록 화면">
      <rect x="34" y="10" width="52" height="100" rx="10" fill={PAPER} stroke={INK} strokeWidth="2.5" />
      <circle cx="60" cy="30" r="8" fill={A} />
      <rect x="44" y="46" width="32" height="6" rx="3" fill={INK} opacity=".7" />
      <rect x="42" y="60" width="36" height="11" rx="5.5" fill={A} />
      <rect x="42" y="76" width="36" height="11" rx="5.5" fill={A} opacity=".6" />
      <rect x="42" y="92" width="36" height="11" rx="5.5" fill={A} opacity=".35" />
    </svg>
  );
}

/** 멀티 에이전트 — 하나가 여럿에게 일을 나눠 주는 모습 */
export function AgentsArt({ className }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="여러 에이전트에게 작업을 분배하는 모습">
      <circle cx="60" cy="26" r="14" fill={INK} />
      <circle cx="55" cy="24" r="2.4" fill={PAPER} />
      <circle cx="65" cy="24" r="2.4" fill={PAPER} />
      <path d="M60 40 V60 M26 84 V72 Q26 60 44 60 H76 Q94 60 94 72 V84" fill="none"
            stroke={LINE} strokeWidth="2.5" />
      <circle cx="26" cy="94" r="12" fill={A} />
      <circle cx="60" cy="94" r="12" fill={A} opacity=".7" />
      <circle cx="94" cy="94" r="12" fill={A} opacity=".45" />
      <path d="M60 60 V84" fill="none" stroke={LINE} strokeWidth="2.5" />
    </svg>
  );
}

/** PRD — 체크리스트가 있는 문서 */
export function DocArt({ className }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="요구사항 문서와 체크리스트">
      <rect x="28" y="12" width="64" height="96" rx="8" fill={PAPER} stroke={INK} strokeWidth="2.5" />
      <rect x="40" y="28" width="30" height="7" rx="3.5" fill={INK} opacity=".75" />
      {[48, 64, 80].map((y, i) => (
        <g key={y}>
          <rect x="40" y={y} width="11" height="11" rx="3" fill={i === 2 ? "none" : A}
                stroke={i === 2 ? LINE : "none"} strokeWidth="2" />
          {i !== 2 && (
            <path d={`M43 ${y + 6} l2.6 2.8 l4.6 -5.4`} fill="none" stroke={PAPER}
                  strokeWidth="2" strokeLinecap="round" />
          )}
          <rect x="57" y={y + 2.5} width="24" height="6" rx="3" fill={INK} opacity=".35" />
        </g>
      ))}
    </svg>
  );
}

/** 숏폼 파이프라인 — 세로 영상 프레임이 이어지는 모습 */
export function ShortsArt({ className }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="숏폼 영상이 자동으로 이어지는 파이프라인">
      <rect x="14" y="34" width="30" height="52" rx="6" fill={A} opacity=".35" />
      <rect x="46" y="26" width="34" height="68" rx="7" fill={PAPER} stroke={INK} strokeWidth="2.5" />
      <path d="M58 48 l16 12 l-16 12 z" fill={A} />
      <rect x="82" y="34" width="30" height="52" rx="6" fill={A} opacity=".35" />
      <path d="M44 60 H46 M80 60 H82" stroke={INK} strokeWidth="2.5" />
      <circle cx="63" cy="104" r="3" fill={A} />
      <circle cx="75" cy="104" r="3" fill={A} opacity=".5" />
      <circle cx="51" cy="104" r="3" fill={A} opacity=".5" />
    </svg>
  );
}

/** 디스코드 비서 — 대화창 */
export function BotArt({ className }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="대화로 일을 시키는 AI 비서">
      <rect x="16" y="24" width="88" height="62" rx="12" fill={PAPER} stroke={INK} strokeWidth="2.5" />
      <path d="M40 86 l-6 16 l20 -16 z" fill={PAPER} stroke={INK} strokeWidth="2.5" />
      <rect x="30" y="40" width="40" height="8" rx="4" fill={INK} opacity=".3" />
      <rect x="30" y="56" width="58" height="8" rx="4" fill={A} />
      <circle cx="88" cy="34" r="12" fill={A} />
      <circle cx="84" cy="33" r="2" fill={PAPER} />
      <circle cx="92" cy="33" r="2" fill={PAPER} />
      <path d="M84 39 q4 3 8 0" fill="none" stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** 나만의 자동화 — 반복 고리 */
export function LoopArt({ className }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="반복되는 작업이 자동으로 도는 모습">
      <path d="M60 24 a36 36 0 1 1 -25.5 10.5" fill="none" stroke={A} strokeWidth="7"
            strokeLinecap="round" />
      <path d="M26 22 v16 h16" fill="none" stroke={A} strokeWidth="7"
            strokeLinecap="round" strokeLinejoin="round" />
      <rect x="46" y="46" width="28" height="28" rx="8" fill={INK} />
      <path d="M54 60 l4 4 l8 -9" fill="none" stroke={PAPER} strokeWidth="2.6"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ART = {
  terminal: TerminalArt,
  linktree: LinkTreeArt,
  agents: AgentsArt,
  doc: DocArt,
  shorts: ShortsArt,
  bot: BotArt,
  loop: LoopArt,
} as const;

export type ArtKey = keyof typeof ART;

export default function CourseArt({
  name,
  className,
}: {
  name: ArtKey;
  className?: string;
}) {
  const C = ART[name];
  return <C className={className} />;
}

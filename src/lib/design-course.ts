/* ------------------------------------------------------------------ *
 * Claude Design 특강 사이트 전용 콘텐츠.
 * 이 파일만 수정하면 특강 사이트 전체(히어로·커리큘럼·시간표)에 반영됩니다.
 * ------------------------------------------------------------------ */

export const COURSE = {
  id: "claude-design",
  title: "일하는 방식을 디자인하다, Claude Design",
  tagline: "반복하던 업무를, 나만의 AI Skill로",
  description:
    "Claude Design의 다양한 Skill을 활용해 회사에서 실제로 사용하는 자료를 직접 만들고, 반복되는 업무를 효율적인 AI 작업 방식으로 바꾸는 방법을 배웁니다.",
  duration: "90분 (세팅·휴식 20분 별도)",
  method: "이론 + 시연 + 단계별 실습",
  capacity: "선착순 10명",
  prerequisite: "사전 지식 불필요 · 입문자 환영",
  host: "AI인터시스 (AIintersys)",
} as const;

/* ------------------------------------------------------------------ *
 * 행사 신청 정보.
 * 신청 접수는 이벤터스(event-us) 행사 페이지에서 처리합니다.
 * 사이트의 모든 "신청하기" 버튼이 아래 url 로 연결됩니다.
 *
 * date / place / fee / apply 는 행사 페이지 내용에 맞춰 채우면
 * 히어로·신청 안내 영역에 자동으로 표시됩니다.
 * 빈 문자열로 두면 해당 항목은 화면에 나타나지 않습니다.
 * ------------------------------------------------------------------ */

export const EVENT = {
  url: "https://event-us.kr/aiintersyslec/event/133920",
  date: "2026년 9월 1일 (화) 19:30 ~ 21:30",
  place: "온라인 (Zoom)",
  fee: "20,000원",
  apply: "2026년 8월 28일 (금) ~ 9월 1일 (화) 18:00",
} as const;

/** 값이 채워진 행사 정보만 골라 [라벨, 값] 목록으로 돌려줍니다. */
export function eventDetails(): { k: string; v: string }[] {
  return [
    { k: "일시", v: EVENT.date },
    { k: "장소", v: EVENT.place },
    { k: "참가비", v: EVENT.fee },
    { k: "신청 기간", v: EVENT.apply },
  ].filter((d) => d.v.length > 0);
}

export const FACTS = [
  { k: "교육 시간", v: COURSE.duration },
  { k: "진행 방식", v: COURSE.method },
  { k: "정원", v: COURSE.capacity },
  { k: "사전 지식", v: "불필요 (입문자 환영)" },
];

export const AUDIENCE = [
  {
    icon: "📊",
    title: "보고·제안 담당자",
    text: "보고서·제안서·발표자료를 자주 만드는 직장인",
  },
  {
    icon: "🔎",
    title: "조사·분석 실무자",
    text: "조사·분석 결과를 업무 자료로 정리해야 하는 분",
  },
  {
    icon: "📣",
    title: "업무 콘텐츠 제작자",
    text: "사내 공지·안내물 등 다양한 업무 콘텐츠를 만드는 분",
  },
  {
    icon: "🧩",
    title: "Claude Design 사용자",
    text: "써보긴 했지만 Skill 활용이 아직 익숙하지 않은 분",
  },
  {
    icon: "♻️",
    title: "반복 업무 담당자",
    text: "반복되는 자료 제작 업무를 AI로 효율화하고 싶은 분",
  },
];

export const GOALS = [
  "Claude Design의 Skill과 Template의 차이 이해하기",
  "업무 목적에 맞는 Skill을 선택하고 활용하는 방법 익히기",
  "여러 Skill을 조합해 하나의 결과물을 완성하기",
  "조사·데이터·기존 자료를 활용해 실무 자료 제작하기",
  "하나의 업무를 다양한 형태의 결과물로 확장하기",
  "반복되는 업무를 재사용 가능한 AI 작업 방식으로 만들기",
];

export type Part = {
  no: string;
  title: string;
  summary: string;
  items: string[];
};

export const PARTS: Part[] = [
  {
    no: "1부",
    title: "Skill로 시작하는 AI 업무",
    summary: "Skill이 무엇이고, 어떤 기준으로 골라 쓰는지부터 잡고 갑니다.",
    items: [
      "Claude Design의 Skill과 Template 이해하기",
      "업무 목적에 맞는 Skill 선택 기준 익히기",
      "여러 Skill을 함께 사용해 결과물 만들기",
      "Skill을 바꿔가며 하나의 결과물을 발전시키기",
      "실무에 맞는 Skill 활용 방법 익히기",
    ],
  },
  {
    no: "2부",
    title: "보고하고 설득하는 자료 만들기",
    summary: "회의·보고·제안 자리에서 바로 쓰는 발표자료와 문서를 만듭니다.",
    items: [
      "회의·보고·제안을 위한 발표자료 만들기",
      "보고서·기획서 등 문서형 자료 만들기",
      "기존 문서와 데이터를 활용해 새로운 결과물 만들기",
      "정보를 효과적으로 구조화하고 시각화하기",
      "AI가 만든 결과물을 검토하고 원하는 방향으로 수정하기",
    ],
  },
  {
    no: "3부",
    title: "조사하고 분석하는 자료 만들기",
    summary: "최신 정보를 직접 조사해 근거가 있는 의사결정 자료로 만듭니다.",
    items: [
      "Web Research를 활용해 최신 정보 조사하기",
      "조사 결과와 출처를 업무 자료에 반영하기",
      "데이터와 지역 정보를 시각적인 자료로 만들기",
      "조사·분석 결과를 의사결정 자료로 발전시키기",
      "조사 Skill과 제작 Skill을 조합해 결과물 완성하기",
    ],
  },
  {
    no: "4부",
    title: "하나의 업무를 여러 결과물로 확장하기",
    summary: "같은 내용을 발표자료·문서·홍보물·이메일로 가지를 뻗어 나갑니다.",
    items: [
      "하나의 업무 내용을 다양한 형태로 발전시키기",
      "발표자료·문서·홍보물·이메일 등으로 결과물 확장하기",
      "업무 목적과 상황에 따라 적절한 Skill 조합하기",
      "하나의 결과물을 단계적으로 발전시키는 작업 방식 익히기",
      "정적인 자료를 인터랙티브한 결과물로 확장하기",
    ],
  },
  {
    no: "5부",
    title: "반복 업무를 나만의 AI Skill로 만들기",
    summary: "매번 하던 일을 절차로 정리해 다음 업무에 그대로 재사용합니다.",
    items: [
      "반복적으로 만드는 업무와 자료 찾기",
      "업무 과정을 AI가 실행할 수 있는 절차로 정리하기",
      "자주 사용하는 지시사항과 결과물 구조 표준화하기",
      "반복 업무를 재사용 가능한 작업 방식으로 만들기",
      "나만의 업무 Skill을 설계하고 실제 업무에 적용하기",
    ],
  },
];

export const TIMELINE = [
  {
    time: "0~10분",
    label: "Claude Design Skill 이해하기",
    detail:
      "Claude Design의 특징 / Skill과 Template의 차이 / 업무에 맞는 Skill을 선택하는 방법",
  },
  {
    time: "10~25분",
    label: "보고하고 설득하는 자료 만들기",
    detail:
      "발표자료·보고서 제작 / 기존 자료 활용하기 / 정보를 구조화하고 시각화하기",
  },
  {
    time: "25~40분",
    label: "조사하고 분석하는 자료 만들기",
    detail:
      "Web Research 활용 / 조사 결과와 데이터 반영 / 조사·제작 Skill 조합하기",
  },
  {
    time: "40~60분",
    label: "하나의 업무를 여러 결과물로 확장하기",
    detail:
      "하나의 내용을 발표자료·문서·홍보물 등으로 확장 / 상황에 맞는 Skill 조합 / 결과물 발전시키기",
  },
  {
    time: "60~80분",
    label: "반복 업무를 AI 작업 방식으로 만들기",
    detail:
      "반복 업무 찾기 / 업무 과정을 단계별로 정리 / 재사용 가능한 작업 방식 만들기",
  },
  {
    time: "80~90분",
    label: "나만의 업무 Skill로 발전시키기",
    detail:
      "Agent Skill 이해하기 / 반복 업무를 Skill로 설계하기 / 실제 업무 적용 및 정리",
  },
];

export const OUTPUTS = [
  { icon: "📊", name: "발표자료" },
  { icon: "📄", name: "보고서·기획서" },
  { icon: "🔎", name: "조사·분석 자료" },
  { icon: "📣", name: "사내 공지·홍보물" },
  { icon: "✉️", name: "업무 이메일" },
  { icon: "🧩", name: "나만의 업무 Skill" },
];

export const FLOW = [
  { no: 1, title: "Skill 선택", desc: "업무 목적에 맞는 Skill 고르기" },
  { no: 2, title: "실무 자료 제작", desc: "발표자료·보고서·조사자료" },
  { no: 3, title: "결과물 확장", desc: "문서·홍보물·이메일로 넓히기" },
  { no: 4, title: "나만의 Skill", desc: "반복 업무를 절차로 재사용" },
];

/** 신청 폼의 Claude Design 사용 경험 선택지 */
export const EXPERIENCE_LEVELS = [
  { value: "none", label: "Claude Design을 써본 적 없음 (처음입니다)" },
  { value: "basic", label: "몇 번 써봤지만 Skill 활용은 익숙하지 않음" },
  { value: "work", label: "업무 자료 제작에 AI를 자주 활용함" },
  { value: "pro", label: "Skill·자동화까지 직접 만들어 활용함" },
];

export function experienceLabel(value: string): string {
  return EXPERIENCE_LEVELS.find((e) => e.value === value)?.label ?? value;
}

export const FAQ = [
  {
    q: "Claude Design을 처음 써보는데 따라갈 수 있나요?",
    a: "네. Skill과 Template의 차이 같은 기본 개념부터 시작해, 시연을 보고 같은 흐름을 따라 만드는 방식으로 진행합니다. 도구 사용법을 외우는 수업이 아니라 업무 상황에 맞는 Skill을 고르는 방법을 익히는 수업이라 사전 지식이 없어도 괜찮습니다.",
  },
  {
    q: "무엇을 준비해야 하나요?",
    a: "인터넷이 연결된 노트북 한 대면 충분합니다. 별도 프로그램 설치는 필요하지 않습니다. 다만 실습 중 사용량에 따라 Claude 유료 구독(Pro)이 필요할 수 있습니다.",
  },
  {
    q: "실습 소재는 정해져 있나요?",
    a: "예시 업무를 함께 진행하지만, 실제로 자주 만드는 보고서·발표자료·공지 같은 소재를 가져오시면 그 업무로 그대로 실습하실 수 있습니다.",
  },
  {
    q: "90분 안에 어디까지 만들 수 있나요?",
    a: "발표자료·보고서 같은 실무 자료 몇 종과 조사·분석 자료를 직접 만들어 보고, 마지막에는 반복 업무 하나를 재사용 가능한 나만의 Skill 형태로 정리해 가시게 됩니다.",
  },
];

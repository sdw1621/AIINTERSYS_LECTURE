/* ------------------------------------------------------------------ *
 * Claude Design 특강 사이트 전용 콘텐츠.
 * 이 파일만 수정하면 특강 사이트 전체(히어로·커리큘럼·시간표)에 반영됩니다.
 * ------------------------------------------------------------------ */

export const COURSE = {
  id: "claude-design",
  title: "Claude Design을 활용한 AI 디자인 실무",
  tagline: "브랜드 하나를, 90분 만에",
  description:
    "AI와 대화하며 브랜드 디자인을 기획하고, 하나의 디자인 시스템을 포스터·카드뉴스·상세페이지로 확장하는 방법을 배웁니다.",
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
 * date / place / fee / deadline 은 행사 페이지 내용에 맞춰 채우면
 * 히어로·신청 안내 영역에 자동으로 표시됩니다.
 * 빈 문자열로 두면 해당 항목은 화면에 나타나지 않습니다.
 * ------------------------------------------------------------------ */

export const EVENT = {
  url: "https://event-us.kr/aiintersyslec/event/133124",
  /** 예: "2026년 9월 3일 (목) 19:00" */
  date: "",
  /** 예: "온라인 (Zoom)" 또는 "서울 강남구 …" */
  place: "",
  /** 예: "무료" 또는 "30,000원" */
  fee: "",
  /** 예: "2026년 9월 1일 (화) 18:00" */
  deadline: "",
} as const;

/** 값이 채워진 행사 정보만 골라 [라벨, 값] 목록으로 돌려줍니다. */
export function eventDetails(): { k: string; v: string }[] {
  return [
    { k: "일시", v: EVENT.date },
    { k: "장소", v: EVENT.place },
    { k: "참가비", v: EVENT.fee },
    { k: "신청 마감", v: EVENT.deadline },
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
    icon: "💼",
    title: "직장인",
    text: "AI를 활용해 디자인 업무를 효율적으로 하고 싶은 분",
  },
  {
    icon: "📣",
    title: "마케팅 실무자",
    text: "홍보물·마케팅 콘텐츠 제작이 자주 필요한 분",
  },
  {
    icon: "🏪",
    title: "대표·창업자",
    text: "브랜드와 상품을 직접 운영하는 자영업자·창업자",
  },
  {
    icon: "🌱",
    title: "디자인 입문자",
    text: "디자인 업무를 처음 접해 어디서 시작할지 막막한 분",
  },
  {
    icon: "🤖",
    title: "AI 도구 학습자",
    text: "AI 디자인 도구 활용법을 제대로 배우고 싶은 분",
  },
];

export const GOALS = [
  "Claude Design의 기본 개념과 활용 방법 이해",
  "AI를 활용한 브랜드 디자인 제작 방법 학습",
  "디자인 시스템을 활용한 일관된 브랜드 디자인 제작",
  "하나의 디자인을 다양한 홍보물로 확장하는 방법 학습",
  "반복적인 디자인 작업을 AI로 효율화하는 방법 습득",
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
    title: "Claude Design 이해하기",
    summary: "AI 디자인이 무엇을 바꾸는지, 어디서부터 시작하는지 잡고 갑니다.",
    items: [
      "Claude Design이란?",
      "AI를 활용한 디자인 작업의 변화",
      "Claude Design 주요 기능 이해",
      "디자인 시스템의 개념과 활용 방법",
    ],
  },
  {
    no: "2부",
    title: "AI로 브랜드 디자인 만들기",
    summary: "가상의 브랜드를 정하고 첫 번째 디자인 결과물을 만들어 봅니다.",
    items: [
      "브랜드 콘셉트 설정",
      "브랜드 이미지 및 디자인 방향 설정",
      "상품 이미지 제작",
      "디자인 요소 구성 및 수정",
    ],
  },
  {
    no: "3부",
    title: "디자인 시스템 활용하기",
    summary: "색상·폰트·레이아웃을 규칙으로 정리해 일관성을 만듭니다.",
    items: [
      "브랜드 디자인 시스템 만들기",
      "디자인 요소의 일관성 유지하기",
      "기존 디자인을 활용해 새로운 디자인 만들기",
      "디자인 시스템을 다양한 결과물에 적용하기",
    ],
  },
  {
    no: "4부",
    title: "다양한 디자인 결과물 제작",
    summary: "하나의 시스템에서 여러 홍보물로 가지를 뻗어 나갑니다.",
    items: [
      "상품 홍보물",
      "포스터",
      "카드뉴스",
      "상세페이지",
      "패키지 및 안내물",
      "상황별 홍보 콘텐츠 제작",
    ],
  },
  {
    no: "5부",
    title: "AI 디자인 작업 확장하기",
    summary: "한 번 만든 작업 방식을 재사용해 실무에 정착시킵니다.",
    items: [
      "반복적인 디자인 작업 효율화",
      "Skill을 활용한 작업 방식 재사용",
      "하나의 브랜드 디자인을 다양한 콘텐츠로 확장하기",
      "실무에서 Claude Design 활용하기",
    ],
  },
];

export const TIMELINE = [
  {
    time: "0~10분",
    label: "AI 디자인 이해하기",
    detail:
      "생성형 AI와 디자인의 변화 / Claude Design의 특징 / 디자인 시스템이 필요한 이유",
  },
  {
    time: "10~25분",
    label: "Claude Design 핵심 기능",
    detail:
      "Claude Design 기본 구조 / 디자인 시스템 / Skill의 개념 / 기존 디자인을 활용하고 확장하는 방법",
  },
  {
    time: "25~40분",
    label: "브랜드 디자인 만들기",
    detail:
      "브랜드 콘셉트 설정 / 디자인 방향 정하기 / 상품 이미지 및 기본 디자인 제작",
  },
  {
    time: "40~60분",
    label: "디자인 시스템 구축",
    detail:
      "브랜드의 색상·폰트·레이아웃·이미지 스타일 정리 / 디자인 시스템 적용 / 일관된 디자인 만들기",
  },
  {
    time: "60~80분",
    label: "디자인 확장하기",
    detail:
      "하나의 디자인 시스템을 활용해 포스터·카드뉴스·상세페이지 등 다양한 결과물 제작",
  },
  {
    time: "80~90분",
    label: "실무 활용 및 정리",
    detail:
      "Skill을 활용한 반복 작업 / 업무·사업에 적용하는 방법 / 핵심 내용 정리",
  },
];

export const OUTPUTS = [
  { icon: "🛍️", name: "상품 홍보물" },
  { icon: "🖼️", name: "포스터" },
  { icon: "🗂️", name: "카드뉴스" },
  { icon: "📄", name: "상세페이지" },
  { icon: "📦", name: "패키지·안내물" },
  { icon: "✨", name: "상황별 홍보 콘텐츠" },
];

export const FLOW = [
  { no: 1, title: "브랜드 콘셉트", desc: "무엇을 파는 브랜드인지 정하기" },
  { no: 2, title: "디자인 시스템", desc: "색상·폰트·레이아웃 규칙화" },
  { no: 3, title: "결과물 확장", desc: "포스터·카드뉴스·상세페이지" },
  { no: 4, title: "Skill로 재사용", desc: "반복 작업 효율화" },
];

/** 신청 폼의 디자인 경험 선택지 */
export const EXPERIENCE_LEVELS = [
  { value: "none", label: "디자인 경험 없음 (처음입니다)" },
  { value: "basic", label: "가끔 직접 만들어 본 적 있음" },
  { value: "work", label: "업무로 디자인·홍보물을 다룸" },
  { value: "pro", label: "디자인 전공·전문 실무자" },
];

export function experienceLabel(value: string): string {
  return EXPERIENCE_LEVELS.find((e) => e.value === value)?.label ?? value;
}

export const FAQ = [
  {
    q: "디자인을 전혀 해본 적이 없는데 따라갈 수 있나요?",
    a: "네. 기초 개념부터 시작해 하나씩 결과물을 발전시키는 방식으로 진행합니다. 디자인 도구 사용법이 아니라 AI와 대화하는 방식으로 만들기 때문에, 사전 지식이 없어도 괜찮습니다.",
  },
  {
    q: "무엇을 준비해야 하나요?",
    a: "인터넷이 연결된 노트북 한 대면 충분합니다. 별도의 디자인 프로그램 설치는 필요하지 않습니다. 다만 실습 중 사용량에 따라 Claude 유료 구독(Pro)이 필요할 수 있습니다.",
  },
  {
    q: "실습에서 만드는 브랜드는 정해져 있나요?",
    a: "가상의 브랜드를 예시로 함께 진행하지만, 이미 운영 중인 브랜드나 상품이 있다면 그 소재로 그대로 실습하셔도 됩니다.",
  },
  {
    q: "90분 안에 어디까지 만들 수 있나요?",
    a: "브랜드 콘셉트 정리, 디자인 시스템 1식, 그리고 포스터·카드뉴스·상세페이지 등 결과물 몇 종을 직접 만들어 가시게 됩니다.",
  },
];

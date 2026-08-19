export type Course = {
  id: string;
  title: string;
  subtitle: string;
  schedule: string;
  format: string;
  capacity: string;
  tags: string[];
  /** 상세 소개 페이지가 있는 경우의 경로 */
  detailHref?: string;
};

// 접수 가능한 교육과정 목록. 필요 시 이 배열만 수정하면 폼/카드에 자동 반영됩니다.
export const COURSES: Course[] = [
  {
    id: "claude-design",
    title: "Claude Design을 활용한 AI 디자인 실무",
    subtitle:
      "브랜드 콘셉트부터 디자인 시스템, 포스터·카드뉴스·상세페이지까지 90분 실습 특강",
    schedule: "90분 특강 (세팅·휴식 20분 별도)",
    format: "이론 + 시연 + 단계별 실습",
    capacity: "선착순 30명",
    tags: ["디자인", "입문 가능", "실습"],
    detailHref: "/courses/claude-design",
  },
  {
    id: "ax-intro",
    title: "AX 실무 입문 과정",
    subtitle: "생성형 AI를 업무에 바로 적용하는 4주 실습 과정",
    schedule: "매주 화·목 19:00–22:00 (4주)",
    format: "온라인 실시간 (Zoom)",
    capacity: "선착순 30명",
    tags: ["입문", "실습", "온라인"],
  },
  {
    id: "ax-advanced",
    title: "AX 심화 · 자동화 과정",
    subtitle: "업무 자동화 워크플로우와 에이전트를 직접 설계하는 6주 과정",
    schedule: "매주 토 10:00–17:00 (6주)",
    format: "오프라인 (서울 강남)",
    capacity: "선착순 20명",
    tags: ["심화", "자동화", "오프라인"],
  },
  {
    id: "ax-leader",
    title: "리더를 위한 AI 전략 과정",
    subtitle: "조직에 AX를 도입하려는 리더·의사결정자 대상 집중 과정",
    schedule: "격주 금 14:00–18:00 (4회)",
    format: "온·오프라인 병행",
    capacity: "선착순 15명",
    tags: ["리더", "전략", "블렌디드"],
  },
];

export function courseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

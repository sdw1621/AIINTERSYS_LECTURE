import CourseLanding from "@/components/CourseLanding";
import {
  AUDIENCE,
  COURSE,
  EVENT,
  FAQ,
  FLOW,
  HERO_IMAGE,
  NOTICE,
  OUTPUTS,
  PREPARE_IMAGE,
  PARTS,
  PRICE,
  SUMMARY,
} from "@/lib/claude-code-course";

export default function ClaudeCodeLandingPage() {
  return (
    <CourseLanding
      eyebrow={`2주 6회 · 총 12시간 · ${COURSE.capacity}`}
      headline={{ before: "코드를 몰라도,", accent: "딸깍", after: " 만듭니다." }}
      intro={COURSE.description}
      heroImage={HERO_IMAGE}
      price={PRICE}
      summary={SUMMARY}
      curriculum={{
        heading: "6회차, 설치부터 AI 비서까지",
        body:
          "참고 도서 1부 「순한맛」 1~7장을 여섯 회차에 나눠 진행합니다. 회차마다 따로 노는 예제가 아니라, 앞에서 만든 것을 뒤에서 그대로 이어 확장합니다.",
        parts: PARTS,
      }}
      project={{
        heading: "2주 뒤, 여섯 가지를 손에 들고 나갑니다",
        body:
          "설명만 듣고 끝내지 않습니다. 회차마다 직접 만들어 돌아가는 것을 확인하고, 만들고 싶은 소재가 따로 있다면 그 주제로 바꿔 실습하셔도 됩니다.",
        outputs: OUTPUTS,
      }}
      audience={{
        heading: "이런 분들을 위한 과정입니다",
        body:
          "개발자가 아니어도 괜찮습니다. 오히려 만들고 싶은 것이 분명한 분일수록 첫 회차부터 결과물이 빨리 나옵니다.",
        cards: AUDIENCE,
      }}
      method={{
        heading: "이론 · 시연 · 단계별 실습",
        body:
          "강사가 먼저 만드는 과정을 화면으로 보여 주고, 같은 흐름을 따라 각자 만듭니다. 설치나 실행에서 막히는 분이 있으면 그 자리에서 함께 해결하고 넘어가며, 회차 사이에는 각자 소재로 적용해 볼 과제를 드립니다.",
        flow: FLOW,
      }}
      outcome={{
        heading: "수강 후 기대 효과",
        body: (
          <>
            설치 화면에서 멈춰 있던 상태를 벗어나,{" "}
            <strong>
              만들고 싶은 것을 클로드 코드에게 설명해 실제로 돌아가는 결과물로
            </strong>{" "}
            만들어 내는 방법을 익힙니다. 링크나무 서비스와 숏폼 자동화
            파이프라인, 디스코드 AI 비서를 직접 만들어 본 경험이 남아, 다음
            아이디어는 혼자서도 시작하실 수 있습니다.
          </>
        ),
      }}
      notice={{ ...NOTICE, image: PREPARE_IMAGE }}
      faq={{ heading: "자주 묻는 질문", items: FAQ }}
      registration={{
        courseTitle: `${COURSE.title} — ${COURSE.subtitle}`,
        url: EVENT.url,
        details: [
          { k: "교육 시간", v: COURSE.duration },
          { k: "일정", v: COURSE.schedule },
          { k: "정원", v: COURSE.capacity },
          { k: "준비물", v: "노트북 1대 · Claude Pro 이상 구독" },
          { k: "설치", v: "클로드 코드 · Git · GitHub · Node.js" },
        ],
      }}
      cta={{
        heading: COURSE.tagline,
        body:
          "개발 지식이 없어도 괜찮습니다. 설치부터 함께 시작해 2주 뒤에는, 직접 만든 서비스와 AI 비서를 가지고 나가시게 됩니다.",
      }}
    />
  );
}

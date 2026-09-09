import CourseLanding from "@/components/CourseLanding";
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
  NOTICE,
  eventDetails,
} from "@/lib/claude-code-course";

export default function ClaudeCodeLandingPage() {
  return (
    <CourseLanding
      eyebrow={`2주 6회 과정 · 총 18시간 · ${COURSE.capacity}`}
      headline={{ before: "코드를 몰라도,", accent: "일은 자동화", after: "됩니다." }}
      intro={COURSE.description}
      facts={FACTS}
      overview={{
        heading: "설치조차 막막했다면, 여기서 시작합니다",
        body:
          "Claude Code는 대화만으로 내 컴퓨터의 파일을 읽고 정리하고 문서를 만들어 주는 도구입니다. 이 과정은 그 첫 단추인 설치와 첫 실행부터 함께 하고, 여섯 번에 걸쳐 실무 자동화까지 넓힌 뒤, 마지막에는 반복 업무를 나만의 Skill로 저장하는 데까지 데려갑니다.",
        flow: FLOW,
      }}
      audience={{
        heading: "이런 분들을 위한 특강입니다",
        body:
          "개발자가 아니어도 괜찮습니다. 오히려 손으로 반복하던 정리 업무가 많은 분일수록 첫날부터 아끼는 시간이 큽니다.",
        cards: AUDIENCE,
      }}
      goals={{ heading: "수업이 끝나면 할 수 있게 되는 것", items: GOALS }}
      curriculum={{
        heading: "1회차에서 6회차까지, 켜기부터 재사용까지",
        body:
          "회차마다 따로 노는 예제가 아니라, 앞 회차에서 만든 결과물을 다음 회차에서 그대로 이어 발전시킵니다. 마지막 날에는 그 과정을 재사용 가능한 Skill로 정리합니다.",
        parts: PARTS,
      }}
      project={{
        heading: "손으로 하던 일, 여섯 가지를 맡겨 봅니다",
        body:
          "실제 업무에서 자주 마주치는 작업들을 여섯 번에 걸쳐 직접 시켜 보고 결과를 확인합니다. 가져오신 파일이 있다면 그 자료로 그대로 실습하셔도 됩니다.",
        outputs: OUTPUTS,
      }}
      method={{
        heading: "이론 · 시연 · 단계별 실습",
        body:
          "화면을 같이 보며 한 단계씩 따라 합니다. 설치나 실행에서 막히는 분이 있으면 그 자리에서 함께 해결하고 넘어가며, 회차 사이에는 각자 업무에 적용해 볼 과제를 드립니다.",
      }}
      outcome={{
        heading: "수강 후 기대 효과",
        body: (
          <>
            설치 화면에서 멈춰 있던 상태를 벗어나,{" "}
            <strong>
              내 업무 파일을 대화로 정리시키고 결과를 검토해 다시 요청하는
            </strong>{" "}
            기본기를 갖추게 됩니다. 나아가 18시간 동안 다뤄 본 작업 중 반복되는
            하나를 Skill로 저장해, 과정이 끝난 뒤에도 같은 업무에 그대로 불러 쓸
            수 있습니다.
          </>
        ),
      }}
      timeline={{
        heading: "2주 6회 진행 순서",
        body:
          "2주 동안 월·수·금 저녁 19:00~22:00, 한 회차 3시간씩 총 6회 18시간 과정입니다. 각 회차에는 20분 정도의 휴식이 포함되며, 앞 회차에서 만든 결과물을 다음 회차에서 이어 발전시킵니다.",
        slots: TIMELINE,
      }}
      faq={{ heading: "자주 묻는 질문", items: FAQ }}
      notice={NOTICE}
      registration={{
        courseTitle: `${COURSE.title} — ${COURSE.subtitle}`,
        url: EVENT.url,
        details: eventDetails(),
        extras: [
          { k: "교육 시간", v: COURSE.duration },
          { k: "일정", v: COURSE.schedule },
          { k: "정원", v: COURSE.capacity },
          { k: "준비물", v: "노트북 1대 · Claude Pro 이상 구독" },
        ],
      }}
      cta={{
        heading: COURSE.tagline,
        body:
          "개발 지식이 없어도 괜찮습니다. 설치부터 함께 시작해 2주 뒤에는, 내 업무를 대신 해주는 Skill 하나를 만들어 가시게 됩니다.",
      }}
    />
  );
}

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
  eventDetails,
} from "@/lib/claude-code-course";

export default function ClaudeCodeLandingPage() {
  return (
    <CourseLanding
      eyebrow={`90분 실습 특강 · ${COURSE.capacity}`}
      headline={{ before: "코드를 몰라도,", accent: "일은 자동화", after: "됩니다." }}
      intro={COURSE.description}
      facts={FACTS}
      overview={{
        heading: "설치조차 막막했다면, 여기서 시작합니다",
        body:
          "Claude Code는 대화만으로 내 컴퓨터의 파일을 읽고 정리하고 문서를 만들어 주는 도구입니다. 이 과정은 그 첫 단추인 설치와 첫 실행부터 함께 하고, 권한과 되돌리기까지 짚어 혼자서도 안심하고 쓸 수 있는 상태로 만들어 드립니다.",
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
        heading: "1부에서 5부까지, 켜기부터 재사용까지",
        body:
          "설치에서 시작해 대화로 일을 시키고, 안전하게 쓰는 법을 익힌 뒤, 마지막에는 오늘 한 작업을 다음에도 쓸 수 있는 Skill로 정리합니다.",
        parts: PARTS,
      }}
      project={{
        heading: "손으로 하던 일, 여섯 가지를 맡겨 봅니다",
        body:
          "실제 업무에서 자주 마주치는 작업들을 직접 시켜 보고 결과를 확인합니다. 가져오신 파일이 있다면 그 자료로 그대로 실습하셔도 됩니다.",
        outputs: OUTPUTS,
      }}
      method={{
        heading: "이론 · 시연 · 단계별 실습",
        body:
          "화면을 같이 보며 한 단계씩 따라 합니다. 설치나 실행에서 막히는 분이 있으면 그 자리에서 함께 해결하고 다음으로 넘어갑니다.",
      }}
      outcome={{
        heading: "수강 후 기대 효과",
        body: (
          <>
            설치 화면에서 멈춰 있던 상태를 벗어나,{" "}
            <strong>
              내 업무 파일을 대화로 정리시키고 결과를 검토해 다시 요청하는
            </strong>{" "}
            기본기를 갖추게 됩니다. 나아가 반복하던 작업 하나를 Skill로 저장해,
            다음 주 같은 업무에 그대로 불러 쓸 수 있습니다.
          </>
        ),
      }}
      timeline={{
        heading: "90분 진행 순서",
        body: "총 90분 구성이며, 세팅 및 쉬는 시간 20분 정도가 추가됩니다.",
        slots: TIMELINE,
      }}
      faq={{ heading: "자주 묻는 질문", items: FAQ }}
      registration={{
        courseTitle: `${COURSE.title} — ${COURSE.subtitle}`,
        url: EVENT.url,
        details: eventDetails(),
        extras: [
          { k: "교육 시간", v: COURSE.duration },
          { k: "정원", v: COURSE.capacity },
          { k: "준비물", v: "노트북 1대 · Claude 계정" },
        ],
      }}
      cta={{
        heading: COURSE.tagline,
        body:
          "개발 지식이 없어도 괜찮습니다. 설치부터 함께 시작해 90분 뒤에는 직접 돌려보고 가시게 됩니다.",
      }}
    />
  );
}

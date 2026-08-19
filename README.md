# AI인터시스 교육 사이트

하나의 Next.js 프로젝트 안에서 **서로 독립된 두 개의 사이트**를 운영합니다.
각 사이트는 자체 헤더·푸터·디자인 시스템·신청 폼·접수 데이터를 갖습니다.

| 사이트 | 경로 | 성격 |
| --- | --- | --- |
| AI인터시스 교육과정 접수 | `/` | AX 교육과정 전체 목록 + 통합 신청 폼 |
| Claude Design 특강 | `/design` | 90분 단일 특강 전용 랜딩 + 전용 신청 폼 |

두 사이트는 Next.js **라우트 그룹**(`src/app/(main)`, `src/app/(design)`)으로 나뉘며
각각 자체 루트 레이아웃을 가지므로 CSS·헤더·메타데이터가 서로 섞이지 않습니다.

## 주요 기능

### 1) AI인터시스 교육과정 사이트 — `src/app/(main)`

- **과정 소개 + 신청 폼** (`/`): 개설 과정 카드와 수강 신청 폼을 한 페이지에 제공
- **접수 완료 페이지** (`/complete`): 접수번호 발급 및 안내
- **관리자 페이지** (`/admin`): 비밀번호로 보호된 접수 현황 조회 + CSV 다운로드
- **접수 API** (`/api/applications`): 서버 사이드 유효성 검증 후 저장
- **AI인터시스 브랜드**: 딥블루 `#1E40AF` · 스카이블루 `#60A5FA`, Pretendard 폰트

### 2) Claude Design 특강 사이트 — `src/app/(design)`

한 페이지 랜딩(`/design`)으로, **신청 접수는 이벤터스 행사 페이지에서 처리**합니다.

- 히어로·개요·교육 대상·목표·5부 커리큘럼·실습 프로젝트·교육 방식·기대 효과·
  90분 시간표·FAQ·신청 안내
- **신청 안내** (`#apply`): 행사 정보 카드 + **QR 코드** + 이벤터스 바로가기.
  QR 은 `EVENT.url` 값으로 서버에서 생성되므로 링크를 바꾸면 QR 도 함께 바뀝니다
- 사이트의 모든 "신청하기" 버튼(헤더·히어로·신청 안내·하단 CTA)이 행사 페이지로 연결
- **전용 브랜드**: 크림 `#F5F2EC` · 코랄 `#D97757` · 잉크 `#1F1E1D`

행사 링크와 일시·장소·참가비는 `src/lib/design-course.ts` 의 `EVENT` 객체에서 관리합니다.
`date` / `place` / `fee` / `deadline` 은 비어 있으면 화면에 표시되지 않습니다.

```ts
export const EVENT = {
  url: "https://event-us.kr/aiintersyslec/event/133127",
  date: "",      // 예: "2026년 9월 3일 (목) 19:00"
  place: "",     // 예: "온라인 (Zoom)"
  fee: "",       // 예: "무료"
  deadline: "",  // 예: "2026년 9월 1일 (화) 18:00"
};
```

> 메인 사이트만 자체 신청 폼과 접수 데이터(`applications`)를 갖습니다.

## 기술 스택

- Next.js 16 (App Router, 라우트 그룹 기반 다중 루트 레이아웃) · React 19 · TypeScript
- 저장 백엔드: Postgres (`DATABASE_URL`) 또는 JSON 파일 폴백
- 메일: Resend (`RESEND_API_KEY`), 미설정 시 발송 생략
- QR 생성: `qrcode` (서버에서 SVG 생성, 외부 요청 없음)

## 실행 방법

```bash
npm install
npm run dev        # 개발 서버 (http://localhost:3000)

npm run build && npm start   # 프로덕션
```

### 환경 변수

`.env.example` 를 참고해 `.env.local` 을 만드세요.

| 변수 | 설명 | 기본값 |
| --- | --- | --- |
| `ADMIN_PASSWORD` | 관리자 페이지/조회 API 비밀번호 | `aiintersys` |
| `DATABASE_URL` | Postgres 접속 문자열 (미설정 시 JSON 파일 저장) | — |
| `RESEND_API_KEY` | 접수 확인 메일 발송용 (미설정 시 발송 생략) | — |
| `MAIL_FROM` | 발신 주소 | Resend 기본 주소 |
| `ADMIN_EMAIL` | 신규 접수 알림 수신 주소 | — |

> 운영 환경에서는 `ADMIN_PASSWORD` 를 반드시 변경하세요.

### 특강 사이트를 별도 도메인으로 서비스하기

`/design` 을 `design.example.com` 같은 별도 도메인으로 노출하려면
Vercel 에서 해당 도메인을 프로젝트에 추가한 뒤 `next.config.mjs` 에 rewrite 를 두면 됩니다.

```js
async rewrites() {
  return [
    {
      source: "/:path*",
      has: [{ type: "host", value: "design.example.com" }],
      destination: "/design/:path*",
    },
  ];
}
```

## 콘텐츠 수정

- 메인 사이트 과정 목록: `src/lib/courses.ts`
- 특강 사이트 콘텐츠(커리큘럼·시간표·FAQ)와 행사 링크: `src/lib/design-course.ts`

## 과정 목록 수정

`src/lib/courses.ts` 의 `COURSES` 배열만 수정하면 홈 화면 카드와 신청 폼의
과정 선택지가 자동으로 반영됩니다.

## 데이터 저장에 관하여

접수 데이터는 `data/applications.json` 에 저장됩니다. 이 방식은 단일 서버 및
로컬/컨테이너 환경에서 잘 동작합니다.

**Vercel 등 서버리스 환경**에 배포할 경우 파일 시스템이 요청 간에 유지되지
않으므로, 다음 중 하나로 저장 계층을 교체하세요.

- 관리형 DB (Postgres, MySQL, SQLite+Turso 등)
- 서버리스 KV/DB (Vercel Postgres, Supabase, PlanetScale 등)

교체 지점은 `src/lib/store.ts` 한 곳으로 모아두었습니다.

## 프로젝트 구조

```
src/
  app/
    page.tsx              # 홈 (과정 소개 + 신청 폼)
    ApplicationForm.tsx   # 신청 폼 (클라이언트 컴포넌트)
    complete/page.tsx     # 접수 완료
    admin/page.tsx        # 관리자 접수 현황
    api/applications/route.ts  # 접수/조회 API
    layout.tsx, globals.css
  lib/
    courses.ts   # 과정 정의
    store.ts     # 저장 계층 (JSON 파일)
    validate.ts  # 서버 사이드 유효성 검증
data/
  applications.json  # 접수 데이터 (gitignore)
```

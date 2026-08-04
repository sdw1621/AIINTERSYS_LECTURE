# AI인터시스 교육과정 온라인 수강 신청 접수 사이트

AI인터시스(AIintersys) AX 교육과정의 **온라인 수강 신청**을 받는 웹사이트입니다.
방문자가 원하는 과정을 선택해 신청서를 제출하면 접수번호가 발급되고, 관리자는
접수 현황을 조회·다운로드할 수 있습니다.

## 주요 기능

- **과정 소개 + 신청 폼** (`/`): 개설 과정 카드와 수강 신청 폼을 한 페이지에 제공
- **접수 완료 페이지** (`/complete`): 접수번호 발급 및 안내
- **관리자 페이지** (`/admin`): 비밀번호로 보호된 접수 현황 조회 + CSV 다운로드
- **접수 API** (`/api/applications`): 서버 사이드 유효성 검증 후 저장
- **AI인터시스 브랜드** 적용: 딥블루 `#1E40AF` · 스카이블루 `#60A5FA`, Pretendard 폰트

## 기술 스택

- Next.js 16 (App Router) · React 19 · TypeScript
- 저장 백엔드: JSON 파일 스토어 (`data/applications.json`)

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

> 운영 환경에서는 `ADMIN_PASSWORD` 를 반드시 변경하세요.

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

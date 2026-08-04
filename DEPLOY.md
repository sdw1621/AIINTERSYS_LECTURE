# 배포 가이드 (Vercel)

이 프로젝트는 Vercel에 그대로 배포할 수 있습니다. 자동(MCP) 배포는 연결된 계정의
**프로젝트 생성 권한 제한**으로 막혀 있어, 아래 GitHub 연동 방식으로 진행하세요.
(권한이 있는 계정이라면 CLI `vercel --prod` 한 번으로도 됩니다.)

## 1. Vercel에 GitHub 저장소 Import

1. https://vercel.com/new 접속
2. **Import Git Repository** → `sdw1621/AIINTERSYS_LECTURE` 선택
3. Branch: `claude/online-application-site-6va9yw` (또는 병합 후 기본 브랜치)
4. Framework Preset: **Next.js** (자동 감지됨) → 그대로 두기
5. Build/Install 명령은 기본값 사용

## 2. 환경변수 설정 (Settings → Environment Variables)

| 변수 | 필수 | 설명 |
| --- | --- | --- |
| `DATABASE_URL` | 권장 | Postgres 연결 문자열. 미설정 시 파일 저장으로 폴백되며 **서버리스에서는 데이터가 보존되지 않습니다.** |
| `ADMIN_PASSWORD` | 권장 | 관리자 페이지 비밀번호 (기본값 `aiintersys` — 반드시 변경) |
| `RESEND_API_KEY` | 선택 | 설정 시 접수 확인 이메일 자동발송. 미설정 시 발송 생략 |
| `MAIL_FROM` | 선택 | 발신 주소. 도메인 인증 전에는 `onboarding@resend.dev` 사용 |
| `ADMIN_EMAIL` | 선택 | 신규 접수 알림을 받을 관리자 이메일 |

> 환경변수는 Production/Preview 모두에 추가하고, 변경 후 **Redeploy** 해야 반영됩니다.

## 3. Postgres 준비 (권장: Neon)

1. https://neon.tech 에서 무료 프로젝트 생성 (또는 Supabase / Vercel Postgres)
2. 연결 문자열 복사 → `DATABASE_URL` 에 설정
   - 예: `postgres://user:pass@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`
3. **테이블은 자동 생성됩니다** (`applications`). 앱이 첫 요청 시 `create table if not exists` 실행.

## 4. 이메일 준비 (Resend)

1. https://resend.com 가입 → API Key 발급 → `RESEND_API_KEY` 설정
2. 도메인 인증 전에는 `MAIL_FROM=AI인터시스 <onboarding@resend.dev>` 로도 발송 가능
3. 자체 도메인 발송을 원하면 Resend에서 도메인 인증 후 `MAIL_FROM` 을 해당 도메인 주소로 변경

## 5. 배포 후 확인

- `/` : 수강 신청 폼 제출 → 접수번호 발급 + 이메일 수신
- `/admin` : `ADMIN_PASSWORD` 로 로그인 → 접수 현황 조회 / CSV 다운로드

## (선택) Vercel CLI로 배포

권한이 있는 계정에서:

```bash
npm i -g vercel
vercel link          # 프로젝트 생성/연결
vercel env add DATABASE_URL production
vercel env add ADMIN_PASSWORD production
vercel env add RESEND_API_KEY production
vercel --prod
```

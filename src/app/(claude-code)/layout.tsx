import type { Metadata } from "next";
import Link from "next/link";
import { COURSE, EVENT } from "@/lib/claude-code-course";
import "../design.css";
import "../claude-code.css";

/* 「클로드 코드 순한맛」 전용 루트 레이아웃.
   design.css 의 디자인 시스템을 그대로 쓰되, body 의 cc 클래스로
   강조색만 바꿔 다른 과정과 구분합니다. */

export const metadata: Metadata = {
  title: `${COURSE.title} | ${COURSE.subtitle}`,
  description: COURSE.description,
  openGraph: {
    title: COURSE.title,
    description: COURSE.description,
    type: "website",
  },
};

export default function ClaudeCodeSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="dc cc">
        <header className="dc-header">
          <div className="dc-wrap inner">
            <Link href="/claude-code" className="dc-logo">
              <span className="mark" aria-hidden="true">
                CC
              </span>
              <span className="name">
                <b>{COURSE.title}</b>
                <span>{COURSE.subtitle}</span>
              </span>
            </Link>
            <nav className="dc-nav">
              <Link href="/claude-code#curriculum" className="hide-sm">
                커리큘럼
              </Link>
              <Link href="/claude-code#outputs" className="hide-sm">
                결과물
              </Link>
              <Link href="/claude-code#prepare" className="hide-sm">
                준비물
              </Link>
              <Link href="/claude-code#faq" className="hide-sm">
                FAQ
              </Link>
              {/* 행사 URL 이 없을 때는 버튼이 '신청 안내'를 대신하므로
                  같은 라벨이 두 번 보이지 않도록 링크를 숨깁니다. */}
              {EVENT.url && (
                <Link href="/claude-code#apply" className="hide-sm">
                  신청 안내
                </Link>
              )}
              {EVENT.url ? (
                <a
                  href={EVENT.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dc-btn-sm"
                >
                  신청하기
                </a>
              ) : (
                <Link href="/claude-code#apply" className="dc-btn-sm">
                  신청 안내
                </Link>
              )}
            </nav>
          </div>
        </header>

        {children}

        <footer className="dc-footer">
          <div className="dc-wrap inner">
            <span>
              © {new Date().getFullYear()} {COURSE.host} · {COURSE.title}
            </span>
            <span>
              <Link href="/design">Claude Design 특강</Link>
              {" · "}
              <Link href="/">AI인터시스 전체 교육과정</Link>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}

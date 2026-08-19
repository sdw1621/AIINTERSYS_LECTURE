import type { Metadata } from "next";
import Link from "next/link";
import { COURSE, EVENT } from "@/lib/design-course";
import "./design.css";

/* Claude Design 특강 전용 루트 레이아웃.
   메인 AI인터시스 사이트와 헤더·푸터·스타일을 공유하지 않는 독립 사이트입니다. */

export const metadata: Metadata = {
  title: `${COURSE.title} | Claude Design 특강`,
  description: COURSE.description,
  openGraph: {
    title: COURSE.title,
    description: COURSE.description,
    type: "website",
  },
};

export default function DesignSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="dc">
        <header className="dc-header">
          <div className="dc-wrap inner">
            <Link href="/design" className="dc-logo">
              <span className="mark" aria-hidden="true">
                CD
              </span>
              <span className="name">
                <b>Claude Design 특강</b>
                <span>AI 디자인 실무 90분</span>
              </span>
            </Link>
            <nav className="dc-nav">
              <Link href="/design#curriculum" className="hide-sm">
                커리큘럼
              </Link>
              <Link href="/design#timeline" className="hide-sm">
                시간표
              </Link>
              <Link href="/design#faq" className="hide-sm">
                FAQ
              </Link>
              <Link href="/design#apply" className="hide-sm">
                신청 안내
              </Link>
              <a
                href={EVENT.url}
                target="_blank"
                rel="noopener noreferrer"
                className="dc-btn-sm"
              >
                신청하기
              </a>
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
              <a href={EVENT.url} target="_blank" rel="noopener noreferrer">
                이벤터스에서 신청
              </a>
              {" · "}
              <Link href="/">AI인터시스 전체 교육과정</Link>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}

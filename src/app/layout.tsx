import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI인터시스 교육과정 수강 신청",
  description:
    "AI인터시스 AX 교육과정 온라인 수강 신청 접수 사이트. 원하는 과정을 선택하고 간편하게 신청하세요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <div className="container inner">
            <Link href="/" className="brand">
              <span className="dot" />
              AI인터시스
            </Link>
            <Link href="/admin" className="header-link">
              관리자
            </Link>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="container">
            © {new Date().getFullYear()} AI인터시스 (AIintersys) · 교육과정 수강
            신청 센터
          </div>
        </footer>
      </body>
    </html>
  );
}

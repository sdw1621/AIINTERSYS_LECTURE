import "../../globals.css";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CompletePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; course?: string }>;
}) {
  const { id, course } = await searchParams;

  return (
    <main>
      <section className="section">
        <div className="container" style={{ maxWidth: 560 }}>
          <div className="complete-card">
            <div className="check">✓</div>
            <h1>수강 신청이 접수되었습니다</h1>
            <p style={{ color: "var(--muted)", margin: "0 0 4px" }}>
              {course ? `‘${course}’ 과정 신청이 정상 접수되었습니다.` : "신청이 정상 접수되었습니다."}
            </p>
            {id && (
              <>
                <div className="receipt">접수번호 {id}</div>
                <p style={{ color: "var(--muted)", fontSize: 13 }}>
                  접수번호를 캡처하거나 메모해 두세요. 문의 시 필요합니다.
                </p>
              </>
            )}
            <p style={{ marginTop: 20, fontSize: 14 }}>
              접수 내용 확인 후 입력하신 이메일/연락처로 안내드리겠습니다.
            </p>
            <div style={{ marginTop: 24 }}>
              <Link href="/" className="btn secondary">
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

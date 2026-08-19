import Link from "next/link";
import { COURSE } from "@/lib/design-course";

export const dynamic = "force-dynamic";

export default async function DesignCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <main>
      <section className="dc-section">
        <div className="dc-wrap">
          <div className="dc-complete">
            <div className="tick" aria-hidden="true">
              ✓
            </div>
            <h1>신청이 접수되었습니다</h1>
            <p>‘{COURSE.title}’ 신청이 정상 접수되었습니다.</p>
            {id && (
              <>
                <div className="dc-receipt">접수번호 {id}</div>
                <p style={{ fontSize: 13 }}>
                  접수번호를 캡처하거나 메모해 두세요. 문의 시 필요합니다.
                </p>
              </>
            )}
            <p style={{ marginTop: 20 }}>
              입력하신 이메일로 접수 확인 메일을 보내드렸습니다. 세부 일정과
              준비 안내는 같은 주소로 다시 안내드립니다.
            </p>
            <div style={{ marginTop: 28 }}>
              <Link href="/design" className="dc-btn ghost">
                특강 소개로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

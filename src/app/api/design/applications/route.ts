import { NextRequest, NextResponse } from "next/server";
import { sendDesignApplicationEmails } from "@/lib/design-email";
import {
  createDesignApplication,
  readAllDesignApplications,
} from "@/lib/design-store";
import { validateDesignApplication } from "@/lib/design-validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_PASSWORD =
  process.env.DESIGN_ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD ?? "aiintersys";

// 특강 신청 접수
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "요청 형식이 올바르지 않습니다." },
      { status: 400 }
    );
  }

  const result = validateDesignApplication(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: "입력값을 확인해 주세요.", errors: result.errors },
      { status: 422 }
    );
  }

  const app = await createDesignApplication(result.value);

  // 접수 확인 메일은 실패해도 접수 자체는 성공 처리합니다.
  try {
    await sendDesignApplicationEmails(app);
  } catch (err) {
    console.error("[design/applications] 이메일 발송 중 오류:", err);
  }

  return NextResponse.json({ ok: true, id: app.id }, { status: 201 });
}

// 특강 사이트 관리자 조회
export async function GET(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, message: "인증이 필요합니다." },
      { status: 401 }
    );
  }

  const items = await readAllDesignApplications();
  items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json({ ok: true, count: items.length, items });
}

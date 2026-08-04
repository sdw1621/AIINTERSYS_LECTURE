import { NextRequest, NextResponse } from "next/server";
import { courseById } from "@/lib/courses";
import { createApplication, readAll } from "@/lib/store";
import { validateApplication } from "@/lib/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "aiintersys";

// 신청 접수
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

  const result = validateApplication(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: "입력값을 확인해 주세요.", errors: result.errors },
      { status: 422 }
    );
  }

  const course = courseById(result.value.courseId)!;
  const app = await createApplication(result.value, course.title);

  return NextResponse.json(
    { ok: true, id: app.id, courseTitle: app.courseTitle },
    { status: 201 }
  );
}

// 관리자 조회 (헤더의 비밀번호로 보호)
export async function GET(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, message: "인증이 필요합니다." },
      { status: 401 }
    );
  }

  const items = await readAll();
  items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json({ ok: true, count: items.length, items });
}

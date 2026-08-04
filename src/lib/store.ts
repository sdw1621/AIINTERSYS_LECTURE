import { promises as fs } from "fs";
import path from "path";
import postgres from "postgres";

export type Application = {
  id: string;
  courseId: string;
  courseTitle: string;
  name: string;
  phone: string;
  email: string;
  organization: string;
  motivation: string;
  createdAt: string; // ISO 8601
};

export type ApplicationInput = Omit<
  Application,
  "id" | "courseTitle" | "createdAt"
>;

function genId(now: Date): string {
  // 타임스탬프 + 랜덤 접미로 접수번호 생성 (예: 20260804-AB12CD)
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${y}${m}${d}-${rand}`;
}

/* ------------------------------------------------------------------ *
 * 저장 계층: DATABASE_URL 이 있으면 Postgres, 없으면 JSON 파일 폴백.
 * 교체 지점은 이 파일 한 곳으로 모아두었습니다.
 * ------------------------------------------------------------------ */

const DATABASE_URL = process.env.DATABASE_URL;

// ---------- Postgres 구현 ----------

let sqlClient: ReturnType<typeof postgres> | null = null;
let schemaReady: Promise<void> | null = null;

function getSql() {
  if (!sqlClient) {
    const url = DATABASE_URL!;
    const needsSsl = !/localhost|127\.0\.0\.1/.test(url);
    sqlClient = postgres(url, {
      prepare: false, // Supabase/pgbouncer 등 트랜잭션 풀러 호환
      ssl: needsSsl ? "require" : false,
      max: 3,
    });
  }
  return sqlClient;
}

async function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    const sql = getSql();
    schemaReady = sql`
      create table if not exists applications (
        id           text primary key,
        course_id    text        not null,
        course_title text        not null,
        name         text        not null,
        phone        text        not null,
        email        text        not null,
        organization text        not null default '',
        motivation   text        not null default '',
        created_at   timestamptz not null default now()
      )
    `.then(() => undefined);
  }
  return schemaReady;
}

type DbRow = {
  id: string;
  course_id: string;
  course_title: string;
  name: string;
  phone: string;
  email: string;
  organization: string;
  motivation: string;
  created_at: Date;
};

function rowToApp(r: DbRow): Application {
  return {
    id: r.id,
    courseId: r.course_id,
    courseTitle: r.course_title,
    name: r.name,
    phone: r.phone,
    email: r.email,
    organization: r.organization,
    motivation: r.motivation,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

async function dbReadAll(): Promise<Application[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    select * from applications order by created_at desc
  `) as unknown as DbRow[];
  return rows.map(rowToApp);
}

async function dbCreate(app: Application): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`
    insert into applications
      (id, course_id, course_title, name, phone, email, organization, motivation, created_at)
    values
      (${app.id}, ${app.courseId}, ${app.courseTitle}, ${app.name},
       ${app.phone}, ${app.email}, ${app.organization}, ${app.motivation}, ${app.createdAt})
  `;
}

// ---------- JSON 파일 폴백 구현 ----------

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "applications.json");

async function ensureFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
}

async function fileReadAll(): Promise<Application[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Application[]) : [];
  } catch {
    return [];
  }
}

async function fileCreate(app: Application): Promise<void> {
  const items = await fileReadAll();
  items.push(app);
  await ensureFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
}

// ---------- 공개 API ----------

export function storageMode(): "postgres" | "file" {
  return DATABASE_URL ? "postgres" : "file";
}

export async function readAll(): Promise<Application[]> {
  return DATABASE_URL ? dbReadAll() : fileReadAll();
}

export async function createApplication(
  input: ApplicationInput,
  courseTitle: string
): Promise<Application> {
  const now = new Date();
  const app: Application = {
    id: genId(now),
    courseId: input.courseId,
    courseTitle,
    name: input.name,
    phone: input.phone,
    email: input.email,
    organization: input.organization,
    motivation: input.motivation,
    createdAt: now.toISOString(),
  };

  if (DATABASE_URL) {
    await dbCreate(app);
  } else {
    await fileCreate(app);
  }
  return app;
}

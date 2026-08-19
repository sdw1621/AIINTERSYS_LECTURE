import { promises as fs } from "fs";
import path from "path";
import postgres from "postgres";

/* ------------------------------------------------------------------ *
 * Claude Design 특강 사이트 전용 신청 저장소.
 * 메인 교육과정 접수(lib/store.ts)와 테이블·파일을 분리해 두었습니다.
 * DATABASE_URL 이 있으면 Postgres, 없으면 JSON 파일로 폴백합니다.
 * ------------------------------------------------------------------ */

export type DesignApplication = {
  id: string;
  name: string;
  phone: string;
  email: string;
  organization: string;
  experience: string;
  goal: string;
  createdAt: string; // ISO 8601
};

export type DesignApplicationInput = Omit<
  DesignApplication,
  "id" | "createdAt"
>;

function genId(now: Date): string {
  // 접수번호 예시: CD-20260819-AB12CD
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CD-${y}${m}${d}-${rand}`;
}

const DATABASE_URL = process.env.DATABASE_URL;

// ---------- Postgres ----------

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
      create table if not exists design_applications (
        id           text primary key,
        name         text        not null,
        phone        text        not null,
        email        text        not null,
        organization text        not null default '',
        experience   text        not null default '',
        goal         text        not null default '',
        created_at   timestamptz not null default now()
      )
    `.then(() => undefined);
  }
  return schemaReady;
}

type DbRow = {
  id: string;
  name: string;
  phone: string;
  email: string;
  organization: string;
  experience: string;
  goal: string;
  created_at: Date;
};

function rowToApp(r: DbRow): DesignApplication {
  return {
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email,
    organization: r.organization,
    experience: r.experience,
    goal: r.goal,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

async function dbReadAll(): Promise<DesignApplication[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    select * from design_applications order by created_at desc
  `) as unknown as DbRow[];
  return rows.map(rowToApp);
}

async function dbCreate(app: DesignApplication): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`
    insert into design_applications
      (id, name, phone, email, organization, experience, goal, created_at)
    values
      (${app.id}, ${app.name}, ${app.phone}, ${app.email},
       ${app.organization}, ${app.experience}, ${app.goal}, ${app.createdAt})
  `;
}

// ---------- JSON 파일 폴백 ----------

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "design-applications.json");

async function ensureFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
}

async function fileReadAll(): Promise<DesignApplication[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DesignApplication[]) : [];
  } catch {
    return [];
  }
}

async function fileCreate(app: DesignApplication): Promise<void> {
  const items = await fileReadAll();
  items.push(app);
  await ensureFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
}

// ---------- 공개 API ----------

export function storageMode(): "postgres" | "file" {
  return DATABASE_URL ? "postgres" : "file";
}

export async function readAllDesignApplications(): Promise<DesignApplication[]> {
  return DATABASE_URL ? dbReadAll() : fileReadAll();
}

export async function createDesignApplication(
  input: DesignApplicationInput
): Promise<DesignApplication> {
  const now = new Date();
  const app: DesignApplication = { id: genId(now), ...input, createdAt: now.toISOString() };

  if (DATABASE_URL) {
    await dbCreate(app);
  } else {
    await fileCreate(app);
  }
  return app;
}

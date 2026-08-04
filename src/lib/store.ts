import { promises as fs } from "fs";
import path from "path";

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

export async function readAll(): Promise<Application[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Application[]) : [];
  } catch {
    return [];
  }
}

async function writeAll(items: Application[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
}

function genId(now: Date): string {
  // 타임스탬프 + 랜덤 접미로 접수번호 생성 (예: 20260804-AB12CD)
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${y}${m}${d}-${rand}`;
}

export async function createApplication(
  input: ApplicationInput,
  courseTitle: string
): Promise<Application> {
  const items = await readAll();
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
  items.push(app);
  await writeAll(items);
  return app;
}

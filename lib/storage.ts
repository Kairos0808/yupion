import { promises as fs } from "fs";
import path from "path";
import type { Brief } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "briefs");

export async function saveBrief(brief: Brief): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, `${brief.date}.json`);
  await fs.writeFile(file, JSON.stringify(brief, null, 2), "utf-8");
}

// 兼容两种日期格式: 紧凑 "20260712" 和连字符 "2026-07-12"
function toCompact(date: string): string {
  return date.replace(/-/g, "");
}
function toDashed(date: string): string {
  if (date.includes("-")) return date;
  // 20260712 -> 2026-07-12
  const m = date.match(/^(\d{4})(\d{2})(\d{2})$/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : date;
}

export async function getBrief(date: string): Promise<Brief | null> {
  try {
    const compact = toCompact(date);
    const dashed = toDashed(date);
    // 先试原样，再试两种规范化
    for (const d of new Set([date, compact, dashed])) {
      try {
        const file = path.join(DATA_DIR, `${d}.json`);
        const raw = await fs.readFile(file, "utf-8");
        return JSON.parse(raw) as Brief;
      } catch {
        // 继续试下一个
      }
    }
    return null;
  } catch {
    return null;
  }
}

export async function listBriefDates(): Promise<string[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const files = await fs.readdir(DATA_DIR);
    return files
      .filter((f) => f.endsWith(".json"))
      .map((f) => toDashed(f.replace(".json", "")))
      .sort()
      .reverse();
  } catch {
    return [];
  }
}

export async function getLatestBrief(): Promise<Brief | null> {
  const dates = await listBriefDates();
  if (dates.length === 0) return null;
  return getBrief(dates[0]);
}

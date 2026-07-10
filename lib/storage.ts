import { promises as fs } from "fs";
import path from "path";
import type { Brief } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "briefs");

export async function saveBrief(brief: Brief): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, `${brief.date}.json`);
  await fs.writeFile(file, JSON.stringify(brief, null, 2), "utf-8");
}

export async function getBrief(date: string): Promise<Brief | null> {
  try {
    const file = path.join(DATA_DIR, `${date}.json`);
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as Brief;
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
      .map((f) => f.replace(".json", ""))
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

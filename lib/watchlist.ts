import { promises as fs } from "fs";
import path from "path";

export interface WatchItem {
  symbol: string;
  name: string;
}

const FILE = path.join(process.cwd(), "data", "watchlist.json");

const DEFAULT: WatchItem[] = [
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "MSTR", name: "MicroStrategy" },
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "SMR", name: "NuScale" },
  { symbol: "GOOGL", name: "Alphabet" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "NOK", name: "Nokia" },
  { symbol: "SPY", name: "SPY" },
  { symbol: "JEPQ", name: "JEPQ" },
];

export async function getWatchlist(): Promise<WatchItem[]> {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    const list = JSON.parse(raw) as WatchItem[];
    return Array.isArray(list) && list.length > 0 ? list : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export async function addWatch(
  symbol: string,
  name?: string
): Promise<WatchItem[]> {
  const list = await getWatchlist();
  const sym = symbol.toUpperCase();
  if (list.some((w) => w.symbol === sym)) return list;
  list.push({ symbol: sym, name: name || sym });
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(list, null, 2), "utf-8");
  return list;
}

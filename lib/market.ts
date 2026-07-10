import type { MarketRow, MarketSnapshot } from "./types";

const INDICES: [string, string][] = [
  ["^GSPC", "S&P 500"],
  ["^IXIC", "NASDAQ"],
  ["^DJI", "Dow Jones"],
  ["^VIX", "VIX"],
];

const HOLDINGS: [string, string][] = [
  ["TSLA", "Tesla"],
  ["MSTR", "MicroStrategy"],
  ["NVDA", "NVIDIA"],
  ["SMR", "NuScale"],
  ["GOOGL", "Alphabet"],
  ["MSFT", "Microsoft"],
  ["NOK", "Nokia"],
  ["SPY", "SPY"],
  ["JEPQ", "JEPQ"],
];

interface YFRow {
  price: number;
  chg: number;
}

async function fetchYahoo(symbol: string): Promise<YFRow | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
      symbol
    )}?range=2d&interval=1d`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    const result = json?.chart?.result?.[0];
    if (!result) return null;
    const quotes = result.indicators?.quote?.[0];
    const closes: number[] = (quotes?.close || []).filter(
      (c: number | null) => c != null
    );
    if (closes.length < 2) return null;
    const curr = closes[closes.length - 1];
    const prev = closes[closes.length - 2];
    return { price: curr, chg: ((curr - prev) / prev) * 100 };
  } catch {
    return null;
  }
}

export async function getMarketSnapshot(): Promise<MarketSnapshot> {
  const fetchAll = async (
    list: [string, string][]
  ): Promise<MarketRow[]> => {
    const rows = await Promise.all(
      list.map(async ([sym, name]) => {
        const d = await fetchYahoo(sym);
        return {
          name,
          close: d ? Number(d.price.toFixed(2)) : 0,
          changePct: d ? Number(d.chg.toFixed(2)) : 0,
        };
      })
    );
    return rows;
  };

  const [indices, holdings] = await Promise.all([
    fetchAll(INDICES),
    fetchAll(HOLDINGS),
  ]);

  const btcRaw = await fetchYahoo("BTC-USD");
  const btc: MarketRow = {
    name: "Bitcoin",
    close: btcRaw ? Number(btcRaw.price.toFixed(2)) : 0,
    changePct: btcRaw ? Number(btcRaw.chg.toFixed(2)) : 0,
  };

  return {
    indices,
    holdings,
    btc,
    asOf: new Date().toISOString(),
  };
}

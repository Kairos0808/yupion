export interface MarketRow {
  name: string;
  close: number;
  changePct: number;
}

export interface MarketSnapshot {
  indices: MarketRow[];
  holdings: MarketRow[];
  btc: MarketRow;
  asOf: string; // ISO timestamp
}

export interface NewsItem {
  title: string;
  source: string;
  time: string;
  summary: string;
  analysis: string;
}

export interface Brief {
  date: string; // YYYY-MM-DD
  title: string;
  overview: string;
  market: MarketSnapshot;
  news: NewsItem[];
  summary: string;
}

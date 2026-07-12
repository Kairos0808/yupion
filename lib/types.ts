export interface Localized {
  en: string;
  zh: string;
}

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
  title: Localized;
  source: string;
  time: string;
  summary: Localized;
  analysis: Localized;
}

export interface Brief {
  date: string; // YYYY-MM-DD
  title: Localized;
  overview: Localized;
  market: MarketSnapshot;
  news: NewsItem[];
  summary: Localized;
}

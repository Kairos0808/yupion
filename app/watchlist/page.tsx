"use client";

import { useEffect, useState } from "react";
import { Shell } from "@/components/Layout";
import type { MarketSnapshot } from "@/lib/types";

export default function WatchlistPage() {
  const [holdings, setHoldings] = useState<MarketSnapshot["holdings"]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/market")
      .then((r) => r.json())
      .then((d: MarketSnapshot) => setHoldings(d.holdings))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Shell>
      <h1 className="text-2xl font-bold tracking-tight">关注</h1>
      {loading ? (
        <p className="mt-6 text-[var(--color-muted)]">加载中…</p>
      ) : (
        <section className="card mt-6">
          <table className="tbl">
            <thead>
              <tr>
                <th>标的</th>
                <th className="text-right">价格</th>
                <th className="text-right">涨跌</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td className="text-right tabular-nums">{r.close}</td>
                  <td
                    className={`text-right tabular-nums ${
                      r.changePct >= 0 ? "up" : "down"
                    }`}
                  >
                    {r.changePct >= 0 ? "+" : ""}
                    {r.changePct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      <p className="mt-4 text-xs text-[var(--color-muted)]">
        关注列表可在服务器配置中添加（data/watchlist.json）。
      </p>
    </Shell>
  );
}

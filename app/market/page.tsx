"use client";

import { useEffect, useState } from "react";
import { Shell } from "@/components/Layout";
import type { MarketSnapshot, MarketRow } from "@/lib/types";

export default function MarketPage() {
  const [data, setData] = useState<MarketSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/market")
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((d: MarketSnapshot) => setData(d))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Shell>
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold tracking-tight">行情看板</h1>
        <span className="chip">每 5 分钟刷新</span>
      </div>

      {loading && <p className="mt-6 text-[var(--color-muted)]">加载中…</p>}
      {error && <p className="mt-6 text-[var(--color-down)]">出错：{error}</p>}
      {data && (
        <div className="mt-6 space-y-6">
          <Section title="大盘指数" rows={data.indices} />
          <Section title="关注" rows={data.holdings} />
          <Section title="加密货币" rows={[data.btc]} />
          <p className="text-xs text-[var(--color-muted)]">
            数据来源：Yahoo Finance · 更新于{" "}
            {new Date(data.asOf).toLocaleString("zh-CN")}
          </p>
        </div>
      )}
    </Shell>
  );
}

function Section({ title, rows }: { title: string; rows: MarketRow[] }) {
  return (
    <section className="card">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
        {title}
      </h2>
      <table className="tbl">
        <thead>
          <tr>
            <th>标的</th>
            <th className="text-right">价格</th>
            <th className="text-right">涨跌</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
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
  );
}

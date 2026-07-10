"use client";

import { useEffect, useState } from "react";
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
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">行情看板</h1>
      <p className="mt-1 text-sm text-gray-500">
        <a href="/" className="underline">
          ← 返回首页
        </a>{" "}
        · 每 5 分钟刷新
      </p>

      {loading && <p className="mt-6 text-gray-500">加载中…</p>}
      {error && <p className="mt-6 text-red-600">出错：{error}</p>}
      {data && (
        <>
          <Section title="大盘指数" rows={data.indices} />
          <Section title="关注" rows={data.holdings} />
          <Section title="加密货币" rows={[data.btc]} />
          <p className="mt-6 text-xs text-gray-400">
            数据来源：Yahoo Finance · 更新于{" "}
            {new Date(data.asOf).toLocaleString("zh-CN")}
          </p>
        </>
      )}
    </main>
  );
}

function Section({ title, rows }: { title: string; rows: MarketRow[] }) {
  return (
    <section className="mt-6">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="py-1">标的</th>
            <th className="py-1 text-right">价格</th>
            <th className="py-1 text-right">涨跌</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="py-1">{r.name}</td>
              <td className="py-1 text-right">{r.close}</td>
              <td
                className={`py-1 text-right ${
                  r.changePct >= 0 ? "text-green-600" : "text-red-600"
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

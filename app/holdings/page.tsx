"use client";

import { useEffect, useState } from "react";
import type { MarketSnapshot } from "@/lib/types";

export default function HoldingsPage() {
  const [holdings, setHoldings] = useState<MarketSnapshot["holdings"]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/market")
      .then((r) => r.json())
      .then((d: MarketSnapshot) => setHoldings(d.holdings))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">持仓追踪</h1>
      <p className="mt-1 text-sm text-gray-500">
        <a href="/" className="underline">
          ← 返回首页
        </a>
      </p>
      {loading ? (
        <p className="mt-6 text-gray-500">加载中…</p>
      ) : (
        <table className="mt-6 w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-1">标的</th>
              <th className="py-1 text-right">价格</th>
              <th className="py-1 text-right">涨跌</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((r, i) => (
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
      )}
    </main>
  );
}

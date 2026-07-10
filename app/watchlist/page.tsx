"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Shell } from "@/components/Layout";
import { parseLang, t, type Lang } from "@/lib/i18n";
import type { MarketSnapshot } from "@/lib/types";

function WatchlistInner() {
  const params = useSearchParams();
  const lang = parseLang(params.get("lang") ?? undefined);
  const [holdings, setHoldings] = useState<MarketSnapshot["holdings"]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/market")
      .then((r) => r.json())
      .then((d: MarketSnapshot) => setHoldings(d.holdings))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Shell lang={lang}>
      <h1 className="text-2xl font-bold tracking-tight">{t(lang, "watchlist")}</h1>
      {loading ? (
        <p className="mt-6 text-[var(--color-muted)]">{t(lang, "loading")}</p>
      ) : (
        <section className="card mt-6">
          <table className="tbl">
            <thead>
              <tr>
                <th>{t(lang, "colName")}</th>
                <th className="text-right">{t(lang, "colClose")}</th>
                <th className="text-right">{t(lang, "colChg")}</th>
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
      <p className="mt-4 text-xs text-[var(--color-muted)]">{t(lang, "wlNote")}</p>
    </Shell>
  );
}

export default function WatchlistPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[var(--color-muted)]">…</div>}>
      <WatchlistInner />
    </Suspense>
  );
}

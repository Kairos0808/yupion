"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Shell } from "@/components/Layout";
import { parseLang, t, type Lang } from "@/lib/i18n";
import type { MarketSnapshot, MarketRow } from "@/lib/types";

export default function MarketPage() {
  const params = useSearchParams();
  const lang = parseLang(params.get("lang") ?? undefined);
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
    <Shell lang={lang}>
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t(lang, "marketBoard")}</h1>
        <span className="chip">{t(lang, "refresh5")}</span>
      </div>

      {loading && <p className="mt-6 text-[var(--color-muted)]">{t(lang, "loading")}</p>}
      {error && <p className="mt-6 text-[var(--color-down)]">{t(lang, "error")} {error}</p>}
      {data && (
        <div className="mt-6 space-y-6">
          <Section lang={lang} titleKey="secIndices" rows={data.indices} />
          <Section lang={lang} titleKey="secHoldings" rows={data.holdings} />
          <Section lang={lang} titleKey="secCrypto" rows={[data.btc]} />
          <p className="text-xs text-[var(--color-muted)]">
            {t(lang, "asOf")} {new Date(data.asOf).toLocaleString(lang === "zh" ? "zh-CN" : "en-US")}
          </p>
        </div>
      )}
    </Shell>
  );
}

function Section({
  lang,
  titleKey,
  rows,
}: {
  lang: Lang;
  titleKey: "secIndices" | "secHoldings" | "secCrypto";
  rows: MarketRow[];
}) {
  return (
    <section className="card">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
        {t(lang, titleKey)}
      </h2>
      <table className="tbl">
        <thead>
          <tr>
            <th>{t(lang, "colName")}</th>
            <th className="text-right">{t(lang, "colClose")}</th>
            <th className="text-right">{t(lang, "colChg")}</th>
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

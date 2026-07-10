import Link from "next/link";
import { Shell } from "@/components/Layout";
import { getLatestBrief } from "@/lib/storage";
import { parseLang, t, tpl, type Lang } from "@/lib/i18n";
import type { MarketRow } from "@/lib/types";

export const revalidate = 600;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: raw } = await searchParams;
  const lang = parseLang(raw);
  const brief = await getLatestBrief();

  return (
    <Shell lang={lang}>
      <section className="space-y-6 text-center">
        <div className="space-y-4">
          <span className="chip">{t(lang, "heroKicker")}</span>
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {t(lang, "heroTitle")}
          </h1>
          <p className="mx-auto max-w-xl text-sm text-[var(--color-muted)]">
            {t(lang, "heroDesc")}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <a
              href={`/briefs?lang=${lang}`}
              className="rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              {t(lang, "btnBriefs")}
            </a>
            <a
              href={`/market?lang=${lang}`}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-2 text-sm font-medium transition hover:border-[var(--color-accent)]"
            >
              {t(lang, "btnMarket")}
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.png" alt="hero" className="w-full" />
        </div>
      </section>

      <div className="my-8 h-px bg-[var(--color-border)]" />

      {!brief ? (
        <p className="text-center text-[var(--color-muted)]">{t(lang, "noBrief")}</p>
      ) : (
        <article className="space-y-6 text-center">
          <div>
            <span className="chip">
              {t(lang, "latestBrief")} · {brief.date}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">
              {brief.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left text-sm text-[var(--color-fg)]/90">
              {brief.overview}
            </p>
          </div>

          <section className="card text-left">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              {t(lang, "marketReview")}
            </h3>
            <MarketTable brief={brief} />
          </section>

          <section className="space-y-4 text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              {t(lang, "news")}
            </h3>
            {brief.news.map((n, i) => (
              <article key={i} className="card space-y-2">
                <h4 className="font-medium">
                  {i + 1}. {n.title}
                </h4>
                <p className="text-xs text-[var(--color-muted)]">
                  {n.source} · {n.time}
                </p>
                <p className="text-sm text-[var(--color-fg)]/90">{n.summary}</p>
                <p className="text-sm text-[var(--color-muted)]">{n.analysis}</p>
              </article>
            ))}
          </section>

          <section className="card text-left">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              {t(lang, "summary")}
            </h3>
            <p className="text-sm text-[var(--color-fg)]/90">{brief.summary}</p>
          </section>
        </article>
      )}
    </Shell>
  );
}

function MarketTable({ brief }: { brief: import("@/lib/types").Brief }) {
  const rows: MarketRow[] = [
    ...brief.market.indices,
    ...brief.market.holdings,
    brief.market.btc,
  ];
  return (
    <table className="tbl">
      <thead>
        <tr>
          <th>{t("en", "colName")}</th>
          <th className="text-right">{t("en", "colClose")}</th>
          <th className="text-right">{t("en", "colChg")}</th>
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
  );
}

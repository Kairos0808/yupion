import Link from "next/link";
import { Shell } from "@/components/Layout";
import { getBrief } from "@/lib/storage";
import { parseLang, t, type Lang } from "@/lib/i18n";
import type { MarketRow } from "@/lib/types";

export const revalidate = 600;

export default async function BriefDetail({
  params,
  searchParams,
}: {
  params: Promise<{ date: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { date } = await params;
  const { lang: raw } = await searchParams;
  const lang = parseLang(raw);
  const brief = await getBrief(date);

  if (!brief) {
    return (
      <Shell lang={lang}>
        <p className="text-[var(--color-muted)]">
          {t(lang, "notFound")} {date}。
        </p>
        <Link href={`/briefs?lang=${lang}`} className="mt-4 inline-block nav-link">
          {t(lang, "backToArchives")}
        </Link>
      </Shell>
    );
  }

  const rows: MarketRow[] = [
    ...brief.market.indices,
    ...brief.market.holdings,
    brief.market.btc,
  ];

  return (
    <Shell lang={lang}>
      <Link href={`/briefs?lang=${lang}`} className="nav-link">
        {t(lang, "backToArchives")}
      </Link>
      <article className="mt-4 space-y-6">
        <div>
          <span className="chip">
            {t(lang, "latestBrief")} · {brief.date}
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">
            {brief.title}
          </h1>
          <p className="mt-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm">
            {brief.overview}
          </p>
        </div>

        <section className="card">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            {t(lang, "marketReview")}
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

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            {t(lang, "news")}
          </h2>
          {brief.news.map((n, i) => (
            <article key={i} className="card space-y-2">
              <h3 className="font-medium">
                {i + 1}. {n.title}
              </h3>
              <p className="text-xs text-[var(--color-muted)]">
                {n.source} · {n.time}
              </p>
              <p className="text-sm text-[var(--color-fg)]/90">{n.summary}</p>
              <p className="text-sm text-[var(--color-muted)]">{n.analysis}</p>
            </article>
          ))}
        </section>

        <section className="card">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            {t(lang, "summary")}
          </h2>
          <p className="text-sm text-[var(--color-fg)]/90">{brief.summary}</p>
        </section>
      </article>
    </Shell>
  );
}

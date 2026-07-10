import Link from "next/link";
import { Shell } from "@/components/Layout";
import { getBrief } from "@/lib/storage";
import type { MarketRow } from "@/lib/types";

export const revalidate = 600;

export default async function BriefDetail({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const brief = await getBrief(date);

  if (!brief) {
    return (
      <Shell>
        <p className="text-[var(--color-muted)]">未找到 {date} 的早报。</p>
        <Link href="/briefs" className="mt-4 inline-block nav-link">
          ← 返回归档
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
    <Shell>
      <Link href="/briefs" className="nav-link">
        ← 返回归档
      </Link>
      <article className="mt-4 space-y-6">
        <div>
          <span className="chip">{brief.date}</span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">
            {brief.title}
          </h1>
          <p className="mt-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm">
            {brief.overview}
          </p>
        </div>

        <section className="card">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            市场回顾
          </h2>
          <table className="tbl">
            <thead>
              <tr>
                <th>标的</th>
                <th className="text-right">收盘</th>
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

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            新闻
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
            总结
          </h2>
          <p className="text-sm text-[var(--color-fg)]/90">{brief.summary}</p>
        </section>
      </article>
    </Shell>
  );
}

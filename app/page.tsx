import Link from "next/link";
import { Shell } from "@/components/Layout";
import { getLatestBrief } from "@/lib/storage";
import type { MarketRow } from "@/lib/types";

export const revalidate = 600;

export default async function HomePage() {
  const brief = await getLatestBrief();

  return (
    <Shell>
      <section className="space-y-6">
        <div className="space-y-4">
          <span className="chip">Fintech · 每日早报</span>
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            金融科技早报
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            每日 fintech 新闻摘要、原创分析与美股 / 加密市场快照，由 Hermes Agent 自动生成。
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="/briefs"
              className="rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              浏览早报
            </a>
            <a
              href="/market"
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-2 text-sm font-medium transition hover:border-[var(--color-accent)]"
            >
              实时行情
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero.png"
            alt="hero"
            className="w-full"
          />
        </div>
      </section>

      <div className="my-8 h-px bg-[var(--color-border)]" />

      {!brief ? (
        <p className="text-[var(--color-muted)]">暂无早报。等待下次推送…</p>
      ) : (
        <article className="space-y-6">
          <div>
            <span className="chip">最新早报 · {brief.date}</span>
            <h1 className="mt-3 text-2xl font-bold tracking-tight">
              {brief.title}
            </h1>
            <p className="mt-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-fg)]/90">
              {brief.overview}
            </p>
          </div>

          <section className="card">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              市场回顾
            </h2>
            <MarketTable brief={brief} />
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              新闻
            </h2>
            {brief.news.map((n, i) => (
              <article
                key={i}
                className="card space-y-2"
              >
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
  );
}

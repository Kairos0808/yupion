import Link from "next/link";
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
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-gray-500">未找到 {date} 的早报。</p>
        <Link href="/briefs" className="mt-4 inline-block underline">
          ← 返回归档
        </Link>
      </main>
    );
  }

  const rows: MarketRow[] = [
    ...brief.market.indices,
    ...brief.market.holdings,
    brief.market.btc,
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/briefs" className="text-sm underline">
        ← 返回归档
      </Link>
      <h1 className="mt-3 text-2xl font-bold">{brief.title}</h1>
      <p className="mt-2 rounded bg-gray-100 p-3 text-sm">{brief.overview}</p>

      <section className="mt-6">
        <h3 className="mb-2 font-semibold">市场回顾</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-1">标的</th>
              <th className="py-1 text-right">收盘</th>
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

      <section className="mt-6 space-y-6">
        <h3 className="font-semibold">新闻</h3>
        {brief.news.map((n, i) => (
          <div key={i} className="border-t pt-4">
            <h4 className="font-medium">
              {i + 1}. {n.title}
            </h4>
            <p className="mt-1 text-xs text-gray-500">
              {n.source} · {n.time}
            </p>
            <p className="mt-2 text-sm">{n.summary}</p>
            <p className="mt-2 text-sm text-gray-700">{n.analysis}</p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h3 className="font-semibold">总结</h3>
        <p className="mt-2 text-sm">{brief.summary}</p>
      </section>

      <footer className="mt-10 border-t pt-4 text-xs text-gray-400">
        数据来源：Yahoo Finance。本早報僅供參考，不構成任何投資建議。
      </footer>
    </main>
  );
}

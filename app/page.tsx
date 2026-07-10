import Link from "next/link";
import { getLatestBrief } from "@/lib/storage";

export const revalidate = 600;

export default async function HomePage() {
  const brief = await getLatestBrief();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">金融科技早报</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fintech News & Market Brief — by Kairos
        </p>
        <nav className="mt-3 flex gap-4 text-sm">
          <Link href="/briefs" className="underline">
            早报归档
          </Link>
          <Link href="/market" className="underline">
            行情看板
          </Link>
          <Link href="/watchlist" className="underline">
            关注
          </Link>
          <Link href="/about" className="underline">
            关于
          </Link>
        </nav>
      </header>

      {!brief ? (
        <p className="text-gray-500">暂无早报。等待 Hermes 推送…</p>
      ) : (
        <article>
          <h2 className="text-xl font-semibold">{brief.title}</h2>
          <p className="mt-2 rounded bg-gray-100 p-3 text-sm">{brief.overview}</p>

          <section className="mt-6">
            <h3 className="mb-2 font-semibold">市场回顾</h3>
            <MarketTable brief={brief} />
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
        </article>
      )}

      <footer className="mt-10 border-t pt-4 text-xs text-gray-400">
        数据来源：Yahoo Finance。本站地址 blog.yupion.com，内容僅供參考，不構成任何投資建議。
      </footer>
    </main>
  );
}

function MarketTable({ brief }: { brief: import("@/lib/types").Brief }) {
  const rows = [
    ...brief.market.indices,
    ...brief.market.holdings,
    brief.market.btc,
  ];
  return (
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
  );
}

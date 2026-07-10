import Link from "next/link";
import { listBriefDates, getBrief } from "@/lib/storage";

export const revalidate = 600;

export default async function BriefsPage() {
  const dates = await listBriefDates();
  const briefs = await Promise.all(dates.map((d) => getBrief(d)));

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">早报归档</h1>
      <p className="mt-1 text-sm text-gray-500">
        <Link href="/" className="underline">
          ← 返回首页
        </Link>
      </p>
      <ul className="mt-6 space-y-3">
        {briefs.map(
          (b) =>
            b && (
              <li key={b.date} className="border-t pt-3">
                <Link href={`/briefs/${b.date}`} className="font-medium underline">
                  {b.title}
                </Link>
                <p className="mt-1 text-xs text-gray-500">{b.overview}</p>
              </li>
            )
        )}
        {briefs.length === 0 && (
          <li className="text-gray-500">暂无归档。</li>
        )}
      </ul>
    </main>
  );
}

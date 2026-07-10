import Link from "next/link";
import { Shell } from "@/components/Layout";
import { listBriefDates, getBrief } from "@/lib/storage";

export const revalidate = 600;

export default async function BriefsPage() {
  const dates = await listBriefDates();
  const briefs = await Promise.all(dates.map((d) => getBrief(d)));

  return (
    <Shell>
      <h1 className="text-2xl font-bold tracking-tight">早报归档</h1>
      <ul className="mt-6 space-y-3">
        {briefs.map(
          (b) =>
            b && (
              <li key={b.date}>
                <Link
                  href={`/briefs/${b.date}`}
                  className="card block transition hover:border-[var(--color-accent)]"
                >
                  <span className="chip mb-2">{b.date}</span>
                  <h2 className="font-medium">{b.title}</h2>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {b.overview}
                  </p>
                </Link>
              </li>
            )
        )}
        {briefs.length === 0 && (
          <li className="text-[var(--color-muted)]">暂无归档。</li>
        )}
      </ul>
    </Shell>
  );
}

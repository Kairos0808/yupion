import Link from "next/link";
import { Shell } from "@/components/Layout";
import { listBriefDates, getBrief } from "@/lib/storage";
import { parseLang, t, pick, type Lang } from "@/lib/i18n";

export const revalidate = 600;

export default async function BriefsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: raw } = await searchParams;
  const lang = parseLang(raw);
  const dates = await listBriefDates();
  const briefs = await Promise.all(dates.map((d) => getBrief(d)));

  return (
    <Shell lang={lang}>
      <h1 className="text-2xl font-bold tracking-tight">{t(lang, "archives")}</h1>
      <ul className="mt-6 space-y-3">
        {briefs.map(
          (b) =>
            b && (
              <li key={b.date}>
                <Link
                  href={`/briefs/${b.date}?lang=${lang}`}
                  className="card block transition hover:border-[var(--color-accent)]"
                >
                  <span className="chip mb-2">{b.date}</span>
                  <h2 className="font-medium">{pick(b.title, lang)}</h2>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {pick(b.overview, lang)}
                  </p>
                </Link>
              </li>
            )
        )}
        {briefs.length === 0 && (
          <li className="text-[var(--color-muted)]">{t(lang, "noBrief")}</li>
        )}
      </ul>
    </Shell>
  );
}

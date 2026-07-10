import { Shell } from "@/components/Layout";
import { parseLang, t, type Lang } from "@/lib/i18n";

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: raw } = await searchParams;
  const lang = parseLang(raw);

  return (
    <Shell lang={lang}>
      <h1 className="text-2xl font-bold tracking-tight">{t(lang, "aboutTitle")}</h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed">
        <p className="text-[var(--color-fg)]/90">{t(lang, "aboutIntro")}</p>

        <section className="card space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            {t(lang, "policyTitle")}
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-[var(--color-fg)]/90">
            <li>{t(lang, "policy1")}</li>
            <li>{t(lang, "policy2")}</li>
            <li>{t(lang, "policy3")}</li>
          </ul>
        </section>

        <section className="card space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            {t(lang, "disclaimerTitle")}
          </h2>
          <p className="text-[var(--color-fg)]/90">{t(lang, "disclaimer")}</p>
        </section>

        <section className="card space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            {t(lang, "techTitle")}
          </h2>
          <p className="text-[var(--color-fg)]/90">{t(lang, "tech")}</p>
        </section>
      </div>
    </Shell>
  );
}

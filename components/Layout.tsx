import Link from "next/link";
import { t, tpl, type Lang } from "@/lib/i18n";

const NAV: { href: string; key: keyof typeof navKeys }[] = [
  { href: "/", key: "navHome" },
  { href: "/briefs", key: "navBriefs" },
  { href: "/market", key: "navMarket" },
  { href: "/watchlist", key: "navWatch" },
  { href: "/about", key: "navAbout" },
];

// map nav keys without importing the whole dict type twice
const navKeys = {
  navHome: true,
  navBriefs: true,
  navMarket: true,
  navWatch: true,
  navAbout: true,
} as const;

export function SiteHeader({ lang }: { lang: Lang }) {
  const alt = lang === "en" ? "zh" : "en";
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[var(--color-surface)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <Link href={`/?lang=${lang}`} className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[var(--color-surface-2)] ring-1 ring-[var(--color-border)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpg"
              alt="logo"
              className="h-7 w-7 rounded-md object-cover"
            />
          </span>
          <span className="text-base font-semibold tracking-tight">
            {t(lang, "siteName")}
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          {NAV.map((n) => (
            <Link key={n.href} href={`${n.href}?lang=${lang}`} className="nav-link">
              {t(lang, n.key)}
            </Link>
          ))}
          <Link
            href={`?lang=${alt}`}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1 text-xs font-medium transition hover:border-[var(--color-accent)]"
            aria-label="switch language"
          >
            {lang === "en" ? t(lang, "langZh") : t(lang, "langEn")}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)] py-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 text-xs text-[var(--color-muted)]">
        <p>{tpl(lang, "footerNote", {})}</p>
        <p>{tpl(lang, "footerCopy", { y: year })}</p>
      </div>
    </footer>
  );
}

export function Shell({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Lang;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader lang={lang} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}

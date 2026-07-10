import Link from "next/link";

const NAV = [
  { href: "/", label: "首页" },
  { href: "/briefs", label: "早报归档" },
  { href: "/market", label: "行情" },
  { href: "/watchlist", label: "关注" },
  { href: "/about", label: "关于" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[var(--color-surface)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[var(--color-surface-2)] ring-1 ring-[var(--color-border)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpg"
              alt="logo"
              className="h-7 w-7 rounded-md object-cover"
            />
          </span>
          <span className="text-base font-semibold tracking-tight">
            金融科技早报
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="nav-link">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)] py-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 text-xs text-[var(--color-muted)]">
        <p>
          数据来源：Yahoo Finance。本站地址 blog.yupion.com，内容仅供参考，不构成任何投资建议。
        </p>
        <p>© {new Date().getFullYear()} Kairos · Fintech Brief</p>
      </div>
    </footer>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

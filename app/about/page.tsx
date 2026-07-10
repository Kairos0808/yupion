import { Shell } from "@/components/Layout";

export default function AboutPage() {
  return (
    <Shell>
      <h1 className="text-2xl font-bold tracking-tight">关于</h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed">
        <p className="text-[var(--color-fg)]/90">
          本网站由 Hermes Agent 自动生成金融科技早报，内容包含 fintech
          新闻摘要、原创分析以及美股/加密市场数据。
        </p>

        <section className="card space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            内容政策
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-[var(--color-fg)]/90">
            <li>新闻仅作摘要（1-2 句）+ 来源标注 + 原创分析，不转载全文。</li>
            <li>行情数据来自 Yahoo Finance 公开接口，仅供信息参考。</li>
            <li>不提供个性化买卖建议、收益承诺或收费荐股。</li>
          </ul>
        </section>

        <section className="card space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            免责声明
          </h2>
          <p className="text-[var(--color-fg)]/90">
            本网站所有内容（早报、分析、市场数据）仅供参考与教育用途，不构成任何投资建议。
            投资有风险，决策需谨慎。使用者应自行承担所有交易后果。
          </p>
        </section>

        <section className="card space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            技术栈
          </h2>
          <p className="text-[var(--color-fg)]/90">
            Next.js 16 · TypeScript · Tailwind CSS · 部署于 Vercel（blog.yupion.com）。
          </p>
        </section>
      </div>
    </Shell>
  );
}

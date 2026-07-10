export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">关于</h1>
      <p className="mt-1 text-sm text-gray-500">
        <a href="/" className="underline">
          ← 返回首页
        </a>
      </p>

      <section className="mt-6 space-y-4 text-sm leading-relaxed">
        <p>
          本网站由 Hermes Agent 自动生成金融科技早报，内容包含 fintech
          新闻摘要、原创分析以及美股/加密市场数据。
        </p>

        <h3 className="font-semibold">内容政策</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>新闻仅作摘要（1-2 句）+ 来源标注 + 原创分析，不转载全文。</li>
          <li>行情数据来自 Yahoo Finance 公开接口，仅供信息参考。</li>
          <li>不提供个性化买卖建议、收益承诺或收费荐股。</li>
        </ul>

        <h3 className="font-semibold">免责声明</h3>
        <p className="rounded bg-gray-100 p-3 text-gray-700">
          本网站所有内容（早报、分析、市场数据）仅供参考与教育用途，不构成任何投资建议。
          投资有风险，决策需谨慎。使用者应自行承担所有交易后果。
        </p>

        <h3 className="font-semibold">技术栈</h3>
        <p>Next.js 16 · TypeScript · Tailwind CSS · 部署于 Vercel。</p>
      </section>

      <footer className="mt-10 border-t pt-4 text-xs text-gray-400">
        数据来源：Yahoo Finance。本站地址 blog.yupion.com，内容僅供參考，不構成任何投資建議。
      </footer>
    </main>
  );
}

"use client";

import { usePortfolioLang } from "@/components/portfolio/PortfolioLangProvider";
import { T } from "@/lib/portfolio-translations";

export function PfPhilosophy() {
  const { lang } = usePortfolioLang();

  return (
    <section className="relative isolate overflow-hidden bg-pf-ink py-24 md:py-36 lg:py-44">
      {/* ── multi-layer texture ── */}
      <div className="absolute inset-0 pf-bg-noise opacity-20" />

      {/* ── large decorative quotation marks ── */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-8 start-6 select-none font-display text-[clamp(8rem,20vw,14rem)] leading-none text-pf-gold/8"
      >
        {lang === "fa" ? "«" : "\u201C"}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 end-6 select-none font-display text-[clamp(8rem,20vw,14rem)] leading-none text-pf-gold/8"
      >
        {lang === "fa" ? "»" : "\u201D"}
      </span>

      {/* ── horizontal rule accent ── */}
      <div className="reveal mx-auto mb-12 flex max-w-3xl items-center gap-6 px-6">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-pf-gold/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-pf-gold/50" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-pf-gold/30" />
      </div>

      {/* ── quote ── */}
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <blockquote
          className="reveal font-display text-[clamp(1.6rem,4.5vw,3rem)] leading-[1.45] text-pf-cream"
          style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
        >
          {T("quote", lang)}
        </blockquote>

        {/* attribution */}
        <div
          className="reveal mt-10 flex flex-col items-center gap-3"
          style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-pf-gold/35" />
            <cite className="not-italic text-sm tracking-[0.22em] text-pf-cream/60">
              {lang === "fa" ? "راضیه خیری‌پور" : "Razieh Kheiripour"}
            </cite>
            <span className="h-px w-12 bg-pf-gold/35" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-pf-gold/50">
            {lang === "fa" ? "طراح · استادیار" : "Designer · Assistant Professor"}
          </p>
        </div>
      </div>

      {/* ── philosophy pillars ── */}
      <div
        className="reveal mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/5 sm:grid-cols-3 px-6 md:px-0"
        style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
      >
        {[
          {
            title: { fa: "ریشه", en: "Rooted" },
            desc: { fa: "پیوند با هنر سنتی ایران", en: "Connected to traditional Iranian art" },
            num: "I",
          },
          {
            title: { fa: "گفتگو", en: "Dialogue" },
            desc: { fa: "در تعامل با دنیای مدرن", en: "In conversation with the modern world" },
            num: "II",
          },
          {
            title: { fa: "ماندگاری", en: "Lasting" },
            desc: { fa: "آثاری که از زمان فراتر می‌روند", en: "Works that transcend time" },
            num: "III",
          },
        ].map((p) => (
          <div
            key={p.num}
            className="flex flex-col items-center gap-3 bg-pf-ink/60 px-8 py-8 text-center backdrop-blur-sm"
          >
            <span className="font-display text-xs tracking-[0.3em] text-pf-gold/40">{p.num}</span>
            <h3 className="font-display text-xl text-pf-cream">{p.title[lang]}</h3>
            <p className="text-xs text-pf-stone/55 leading-relaxed">{p.desc[lang]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

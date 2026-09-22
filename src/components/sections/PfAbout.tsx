"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePortfolioLang } from "@/components/portfolio/PortfolioLangProvider";
import { T } from "@/lib/portfolio-translations";

const STATS = [
  ["stat1Val", "stat1Label"],
  ["stat2Val", "stat2Label"],
  ["stat3Val", "stat3Label"],
] as const;

function AnimatedCounter({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export function PfAbout() {
  const { lang } = usePortfolioLang();

  return (
    <section id="about" className="relative bg-pf-cream overflow-hidden">
      {/* ── decorative large letter ── */}
      <span
        aria-hidden
        className="pointer-events-none absolute -end-8 top-1/2 -translate-y-1/2 select-none font-display text-[clamp(14rem,28vw,22rem)] leading-none text-pf-terracotta/5"
      >
        {lang === "fa" ? "ر" : "R"}
      </span>

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">

          {/* ── image column ── */}
          <div className="reveal lg:col-span-5">
            <div className="relative">
              {/* stacked offset frames */}
              <div className="absolute -bottom-6 -end-6 h-full w-full rounded-2xl border border-pf-terracotta/20" />
              <div className="absolute -bottom-3 -end-3 h-full w-full rounded-2xl border border-pf-terracotta/10" />

              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/images/hero/hero-back.webp"
                  alt={lang === "fa" ? "پرتره راضیه خیری‌پور" : "Razieh Kheiripour portrait"}
                  fill
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  quality={90}
                  className="object-cover object-top grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                />
                {/* bottom caption overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-pf-ink/80 via-pf-ink/20 to-transparent p-6">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-pf-gold/80 mb-1">
                    {lang === "fa" ? "استادیار · دانشگاه هنر" : "Assistant Prof · University of Art"}
                  </p>
                  <p className="font-display text-lg text-white">
                    {lang === "fa" ? "راضیه خیری‌پور" : "Razieh Kheiripour"}
                  </p>
                </div>
              </div>

              {/* experience badge */}
              <div className="absolute -top-4 -start-4 rounded-2xl bg-pf-terracotta px-4 py-3 shadow-xl">
                <p className="text-[10px] uppercase tracking-[0.15em] text-pf-cream/70 mb-0.5">
                  {lang === "fa" ? "تجربه" : "Experience"}
                </p>
                <p className="font-display text-xl text-pf-cream leading-none">{T("experience", lang)}</p>
              </div>
            </div>
          </div>

          {/* ── text column ── */}
          <div
            className="reveal flex flex-col justify-center lg:col-span-7"
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            {/* label */}
            <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-pf-terracotta">
              {T("aboutLabel", lang)}
            </p>

            {/* heading */}
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.75rem)] leading-tight text-pf-charcoal mb-8">
              {T("aboutTitle", lang)}
            </h2>

            {/* bio paragraphs */}
            <div className="space-y-5 text-pf-charcoal/70 leading-loose">
              <p>{T("aboutBio1", lang)}</p>
              <p>{T("aboutBio2", lang)}</p>
              <p>{T("aboutBio3", lang)}</p>
            </div>

            {/* ── animated stats ── */}
            <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-pf-terracotta/15 bg-pf-terracotta/10">
              {STATS.map(([val, label], i) => {
                const raw = T(val, "en").replace(/[^0-9]/g, "");
                const num = parseInt(raw, 10) || 0;
                const prefix = T(val, lang).replace(/[0-9]/g, "").replace(/\+/g, "");
                const hasPlus = T(val, lang).includes("+");
                return (
                  <div
                    key={val}
                    className="flex flex-col items-center gap-1 bg-pf-cream px-4 py-6 text-center"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="font-display text-[clamp(1.5rem,3vw,2.25rem)] text-pf-terracotta leading-none">
                      {prefix}
                      <AnimatedCounter target={num} />
                      {hasPlus && "+"}
                    </div>
                    <p className="text-[11px] text-pf-charcoal/55 leading-snug">{T(label, lang)}</p>
                  </div>
                );
              })}
            </div>

            {/* cta */}
            <div className="mt-8">
              <a
                href="/cv/razieh-cv.pdf"
                download
                className="group inline-flex items-center gap-3 rounded-full border border-pf-terracotta/30 px-6 py-3 text-sm font-medium text-pf-terracotta transition-all duration-300 hover:bg-pf-terracotta hover:text-pf-cream hover:border-pf-terracotta"
              >
                <span>{lang === "fa" ? "دانلود رزومه" : "Download CV"}</span>
                <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 3v8M4 7l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 13h12" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

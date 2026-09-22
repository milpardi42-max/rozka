"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LangToggle } from "@/components/portfolio/LangToggle";
import { usePortfolioLang } from "@/components/portfolio/PortfolioLangProvider";
import { T } from "@/lib/portfolio-translations";

const NAV_ITEMS = ["about", "works", "process", "academic", "contact"] as const;

export function PfHero() {
  const { lang } = usePortfolioLang();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", ...NAV_ITEMS];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Sticky floating nav ── */}
      <nav
        ref={navRef}
        className={`fixed top-4 inset-x-0 z-50 mx-auto flex max-w-2xl items-center justify-between gap-2 rounded-full px-4 py-2 transition-all duration-500 ${
          scrolled
            ? "bg-pf-ink/80 shadow-2xl backdrop-blur-xl border border-white/10"
            : "bg-transparent"
        }`}
        style={{ width: "calc(100% - 2rem)" }}
      >
        <button
          onClick={() => scrollTo("hero")}
          className="font-display text-base font-semibold tracking-[0.16em] text-pf-gold shrink-0"
        >
          R.K
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((k) => (
            <li key={k}>
              <button
                onClick={() => scrollTo(k)}
                className={`relative rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeSection === k
                    ? "text-pf-gold"
                    : "text-white/55 hover:text-white/90"
                }`}
              >
                {activeSection === k && (
                  <span className="absolute inset-0 rounded-full bg-white/10" />
                )}
                {T(k, lang)}
              </button>
            </li>
          ))}
        </ul>

        <LangToggle />
      </nav>

      {/* ── Hero section ── */}
      <section
        id="hero"
        className="relative isolate flex h-[100svh] min-h-[680px] flex-col overflow-hidden bg-pf-ink text-white"
      >
        {/* background image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero/hero-main.jpg"
            alt="Razieh Kheiripour"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center animate-pf-slow-zoom"
          />
          {/* layered gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-pf-ink/70 via-pf-ink/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-pf-ink via-transparent to-transparent" />
          <div className="absolute inset-0 pf-bg-noise opacity-20" />
        </div>

        {/* ── Main content ── */}
        <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-16 md:px-16 lg:px-24 xl:px-32">
          {/* eyebrow line */}
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-12 origin-left bg-pf-gold/70 animate-pf-draw-line" />
            <p className="text-[11px] uppercase tracking-[0.35em] text-pf-gold/90 animate-pf-fade-in">
              {T("heroSub", lang)}
            </p>
          </div>

          {/* name */}
          <h1 className="overflow-hidden leading-none mb-6">
            <span
              className="block text-[clamp(4rem,11vw,8.5rem)] font-display text-white animate-pf-fade-up"
              style={{ animationDelay: "80ms" }}
            >
              {T("heroName1", lang)}
            </span>
            <span
              className="block text-[clamp(4rem,11vw,8.5rem)] font-display text-pf-gold animate-pf-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              {T("heroName2", lang)}
            </span>
          </h1>

          {/* description + cta row */}
          <div
            className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between animate-pf-fade-up"
            style={{ animationDelay: "360ms" }}
          >
            <p className="max-w-md text-base text-white/60 leading-relaxed">
              {T("heroDesc", lang)}
            </p>
            <button
              onClick={() => scrollTo("works")}
              className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-pf-gold/50 bg-pf-gold/10 px-6 py-3 text-sm font-medium tracking-[0.12em] text-pf-gold backdrop-blur-sm transition-all duration-300 hover:bg-pf-gold hover:text-pf-ink hover:border-pf-gold"
            >
              {T("portfolioLabel", lang)}
              <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
            </button>
          </div>
        </div>

        {/* ── Bottom tags bar ── */}
        <div
          className="relative z-10 flex items-center justify-between border-t border-white/10 px-6 py-4 md:px-16 lg:px-24 xl:px-32 animate-pf-fade-in"
          style={{ animationDelay: "600ms" }}
        >
          <div className="flex flex-wrap gap-2">
            {(["tagPattern", "tagWallpaper", "tagTextile", "tagDrapery"] as const).map((k) => (
              <span
                key={k}
                className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/45"
              >
                {T(k, lang)}
              </span>
            ))}
          </div>
          <span className="hidden text-[11px] tracking-[0.15em] text-white/30 sm:block">
            {T("founded", lang)}
          </span>
        </div>
      </section>
    </>
  );
}

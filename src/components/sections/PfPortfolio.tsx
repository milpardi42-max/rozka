"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { usePortfolioLang } from "@/components/portfolio/PortfolioLangProvider";
import { T, WORKS, type Work } from "@/lib/portfolio-translations";

type Filter = "all" | Work["category"];

const FILTER_KEYS: { key: Filter; trKey: string }[] = [
  { key: "all",       trKey: "filterAll"       },
  { key: "pattern",   trKey: "filterPattern"   },
  { key: "wallpaper", trKey: "filterWallpaper" },
  { key: "textile",   trKey: "filterTextile"   },
  { key: "drapery",   trKey: "filterDrapery"   },
];

function categoryLabel(cat: Work["category"], lang: "fa" | "en") {
  const map: Record<Work["category"], string> = {
    pattern:   T("filterPattern",   lang),
    wallpaper: T("filterWallpaper", lang),
    textile:   T("filterTextile",   lang),
    drapery:   T("filterDrapery",   lang),
  };
  return map[cat];
}

export function PfPortfolio() {
  const { lang } = usePortfolioLang();
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Work | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const visible = filter === "all" ? WORKS : WORKS.filter((w) => w.category === filter);

  const openModal = useCallback((work: Work) => {
    setImgLoaded(false);
    setSelected(work);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelected(null);
    document.body.style.overflow = "";
  }, []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (!selected) return;
      const idx = visible.findIndex((w) => w.id === selected.id);
      const next = visible[(idx + dir + visible.length) % visible.length];
      if (next) { setImgLoaded(false); setSelected(next); }
    },
    [selected, visible]
  );

  return (
    <section id="works" className="bg-pf-ink py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">

        {/* ── Section header ── */}
        <div className="reveal mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.35em] text-pf-gold">
              {T("portfolioLabel", lang)}
            </p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-pf-cream">
              {T("portfolioTitle", lang)}
            </h2>
          </div>
          <p className="max-w-xs text-sm text-pf-stone/60 sm:text-end">
            {T("portfolioDesc", lang)}
          </p>
        </div>

        {/* ── Filter pills ── */}
        <div className="reveal mb-10 flex flex-wrap gap-2">
          {FILTER_KEYS.map(({ key, trKey }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                filter === key
                  ? "border-pf-gold bg-pf-gold text-pf-ink shadow-lg"
                  : "border-white/15 text-white/50 hover:border-pf-gold/40 hover:text-pf-gold"
              }`}
            >
              {T(trKey, lang)}
            </button>
          ))}
        </div>

        {/* ── Bento grid ── */}
        <div className="grid auto-rows-[240px] grid-cols-2 gap-3 md:auto-rows-[280px] md:grid-cols-3 lg:grid-cols-4">
          {visible.map((work, i) => {
            // bento layout rules: every 7th item is wide, every 5th is tall
            const isFeatured = work.layout === "tall" || work.layout === "wide";
            const colSpan = work.layout === "wide" ? "col-span-2" : "col-span-1";
            const rowSpan = work.layout === "tall" ? "row-span-2" : "row-span-1";

            return (
              <div
                key={work.id}
                onClick={() => openModal(work)}
                className={`group reveal relative cursor-pointer overflow-hidden rounded-2xl bg-pf-charcoal ${colSpan} ${rowSpan}`}
                style={{ "--reveal-delay": `${(i % 6) * 60}ms` } as React.CSSProperties}
              >
                <Image
                  src={work.image}
                  alt={work.title[lang]}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                  className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-110"
                  loading={i < 4 ? "eager" : "lazy"}
                />

                {/* default vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-pf-ink/70 via-transparent to-transparent" />

                {/* hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  {/* top: category badge */}
                  <div className="flex justify-end">
                    <span className="rounded-full bg-pf-gold/90 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-pf-ink font-medium">
                      {categoryLabel(work.category, lang)}
                    </span>
                  </div>
                  {/* bottom: title + year */}
                  <div>
                    <p className="text-[11px] text-pf-stone/60 mb-0.5">{work.year}</p>
                    <h3 className="font-display text-lg leading-snug text-white">
                      {work.title[lang]}
                    </h3>
                    <p className="mt-1.5 text-xs text-white/50">{T("viewDetails", lang)}</p>
                  </div>
                </div>

                {/* always visible title at bottom for non-hover */}
                <div className="absolute bottom-0 inset-x-0 p-4 group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="font-display text-base text-white/90 leading-tight line-clamp-1">
                    {work.title[lang]}
                  </h3>
                </div>

                {isFeatured && (
                  <div className="absolute top-3 start-3 h-1.5 w-1.5 rounded-full bg-pf-gold" />
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Lightbox Modal ── */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 pf-modal-backdrop"
          onClick={closeModal}
        >
          <div
            className="relative flex w-full max-w-4xl overflow-hidden rounded-3xl bg-pf-charcoal shadow-2xl pf-modal-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* close button */}
            <button
              className="absolute end-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
              onClick={closeModal}
              aria-label={T("close", lang)}
            >
              <X className="h-4 w-4" />
            </button>

            {/* navigation arrows */}
            {visible.length > 1 && (
              <>
                <button
                  className="absolute start-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-sm transition-all hover:bg-pf-gold hover:text-pf-ink"
                  onClick={() => navigate(-1)}
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5 rtl-flip" />
                </button>
                <button
                  className="absolute end-14 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-sm transition-all hover:bg-pf-gold hover:text-pf-ink"
                  onClick={() => navigate(1)}
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5 rtl-flip" />
                </button>
              </>
            )}

            {/* image pane */}
            <div className="relative w-full md:w-[55%] shrink-0">
              <div className="relative aspect-[4/5] md:aspect-auto md:h-full min-h-[360px]">
                {!imgLoaded && (
                  <div className="absolute inset-0 skeleton" />
                )}
                <Image
                  key={selected.id}
                  src={selected.image}
                  alt={selected.title[lang]}
                  fill
                  sizes="(min-width: 768px) 55vw, 90vw"
                  className={`object-cover transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setImgLoaded(true)}
                />
              </div>
            </div>

            {/* info pane */}
            <div className="flex flex-1 flex-col justify-between p-8">
              <div>
                <span className="mb-4 inline-block rounded-full bg-pf-terracotta/20 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-pf-terracotta">
                  {categoryLabel(selected.category, lang)}
                </span>
                <h3 className="font-display text-2xl text-pf-cream mb-2 leading-tight">
                  {selected.title[lang]}
                </h3>
                <p className="text-sm text-pf-gold/70 mb-6 font-medium">{selected.year}</p>
                <p className="text-pf-stone/70 leading-relaxed text-sm">
                  {selected.description[lang]}
                </p>
              </div>

              {/* meta row */}
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-pf-stone/40 mb-1">
                    {lang === "fa" ? "دسته‌بندی" : "Category"}
                  </p>
                  <p className="text-sm text-pf-cream/80">{categoryLabel(selected.category, lang)}</p>
                </div>
                <div className="text-end">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-pf-stone/40 mb-1">
                    {lang === "fa" ? "سال" : "Year"}
                  </p>
                  <p className="text-sm text-pf-cream/80">{selected.year}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

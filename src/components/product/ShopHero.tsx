"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Package, Palette, ShoppingBag, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { href, t } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/types";
import type { Category, Product } from "@/lib/types";

interface Props {
  locale: Locale;
  /** Product images used in the background slideshow & collage (up to 6) */
  images: string[];
  /** Featured product for the card chip */
  featuredProduct?: Product | null;
  /** Featured categories shown in the bottom rail (up to 4) */
  categories?: Category[];
  stats: {
    products: number;
    categories: number;
    artists: number;
  };
}

const SLIDE_INTERVAL = 4800;

export function ShopHero({ locale, images, featuredProduct, categories, stats }: Props) {
  const fa = locale === "fa";
  const [active, setActive] = useState(0);
  const progressRef = useRef<{ start: number; raf: number } | null>(null);
  const [progress, setProgress] = useState(0);

  const bgImages = images.slice(0, 6);

  /* ── Slideshow + progress ── */
  useEffect(() => {
    if (bgImages.length < 2) return;
    const advance = () => {
      setActive((a) => (a + 1) % bgImages.length);
      setProgress(0);
      startProgress();
    };
    const startProgress = () => {
      const start = performance.now();
      const tick = (now: number) => {
        setProgress((now - start) / SLIDE_INTERVAL);
        progressRef.current!.raf = requestAnimationFrame(tick);
      };
      progressRef.current = { start, raf: requestAnimationFrame(tick) };
    };
    startProgress();
    const id = window.setInterval(advance, SLIDE_INTERVAL);
    return () => {
      window.clearInterval(id);
      if (progressRef.current) cancelAnimationFrame(progressRef.current.raf);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgImages.length]);

  /* collage frames */
  const imgA = images[0];
  const imgB = images[1];
  const imgC = images[2];

  return (
    <section
      dir={fa ? "rtl" : "ltr"}
      className="relative isolate overflow-hidden bg-[#07090f] text-white"
      aria-label={fa ? "فروشگاه رزی آتلیه" : "Rozi Atelier Shop"}
    >
      {/* ── Background slides ─────────────────────────────────────────────── */}
      {bgImages.map((src, i) => (
        <div
          key={src}
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="scale-[1.04] object-cover"
          />
        </div>
      ))}

      {/* ── Gradient veils ────────────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090f]/90 via-[#07090f]/55 to-[#07090f]/20 rtl:bg-gradient-to-l" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#07090f]/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#07090f]/60 to-transparent" />
        {/* cinematic vignette */}
        <div className="absolute inset-0 [box-shadow:inset_0_0_140px_40px_rgba(4,5,10,0.3)]" />
      </div>

      {/* ── Slide indicator dots ──────────────────────────────────────────── */}
      {bgImages.length > 1 && (
        <div
          aria-hidden
          className="absolute bottom-[5rem] inset-x-0 flex justify-center gap-1.5 z-10"
        >
          {bgImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setActive(i); setProgress(0); }}
              className="relative h-[3px] overflow-hidden rounded-full bg-white/20 transition-all duration-300"
              style={{ width: i === active ? "30px" : "8px" }}
            >
              <span
                className="absolute inset-y-0 start-0 rounded-full bg-white"
                style={
                  i === active
                    ? { width: `${Math.min(progress, 1) * 100}%`, transition: "none" }
                    : { width: i < active ? "100%" : "0%" }
                }
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="container-x relative grid min-h-[92svh] grid-rows-[1fr_auto] gap-0 pt-[calc(var(--announce-h,0px)+var(--header-h)+2.5rem)]">

        <div className="grid items-center gap-10 pb-8 lg:grid-cols-[1fr_auto] lg:gap-16">

          {/* ── Copy ───────────────────────────────────────────────────────── */}
          <div className="max-w-xl">

            {/* eyebrow badge */}
            <p
              className="anim-blur-in mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[12px] font-medium text-white/80 backdrop-blur-sm"
              style={{ animationDelay: "60ms" }}
            >
              <ShoppingBag className="h-3.5 w-3.5 text-accent" />
              {fa ? "رزی آتلیه — فروشگاه رسمی" : "Rozi Atelier — Official Store"}
            </p>

            {/* headline */}
            <h1 className="font-display text-display leading-[1.05] text-balance">
              <span
                className="anim-blur-in block"
                style={{ animationDelay: "140ms" }}
              >
                {fa ? "فروشگاه" : "Shop"}
              </span>
              <span
                className="anim-blur-in block italic text-white/50"
                style={{ animationDelay: "260ms" }}
              >
                {fa ? "سطح و دکور" : "Surface & Décor"}
              </span>
            </h1>

            {/* description */}
            <p
              className="anim-blur-in mt-6 text-body-lg leading-relaxed text-white/65"
              style={{ animationDelay: "380ms" }}
            >
              {fa
                ? "مجموعه‌ای از محصولات آتلیه‌ای روی بهترین متریال — کاغذدیواری، پارچه، پرده و دکور — با طراحی اورجینال."
                : "A curated collection of atelier products on premium materials — wallpaper, fabric, curtains & décor — with original design."}
            </p>

            {/* CTAs */}
            <div
              className="anim-fade-up mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "480ms" }}
            >
              <Link
                href={href(locale, "/shop")}
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-6 text-[14px] font-semibold text-[#07090f] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(255,255,255,0.18)]"
              >
                <ShoppingBag className="h-4 w-4" />
                {fa ? "خرید محصولات" : "Shop now"}
              </Link>
              <Link
                href={href(locale, "/patterns")}
                className="inline-flex h-12 items-center gap-2.5 rounded-full border border-white/25 px-6 text-[14px] font-semibold text-white transition-[transform,background-color,border-color] hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/8"
              >
                <Palette className="h-4 w-4" />
                {fa ? "مشاهده الگوها" : "Browse patterns"}
              </Link>
            </div>

            {/* stats */}
            <dl
              className="anim-fade-up mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-7"
              style={{ animationDelay: "580ms" }}
            >
              {[
                { n: stats.products,   label: fa ? "محصول آتلیه"     : "Atelier products",  icon: <Package    className="h-3.5 w-3.5 text-accent" /> },
                { n: stats.categories, label: fa ? "دسته‌بندی"        : "Categories",        icon: <Palette    className="h-3.5 w-3.5 text-accent" /> },
                { n: stats.artists,    label: fa ? "هنرمند مشارکت‌کننده" : "Artists",         icon: <Users      className="h-3.5 w-3.5 text-accent" /> },
              ].map(({ n, label, icon }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/8">
                    {icon}
                  </span>
                  <div>
                    <dd className="font-display text-[28px] leading-none tabular text-white">{n}+</dd>
                    <dt className="mt-1 text-[11px] uppercase tracking-widest text-white/45">{label}</dt>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Collage — desktop only ──────────────────────────────────────── */}
          <div
            className="anim-scale-fade hidden lg:block"
            style={{ animationDelay: "500ms" }}
          >
            <div className="relative h-[520px] w-[420px]">

              {/* Frame A — main card */}
              {imgA && (
                <div
                  className="absolute inset-0 overflow-hidden rounded-2xl shadow-elevated"
                  style={{
                    transform: "rotate(-2deg) scale(0.96)",
                    animation: "shop-float-a 6s ease-in-out infinite",
                  }}
                >
                  <Image src={imgA} alt="" fill priority sizes="420px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                </div>
              )}

              {/* Frame B — top-end small */}
              {imgB && (
                <div
                  className="absolute -end-10 -top-6 h-[200px] w-[160px] overflow-hidden rounded-xl shadow-elevated ring-2 ring-white/15"
                  style={{
                    transform: "rotate(3.5deg)",
                    animation: "shop-float-b 7s ease-in-out infinite",
                  }}
                >
                  <Image src={imgB} alt="" fill sizes="160px" className="object-cover" />
                </div>
              )}

              {/* Frame C — bottom-start small */}
              {imgC && (
                <div
                  className="absolute -start-8 -bottom-4 h-[170px] w-[140px] overflow-hidden rounded-xl shadow-elevated ring-2 ring-white/15"
                  style={{
                    transform: "rotate(-3deg)",
                    animation: "shop-float-c 8s ease-in-out infinite",
                  }}
                >
                  <Image src={imgC} alt="" fill sizes="140px" className="object-cover" />
                </div>
              )}

              {/* Featured product chip */}
              {featuredProduct && (
                <Link
                  href={href(locale, `/shop/${featuredProduct.slug}`)}
                  className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-xl bg-black/60 px-4 py-3 backdrop-blur-md ring-1 ring-white/10 transition-colors hover:bg-black/75"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                      {fa ? "محصول منتخب" : "Featured product"}
                    </p>
                    <p className="mt-0.5 truncate text-[14px] font-semibold text-white">
                      {t(featuredProduct.title, locale)}
                    </p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#07090f]">
                    <ArrowUpRight className="h-3.5 w-3.5 rtl-flip" />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
        <div
          className="anim-fade-up flex items-center justify-between border-t border-white/8 py-5 text-[12px] text-white/40"
          style={{ animationDelay: "700ms" }}
        >
          <div className="flex flex-wrap gap-x-6 gap-y-1 uppercase tracking-[0.18em]">
            {(categories ?? []).slice(0, 4).map((c) => (
              <Link
                key={c.id}
                href={href(locale, `/shop?category=${c.slug}`)}
                className="transition-colors hover:text-white/80"
              >
                {t(c.name, locale)}
              </Link>
            ))}
          </div>
          <a
            href="#catalog"
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-white/70"
          >
            {fa ? "ورود به فروشگاه" : "Enter the shop"}
            <ArrowDownRight className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5 rtl-flip" />
          </a>
        </div>
      </div>

      {/* ── Float keyframes ───────────────────────────────────────────────── */}
      <style>{`
        @keyframes shop-float-a {
          0%, 100% { transform: rotate(-2deg) scale(0.96) translateY(0px); }
          50%       { transform: rotate(-2deg) scale(0.96) translateY(-10px); }
        }
        @keyframes shop-float-b {
          0%, 100% { transform: rotate(3.5deg) translateY(0px); }
          50%       { transform: rotate(3.5deg) translateY(-14px); }
        }
        @keyframes shop-float-c {
          0%, 100% { transform: rotate(-3deg) translateY(0px); }
          50%       { transform: rotate(-3deg) translateY(-8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="shop-float"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

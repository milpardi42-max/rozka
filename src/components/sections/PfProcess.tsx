"use client";

import { usePortfolioLang } from "@/components/portfolio/PortfolioLangProvider";

interface Step {
  num: string;
  title: { fa: string; en: string };
  desc: { fa: string; en: string };
  tag: { fa: string; en: string };
}

const STEPS: Step[] = [
  {
    num: "01",
    title: { fa: "الهام و پژوهش", en: "Inspiration & Research" },
    desc: {
      fa: "هر اثر با غوطه‌ور شدن در منابع تاریخی، نقوش اصیل ایرانی و مشاهده طبیعت آغاز می‌شود. این مرحله پایه‌های زبان بصری هر پروژه را می‌سازد.",
      en: "Every work begins by immersing in historical archives, authentic Iranian motifs, and observing nature. This stage builds the visual language foundation for each project.",
    },
    tag: { fa: "تحقیق", en: "Research" },
  },
  {
    num: "02",
    title: { fa: "طراحی اولیه", en: "Concept & Sketch" },
    desc: {
      fa: "ایده‌ها روی کاغذ زنده می‌شوند. طرح‌های دستی اولیه با ترکیب‌های مختلف رنگ و فرم آزمایش می‌شوند تا ریتم بصری مناسب پیدا شود.",
      en: "Ideas come to life on paper. Initial hand drawings are tested with various color and form combinations until the right visual rhythm is found.",
    },
    tag: { fa: "طراحی", en: "Design" },
  },
  {
    num: "03",
    title: { fa: "تکرار و بافت", en: "Repeat & Texture" },
    desc: {
      fa: "الگو به روش تکراری دیجیتال تبدیل می‌شود. آزمون‌های مقیاس، چرخش و رنگ‌بندی تا رسیدن به یک نقش منسجم و قابل اجرا ادامه می‌یابند.",
      en: "The pattern is developed into digital repeats. Scale, rotation and color tests continue until a cohesive, production-ready motif is achieved.",
    },
    tag: { fa: "تولید الگو", en: "Pattern Making" },
  },
  {
    num: "04",
    title: { fa: "اجرا و تحویل", en: "Production & Delivery" },
    desc: {
      fa: "نقش نهایی روی پارچه، کاغذ دیواری یا سطح مورد نظر چاپ و اجرا می‌شود. کنترل کیفیت دقیق در هر مرحله از تولید تضمین می‌شود.",
      en: "The final motif is printed and executed on fabric, wallpaper, or the intended surface. Precise quality control is ensured at every production stage.",
    },
    tag: { fa: "اجرا", en: "Execution" },
  },
];

export function PfProcess() {
  const { lang } = usePortfolioLang();

  return (
    <section id="process" className="relative bg-pf-cream overflow-hidden">
      {/* decorative number watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute start-0 top-1/2 -translate-y-1/2 select-none font-display text-[clamp(10rem,20vw,16rem)] leading-none text-pf-terracotta/5"
      >
        {lang === "fa" ? "فرآیند" : "Process"}
      </span>

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28 lg:py-36">
        {/* header */}
        <div className="reveal mb-16 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-pf-terracotta">
              {lang === "fa" ? "فرآیند خلق" : "Creative Process"}
            </p>
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.75rem)] leading-tight text-pf-charcoal">
              {lang === "fa" ? "از ایده تا اجرا" : "From Idea to Execution"}
            </h2>
          </div>
          <p
            className="reveal text-pf-charcoal/60 md:col-span-5 md:text-end"
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
          >
            {lang === "fa"
              ? "هر اثر نتیجه یک مسیر دقیق و آگاهانه است — از لحظه الهام تا لمس نهایی."
              : "Every work is the result of a deliberate journey — from the moment of inspiration to the final touch."}
          </p>
        </div>

        {/* steps */}
        <div className="relative">
          {/* vertical connector line */}
          <div className="absolute start-[2.75rem] top-8 bottom-8 hidden w-px bg-gradient-to-b from-pf-terracotta/30 via-pf-terracotta/15 to-transparent md:block" />

          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="reveal group relative grid gap-6 md:grid-cols-[5.5rem_1fr_1fr] md:items-start"
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              >
                {/* step number */}
                <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-0">
                  <div className="relative flex h-[3.5rem] w-[3.5rem] shrink-0 items-center justify-center rounded-full border-2 border-pf-terracotta/25 bg-pf-cream font-display text-xl font-bold text-pf-terracotta transition-all duration-500 group-hover:border-pf-terracotta group-hover:bg-pf-terracotta group-hover:text-pf-cream md:h-[2.5rem] md:w-[2.5rem] md:text-base">
                    {step.num}
                    {/* pulsing ring on hover */}
                    <span className="absolute inset-0 rounded-full border border-pf-terracotta/0 transition-all duration-700 group-hover:border-pf-terracotta/40 group-hover:scale-150 group-hover:opacity-0" />
                  </div>
                  {/* mobile: inline tag */}
                  <span className="md:hidden rounded-full bg-pf-terracotta/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-pf-terracotta">
                    {step.tag[lang]}
                  </span>
                </div>

                {/* title */}
                <div className="md:pt-1">
                  <h3 className="font-display text-[clamp(1.2rem,2vw,1.5rem)] text-pf-charcoal mb-1">
                    {step.title[lang]}
                  </h3>
                  <span className="hidden md:inline-block rounded-full bg-pf-terracotta/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-pf-terracotta">
                    {step.tag[lang]}
                  </span>
                </div>

                {/* description */}
                <div className="md:col-start-3 md:pt-1">
                  <p className="text-pf-charcoal/65 leading-relaxed">
                    {step.desc[lang]}
                  </p>
                </div>

                {/* divider */}
                {i < STEPS.length - 1 && (
                  <div className="col-span-full h-px bg-pf-terracotta/10 md:ms-[5.5rem]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

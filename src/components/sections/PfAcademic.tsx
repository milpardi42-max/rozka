"use client";

import Image from "next/image";
import { BookOpen, Users, Award, GraduationCap } from "lucide-react";
import { usePortfolioLang } from "@/components/portfolio/PortfolioLangProvider";
import { T, COURSES } from "@/lib/portfolio-translations";

const ACHIEVEMENTS = [
  { icon: BookOpen,     valKey: "ach1Val", labelKey: "ach1Label" },
  { icon: Award,        valKey: "ach2Val", labelKey: "ach2Label" },
  { icon: Users,        valKey: "ach3Val", labelKey: "ach3Label" },
  { icon: GraduationCap, valKey: "ach4Val", labelKey: "ach4Label" },
] as const;

interface TimelineItem {
  year: { fa: string; en: string };
  title: { fa: string; en: string };
  place: { fa: string; en: string };
  type: "teaching" | "exhibition";
}

const TIMELINE: TimelineItem[] = [
  {
    year: { fa: "۱۳۸۸ – اکنون", en: "2009 – Present" },
    title: { fa: "استادیار — گروه هنرهای تزئینی", en: "Assistant Professor — Decorative Arts Dept." },
    place: { fa: "دانشگاه هنر تهران", en: "University of Art, Tehran" },
    type: "teaching",
  },
  {
    year: { fa: "۱۴۰۲", en: "2023" },
    title: { fa: "نمایشگاه «بافت و نقش»", en: "Exhibition: Texture & Motif" },
    place: { fa: "گالری سیحون، تهران", en: "Seyhoun Gallery, Tehran" },
    type: "exhibition",
  },
  {
    year: { fa: "۱۴۰۱", en: "2022" },
    title: { fa: "نمایشگاه گروهی بین‌المللی", en: "International Group Exhibition" },
    place: { fa: "موزه هنر مدرن، تهران", en: "Tehran Museum of Contemporary Art" },
    type: "exhibition",
  },
  {
    year: { fa: "۱۳۹۸", en: "2019" },
    title: { fa: "کارگاه طراحی الگو، دانشگاه هنر اصفهان", en: "Pattern Design Workshop, Isfahan University of Art" },
    place: { fa: "اصفهان", en: "Isfahan" },
    type: "teaching",
  },
];

export function PfAcademic() {
  const { lang } = usePortfolioLang();

  return (
    <section id="academic" className="bg-pf-cream py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">

        {/* ── Header ── */}
        <div className="reveal mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-pf-terracotta">
              {T("academicLabel", lang)}
            </p>
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.75rem)] leading-tight text-pf-charcoal">
              {T("academicTitle", lang)}
            </h2>
          </div>
          <p
            className="reveal text-pf-charcoal/60 md:col-span-5 md:text-end"
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
          >
            {T("academicDesc", lang)}
          </p>
        </div>

        {/* ── Teaching image ── */}
        <div className="reveal relative mb-14 overflow-hidden rounded-3xl">
          <div className="relative aspect-[21/8]">
            <Image
              src="/images/education/e01.jpg"
              alt={T("academicTitle", lang)}
              fill
              sizes="(min-width: 1024px) 80vw, 95vw"
              quality={85}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pf-ink/70 via-pf-ink/10 to-transparent" />
          </div>
          {/* caption badge */}
          <div className="absolute bottom-6 start-8 rounded-xl bg-pf-cream/10 px-5 py-4 backdrop-blur-md border border-white/15">
            <p className="mb-0.5 text-[10px] uppercase tracking-[0.2em] text-pf-gold/80">
              {T("deptLabel", lang)}
            </p>
            <p className="font-display text-lg text-white">
              {T("rankLabel", lang)}
            </p>
          </div>
        </div>

        {/* ── Achievements + Timeline ── */}
        <div className="grid gap-12 lg:grid-cols-12">

          {/* achievements */}
          <div className="reveal lg:col-span-5 flex flex-col gap-6">
            <h3 className="font-display text-xl text-pf-charcoal mb-2">
              {lang === "fa" ? "دستاوردها" : "Achievements"}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {ACHIEVEMENTS.map(({ icon: Icon, valKey, labelKey }) => (
                <div
                  key={valKey}
                  className="group relative overflow-hidden rounded-2xl border border-pf-terracotta/12 bg-white p-5 transition-all duration-300 hover:border-pf-terracotta/30 hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-pf-terracotta/8 transition-colors duration-300 group-hover:bg-pf-terracotta/15">
                    <Icon className="h-5 w-5 text-pf-terracotta" />
                  </div>
                  <div className="font-display text-[clamp(1.5rem,3vw,2rem)] text-pf-terracotta leading-none">
                    {T(valKey, lang)}
                  </div>
                  <div className="mt-1.5 text-[11px] text-pf-charcoal/50 leading-snug">
                    {T(labelKey, lang)}
                  </div>
                  {/* corner accent */}
                  <div className="absolute -bottom-2 -end-2 h-8 w-8 rounded-full bg-pf-terracotta/5 transition-all duration-500 group-hover:scale-[3]" />
                </div>
              ))}
            </div>
          </div>

          {/* timeline */}
          <div
            className="reveal lg:col-span-7"
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <h3 className="font-display text-xl text-pf-charcoal mb-6">
              {lang === "fa" ? "سوابق و رویدادها" : "History & Events"}
            </h3>
            <div className="relative space-y-0">
              {/* timeline line */}
              <div className="absolute start-[1.1rem] top-4 bottom-4 w-px bg-gradient-to-b from-pf-terracotta/40 via-pf-terracotta/20 to-transparent" />

              {TIMELINE.map((item, i) => (
                <div key={i} className="relative flex gap-6 pb-8 last:pb-0">
                  {/* dot */}
                  <div className="relative z-10 mt-1.5 flex h-[1.4rem] w-[1.4rem] shrink-0 items-center justify-center rounded-full border-2 border-pf-terracotta/40 bg-pf-cream">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        item.type === "teaching" ? "bg-pf-terracotta" : "bg-pf-gold"
                      }`}
                    />
                  </div>
                  {/* content */}
                  <div className="flex-1 rounded-xl border border-pf-terracotta/10 bg-white p-4 transition-shadow duration-300 hover:shadow-sm">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] ${
                          item.type === "teaching"
                            ? "bg-pf-terracotta/10 text-pf-terracotta"
                            : "bg-pf-gold/15 text-pf-ochre"
                        }`}
                      >
                        {item.type === "teaching"
                          ? lang === "fa" ? "تدریس" : "Teaching"
                          : lang === "fa" ? "نمایشگاه" : "Exhibition"}
                      </span>
                      <span className="text-[11px] text-pf-charcoal/40 shrink-0">{item.year[lang]}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-pf-charcoal mb-0.5">{item.title[lang]}</h4>
                    <p className="text-xs text-pf-charcoal/50">{item.place[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Courses ── */}
        <div
          className="reveal mt-14"
          style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
        >
          <div className="mb-6 flex items-center gap-4">
            <h3 className="font-display text-xl text-pf-charcoal">{T("coursesTitle", lang)}</h3>
            <span className="h-px flex-1 bg-pf-terracotta/15" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {COURSES.map((course) => (
              <div
                key={course.id}
                className="group relative overflow-hidden rounded-2xl border border-pf-terracotta/12 bg-white p-6 transition-all duration-300 hover:border-pf-terracotta/25 hover:shadow-md"
              >
                {/* accent line */}
                <div className="absolute start-0 top-0 bottom-0 w-0.5 rounded-full bg-pf-terracotta/0 transition-all duration-500 group-hover:bg-pf-terracotta/50" />

                <p className="mb-1.5 text-[10px] uppercase tracking-[0.18em] text-pf-ochre">
                  {course.level[lang]}
                </p>
                <h4 className="font-semibold text-pf-charcoal mb-2">{course.title[lang]}</h4>
                <p className="text-sm text-pf-charcoal/55 leading-relaxed">{course.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import { PortfolioLangProvider } from "@/components/portfolio/PortfolioLangProvider";
import { PfHero } from "@/components/sections/PfHero";
import { PfAbout } from "@/components/sections/PfAbout";
import { PfPortfolio } from "@/components/sections/PfPortfolio";
import { PfProcess } from "@/components/sections/PfProcess";
import { PfPhilosophy } from "@/components/sections/PfPhilosophy";
import { PfAcademic } from "@/components/sections/PfAcademic";
import { PfContact } from "@/components/sections/PfContact";
import { useReveal } from "@/hooks/use-reveal";
import { usePortfolioLang } from "@/components/portfolio/PortfolioLangProvider";
import type { Locale } from "@/lib/i18n/types";
import type { Lang } from "@/lib/portfolio-translations";

function PortfolioFooter() {
  const { lang } = usePortfolioLang();
  return (
    <footer className="bg-pf-ink border-t border-white/8 py-8">
      <div className="mx-auto max-w-6xl px-6 md:px-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-start">
        <p className="text-[11px] uppercase tracking-[0.22em] text-pf-stone/40">
          {lang === "fa"
            ? "© ۱۴۰۳ راضیه خیری‌پور. تمامی حقوق محفوظ است."
            : "© 2024 Razieh Kheiripour. All rights reserved."}
        </p>
        <p className="text-[10px] text-pf-stone/25">
          {lang === "fa" ? "طراح الگو · پارچه · کاغذ دیواری · پرده" : "Pattern · Textile · Wallpaper · Drapery"}
        </p>
      </div>
    </footer>
  );
}

function PortfolioInner() {
  useReveal();
  return (
    <>
      <PfHero />
      <PfAbout />
      <PfPortfolio />
      <PfProcess />
      <PfPhilosophy />
      <PfAcademic />
      <PfContact />
      <PortfolioFooter />
    </>
  );
}

export default function RaziehPortfolioClient({ locale }: { locale: Locale }) {
  const lang: Lang = locale === "fa" ? "fa" : "en";
  return (
    <PortfolioLangProvider initialLang={lang}>
      <PortfolioInner />
    </PortfolioLangProvider>
  );
}

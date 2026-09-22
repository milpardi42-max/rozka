"use client";

import { useState, useRef } from "react";
import { Mail, MapPin, Instagram, Linkedin, Send } from "lucide-react";
import { usePortfolioLang } from "@/components/portfolio/PortfolioLangProvider";
import { T } from "@/lib/portfolio-translations";

type FormState = "idle" | "loading" | "success" | "error";

export function PfContact() {
  const { lang } = usePortfolioLang();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");

    const data = new FormData(e.currentTarget);
    const body = {
      name:    data.get("name") as string,
      email:   data.get("email") as string,
      subject: data.get("subject") as string,
      message: data.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      setState("success");
      formRef.current?.reset();
    } catch {
      setState("error");
    }
  };

  const INPUT_BASE =
    "w-full border-b border-white/15 bg-transparent pb-3 pt-1 text-pf-cream placeholder:text-white/20 focus:border-pf-gold focus:outline-none transition-colors duration-300 text-sm";

  return (
    <section id="contact" className="relative bg-pf-ink overflow-hidden py-20 md:py-28 lg:py-36">
      {/* noise */}
      <div className="absolute inset-0 pf-bg-noise opacity-10" />

      {/* decorative circle */}
      <div className="pointer-events-none absolute -end-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-pf-gold/4" />
      <div className="pointer-events-none absolute -start-16 bottom-0 h-[20rem] w-[20rem] rounded-full bg-pf-terracotta/5" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">

          {/* ── Left info column ── */}
          <div className="reveal flex flex-col justify-center lg:col-span-5">
            <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-pf-gold">
              {T("contactLabel", lang)}
            </p>
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.75rem)] leading-tight text-pf-cream mb-6">
              {T("contactTitle", lang)}
            </h2>
            <p className="mb-10 text-pf-stone/55 leading-relaxed">
              {T("contactDesc", lang)}
            </p>

            {/* contact details */}
            <div className="space-y-5">
              <div className="group flex items-start gap-4">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 transition-colors duration-300 group-hover:bg-pf-gold/15">
                  <Mail className="h-4 w-4 text-pf-gold/70" />
                </div>
                <div>
                  <p className="mb-0.5 text-[10px] uppercase tracking-[0.18em] text-pf-stone/40">
                    {T("emailLabel", lang)}
                  </p>
                  <a
                    href="mailto:r.kheyripour@art.ac.ir"
                    dir="ltr"
                    className="text-sm text-pf-stone/75 transition-colors hover:text-pf-gold"
                  >
                    r.kheyripour@art.ac.ir
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-4">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 transition-colors duration-300 group-hover:bg-pf-gold/15">
                  <MapPin className="h-4 w-4 text-pf-gold/70" />
                </div>
                <div>
                  <p className="mb-0.5 text-[10px] uppercase tracking-[0.18em] text-pf-stone/40">
                    {T("addressLabel", lang)}
                  </p>
                  <p className="text-sm text-pf-stone/75">{T("addressVal", lang)}</p>
                </div>
              </div>
            </div>

            {/* social row */}
            <div className="mt-10 flex gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Linkedin,  label: "LinkedIn",  href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/40 transition-all duration-300 hover:border-pf-gold hover:text-pf-gold hover:bg-pf-gold/10"
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right form column ── */}
          <div
            className="reveal lg:col-span-7"
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/8 bg-white/4 p-8 backdrop-blur-sm"
            >
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-pf-stone/45">
                    {T("nameField", lang)}
                  </label>
                  <input
                    name="name"
                    required
                    type="text"
                    className={INPUT_BASE}
                    placeholder={T("nameField", lang)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-pf-stone/45">
                    {T("emailField", lang)}
                  </label>
                  <input
                    name="email"
                    required
                    type="email"
                    dir="ltr"
                    className={INPUT_BASE}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-pf-stone/45">
                  {T("subjectField", lang)}
                </label>
                <input
                  name="subject"
                  required
                  type="text"
                  className={INPUT_BASE}
                  placeholder={T("subjectField", lang)}
                />
              </div>

              <div className="mt-8">
                <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-pf-stone/45">
                  {T("messageField", lang)}
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className={`${INPUT_BASE} resize-none`}
                  placeholder={T("messageField", lang)}
                />
              </div>

              {/* submit */}
              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={state === "loading" || state === "success"}
                  className="group inline-flex items-center gap-3 rounded-full bg-pf-gold px-7 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-pf-ink transition-all duration-300 hover:bg-pf-cream disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === "loading" ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-pf-ink/30 border-t-pf-ink" />
                  ) : (
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  )}
                  {T("sendBtn", lang)}
                </button>

                {/* feedback */}
                <div
                  className={`text-sm transition-all duration-500 ${
                    state === "success"
                      ? "text-pf-gold opacity-100"
                      : state === "error"
                        ? "text-red-400 opacity-100"
                        : "opacity-0"
                  }`}
                >
                  {state === "success"
                    ? T("successMsg", lang)
                    : state === "error"
                      ? (lang === "fa" ? "خطا — دوباره تلاش کنید." : "Error — please try again.")
                      : " "}
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

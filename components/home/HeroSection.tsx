import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { HERO_COPY } from "@/lib/constants/copy";
import { HERO_MAIN_IMAGE, HERO_QUICK_AISLES } from "@/lib/constants/images";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-gold/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy column */}
          <div className="order-2 space-y-8 lg:order-1 lg:col-span-5">
            <div
              className="inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-teal/15 bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-teal shadow-sm motion-reduce:animate-none motion-reduce:opacity-100 opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: "0ms" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden />
              {HERO_COPY.badge}
            </div>

            <div
              className="animate-fade-in-up motion-reduce:animate-none motion-reduce:opacity-100 opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: "80ms" }}
            >
              <p className="mb-2 font-sora text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                {HERO_COPY.kicker}
              </p>
              <h1 className="font-sora text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.15rem]">
                {HERO_COPY.title}{" "}
                <span className="relative whitespace-nowrap text-teal">
                  {HERO_COPY.titleAccent}
                  <span
                    className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gold/80"
                    aria-hidden
                  />
                </span>
              </h1>
            </div>

            <p
              className="max-w-md text-base leading-relaxed text-stone-600 animate-fade-in-up motion-reduce:animate-none motion-reduce:opacity-100 opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: "160ms" }}
            >
              {HERO_COPY.body}
            </p>

            <div
              className="flex flex-wrap gap-3 animate-fade-in-up motion-reduce:animate-none motion-reduce:opacity-100 opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: "220ms" }}
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-2xl bg-teal px-7 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-teal/25 transition hover:bg-teal-light hover:-translate-y-0.5 active:translate-y-0"
              >
                {HERO_COPY.ctaPrimary}
                <ArrowRight size={17} strokeWidth={2.5} />
              </Link>
              <Link
                href="/general"
                className="inline-flex items-center rounded-2xl border-2 border-ink/12 bg-white px-7 py-3.5 font-sora text-sm font-semibold text-ink transition hover:border-teal/40 hover:text-teal"
              >
                {HERO_COPY.ctaSecondary}
              </Link>
            </div>

            <dl
              className="grid grid-cols-3 gap-4 border-t border-border/80 pt-8 animate-fade-in-up motion-reduce:animate-none motion-reduce:opacity-100 opacity-0 [animation-fill-mode:forwards] sm:max-w-lg"
              style={{ animationDelay: "300ms" }}
            >
              {HERO_COPY.statLabels.map((label, i) => (
                <div key={label}>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-stone-400">{label}</dt>
                  <dd className="mt-1 font-sora text-lg font-bold text-ink sm:text-xl">{HERO_COPY.statValues[i]}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Visual column */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div
              className="relative mx-auto max-w-xl animate-fade-in-up motion-reduce:animate-none motion-reduce:opacity-100 opacity-0 [animation-fill-mode:forwards] lg:max-w-none"
              style={{ animationDelay: "120ms" }}
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/20 ring-1 ring-ink/5 sm:aspect-[4/3] lg:rounded-[2.25rem]">
                <Image
                  src={HERO_MAIN_IMAGE}
                  alt="Fresh produce and groceries at a local market stall"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-ink/55 via-ink/15 to-transparent"
                  aria-hidden
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/92 p-4 shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs">
                  <p className="font-sora text-xs font-bold uppercase tracking-wider text-teal">Photo of the week</p>
                  <p className="mt-1 text-sm font-medium text-ink">Straight from the sabzi gali: same freshness, delivered.</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {HERO_QUICK_AISLES.map((aisle, i) => (
                  <Link
                    key={aisle.id}
                    href={aisle.href}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl hover:ring-teal/25"
                    style={{ animationDelay: `${360 + i * 50}ms` }}
                  >
                    <div className="relative aspect-[5/4]">
                      <Image
                        src={aisle.image}
                        alt={`${aisle.label} aisle at GaliMart`}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent"
                        aria-hidden
                      />
                      <span className="absolute bottom-2.5 left-3 font-sora text-sm font-bold text-white drop-shadow">
                        {aisle.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

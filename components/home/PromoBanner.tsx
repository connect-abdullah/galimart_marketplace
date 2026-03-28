import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { ANNOUNCEMENT, PROMO_BANNER } from "@/lib/constants/copy";

export default function PromoBanner() {
  return (
    <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-ink via-teal-dark to-teal p-8 shadow-xl shadow-teal/15 sm:p-10 motion-reduce:opacity-100 opacity-0 animate-fade-in motion-reduce:animate-none">
        <ShoppingCart
          className="pointer-events-none absolute right-6 top-1/2 h-32 w-32 -translate-y-1/2 text-white/15 sm:right-12 sm:h-40 sm:w-40"
          strokeWidth={1}
          aria-hidden
        />
        <div className="relative max-w-lg">
          <h3 className="mb-2 font-sora text-xs font-bold uppercase tracking-widest text-gold-light">{PROMO_BANNER.eyebrow}</h3>
          <h2 className="mb-3 font-sora text-2xl font-bold text-white sm:text-3xl">{PROMO_BANNER.title}</h2>
          <p className="mb-5 text-sm text-white/65">
            {PROMO_BANNER.body} Use {ANNOUNCEMENT.code} on your first order at checkout.
          </p>
          <Link
            href={PROMO_BANNER.href}
            className="inline-flex items-center gap-2 rounded-xl bg-gold px-7 py-3 font-sora text-sm font-semibold text-white transition-all hover:bg-gold-light hover:-translate-y-0.5"
          >
            {PROMO_BANNER.cta} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

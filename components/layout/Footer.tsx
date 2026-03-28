import Link from "next/link";
import { FOOTER_AISLE_LINKS } from "@/lib/constants/routes";
import { FOOTER_BLURB, FOOTER_COMPANY_LINKS, FOOTER_DEPT_LABEL, FOOTER_HELP_LINKS } from "@/lib/constants/copy";
import { MARKET_NAME } from "@/lib/constants/branding";
import Logo from "@/components/branding/Logo";
import SiteIdentification from "@/components/branding/SiteIdentification";

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-white/75">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          <div>
            <div className="mb-2">
              <Logo variant="footer" />
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-light/90">{FOOTER_DEPT_LABEL}</p>
            <p className="mb-4 text-sm leading-relaxed">{FOOTER_BLURB}</p>
            <div className="text-xs text-white/40">Islamabad, Pakistan</div>
          </div>

          <div>
            <h4 className="mb-4 font-sora text-xs font-bold uppercase tracking-widest text-white">Aisles</h4>
            {FOOTER_AISLE_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="mb-2.5 block text-sm text-white/60 transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="mb-4 font-sora text-xs font-bold uppercase tracking-widest text-white">Help</h4>
            {FOOTER_HELP_LINKS.map((l) =>
              l.href.startsWith("/") ? (
                <Link
                  key={l.label}
                  href={l.href}
                  className="mb-2.5 block text-sm text-white/60 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href} className="mb-2.5 block text-sm text-white/60 transition-colors hover:text-gold">
                  {l.label}
                </a>
              )
            )}
          </div>

          <div>
            <h4 className="mb-4 font-sora text-xs font-bold uppercase tracking-widest text-white">Company</h4>
            {FOOTER_COMPANY_LINKS.map((l) => (
              <a key={l} href="#" className="mb-2.5 block text-sm text-white/60 transition-colors hover:text-gold">
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <span>© 2026 {MARKET_NAME}. All rights reserved.</span>
          <SiteIdentification className="font-mono text-[11px] tracking-tight text-white/55 sm:text-right" />
        </div>
      </div>
    </footer>
  );
}

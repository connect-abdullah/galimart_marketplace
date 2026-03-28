"use client";
import Link from "next/link";
import { useCart } from "@/lib/store";
import { Search, Heart, ShoppingBag, Menu, X, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { HEADER_CATEGORY_LINKS, HEADER_NAV_LINKS } from "@/lib/constants/routes";
import Logo from "@/components/branding/Logo";
import CategoriesDropdown from "@/components/layout/CategoriesDropdown";
import clsx from "clsx";

function linkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const { count } = useCart();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/90 bg-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-lg">
      <div className="mx-auto flex h-[3.35rem] max-w-7xl items-center gap-2 px-3 sm:h-[3.75rem] sm:gap-3 sm:px-5 lg:px-8">
        <button
          type="button"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-transparent text-stone-600 transition hover:bg-cream hover:text-teal lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <Logo onNavigate={() => setMobileOpen(false)} className="min-w-0 sm:mr-1" />

        <nav className="mx-1 hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex xl:gap-1.5">
          <Link
            href="/"
            className={clsx(
              "whitespace-nowrap rounded-full px-2.5 py-2 text-[12px] font-semibold transition xl:px-3 xl:text-[13px]",
              pathname === "/"
                ? "bg-teal text-white shadow-sm shadow-teal/20"
                : "text-stone-500 hover:bg-cream hover:text-teal"
            )}
          >
            Home
          </Link>
          <CategoriesDropdown onNavigate={() => setMobileOpen(false)} />
          {HEADER_NAV_LINKS.map((l) => {
            const active = linkActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "whitespace-nowrap rounded-full px-2.5 py-2 text-[12px] font-semibold transition xl:px-3 xl:text-[13px]",
                  active
                    ? "bg-teal text-white shadow-sm shadow-teal/20"
                    : "text-stone-500 hover:bg-cream hover:text-teal",
                  l.highlight && !active && "text-teal/90"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <form
          onSubmit={handleSearch}
          className="mx-auto hidden h-10 max-w-md flex-[1_1_14rem] items-center gap-2 rounded-xl border border-border bg-cream/80 px-3 shadow-inner transition focus-within:border-teal focus-within:bg-white focus-within:ring-2 focus-within:ring-teal/15 md:flex lg:max-w-xs xl:max-w-md"
        >
          <Search size={16} className="flex-shrink-0 text-stone-400" aria-hidden />
          <input
            type="search"
            placeholder="Search rice, atta, milk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400"
          />
        </form>

        <div className="ml-auto flex flex-shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/contact"
            className="hidden h-10 w-10 items-center justify-center rounded-xl text-stone-500 transition hover:bg-cream hover:text-teal lg:flex"
            aria-label="Contact us"
          >
            <Mail size={18} />
          </Link>
          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-xl text-stone-500 transition hover:bg-cream hover:text-teal sm:flex"
            aria-label="Wishlist"
          >
            <Heart size={17} />
          </button>
          <Link
            href="/cart"
            className={clsx(
              "relative flex h-10 min-w-[2.5rem] items-center justify-center rounded-xl px-2.5 transition sm:px-3",
              count > 0
                ? "bg-teal text-white shadow-md shadow-teal/25 hover:bg-teal-light"
                : "border border-border bg-white text-stone-600 hover:border-teal/40 hover:text-teal"
            )}
            aria-label={`Shopping cart${count > 0 ? `, ${count} items` : ""}`}
          >
            <ShoppingBag size={17} strokeWidth={count > 0 ? 2.25 : 2} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-0.5 font-sora text-[10px] font-bold text-white ring-2 ring-white">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={`fixed left-0 top-[3.35rem] z-50 h-[calc(100dvh-3.35rem)] w-full max-w-sm border-r border-border bg-white shadow-2xl transition-transform duration-300 ease-out sm:top-[3.75rem] sm:h-[calc(100dvh-3.75rem)] lg:hidden ${
          mobileOpen ? "translate-x-0" : "pointer-events-none -translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col gap-1 overflow-y-auto p-4 pb-10">
          <form
            onSubmit={handleSearch}
            className="mb-3 flex h-11 items-center gap-2 rounded-xl border border-border bg-cream px-3 focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/15"
          >
            <Search size={17} className="text-stone-400" />
            <input
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
          </form>
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={clsx(
              "rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
              pathname === "/" ? "bg-teal text-white" : "text-stone-700 hover:bg-cream hover:text-teal"
            )}
          >
            Home
          </Link>
          {HEADER_NAV_LINKS.map((l) => {
            const active = linkActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                  active ? "bg-teal text-white" : "text-stone-700 hover:bg-cream hover:text-teal"
                )}
              >
                {l.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setMobileCatsOpen((o) => !o)}
            className="mt-2 flex w-full items-center justify-between rounded-xl bg-cream px-4 py-3 text-left text-sm font-bold text-ink"
            aria-expanded={mobileCatsOpen}
          >
            Categories
            <span className="text-xs text-stone-500">{mobileCatsOpen ? "Hide" : "Show"}</span>
          </button>
          {mobileCatsOpen && (
            <div className="flex flex-col gap-0.5 pl-2">
              {HEADER_CATEGORY_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    "rounded-lg px-4 py-2.5 text-sm font-medium",
                    pathname === item.href ? "text-teal" : "text-stone-600 hover:text-teal"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-teal"
              >
                View all products
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

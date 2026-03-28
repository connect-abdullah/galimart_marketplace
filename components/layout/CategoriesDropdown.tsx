"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LayoutGrid } from "lucide-react";
import { HEADER_CATEGORY_LINKS } from "@/lib/constants/routes";
import clsx from "clsx";

const CATEGORY_HREFS = new Set(HEADER_CATEGORY_LINKS.map((l) => l.href));

export default function CategoriesDropdown({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const categoryActive = CATEGORY_HREFS.has(pathname);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="categories-menu"
        id="categories-button"
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-semibold transition xl:px-3.5 xl:text-[13px]",
          open || categoryActive
            ? "bg-teal text-white shadow-sm shadow-teal/20"
            : "text-stone-500 hover:bg-cream hover:text-teal"
        )}
      >
        <LayoutGrid size={15} className="opacity-90" aria-hidden />
        Categories
        <ChevronDown
          size={15}
          className={clsx("transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div
          id="categories-menu"
          role="menu"
          aria-labelledby="categories-button"
          className="absolute left-0 top-[calc(100%+6px)] z-50 min-w-[220px] rounded-2xl border border-border bg-white py-2 shadow-xl shadow-ink/10 ring-1 ring-ink/5"
        >
          <p className="px-4 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Shop by aisle
          </p>
          {HEADER_CATEGORY_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              title={item.title}
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className={clsx(
                "block px-4 py-2.5 text-sm font-medium transition",
                pathname === item.href
                  ? "bg-cream text-teal"
                  : "text-stone-700 hover:bg-cream/80 hover:text-teal"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="my-1 border-t border-border" />
          <Link
            href="/products"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
            className="block px-4 py-2.5 text-sm font-semibold text-teal hover:bg-cream/80"
          >
            View all products
          </Link>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/constants/faq";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:border-teal/25"
          >
            <button
              type="button"
              id={`faq-trigger-${item.id}`}
              aria-expanded={open}
              aria-controls={`faq-panel-${item.id}`}
              onClick={() => setOpenId((c) => (c === item.id ? null : item.id))}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-cream/50"
            >
              <span className="font-sora text-base font-semibold text-ink">{item.question}</span>
              <ChevronDown
                size={20}
                className={clsx(
                  "flex-shrink-0 text-teal transition-transform duration-200",
                  open && "rotate-180"
                )}
                aria-hidden
              />
            </button>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-trigger-${item.id}`}
              className={clsx(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="border-t border-border/80 px-5 pb-5 pt-3 text-sm leading-relaxed text-stone-600">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { pageTitle } from "@/lib/constants/seo";
import { FAQ_ITEMS } from "@/lib/constants/faq";
import FaqAccordion from "@/components/faq/FaqAccordion";

export const metadata: Metadata = {
  title: pageTitle("FAQ"),
  description: "Delivery, payments, returns, and promos for GaliMart shoppers in Islamabad.",
};

export default function FaqPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="border-b border-border bg-gradient-to-br from-white via-cream to-lightgrey/60">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-2 text-xs text-stone-400">
            <Link href="/" className="hover:text-teal">
              Home
            </Link>
            {" / "}
            <span className="text-stone-600">FAQ</span>
          </div>
          <h1 className="font-sora text-3xl font-bold text-ink">Frequently asked questions</h1>
          <p className="mt-3 text-sm text-stone-600 sm:text-base">
            Quick answers about delivery in Islamabad, payments, returns, and promo codes. Still stuck?{" "}
            <Link href="/contact" className="font-semibold text-teal hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <FaqAccordion items={FAQ_ITEMS} />
      </div>
    </div>
  );
}

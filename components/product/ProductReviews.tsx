"use client";

import type { Product } from "@/lib/data";
import { getProductReviews, formatReviewDate } from "@/lib/reviews";
import { Star, BadgeCheck } from "lucide-react";
import { MARKET_NAME } from "@/lib/constants/branding";

interface Props {
  product: Product;
}

export default function ProductReviews({ product }: Props) {
  const items = getProductReviews(product);
  const avg = product.rating;

  return (
    <section className="mb-16 border-t border-border pt-12" aria-labelledby="reviews-heading">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="reviews-heading" className="font-sora text-xl font-bold text-gray-900">
            Customer <span className="text-teal">reviews</span>
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Recent ratings from verified and guest shoppers on {MARKET_NAME}.
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-offwhite px-5 py-4">
          <div className="text-center md:text-left">
            <div className="font-sora text-3xl font-bold text-teal">{avg.toFixed(1)}</div>
            <div className="mt-0.5 flex justify-center text-gold md:justify-start" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.round(avg) ? "fill-gold text-gold" : "fill-transparent text-gold/35"}
                />
              ))}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {product.reviews.toLocaleString()} reviews · {items.length} featured below
            </div>
          </div>
        </div>
      </div>

      <ul className="space-y-5">
        {items.map((r) => (
          <li
            key={r.id}
            className="rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-gray-900">{r.author}</span>
                  {r.verifiedPurchase && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-teal/10 px-2 py-0.5 text-[11px] font-semibold text-teal">
                      <BadgeCheck size={12} strokeWidth={2.5} aria-hidden />
                      Verified purchase
                    </span>
                  )}
                </div>
                <time className="mt-0.5 block text-xs text-gray-400" dateTime={r.date}>
                  {formatReviewDate(r.date)}
                </time>
              </div>
              <div className="flex text-gold" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.round(r.rating) ? "fill-gold text-gold" : "fill-transparent text-gold/30"
                    }
                  />
                ))}
              </div>
            </div>
            <h3 className="mt-3 font-sora text-sm font-semibold text-gray-800">{r.headline}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{r.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

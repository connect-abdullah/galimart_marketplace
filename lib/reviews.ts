import type { Product } from "./data";
import { MARKET_NAME } from "./constants/branding";

export interface ProductReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  headline: string;
  comment: string;
  verifiedPurchase: boolean;
}

/** Curated sample reviews per product for the PDP. */
export function getProductReviews(product: Product): ProductReviewItem[] {
  const id = product.id;
  const base = [
    {
      id: `${id}-a`,
      author: "Ayesha K.",
      rating: Math.min(5, Math.round(product.rating)),
      date: "2026-02-18",
      headline: "Would recommend",
      comment: `Really happy with this ${product.subCategory.toLowerCase()}. Quality matches the photos and description; feels worth the price.`,
      verifiedPurchase: true,
    },
    {
      id: `${id}-b`,
      author: "Omar S.",
      rating: Math.max(4, Math.min(5, Math.round(product.rating) - (id % 2))),
      date: "2026-02-02",
      headline: "Solid purchase",
      comment:
        "Fast delivery in Islamabad. Packaging was neat. Only small note: check the size guide if you’re between sizes.",
      verifiedPurchase: true,
    },
    {
      id: `${id}-c`,
      author: "Sara H.",
      rating: 5,
      date: "2026-01-21",
      headline: "Exceeded expectations",
      comment: `${MARKET_NAME} has become my go-to for ${product.category.toLowerCase()}. This item in particular (${product.name.split(" ").slice(0, 3).join(" ")}) is exactly what I wanted.`,
      verifiedPurchase: false,
    },
    {
      id: `${id}-d`,
      author: "Zaid R.",
      rating: 4,
      date: "2025-12-09",
      headline: "Great value",
      comment:
        "Good for everyday use. Customer support answered my questions quickly before I ordered.",
      verifiedPurchase: true,
    },
  ];
  return base;
}

export function formatReviewDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

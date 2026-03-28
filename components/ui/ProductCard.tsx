"use client";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/data";
import { useCart } from "@/lib/store";
import { showToast } from "@/components/ui/Toast";
import { Plus } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";

interface Props {
  product: Product;
}

const BADGE_STYLES: Record<string, string> = {
  Hot: "bg-teal text-white",
  sale: "bg-red-600 text-white",
  new: "bg-gold text-white",
};

const BADGE_LABELS: Record<string, string> = {
  Hot: "HOT",
  sale: "SALE",
  new: "NEW",
};

export default function ProductCard({ product }: Props) {
  const { dispatch } = useCart();
  const cover = product.images[0];

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: "ADD", product, qty: 1 });
    showToast(`${product.name} added to your cart.`, { variant: "success" });
  };

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block overflow-hidden rounded-2xl border border-border/90 bg-white shadow-sm ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:border-teal/30 hover:shadow-xl hover:ring-teal/10"
    >
      {/* Image area */}
      <div className="relative h-52 w-full overflow-hidden bg-lightgrey">
        <ProductImage
          src={cover}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {product.badge && (
          <div className={`absolute left-2.5 top-2.5 z-10 text-[11px] font-bold font-sora px-2 py-0.5 rounded ${BADGE_STYLES[product.badge]}`}>
            {BADGE_LABELS[product.badge]}
          </div>
        )}

        <button
          type="button"
          className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
          aria-label="Add to wishlist"
        >
          ♥
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">
          {product.category} · {product.subCategory}
        </div>
        <div className="text-sm font-semibold text-gray-900 mb-1.5 leading-snug line-clamp-2">
          {product.name}
        </div>
        <div className="text-xs text-gold mb-2">
          {"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}
          <span className="text-gray-400 ml-1">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-base font-bold text-teal font-sora">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
            )}
            {discount && (
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                -{discount}%
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="w-8 h-8 bg-teal hover:bg-teal-light text-white rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-110"
            aria-label="Add to cart"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
}

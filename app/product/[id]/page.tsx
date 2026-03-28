"use client";
import { useParams, useRouter } from "next/navigation";
import { products, formatPrice, categoryShopHref } from "@/lib/data";
import { useCart } from "@/lib/store";
import { showToast } from "@/components/ui/Toast";
import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import ProductImage from "@/components/ui/ProductImage";
import ProductReviews from "@/components/product/ProductReviews";
import { LogoMark } from "@/components/branding/Logo";
import {
  ShoppingBag,
  Minus,
  Plus,
  Lock,
  RotateCcw,
  BadgeCheck,
  Truck,
} from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const product = products.find((p) => p.id === Number(id));
  const { dispatch } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="mb-5 flex justify-center">
          <LogoMark href="/" className="h-20 sm:h-24" />
        </div>
        <h2 className="text-xl font-bold mb-2 font-sora">Product not found</h2>
        <Link href="/products" className="text-teal hover:underline text-sm">
          ← Back to products
        </Link>
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const gallery = product.images;

  const handleAddToCart = () => {
    dispatch({ type: "ADD", product, qty, size: selectedSize, color: selectedColor });
    showToast(`${product.name} added to your cart.`, { variant: "success" });
  };

  const handleBuyNow = () => {
    dispatch({ type: "ADD", product, qty, size: selectedSize, color: selectedColor });
    router.push("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
        <Link href="/" className="hover:text-teal">Home</Link>
        <span>›</span>
        <Link href={categoryShopHref(product.category)} className="hover:text-teal">
          {product.category}
        </Link>
        <span>›</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-0">
        {/* Images */}
        <div>
          <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-xl border border-border bg-lightgrey">
            <ProductImage
              src={gallery[activeThumb] ?? gallery[0]}
              alt={`${product.name}, image ${activeThumb + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-contain sm:object-cover"
            />
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveThumb(i)}
                className={`relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-lg border-2 bg-midgrey/20 transition-all ${
                  activeThumb === i ? "border-teal ring-2 ring-teal/20" : "border-transparent hover:border-border"
                }`}
              >
                <ProductImage
                  src={src}
                  alt=""
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-teal mb-2">
            {product.category} · {product.subCategory}
          </div>
          <h1 className="text-2xl font-bold font-sora mb-3 leading-snug">{product.name}</h1>

          {/* Stars */}
          <div className="flex items-center gap-2 mb-4 text-sm">
            <span className="text-gold text-base">
              {"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}
            </span>
            <a href="#reviews-heading" className="text-gray-400 hover:text-teal transition-colors">
              {product.rating} ({product.reviews.toLocaleString()} reviews)
            </a>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <span className="text-3xl font-bold text-teal font-sora">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
            )}
            {discount && (
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                Save {discount}%
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="text-sm font-semibold text-green-700 mb-4 flex items-center gap-1.5">
            <BadgeCheck size={16} className="text-green-600" aria-hidden />
            In stock: only {product.inStock} left
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-5 border-b border-border pb-5">
            {product.description}
          </p>

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div className="mb-4">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Size</div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[40px] h-9 px-3 border rounded text-sm font-medium transition-all ${
                      selectedSize === s
                        ? "border-teal bg-teal/10 text-teal font-bold"
                        : "border-border text-gray-600 hover:border-teal hover:text-teal"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mb-5">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Colour {selectedColor && <span className="text-teal normal-case font-normal">: {selectedColor}</span>}
              </div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColor === c.name
                        ? "border-teal scale-110"
                        : "border-transparent hover:border-teal/50 hover:scale-105"
                    }`}
                    style={{
                      background: c.hex,
                      boxShadow: c.hex === "#ecf0f1" || c.hex === "#f5f5f0" || c.hex === "#fffff0" || c.hex === "#fffdd0"
                        ? "inset 0 0 0 1px #e0e0dc"
                        : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-5">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-700">Quantity</div>
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 bg-offwhite hover:bg-midgrey flex items-center justify-center transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(product.inStock, q + 1))}
                className="w-9 h-9 bg-offwhite hover:bg-midgrey flex items-center justify-center transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mb-5">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-teal hover:bg-teal-light text-white py-3.5 rounded-lg font-bold font-sora text-sm transition-colors"
            >
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 bg-gold hover:bg-gold-light text-white py-3.5 rounded-lg font-bold font-sora text-sm transition-colors"
            >
              Buy Now
            </button>
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { icon: Lock, label: "Secure payment" },
              { icon: RotateCcw, label: "7-day returns" },
              { icon: BadgeCheck, label: "100% authentic" },
              { icon: Truck, label: "Fast delivery" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-offwhite px-3 py-1.5 text-xs text-gray-600"
              >
                <Icon size={13} className="text-teal" aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ProductReviews product={product} />

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-4">
          <h2 className="text-xl font-bold font-sora mb-6">
            You might also <span className="text-teal">like</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}

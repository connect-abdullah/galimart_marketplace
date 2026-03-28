"use client";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { showToast } from "@/components/ui/Toast";
import Link from "next/link";
import { Trash2, Heart, ShoppingBag } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";
import { useState } from "react";
import { ANNOUNCEMENT } from "@/lib/constants/copy";
import { LogoMark } from "@/components/branding/Logo";

export default function CartPage() {
  const { state, dispatch, total, count } = useCart();
  const [promoInput, setPromoInput] = useState("");

  const promoApplied = state.promoApplied;
  const discount = promoApplied ? Math.round(total * 0.1) : 0;
  const delivery = total >= 2000 ? 0 : 200;
  const finalTotal = total - discount + delivery;

  const applyPromo = () => {
    if (promoInput.trim().toUpperCase() === ANNOUNCEMENT.code) {
      dispatch({ type: "SET_PROMO", applied: true });
      showToast("Promo code applied: 10% off your subtotal.", {
        variant: "success",
      });
    } else {
      showToast(`That code isn’t valid. Try ${ANNOUNCEMENT.code}.`, { variant: "error" });
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="mb-6 flex justify-center">
          <LogoMark href="/" className="h-20 sm:h-24" />
        </div>
        <h2 className="text-2xl font-bold font-sora mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-sm">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-white px-7 py-3 rounded-lg font-semibold font-sora text-sm transition-colors"
        >
          <ShoppingBag size={15} /> Start Shopping
        </Link>
      </div>
    );
  }

  const lineArgs = (item: (typeof state.items)[0]) => ({
    productId: item.product.id,
    size: item.size,
    color: item.color,
  });

  return (
    <>
      <div className="bg-offwhite border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="text-xs text-gray-400 mb-1">
            <Link href="/" className="hover:text-teal">Home</Link> › <span className="text-gray-700">Cart</span>
          </div>
          <h1 className="text-xl font-bold font-sora">
            Your Cart{" "}
            <span className="text-base font-normal text-gray-500">({count} item{count !== 1 ? "s" : ""})</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
          {/* Items */}
          <div>
            {state.items.map((item) => (
              <div key={`${item.product.id}-${item.size ?? ""}-${item.color ?? ""}`} className="flex gap-4 py-5 border-b border-border">
                {/* Image */}
                <Link
                  href={`/product/${item.product.id}`}
                  className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-lightgrey hover:border-teal transition-colors"
                >
                  <ProductImage
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="96px"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                    {item.product.category} · {item.product.subCategory}
                  </div>
                  <Link href={`/product/${item.product.id}`} className="text-sm font-semibold text-gray-900 hover:text-teal line-clamp-2 leading-snug">
                    {item.product.name}
                  </Link>
                  <div className="text-xs text-gray-400 mt-1 mb-3">
                    {[item.size && `Size: ${item.size}`, item.color && `Colour: ${item.color}`]
                      .filter(Boolean)
                      .join(" · ")}
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    {/* Qty */}
                    <div className="flex items-center border border-border rounded overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {
                          const a = lineArgs(item);
                          if (item.qty <= 1) dispatch({ type: "REMOVE_LINE", ...a });
                          else
                            dispatch({
                              type: "UPDATE_QTY_LINE",
                              ...a,
                              qty: item.qty - 1,
                            });
                        }}
                        className="w-7 h-7 bg-offwhite hover:bg-midgrey text-sm flex items-center justify-center transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QTY_LINE",
                            ...lineArgs(item),
                            qty: item.qty + 1,
                          })
                        }
                        className="w-7 h-7 bg-offwhite hover:bg-midgrey text-sm flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch({ type: "REMOVE_LINE", ...lineArgs(item) });
                        showToast("Removed from your cart.", { variant: "info" });
                      }}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        showToast("Saved to your wishlist.", { variant: "success" })
                      }
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-teal transition-colors"
                    >
                      <Heart size={12} /> Wishlist
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-base font-bold text-teal font-sora flex-shrink-0 pt-1">
                  {formatPrice(item.product.price * item.qty)}
                </div>
              </div>
            ))}

            <div className="mt-4">
              <Link href="/products" className="text-sm text-teal hover:underline">← Continue Shopping</Link>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-offwhite border border-border rounded-lg p-6 self-start sticky top-20">
            <h3 className="font-sora font-bold text-base mb-5">Order Summary</h3>

            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal ({count} item{count !== 1 ? "s" : ""})</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span className={delivery === 0 ? "text-teal font-medium" : ""}>
                  {delivery === 0 ? "Free" : formatPrice(delivery)}
                </span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-red-600">
                  <span>Discount ({ANNOUNCEMENT.code})</span>
                  <span>−{formatPrice(discount)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between font-bold text-base pt-3 border-t border-border mb-4">
              <span>Total</span>
              <span className="text-teal font-sora">{formatPrice(finalTotal)}</span>
            </div>

            {/* Promo */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Promo code"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                disabled={promoApplied}
                className="flex-1 border border-border rounded px-3 py-2 text-sm outline-none focus:border-teal disabled:bg-midgrey/40 disabled:text-gray-500"
              />
              <button
                type="button"
                onClick={applyPromo}
                disabled={promoApplied}
                className="bg-teal text-white px-3 py-2 rounded text-sm font-semibold hover:bg-teal-light transition-colors whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none"
              >
                Apply
              </button>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-gold hover:bg-gold-light text-white text-center py-3.5 rounded-lg font-bold font-sora text-sm transition-colors"
            >
              Proceed to Checkout →
            </Link>

            <p className="text-center text-xs text-gray-400 mt-3">
              🔒 Payments are 100% secure & encrypted
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

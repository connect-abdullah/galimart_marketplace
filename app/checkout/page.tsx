"use client";
import { useState } from "react";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { showToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductImage from "@/components/ui/ProductImage";
import { LogoMark } from "@/components/branding/Logo";
import { MARKET_NAME } from "@/lib/constants/branding";
import { ANNOUNCEMENT } from "@/lib/constants/copy";

const STEPS = ["Cart", "Details", "Payment", "Confirm"];

const CITIES = ["Islamabad", "Rawalpindi", "Lahore", "Karachi", "Faisalabad", "Peshawar", "Quetta", "Multan", "Hyderabad", "Sialkot"];
const PROVINCES = ["Sindh", "Punjab", "KPK", "Balochistan", "ICT"];

const PAYMENT_OPTS = [
  { id: "cod", label: "Cash on Delivery (COD)", sub: "Pay when your order arrives" },
  { id: "jazzcash", label: "JazzCash", sub: "Pay via JazzCash wallet or mobile account" },
  { id: "easypaisa", label: "EasyPaisa", sub: "Pay via EasyPaisa wallet or OTC" },
  { id: "card", label: "Debit / Credit Card", sub: "Visa, Mastercard with secure 3D verification" },
];

export default function CheckoutPage() {
  const { state, total, count, dispatch } = useCart();
  const router = useRouter();
  const [payment, setPayment] = useState("cod");
  const [step] = useState(1); // currently on step 2 (Details)
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", address: "", city: "Islamabad", province: "ICT",
  });

  const delivery = total >= 2000 ? 0 : 200;
  const discount = state.promoApplied ? Math.round(total * 0.1) : 0;
  const finalTotal = total - discount + delivery;

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const placeOrder = () => {
    if (!form.firstName || !form.lastName || !form.phone || !form.address) {
      showToast("Please fill in all required fields (name, phone, address).", {
        variant: "error",
      });
      return;
    }
    showToast(`Order placed successfully. Thank you for shopping with ${MARKET_NAME}!`, {
      variant: "success",
    });
    dispatch({ type: "CLEAR" });
    setTimeout(() => router.push("/"), 1800);
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="mb-5 flex justify-center">
          <LogoMark href="/" className="h-20 sm:h-24" />
        </div>
        <h2 className="text-xl font-bold mb-3 font-sora">Your cart is empty</h2>
        <Link href="/products" className="text-teal hover:underline text-sm">← Shop products</Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-offwhite border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-xl font-bold font-sora">Checkout</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold font-sora z-10 relative transition-all ${
                    i < step
                      ? "bg-teal border-teal text-white"
                      : i === step
                      ? "border-teal text-teal"
                      : "border-border text-gray-400"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-[11px] whitespace-nowrap ${
                    i === step ? "text-teal font-semibold" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-24 h-0.5 mb-5 mx-1 ${i < step ? "bg-teal" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
          {/* Form */}
          <div>
            {/* Delivery Info */}
            <div className="mb-6">
              <h3 className="font-sora font-bold text-base border-b border-border pb-3 mb-4">
                Delivery Information
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Field label="First Name *" value={form.firstName} onChange={update("firstName")} placeholder="Muhammad" />
                <Field label="Last Name *" value={form.lastName} onChange={update("lastName")} placeholder="Abdullah" />
                <div className="col-span-2">
                  <Field label="Email Address" type="email" value={form.email} onChange={update("email")} placeholder="you@email.com" />
                </div>
                <div className="col-span-2">
                  <Field label="Phone Number *" type="tel" value={form.phone} onChange={update("phone")} placeholder="+92 300 0000000" />
                </div>
                <div className="col-span-2">
                  <Field label="Delivery Address *" value={form.address} onChange={update("address")} placeholder="House #, Street, Area" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">City</label>
                  <select value={form.city} onChange={update("city")} className="border border-border rounded px-3 py-2.5 text-sm outline-none focus:border-teal bg-white text-gray-800">
                    {CITIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Province</label>
                  <select value={form.province} onChange={update("province")} className="border border-border rounded px-3 py-2.5 text-sm outline-none focus:border-teal bg-white text-gray-800">
                    {PROVINCES.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h3 className="font-sora font-bold text-base border-b border-border pb-3 mb-4">
                Payment Method
              </h3>
              <div className="space-y-2">
                {PAYMENT_OPTS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-3.5 border-[1.5px] rounded-lg cursor-pointer transition-all ${
                      payment === opt.id ? "border-teal bg-teal/[0.04]" : "border-border hover:border-teal/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.id}
                      checked={payment === opt.id}
                      onChange={() => setPayment(opt.id)}
                      className="accent-teal"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{opt.label}</div>
                      <div className="text-xs text-gray-400">{opt.sub}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order review */}
          <div className="bg-offwhite border border-border rounded-lg p-5 self-start sticky top-20">
            <h3 className="font-sora font-bold text-sm mb-4">Order Review</h3>

            <div className="space-y-3 mb-4">
              {state.items.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center gap-2.5 text-sm">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-midgrey">
                    <ProductImage
                      src={item.product.images[0]}
                      alt=""
                      fill
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 text-xs leading-snug line-clamp-2">{item.product.name}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      {[item.size, item.color, `×${item.qty}`].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-teal font-sora flex-shrink-0">
                    {formatPrice(item.product.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3 space-y-2 text-sm text-gray-500 mb-4">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
              {state.promoApplied && (
                <div className="flex justify-between text-red-600">
                  <span>Discount ({ANNOUNCEMENT.code})</span>
                  <span>−{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between"><span>Delivery</span><span className={delivery === 0 ? "text-teal" : ""}>{delivery === 0 ? "Free" : formatPrice(delivery)}</span></div>
              <div className="flex justify-between font-bold text-base text-gray-900 pt-1 border-t border-border">
                <span>Total</span>
                <span className="text-teal font-sora">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              className="w-full bg-teal hover:bg-teal-light text-white py-3.5 rounded-lg font-bold font-sora text-sm transition-colors flex items-center justify-center gap-2"
            >
              🔒 Place order: {formatPrice(finalTotal)}
            </button>
            <p className="text-center text-[11px] text-gray-400 mt-2">
              256-bit SSL encryption · Verified secure
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-border rounded px-3 py-2.5 text-sm outline-none focus:border-teal text-gray-800 placeholder-gray-300 transition-colors"
      />
    </div>
  );
}

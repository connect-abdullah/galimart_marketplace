"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { products, categories } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import { X, Search } from "lucide-react";
import { LogoMark } from "@/components/branding/Logo";
import Link from "next/link";
import { Suspense } from "react";

const PACK_OPTIONS = [
  "100 g",
  "200 g",
  "250 g",
  "250 ml",
  "400 g",
  "475 g",
  "500 g",
  "500 ml",
  "1 kg",
  "1 L",
  "2 kg",
  "2 L",
  "5 kg",
  "5 L",
  "10 kg",
  "3-pack",
  "6-pack",
];

const PRICE_RANGES = [
  { label: "Under 500", min: 0, max: 500 },
  { label: "500 – 1,000", min: 500, max: 1000 },
  { label: "1,000 – 2,000", min: 1000, max: 2000 },
  { label: "Above 2,000", min: 2000, max: Infinity },
];

const SORT_OPTIONS = [
  { label: "Best Selling", value: "best" },
  { label: "Newest First", value: "new" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
  { label: "Highest Rated", value: "rating" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const categoryParam = searchParams.get("category") || "";
  const badgeParam = searchParams.get("badge") || "";
  const searchParam = searchParams.get("search") || "";

  const [selectedPacks, setSelectedPacks] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [sort, setSort] = useState("best");

  useEffect(() => {
    setSelectedPacks([]);
    setSelectedPrices([]);
  }, [searchParam, categoryParam, badgeParam]);

  const togglePack = (s: string) =>
    setSelectedPacks((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const togglePrice = (i: number) =>
    setSelectedPrices((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  const filtered = useMemo(() => {
    let list = [...products];

    if (searchParam) {
      const q = searchParam.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q)
      );
    }

    if (badgeParam) list = list.filter((p) => p.badge === badgeParam);

    if (categoryParam) list = list.filter((p) => p.category === categoryParam);

    if (selectedPacks.length > 0)
      list = list.filter((p) => selectedPacks.some((s) => p.sizes.includes(s)));

    if (selectedPrices.length > 0) {
      const ranges = selectedPrices.map((i) => PRICE_RANGES[i]);
      list = list.filter((p) => ranges.some((r) => p.price >= r.min && p.price < r.max));
    }

    switch (sort) {
      case "asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        list = list.filter((p) => p.badge === "new").concat(list.filter((p) => p.badge !== "new"));
        break;
    }

    return list;
  }, [selectedPacks, selectedPrices, sort, badgeParam, searchParam, categoryParam]);

  const pageTitle = searchParam
    ? `Results for “${searchParam}”`
    : badgeParam === "sale"
      ? "On sale"
      : badgeParam === "new"
        ? "New arrivals"
        : categoryParam || "All products";

  return (
    <>
      <div className="border-b border-border bg-offwhite">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="mb-1 text-xs text-gray-400">
            <Link href="/" className="hover:text-teal">
              Home
            </Link>
            {" › "}
            <span className="text-gray-700">{pageTitle}</span>
          </div>
          <h1 className="font-sora text-xl font-bold md:text-2xl">{pageTitle}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Filter by pack size and price, or jump to a dedicated aisle from the sidebar.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl gap-7 px-6 py-8">
        <aside className="hidden w-52 flex-shrink-0 md:block">
          <div className="mb-3 overflow-hidden rounded-lg border border-border">
            <div className="border-b border-border bg-offwhite px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600">
              Departments
            </div>
            <div className="p-3">
              {categories.map((c) => {
                const isActive =
                  c.label === "All"
                    ? pathname === "/products" && !categoryParam
                    : pathname === c.href ||
                      (pathname === "/products" && categoryParam === c.label);
                return (
                  <Link
                    key={c.label}
                    href={c.href}
                    className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm transition-all ${
                      isActive ? "bg-teal/10 font-semibold text-teal" : "text-gray-500 hover:text-teal"
                    }`}
                  >
                    <span aria-hidden>{c.emoji}</span>
                    {c.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mb-3 overflow-hidden rounded-lg border border-border">
            <div className="border-b border-border bg-offwhite px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600">
              Price (PKR)
            </div>
            <div className="space-y-1 p-3">
              {PRICE_RANGES.map((r, i) => (
                <label
                  key={r.label}
                  className="flex cursor-pointer items-center gap-2 py-0.5 text-sm text-gray-500 hover:text-teal"
                >
                  <input
                    type="checkbox"
                    checked={selectedPrices.includes(i)}
                    onChange={() => togglePrice(i)}
                    className="accent-teal"
                  />
                  {r.label}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-3 overflow-hidden rounded-lg border border-border">
            <div className="border-b border-border bg-offwhite px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600">
              Pack / size
            </div>
            <div className="flex flex-wrap gap-1.5 p-3">
              {PACK_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => togglePack(s)}
                  className={`rounded border px-2 py-1 text-[11px] font-medium transition-all ${
                    selectedPacks.includes(s)
                      ? "border-teal bg-teal/10 font-bold text-teal"
                      : "border-border text-gray-500 hover:border-teal hover:text-teal"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {(selectedPacks.length > 0 || selectedPrices.length > 0) && (
            <button
              type="button"
              onClick={() => {
                setSelectedPacks([]);
                setSelectedPrices([]);
              }}
              className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              Sort by:
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded border border-border bg-white px-2 py-1.5 text-sm text-gray-700 outline-none focus:border-teal"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <div className="mb-5 flex justify-center opacity-90">
                <LogoMark href="/" className="h-16 sm:h-20" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-600">No products found</h3>
              <p className="text-sm">Try different filters or search keywords.</p>
              <Link href="/products" className="mt-4 inline-block text-sm font-semibold text-teal hover:underline">
                View all products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-400">Loading products…</div>}>
      <ProductsContent />
    </Suspense>
  );
}

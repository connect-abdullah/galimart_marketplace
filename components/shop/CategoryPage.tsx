import Link from "next/link";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";

interface CategoryPageProps {
  category: string;
  title: string;
  description: string;
}

export default function CategoryPage({ category, title, description }: CategoryPageProps) {
  const list = products.filter((p) => p.category === category);

  return (
    <>
      <div className="border-b border-border bg-gradient-to-br from-white via-cream to-lightgrey/80">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
          <div className="mb-2 text-xs text-gray-400">
            <Link href="/" className="transition-colors hover:text-teal">
              Home
            </Link>
            {" › "}
            <Link href="/products" className="transition-colors hover:text-teal">
              Shop
            </Link>
            {" › "}
            <span className="text-gray-700">{title}</span>
          </div>
          <h1 className="font-sora text-2xl font-bold text-ink md:text-3xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
            {description}
          </p>
          <p className="mt-4 text-sm font-medium text-teal">
            {list.length} product{list.length !== 1 ? "s" : ""} in this aisle
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Tap any item for full details, pack sizes, and reviews.
          </p>
          <Link
            href="/products"
            className="text-sm font-semibold text-teal transition-colors hover:text-teal-dark"
          >
            Browse all departments →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
  );
}

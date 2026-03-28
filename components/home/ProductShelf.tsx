import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Product } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";

interface ProductShelfProps {
  title: string;
  titleAccent: string;
  subtitle: string;
  seeAllHref: string;
  products: Product[];
}

export default function ProductShelf({
  title,
  titleAccent,
  subtitle,
  seeAllHref,
  products,
}: ProductShelfProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-sora text-xl font-bold text-ink">
            {title}{" "}
            <span className="text-teal">{titleAccent}</span>
          </h2>
          <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
        </div>
        <Link
          href={seeAllHref}
          className="inline-flex items-center gap-1 text-sm font-semibold text-teal transition-all hover:gap-2"
        >
          See all <ChevronRight size={15} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p, i) => (
          <div
            key={p.id}
            className="animate-fade-in-up motion-reduce:animate-none motion-reduce:opacity-100 opacity-0 [animation-fill-mode:forwards]"
            style={{ animationDelay: `${Math.min(i, 5) * 55}ms` }}
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

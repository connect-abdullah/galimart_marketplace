import Link from "next/link";
import { categories } from "@/lib/data";

const pills = categories.filter((c) => c.label !== "All");

export default function CategoryPills() {
  return (
    <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="mb-5 font-sora text-xl font-bold text-ink opacity-0 animate-fade-in motion-reduce:animate-none motion-reduce:opacity-100">
        Shop by <span className="text-teal">aisle</span>
      </h2>
      <div className="mb-14 flex flex-wrap gap-3">
        {pills.map((c, i) => (
          <Link
            key={c.label}
            href={c.href}
            className="flex items-center gap-2.5 rounded-2xl border border-border bg-white px-5 py-3 text-sm font-semibold text-stone-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal/40 hover:bg-cream hover:text-teal hover:shadow-md motion-reduce:transform-none motion-reduce:opacity-100 animate-fade-in-up motion-reduce:animate-none opacity-0 [animation-fill-mode:forwards]"
            style={{ animationDelay: `${i * 45}ms` }}
          >
            <span className="text-xl" aria-hidden>
              {c.emoji}
            </span>
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

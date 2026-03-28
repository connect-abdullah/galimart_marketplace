import { Truck, RotateCcw, Lock, Leaf } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Scheduled delivery", sub: "Same-day slots in select areas" },
  { icon: RotateCcw, title: "Easy returns", sub: "Damaged or wrong item? We’ll fix it" },
  { icon: Lock, title: "Secure checkout", sub: "JazzCash, EasyPaisa & cards" },
  { icon: Leaf, title: "Quality first", sub: "Staples from trusted mills & farms" },
];

export default function TrustBar() {
  return (
    <div className="border-b border-border bg-gradient-to-b from-white to-cream/90">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 py-4 sm:px-6 md:flex md:flex-wrap md:justify-around md:gap-0 md:py-5 lg:px-8">
        {ITEMS.map(({ icon: Icon, title, sub }, i) => (
          <div
            key={title}
            className="flex items-center gap-3 px-1 py-2 md:px-2 animate-fade-in motion-reduce:animate-none motion-reduce:opacity-100 opacity-0 [animation-fill-mode:forwards]"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <Icon size={18} aria-hidden />
            </span>
            <div className="min-w-0">
              <strong className="block text-xs font-semibold text-ink sm:text-sm">{title}</strong>
              <span className="text-[11px] text-stone-500 sm:text-xs">{sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { products } from "@/lib/data";
import TrustBar from "@/components/ui/TrustBar";
import HeroSection from "@/components/home/HeroSection";
import CategoryPills from "@/components/home/CategoryPills";
import ProductShelf from "@/components/home/ProductShelf";
import PromoBanner from "@/components/home/PromoBanner";

export default function HomePage() {
  const trending = products.filter((p) => p.badge === "Hot" || p.rating >= 4.7).slice(0, 4);
  const newArrivals = products.filter((p) => p.badge === "new").slice(0, 4);

  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoryPills />
      <ProductShelf
        title="Popular"
        titleAccent="right now"
        subtitle="Top-rated staples customers reorder every week"
        seeAllHref="/products"
        products={trending.length >= 4 ? trending : products.slice(0, 4)}
      />
      <PromoBanner />
      <div className="pb-16">
        <ProductShelf
          title="New"
          titleAccent="on the shelf"
          subtitle="Recently added lines across dairy, fish, and general"
          seeAllHref="/products?badge=new"
          products={newArrivals.length >= 4 ? newArrivals : products.slice(4, 8)}
        />
      </div>
    </>
  );
}

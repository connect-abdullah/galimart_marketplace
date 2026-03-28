import CategoryPage from "@/components/shop/CategoryPage";
import { pageTitle } from "@/lib/constants/seo";

export const metadata = {
  title: pageTitle("Dairy products"),
  description: "Milk, yogurt, cheese, butter and more: cold-chain friendly staples.",
};

export default function DairyPage() {
  return (
    <CategoryPage
      category="Dairy Products"
      title="Dairy products"
      description="Pasteurised milk, thick yogurt, cheese, and butter, handled with care for freshness and everyday nutrition."
    />
  );
}

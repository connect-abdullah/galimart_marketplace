import CategoryPage from "@/components/shop/CategoryPage";
import { pageTitle } from "@/lib/constants/seo";

export const metadata = {
  title: pageTitle("Wheat & flour"),
  description: "Fresh chakki atta, whole wheat flour, and maida for rotis and baking.",
};

export default function WheatPage() {
  return (
    <CategoryPage
      category="Wheat"
      title="Wheat & flour"
      description="Stone-ground atta, fortified whole wheat, and refined maida, milled for soft rotis, naan, and home baking."
    />
  );
}

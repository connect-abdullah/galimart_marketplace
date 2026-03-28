import CategoryPage from "@/components/shop/CategoryPage";
import { pageTitle } from "@/lib/constants/seo";

export const metadata = {
  title: pageTitle("General items"),
  description: "Pantry staples, snacks, and household essentials in one aisle.",
};

export default function GeneralItemsPage() {
  return (
    <CategoryPage
      category="General Items"
      title="General items"
      description="Cooking oil, sugar, pulses, tea, snacks, and household goods: everything beyond the fresh aisles, with clear pack sizes and prices."
    />
  );
}

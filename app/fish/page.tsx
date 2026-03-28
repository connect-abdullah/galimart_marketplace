import CategoryPage from "@/components/shop/CategoryPage";
import { pageTitle } from "@/lib/constants/seo";

export const metadata = {
  title: pageTitle("Fish & seafood"),
  description: "Fresh fillets, frozen prawns, and deli seafood.",
};

export default function FishPage() {
  return (
    <CategoryPage
      category="Fish"
      title="Fish & seafood"
      description="Fresh-cut river fish, frozen prawns, and cold-smoked options, ideal for curries, grills, and weekend specials."
    />
  );
}

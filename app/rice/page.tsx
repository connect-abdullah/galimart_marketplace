import CategoryPage from "@/components/shop/CategoryPage";
import { pageTitle } from "@/lib/constants/seo";

export const metadata = {
  title: pageTitle("Rice"),
  description: "Basmati, sella, brown rice and value packs delivered in Islamabad.",
};

export default function RicePage() {
  return (
    <CategoryPage
      category="Rice"
      title="Rice"
      description="Premium basmati, parboiled sella, brown rice, and bulk value packs, sourced for aroma, length, and consistent cooking."
    />
  );
}

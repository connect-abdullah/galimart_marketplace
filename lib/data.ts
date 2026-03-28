import { CATEGORY_ROUTE, type CategoryRouteKey } from "@/lib/constants/routes";
import {
  imagesForProduct,
  pexelsPhoto,
  PLACEHOLDER_PEXELS_IDS,
} from "@/lib/constants/productImages";

export interface Product {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  oldPrice?: number;
  images: string[];
  badge?: "Hot" | "sale" | "new";
  rating: number;
  reviews: number;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: number;
}

export function productImageUrl(seed: number): string {
  const id = PLACEHOLDER_PEXELS_IDS[Math.abs(seed) % PLACEHOLDER_PEXELS_IDS.length];
  return pexelsPhoto(id);
}

export function categoryShopHref(category: string): string {
  if (category in CATEGORY_ROUTE) {
    return CATEGORY_ROUTE[category as CategoryRouteKey];
  }
  return `/products?category=${encodeURIComponent(category)}`;
}

export function categoryProductsHref(label: string): string {
  if (label === "All") return "/products";
  return `/products?category=${encodeURIComponent(label)}`;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Basmati Supreme 5kg",
    category: "Rice",
    subCategory: "Premium",
    price: 1899,
    oldPrice: 2199,
    images: imagesForProduct(1),
    badge: "Hot",
    rating: 4.8,
    reviews: 312,
    description:
      "Extra-long grain basmati aged 12 months. Fluffy, aromatic, and ideal for biryani and everyday meals. Sealed for freshness.",
    sizes: ["2 kg", "5 kg", "10 kg"],
    colors: [],
    inStock: 40,
  },
  {
    id: 2,
    name: "Sella Basmati Rice 2kg",
    category: "Rice",
    subCategory: "Parboiled",
    price: 799,
    images: imagesForProduct(2),
    badge: undefined,
    rating: 4.5,
    reviews: 156,
    description:
      "Parboiled sella rice with separate grains after cooking. High in fibre and great for daily cooking.",
    sizes: ["1 kg", "2 kg", "5 kg"],
    colors: [],
    inStock: 55,
  },
  {
    id: 3,
    name: "Organic Brown Rice 1kg",
    category: "Rice",
    subCategory: "Whole grain",
    price: 449,
    images: imagesForProduct(3),
    badge: "new",
    rating: 4.6,
    reviews: 89,
    description:
      "Unpolished brown rice sourced from certified organic farms. Nutty flavour; perfect for health-conscious households.",
    sizes: ["500 g", "1 kg"],
    colors: [],
    inStock: 28,
  },
  {
    id: 4,
    name: "Broken Rice Bulk 10kg",
    category: "Rice",
    subCategory: "Value",
    price: 1199,
    images: imagesForProduct(4),
    badge: "sale",
    rating: 4.3,
    reviews: 201,
    description:
      "Economy pack of quality broken rice, excellent for khichdi, kheer, and commercial kitchens.",
    sizes: ["5 kg", "10 kg"],
    colors: [],
    inStock: 22,
  },
  {
    id: 5,
    name: "Chakki Fresh Atta 10kg",
    category: "Wheat",
    subCategory: "Flour",
    price: 1599,
    images: imagesForProduct(5),
    badge: "Hot",
    rating: 4.9,
    reviews: 428,
    description:
      "Stone-ground whole wheat flour with natural bran. Soft rotis, no additives. Milled daily.",
    sizes: ["5 kg", "10 kg"],
    colors: [],
    inStock: 35,
  },
  {
    id: 6,
    name: "Fine Whole Wheat Flour 5kg",
    category: "Wheat",
    subCategory: "Flour",
    price: 849,
    images: imagesForProduct(6),
    badge: undefined,
    rating: 4.6,
    reviews: 167,
    description:
      "Sieved whole wheat atta for softer chapatis. Fortified with iron and folic acid.",
    sizes: ["2 kg", "5 kg"],
    colors: [],
    inStock: 48,
  },
  {
    id: 7,
    name: "Premium Maida 2kg",
    category: "Wheat",
    subCategory: "Refined",
    price: 399,
    images: imagesForProduct(7),
    badge: undefined,
    rating: 4.4,
    reviews: 92,
    description:
      "Bleached refined flour for naan, cakes, and snacks. Triple-sifted for smooth texture.",
    sizes: ["1 kg", "2 kg", "5 kg"],
    colors: [],
    inStock: 60,
  },
  {
    id: 8,
    name: "Full Cream Milk 1L",
    category: "Dairy Products",
    subCategory: "Milk",
    price: 250,
    images: imagesForProduct(8),
    badge: undefined,
    rating: 4.7,
    reviews: 890,
    description:
      "Pasteurised full-cream milk, 3.5% fat. Cold-chain delivered. Use within 3 days of opening.",
    sizes: ["500 ml", "1 L"],
    colors: [],
    inStock: 120,
  },
  {
    id: 9,
    name: "Greek-Style Yogurt 1kg",
    category: "Dairy Products",
    subCategory: "Yogurt",
    price: 320,
    images: imagesForProduct(9),
    badge: "new",
    rating: 4.8,
    reviews: 234,
    description:
      "Thick strained yogurt: high protein, no added sugar. Great for marinades, dips, and breakfast.",
    sizes: ["500 g", "1 kg"],
    colors: [],
    inStock: 45,
  },
  {
    id: 10,
    name: "Mature Cheddar Block 400g",
    category: "Dairy Products",
    subCategory: "Cheese",
    price: 890,
    images: imagesForProduct(10),
    badge: undefined,
    rating: 4.5,
    reviews: 112,
    description:
      "Aged cheddar with a sharp bite. Ideal for sandwiches, sauces, and grating. Keep refrigerated.",
    sizes: ["200 g", "400 g"],
    colors: [],
    inStock: 30,
  },
  {
    id: 11,
    name: "Salted Butter 200g",
    category: "Dairy Products",
    subCategory: "Butter",
    price: 450,
    images: imagesForProduct(11),
    badge: undefined,
    rating: 4.6,
    reviews: 178,
    description:
      "Creamery butter with sea salt. 82% milk fat. Perfect for baking and spreading.",
    sizes: ["100 g", "200 g"],
    colors: [],
    inStock: 52,
  },
  {
    id: 12,
    name: "Fresh Rohu Fillet (per kg)",
    category: "Fish",
    subCategory: "Fresh",
    price: 899,
    images: imagesForProduct(12),
    badge: "Hot",
    rating: 4.7,
    reviews: 267,
    description:
      "River rohu, descaled and filleted to order. Best cooked same day. Price shown per kilogram.",
    sizes: ["500 g", "1 kg", "2 kg"],
    colors: [],
    inStock: 18,
  },
  {
    id: 13,
    name: "Frozen Tiger Prawns 500g",
    category: "Fish",
    subCategory: "Frozen",
    price: 1299,
    images: imagesForProduct(13),
    badge: undefined,
    rating: 4.8,
    reviews: 143,
    description:
      "IQF peeled prawns, ready to cook. Sustainably farmed. Keep frozen at −18°C.",
    sizes: ["250 g", "500 g"],
    colors: [],
    inStock: 25,
  },
  {
    id: 14,
    name: "Smoked Salmon 200g",
    category: "Fish",
    subCategory: "Deli",
    price: 1599,
    oldPrice: 1899,
    images: imagesForProduct(14),
    badge: "sale",
    rating: 4.9,
    reviews: 76,
    description:
      "Cold-smoked Atlantic salmon slices. Great for bagels, salads, and platters.",
    sizes: ["100 g", "200 g"],
    colors: [],
    inStock: 14,
  },
  {
    id: 15,
    name: "Sunflower Cooking Oil 5L",
    category: "General Items",
    subCategory: "Pantry",
    price: 2499,
    images: imagesForProduct(15),
    badge: "Hot",
    rating: 4.6,
    reviews: 512,
    description:
      "Refined high-oleic sunflower oil with a high smoke point. Cholesterol-free. PET bottle.",
    sizes: ["2 L", "5 L"],
    colors: [],
    inStock: 44,
  },
  {
    id: 16,
    name: "Refined Sugar 2kg",
    category: "General Items",
    subCategory: "Pantry",
    price: 299,
    images: imagesForProduct(16),
    badge: undefined,
    rating: 4.4,
    reviews: 623,
    description:
      "Fine crystalline white sugar for beverages, baking, and desserts. Resealable pack.",
    sizes: ["1 kg", "2 kg", "5 kg"],
    colors: [],
    inStock: 90,
  },
  {
    id: 17,
    name: "Himalayan Pink Salt 1kg",
    category: "General Items",
    subCategory: "Pantry",
    price: 199,
    images: imagesForProduct(17),
    badge: "new",
    rating: 4.5,
    reviews: 198,
    description:
      "Coarse pink rock salt with trace minerals. Grinder-friendly crystals.",
    sizes: ["500 g", "1 kg"],
    colors: [],
    inStock: 70,
  },
  {
    id: 18,
    name: "Masoor Daal 1kg",
    category: "General Items",
    subCategory: "Pulses",
    price: 289,
    images: imagesForProduct(18),
    badge: undefined,
    rating: 4.7,
    reviews: 341,
    description:
      "Split red lentils, sorted and cleaned. Cooks quickly, ideal for daal and soups.",
    sizes: ["500 g", "1 kg", "2 kg"],
    colors: [],
    inStock: 65,
  },
  {
    id: 19,
    name: "Chickpeas (Kabuli) 500g",
    category: "General Items",
    subCategory: "Pulses",
    price: 179,
    images: imagesForProduct(19),
    badge: undefined,
    rating: 4.5,
    reviews: 156,
    description:
      "Large white chickpeas for chole, hummus, and salads. Uniform size, low moisture.",
    sizes: ["500 g", "1 kg"],
    colors: [],
    inStock: 58,
  },
  {
    id: 20,
    name: "Premium Black Tea 475g",
    category: "General Items",
    subCategory: "Beverages",
    price: 599,
    images: imagesForProduct(20),
    badge: undefined,
    rating: 4.8,
    reviews: 402,
    description:
      "Strong blend of Kenyan and Sri Lankan leaves. Rich colour and malty aroma.",
    sizes: ["250 g", "475 g"],
    colors: [],
    inStock: 38,
  },
  {
    id: 21,
    name: "Butter Cookies Family Pack",
    category: "General Items",
    subCategory: "Snacks",
    price: 250,
    images: imagesForProduct(21),
    badge: undefined,
    rating: 4.3,
    reviews: 289,
    description:
      "Crisp Danish-style cookies in a reusable tin. No artificial colours.",
    sizes: ["400 g", "800 g"],
    colors: [],
    inStock: 42,
  },
  {
    id: 22,
    name: "Dish Wash Liquid 1L",
    category: "General Items",
    subCategory: "Household",
    price: 189,
    images: imagesForProduct(22),
    badge: undefined,
    rating: 4.4,
    reviews: 167,
    description:
      "Grease-cutting formula with aloe. Gentle on hands, tough on pans.",
    sizes: ["500 ml", "1 L"],
    colors: [],
    inStock: 75,
  },
  {
    id: 23,
    name: "Kitchen Tissue 6-Pack",
    category: "General Items",
    subCategory: "Household",
    price: 399,
    images: imagesForProduct(23),
    badge: "sale",
    rating: 4.2,
    reviews: 91,
    description:
      "2-ply absorbent rolls. FSC-certified paper. Six rolls per pack.",
    sizes: ["3-pack", "6-pack"],
    colors: [],
    inStock: 33,
  },
  {
    id: 24,
    name: "Antibacterial Hand Wash 500ml",
    category: "General Items",
    subCategory: "Household",
    price: 275,
    images: imagesForProduct(24),
    badge: "new",
    rating: 4.6,
    reviews: 124,
    description:
      "pH-balanced hand wash with moisturiser. Kills 99.9% of common germs.",
    sizes: ["250 ml", "500 ml"],
    colors: [],
    inStock: 61,
  },
];

export const categories = [
  { label: "All", emoji: "🛒", href: "/products" },
  { label: "Rice", emoji: "🍚", href: CATEGORY_ROUTE.Rice },
  { label: "Wheat", emoji: "🌾", href: CATEGORY_ROUTE.Wheat },
  { label: "Dairy Products", emoji: "🥛", href: CATEGORY_ROUTE["Dairy Products"] },
  { label: "Fish", emoji: "🐟", href: CATEGORY_ROUTE.Fish },
  { label: "General Items", emoji: "📦", href: CATEGORY_ROUTE["General Items"] },
];

export const formatPrice = (n: number) =>
  "PKR " + n.toLocaleString("en-PK");

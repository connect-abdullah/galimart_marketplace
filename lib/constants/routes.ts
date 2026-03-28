export const CATEGORY_ROUTE = {
  Rice: "/rice",
  Wheat: "/wheat",
  "Dairy Products": "/dairy",
  Fish: "/fish",
  "General Items": "/general",
} as const;

export type CategoryRouteKey = keyof typeof CATEGORY_ROUTE;

/** Links shown inside the header Categories dropdown and mobile menu. */
export const HEADER_CATEGORY_LINKS: { label: string; href: string; title?: string }[] = [
  { label: "Rice", href: "/rice" },
  { label: "Wheat", href: "/wheat" },
  { label: "Dairy products", href: "/dairy", title: "Dairy products aisle" },
  { label: "Fish", href: "/fish" },
  { label: "General items", href: "/general", title: "Pantry and household" },
];

export const HEADER_NAV_LINKS: {
  label: string;
  href: string;
  highlight?: boolean;
}[] = [
  { label: "Shop all", href: "/products" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact", highlight: true },
];

export const FOOTER_AISLE_LINKS: { label: string; href: string }[] = [
  { label: "Rice", href: CATEGORY_ROUTE.Rice },
  { label: "Wheat", href: CATEGORY_ROUTE.Wheat },
  { label: "Dairy products", href: CATEGORY_ROUTE["Dairy Products"] },
  { label: "Fish", href: CATEGORY_ROUTE.Fish },
  { label: "General items", href: CATEGORY_ROUTE["General Items"] },
  { label: "All products", href: "/products" },
];

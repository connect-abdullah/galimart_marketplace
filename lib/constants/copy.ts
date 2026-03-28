import { MARKET_NAME } from "./branding";

export const ANNOUNCEMENT = {
  lead: "Free delivery on orders above PKR 2,000",
  code: "GALI10",
  tail: "on your first order from GaliMart",
} as const;

export const FOOTER_BLURB =
  "Staples from the lane you trust: rice, atta, dairy, fish, and pantry picks delivered across Islamabad.";

export const FOOTER_DEPT_LABEL = "Online grocery";

export const FOOTER_COMPANY_LINKS = [
  `About ${MARKET_NAME}`,
  "Blog",
  "Careers",
  "Privacy Policy",
  "Terms of Service",
] as const;

export const FOOTER_HELP_LINKS: { label: string; href: string }[] = [
  { label: "FAQ", href: "/faq" },
  { label: "Returns & exchanges", href: "/faq" },
  { label: "Track your order", href: "/contact" },
  { label: "Contact us", href: "/contact" },
  { label: "Delivery areas", href: "/contact" },
];

export const HERO_COPY = {
  badge: "Islamabad · Same-day slots",
  kicker: "Your lane, online",
  title: "The market",
  titleAccent: "from your gali.",
  body:
    "Shop rice, wheat, dairy, fish, and everyday essentials with clear pack sizes, honest prices, and full detail pages, like stopping at every stall in one trip.",
  ctaPrimary: "Browse all aisles",
  ctaSecondary: "Pantry & household",
  statLabels: ["Categories", "Products listed", "Coverage"] as const,
  statValues: ["5+", "24+", "Islamabad"] as const,
} as const;

export const PROMO_BANNER = {
  eyebrow: "Bundle & save",
  title: "Fill the bag for less",
  body: "Cross PKR 2,000 and unlock free delivery. Stack it with your first-order code at checkout.",
  cta: "Shop general aisle",
  href: "/general",
} as const;

export const DEFAULT_SITE_DESCRIPTION =
  "GaliMart: shop rice, wheat, dairy, fish, and general grocery online. Full product pages, cart, checkout, and contact.";

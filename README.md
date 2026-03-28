# GaliMart — Online Grocery Storefront

> Your lane, online. Staples delivered across Islamabad.
>
> FA24-BSE-042 · CSC417 E-Commerce & Digital Marketing · Spring 2026

A **B2C grocery** storefront built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Rice, wheat, dairy, fish, and general pantry items with PKR pricing, filters, cart, and a full checkout flow (prototype: no live payments or backend).

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | React Context + `useReducer` (cart) |
| Icons | Lucide React |
| Fonts | Sora (headings) + DM Sans (body), Google Fonts |

---

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero, trust bar, category pills, popular & new shelves, promo banner |
| `/products` | Catalog — search, category / badge / pack / price filters, sort |
| `/product/[id]` | Product detail — gallery, sizes, add to cart |
| `/rice`, `/wheat`, `/dairy`, `/fish`, `/general` | Category aisles |
| `/cart` | Cart — lines, promo, delivery note, checkout link |
| `/checkout` | Delivery form, payment method (COD, JazzCash, EasyPaisa, card — UI only), place order |
| `/faq` | FAQ accordion |
| `/contact` | Contact / delivery areas |

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # run production server
npm run lint
```

### Logo

Place the brand asset at **`public/Logo.png`** (case-sensitive on Linux/Vercel). It powers the header, footer, empty states, and favicon metadata.

---

## Project structure

```
marketplace/
├── app/
│   ├── layout.tsx              # Root: announcement, header, main, footer, toast
│   ├── globals.css
│   ├── page.tsx                # Homepage
│   ├── products/page.tsx
│   ├── product/[id]/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── contact/page.tsx
│   ├── faq/page.tsx
│   └── rice|wheat|dairy|fish|general/page.tsx
├── components/
│   ├── branding/Logo.tsx
│   ├── layout/                 # Header, Footer, AnnouncementBar
│   ├── home/                   # Hero, shelves, promo, pills
│   ├── shop/CategoryPage.tsx
│   └── ui/                     # ProductCard, ProductImage, Toast, etc.
├── lib/
│   ├── data.ts                 # Products, categories, formatPrice
│   ├── store.tsx               # Cart context
│   └── constants/
│       ├── branding.ts         # MARKET_NAME, LOGO_SRC, site ID
│       ├── copy.ts             # Hero, footer, promo, announcement
│       ├── images.ts           # Hero / quick-aisle images
│       ├── productImages.ts    # Per-product Pexels galleries
│       ├── routes.ts           # Category routes, header links
│       └── seo.ts              # Root metadata
├── public/Logo.png
├── next.config.js              # e.g. images.pexels.com, unoptimized (see below)
├── tailwind.config.ts
└── package.json
```

---

## Features

- **Catalog** — ~24 seeded products across five categories (Rice, Wheat, Dairy Products, Fish, General Items).
- **Cart** — Add, remove, update quantity; respects `inStock`; totals and line count (in-memory for the session).
- **Promo** — Code **`GALI10`** applies 10% off when applied on the cart page (see `lib/constants/copy.ts`).
- **Delivery rule** — Free delivery at or above **PKR 2,000**; otherwise **PKR 200** (checkout / cart summary).
- **Search & filters** — Name, category, subcategory; category, badge, pack size, price bands; sort options on `/products`.
- **Product options** — Size (and colour where defined) on the PDP.
- **Responsive** — Mobile-first layouts; category dropdown and cart in the header.
- **Toasts** — Global feedback for cart and checkout actions.

---

## Images & deployment

- Product and hero imagery use **remote URLs** (e.g. **images.pexels.com**), configured in `next.config.js` under `images.remotePatterns`.
- **`images.unoptimized: true`** is enabled in `next.config.js` so `next/image` loads originals directly (avoids Vercel Image Optimization quota issues). Remove it if you rely on a host with sufficient optimization credits.

---

## Design tokens (Tailwind)

| Token | Role | Value |
| --- | --- | --- |
| `teal` | Primary (forest green) | `#1B4D3E` |
| `teal-light` | Hover / secondary | `#2D6A4F` |
| `teal-dark` | Deep accent | `#123D32` |
| `gold` | Accent (copper) | `#B86B29` |
| `gold-light` | Lighter copper | `#C97F3D` |
| `cream` | Page background | `#FAF6EF` |
| `ink` | Dark text / footer | `#0F1F1A` |
| `offwhite`, `lightgrey`, `midgrey`, `border` | Surfaces & dividers | See `tailwind.config.ts` |

---

## Scope notes

- **Prototype:** No real payment gateway, order API, or user accounts.
- **Branding strings** live in `lib/constants/branding.ts` and `copy.ts` for easy edits.

---

## License

Private / coursework use unless otherwise specified.

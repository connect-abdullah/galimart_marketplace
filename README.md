# Trendly — Next.js E-Commerce Store

> Stay Ahead. Shop Smart.
>
> FA24-BSE-042 · CSC417 E-Commerce & Digital Marketing · Spring 2026

A clean, minimal B2C e-commerce storefront built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | React Context + useReducer (cart) |
| Icons | Lucide React |
| Fonts | Sora + DM Sans (Google Fonts) |

---

## Pages

| Route | Page |
|---|---|
| `/` | Homepage — Hero, categories, trending & new arrivals |
| `/products` | Product Listing Page — filters, sort, search |
| `/product/[id]` | Product Detail Page — images, variants, add to cart |
| `/cart` | Cart — items, qty control, promo code |
| `/checkout` | Checkout — delivery form, payment selection, order review |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Build for production
npm run build
npm start
```

---

## Project Structure

```
trendly/
├── app/
│   ├── layout.tsx          # Root layout (header, footer, cart provider)
│   ├── globals.css         # Global styles + Tailwind
│   ├── page.tsx            # Homepage
│   ├── products/
│   │   └── page.tsx        # PLP (Product Listing)
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx    # PDP (Product Detail)
│   ├── cart/
│   │   └── page.tsx        # Cart page
│   └── checkout/
│       └── page.tsx        # Checkout page
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── AnnouncementBar.tsx
│   └── ui/
│       ├── ProductCard.tsx
│       ├── TrustBar.tsx
│       └── Toast.tsx
├── lib/
│   ├── data.ts             # All product data + types
│   └── store.tsx           # Cart context (React useReducer)
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Features

- **Cart** — Add, remove, update quantity; persists across page navigation
- **Promo code** — `TRENDLY10` gives 10% off
- **Search** — Full-text search across product name, category, sub-category
- **Filters** — Category, price range, size (client-side, instant)
- **Sort** — Best selling, newest, price asc/desc, highest rated
- **Product variants** — Size and colour selection on PDP
- **Responsive** — Mobile-first grid layouts throughout
- **Toast notifications** — Lightweight global feedback system

---

## Design Tokens (Tailwind)

| Token | Value |
|---|---|
| `teal` | `#0D6E6E` |
| `teal-light` | `#1a8c8c` |
| `teal-dark` | `#095252` |
| `gold` | `#D4A017` |
| `gold-light` | `#e8b520` |
| `offwhite` | `#f8f8f6` |
| `border` | `#e8e8e4` |

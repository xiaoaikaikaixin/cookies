# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js 16 Breaking Changes

This project uses Next.js 16.2.9 — APIs, conventions, and file structure differ from earlier versions. **Read the relevant guide in `node_modules/next/dist/docs/` before writing any Next.js-specific code.** Heed deprecation notices.

## Project Overview

A bilingual (EN/ZH) e-commerce site for a Singapore Chinese New Year cookie bakery ("年年饼家 Nian Nian Cookie"). Customers browse products, add items to a cart, and place orders via PayNow or WhatsApp.

**Tech stack:** Next.js 16 (App Router, Turbopack), React 19, Prisma 7 (libSQL adapter), Tailwind CSS 4, TypeScript 5, SQLite (via `@libsql/client`).

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm start          # Start production server
npm run lint       # ESLint (flat config: next/core-web-vitals + typescript)
```

**Prisma (SQLite via libSQL):**
```bash
npx prisma generate    # Generate client after schema changes
npx prisma db push     # Push schema to SQLite (no migrations)
npx prisma db seed     # Seed categories + 21 products (uses tsx)
npx tsx prisma/seed.ts # Run seed directly
```

## Architecture

### Routing (App Router with `src/` directory)

| Route | File | Type |
|---|---|---|
| `/` | `src/app/page.tsx` | Server Component (all data fetched inline) |
| `/products` | `src/app/products/page.tsx` | Server Component |
| `/products/[slug]` | `src/app/products/[slug]/page.tsx` | Server Component |
| `/cart` | `src/app/cart/page.tsx` | Client Component |
| `/checkout` | `src/app/checkout/page.tsx` | Client Component |
| `/order-confirmation/[id]` | `src/order-confirmation/id/page.tsx` | Server Component |
| `/api/orders` (POST) | `src/app/api/orders/route.ts` | API route |

Note: `src/order-confirmation/` is a root-level route directory in `src/`, separate from `src/app/`. Next.js 16 supports both conventions.

### Data Layer

- **Prisma** with SQLite via libSQL adapter. Schema at `prisma/schema.prisma` defines `Category`, `Product`, `Order`, `OrderItem`.
- **`src/lib/db.ts`** — Prisma client singleton with `PrismaLibSql` adapter pointing to `file:./dev.db`. Singleton pattern uses `globalThis` to prevent multiple instances in dev. Export: `prisma`.
- **Seed file** (`prisma/seed.ts`) creates 3 categories (traditional, premium, gift-box) and 21 products with bilingual names/prices/images. Run with `tsx` directly. Each seed run re-creates its own PrismaClient — it does not import from `@/lib/db`.

### Cart State Management

Client-side only via React Context (`src/lib/cart-context.tsx`):
- `CartProvider` wraps the entire app in the root layout
- Cart items persist to `localStorage` (hydrated on mount, synced on change)
- Provides: `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `totalItems`, `totalPrice`
- Components access cart via the `useCart()` hook
- `addItem` auto-increments quantity if the item already exists in cart

### Component Hierarchy

```
RootLayout (server) — metadata: "Lisa Handmade Delights | 精选年饼礼盒"
├── CartProvider (client context)
│   ├── Header (client) — sticky, two-layer: top announcement bar + main nav
│   │   └── CartDrawer (client) — slide-out panel, quantity controls, checkout link
│   ├── <main>{children}</main>
│   ├── Footer (server component, but uses only static data)
│   ├── WhatsAppButton (client) — fixed bottom-right FAB, opens wa.me link
│   └── Toaster (react-hot-toast, bottom-center)
```

**Unused files:** `src/components/frontend/hero.tsx` exists but is NOT imported by any page — the homepage (`page.tsx`) defines its own hero section inline.

### Static Assets

- **Product images:** `public/images/products/<slug>.png` — 21 product images + `default.png` fallback
- **Category images:** `public/images/home/category-*.png` — 6 category circle images
- **Brand assets (logos, design mockups):** `data/` (imported directly by components via relative imports, e.g. `../../../data/Logo1.png`)
- **Image resolution:** `src/lib/product-images.ts` maps slugs to image paths. `getProductImage(slug, storedImage?)` returns the correct path, falling back to `default.png`.

### Patterns

- **Data fetching** in Server Components — `page.tsx` calls Prisma directly, no `useEffect`/`useState`.
- **Client boundaries** (`"use client"`) at leaf components: cart buttons, form inputs, mobile menu toggles, cart-drawer, toast notifications.
- **`params` is a Promise** in Next.js 16 — always `await params` before destructuring (see product detail page and order confirmation).
- **API route** `/api/orders` POST accepts `{ customerName, customerPhone, customerEmail, items: [{productId, quantity, price}], totalAmount, paymentMethod, notes }` and creates an Order with nested `items.create`. Returns `{ orderId }`.
- **`next/image`** used for static imports (logo, hero image). `<img>` tags used for dynamic product images where the URL comes from data rather than a static import.

### Design Tokens (Tailwind CSS 4)

Custom theme colors in `src/app/globals.css` — registered via `@theme inline` so Tailwind classes like `text-primary` and `bg-cream` work:

| Variable | Hex | Usage |
|---|---|---|
| `--color-primary` | `#C0823A` | Buttons, links, active nav, prices (warm amber gold) |
| `--color-primary-dark` | `#9E5F2A` | Button hover states |
| `--color-primary-light` | `#E8C580` | Subtle gold accents |
| `--color-gold` | `#D4A54A` | Accent text, star ratings |
| `--color-gold-deep` | `#C48611` | Deeper gold |
| `--color-cream` | `#FDFBF8` | Page background |
| `--color-cream-strong` | `#F7EFE5` | Product image placeholders, hover backgrounds |
| `--color-surface` | `#FFFDFA` | Card backgrounds |
| `--color-brown` | `#7B4509` | Nav text, headings |
| `--color-brown-deep` | `#5C3008` | Strong headings |
| `--color-brown-light` | `#8B6F52` | Body text, descriptions |
| `--color-line` | `#EFE5D8` | Borders, dividers |
| `--color-warm-bg` | `#F7F7F5` | Products section background |
| `--color-topbar` | `#F7E6C9` | Header announcement bar |

Fonts: `--font-sans` (Segoe UI / Microsoft YaHei / PingFang SC / Noto Sans SC / sans-serif), `--font-serif` (STSong / Songti SC / Noto Serif SC / Times New Roman / serif).

Utility classes in globals.css:
- `.section-divider` — centered `✦───✦` ornament for section headings
- `.testimonials-marquee` / `.testimonials-track` — CSS infinite scroll for testimonials (42s loop, duplicating content for seamless wrap; pause on `prefers-reduced-motion`)

### Homepage Layout (matching `data/Homepage_white.png`)

The homepage (`src/app/page.tsx`) is a single Server Component with all content inline (no sub-components for sections). Structure:

1. **Hero** — cream gradient background, decorative radial glows and border rings, card container with left text (CTA + secondary button) and right image (`data/Page2.png`)
2. **Trust Bar** — 4-column grid with Lucide icons (`Truck`, `ShieldCheck`, `Leaf`, `Heart`), white card with warm border
3. **Category Circles** — 6 round images linking to product pages/categories
4. **Featured Products** — 5-column grid on `#F7F7F5` background, using `ProductCard` component
5. **Testimonials** — CSS marquee carousel (7 entries, duplicated for seamless loop), each card has stars + quote + author avatar
6. **Why Choose Lisa** — 4 icon cards + two CTAs (browse all / gift boxes)

### Payment Flow

Two methods offered at checkout: **PayNow** (UEN: 202412345C) and **WhatsApp** (+65 9123 4567). Both are informational — no payment gateway integration. After order creation via API, user is redirected to `/order-confirmation/[id]`.

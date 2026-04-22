# PharmaPlus — Premium Online Pharmacy

A modern, production-ready pharmacy eCommerce website built with Next.js 14, Tailwind CSS, Framer Motion, and Zustand.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
pharma/
├── app/
│   ├── layout.tsx          # Root layout (navbar, cart drawer, toasts)
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles + Tailwind
│   ├── shop/
│   │   └── page.tsx        # Shop with filters & sorting
│   ├── product/[id]/
│   │   └── page.tsx        # Product detail page
│   ├── cart/
│   │   └── page.tsx        # Cart page
│   └── checkout/
│       └── page.tsx        # 3-step checkout
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Glassmorphism sticky navbar
│   │   ├── Footer.tsx      # Footer with trust bar
│   │   ├── CartDrawer.tsx  # Animated slide-out cart
│   │   └── FloatingCart.tsx # Mobile floating cart button
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── CategoriesSection.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── TrustBadges.tsx
│   │   ├── Testimonials.tsx
│   │   └── Newsletter.tsx
│   └── ui/
│       └── ProductCard.tsx # Product card + skeleton
├── lib/
│   ├── data.ts             # Products, categories, testimonials
│   └── store.ts            # Zustand cart + theme stores
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## ✨ Features

- **Homepage** — Hero, categories, featured products, trust badges, testimonials, newsletter
- **Shop** — Filters (category, price), sorting, search, grid/list view, skeleton loaders
- **Product Page** — Image gallery, add to cart, tabs (description/directions/reviews), related products
- **Cart** — Quantity controls, animated totals, free delivery progress bar
- **Checkout** — 3-step progress (address → payment → review), order confirmation
- **Cart Drawer** — Slide-in drawer from any page
- **Dark Mode** — Full dark mode support via Tailwind + class strategy
- **Animations** — Framer Motion throughout: page transitions, hover effects, stagger grids, animated navbar
- **Toast notifications** — react-hot-toast for cart feedback
- **Glassmorphism navbar** — Blur + transparency on scroll

---

## 🚢 Deploy to Vercel

### Option 1: CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# From inside the project folder:
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - What's your project name? pharma-plus
# - In which directory is your code? ./
# - Override settings? No

# For production:
vercel --prod
```

### Option 2: GitHub + Vercel Dashboard

1. Push this project to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Done! Live in ~60 seconds

### Option 3: Drag & Drop

```bash
npm run build
```
Then drag the `.next` folder to [vercel.com](https://vercel.com)

---

## ⚙️ Environment Variables

No environment variables are required for the default setup.

If you add features like a real backend, add a `.env.local`:

```env
# Example (not required for this project)
NEXT_PUBLIC_API_URL=https://your-api.com
```

---

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Zustand | Cart & theme state |
| Lucide React | Icons |
| react-hot-toast | Toast notifications |
| Radix UI | Accessible primitives |

---

## 📝 Customization

**Add products:** Edit `lib/data.ts` → `products` array  
**Add categories:** Edit `lib/data.ts` → `categories` array  
**Change colors:** Edit `tailwind.config.ts` → `brand` palette  
**Change fonts:** Edit `app/globals.css` Google Fonts import  

---

## 🏗 Build

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint check
```

Zero build errors guaranteed. ✅

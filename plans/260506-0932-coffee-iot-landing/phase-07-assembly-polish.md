---
title: "Phase 07 — Assembly + Polish: page.tsx, SEO, Build Verify"
status: pending
priority: P2
effort: 1h
---

# Phase 07 — Assembly + Polish

**Parent plan:** [plan.md](./plan.md)

## Overview

Assemble tất cả components vào `page.tsx`, add section IDs, update SEO metadata, verify build passes.

## Architecture

```
app/page.tsx
├── <Navbar />               ← sticky top
├── <main>
│   ├── <Hero />             ← id="hero", min-h-screen
│   ├── <Features />         ← id="tinh-nang"
│   ├── <HowItWorks />       ← id="cach-hoat-dong"
│   └── (id="lien-he")       ← CTA placeholder hoặc mailto section
└── <Footer />
```

## Implementation Steps

### 1. Update `app/page.tsx`
```tsx
import Navbar from '@/app/components/navbar'
import Hero from '@/app/components/hero'
import Features from '@/app/components/features'
import HowItWorks from '@/app/components/how-it-works'
import Footer from '@/app/components/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}
```

### 2. Section ID wiring
- Hero section: `id="hero"`
- Features section wrapper: `id="tinh-nang"`
- HowItWorks section wrapper: `id="cach-hoat-dong"`
- Footer: `id="lien-he"` (vì không có Contact Form — per plan YAGNI)

### 3. `app/layout.tsx` final SEO
```ts
export const metadata: Metadata = {
  title: 'Coffee IoT — Quản lý máy pha cà phê thông minh',
  description: 'Nền tảng IoT B2B giúp chuỗi cà phê giám sát thiết bị real-time, nhận cảnh báo sự cố và tối ưu vận hành.',
  openGraph: {
    title: 'Coffee IoT',
    description: 'Giám sát toàn bộ máy pha cà phê, từ xa.',
    type: 'website',
  },
}
```

### 4. Smooth scroll global
Trong `globals.css`:
```css
html { scroll-behavior: smooth; }
```

### 5. Verify build
```bash
cd /Users/hodung/work/mobile/claude-config/iot-landing-page
npm run build
```
Fix any TypeScript / import errors.

### 6. Dev server smoke test
```bash
npm run dev
```
Checklist:
- [ ] Navbar sticky, cursor animation hoạt động
- [ ] Hero dithering shader render
- [ ] GSAP entrance animations trigger khi load
- [ ] Features cards render với grid pattern
- [ ] How it Works tabs switch đúng
- [ ] Footer links render
- [ ] Scroll từ navbar links tới đúng sections
- [ ] Mobile responsive (375px, 768px, 1280px)

## Polish Checklist

- [ ] Consistent spacing giữa sections (`py-24` hoặc `py-32`)
- [ ] Color consistency: primary = orange (#EC4E02 / `hsl(24 95% 53%)`)
- [ ] Fonts: Geist Sans (đã setup trong layout) — consistent usage
- [ ] No console errors
- [ ] No hydration warnings (check "use client" placement)
- [ ] Images/SVG alt text đầy đủ (a11y)

## Related Files
- `app/page.tsx` — update (replace boilerplate)
- `app/layout.tsx` — update SEO metadata
- `app/globals.css` — thêm smooth scroll
- Tất cả components từ phase 01-06

## Todo
- [ ] Replace `app/page.tsx` với assembled page
- [ ] Wire section IDs (#tinh-nang, #cach-hoat-dong, #lien-he)
- [ ] Add OG metadata vào layout.tsx
- [ ] Add `scroll-behavior: smooth` vào globals.css
- [ ] Run `npm run build` → fix errors
- [ ] Run `npm run dev` → smoke test all sections
- [ ] Mobile responsive check

## Success Criteria
- `npm run build` passes với 0 errors
- Tất cả 5 sections render đúng
- Navigation links scroll đến đúng section
- No hydration mismatch warnings
- Responsive trên 375px, 768px, 1280px

## Risks
- Next.js 16 có thể yêu cầu `"use client"` boundary rõ ràng hơn — check nếu có hydration error
- `@paper-design/shaders-react` bundle size (~200KB) — acceptable cho landing page
- GSAP ScrollTrigger cần cleanup trong useGSAP — `@gsap/react` tự handle nếu dùng `useGSAP` đúng cách

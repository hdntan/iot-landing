---
title: "Phase 03 — Hero: Dithering WebGL + VN Content + Inline Stats + GSAP"
status: pending
priority: P1
effort: 1.5h
---

# Phase 03 — Hero

**Parent plan:** [plan.md](./plan.md)
**Spec source:** `app/components/HERO.MD` (`CTASection` / `hero-dithering-card.tsx`)

## Overview

Implement Hero section với dithering WebGL background (`@paper-design/shaders-react`), nội dung tiếng Việt, inline stats row (3 metrics), GSAP entrance animation cho text.

## Key Insights

- Spec dùng `@paper-design/shaders-react` `Dithering` component với `colorFront="#EC4E02"` (orange) — giữ nguyên, phù hợp dark SaaS
- Spec `lazy()` load Dithering → giữ nguyên pattern để tránh SSR issues
- `mix-blend-multiply dark:mix-blend-screen` — chỉ cần `mix-blend-screen` vì ta dùng dark mode
- GSAP: entrance animation cho badge, headline, description, stats, button (stagger from bottom)
- Inline stats row thêm vào sau description (không có trong spec gốc)
- Spec dùng `isHovered` state để tăng shader speed → giữ nguyên UX effect

## Architecture

```
app/components/hero.tsx
├── HeroSection             ← section wrapper, min-h-screen
│   ├── DitheringBackground ← Suspense + lazy Dithering shader
│   ├── HeroBadge           ← animated ping dot + text badge
│   ├── HeroHeadline        ← h1 Vietnamese
│   ├── HeroDescription     ← p Vietnamese
│   ├── HeroStats           ← 3 stat items inline
│   │   ├── StatItem "500+ máy"
│   │   ├── StatItem "99.9% uptime"
│   │   └── StatItem "-30% chi phí bảo trì"
│   └── HeroCTA             ← "Đặt lịch Demo" button + ArrowRight
```

## Content

```
Badge:       "Nền tảng IoT cho chuỗi cà phê"
Headline:    "Giám sát toàn bộ\nmáy pha cà phê, từ xa."
Description: "Platform IoT B2B giúp chuỗi cà phê theo dõi thiết bị
              real-time, nhận cảnh báo sự cố và tối ưu vận hành."
Stats:       500+ máy  |  99.9% uptime  |  -30% chi phí bảo trì
CTA:         "Đặt lịch Demo" → href="#lien-he"
```

## GSAP Animation Plan

```ts
// useGSAP hook từ @gsap/react
useGSAP(() => {
  gsap.from([badgeRef, headlineRef, descRef, statsRef, ctaRef], {
    y: 30,
    opacity: 0,
    filter: 'blur(8px)',
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.2
  })
}, [])
```

## Implementation Steps

### 1. Tạo `app/components/hero.tsx`
- `"use client"` (Dithering + GSAP + useState)
- Copy structure từ spec CTASection
- Đổi content sang VN (badge, headline, description, CTA text)
- Đổi `import ArrowRight from 'lucide-react'`
- Thêm stats row sau description
- Thêm `useGSAP` animation

### 2. Stats Row component
```tsx
<div className="flex flex-wrap justify-center gap-8 mt-6">
  {stats.map(s => (
    <div key={s.label} className="text-center">
      <div className="text-2xl font-bold text-primary">{s.value}</div>
      <div className="text-xs text-muted-foreground">{s.label}</div>
    </div>
  ))}
</div>
```

### 3. Shader config cho dark SaaS
```tsx
<Dithering
  colorBack="#00000000"
  colorFront="#EC4E02"   // coffee orange
  shape="warp"
  type="4x4"
  speed={isHovered ? 0.6 : 0.15}
  className="size-full"
  minPixelRatio={1}
/>
```

### 4. GSAP refs + useGSAP
```ts
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
// Refs cho từng element, animation on mount
```

## Related Files
- `app/components/hero.tsx` — tạo mới
- `app/components/HERO.MD` — spec reference

## Todo
- [ ] Tạo `app/components/hero.tsx`
- [ ] Implement Dithering background (lazy import, Suspense)
- [ ] VN content: badge, headline, description
- [ ] Inline stats row (3 metrics)
- [ ] CTA button "Đặt lịch Demo"
- [ ] GSAP entrance animation với useGSAP
- [ ] Test hover effect (shader speed change)

## Success Criteria
- Dithering shader render không flicker
- GSAP stagger animation mượt khi load
- Stats hiển thị đúng 3 metrics
- Responsive tốt trên mobile

## Risks
- `@paper-design/shaders-react` có thể có SSR issues → `"use client"` + `lazy()` mitigate
- Next.js 16 Suspense behavior có thể khác — test với fallback
- GSAP `filter: blur()` animation có thể lag trên low-end devices — optional: skip nếu `prefers-reduced-motion`

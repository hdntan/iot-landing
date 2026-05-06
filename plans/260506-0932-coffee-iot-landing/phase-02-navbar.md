---
title: "Phase 02 — Navbar: Dark Pill, GSAP Cursor, Sticky"
status: pending
priority: P1
effort: 1h
---

# Phase 02 — Navbar

**Parent plan:** [plan.md](./plan.md)
**Spec source:** `app/components/NAVBAR.MD` (`NavHeader` component)

## Overview

Implement dark-themed sticky navbar: pill container, sliding cursor animation với GSAP (thay framer-motion), logo "Coffee IoT", nav links tiếng Việt, CTA button.

## Key Insights

- Spec gốc dùng `framer-motion` cho `<Cursor>` animation (`motion.li` với `animate={position}`)
- GSAP thay thế: dùng `gsap.to(cursorRef, { left, width, opacity, duration: 0.3, ease: "power2.out" })`
- Spec dùng light theme (white bg, black border) → đổi sang dark: `bg-zinc-900/80 border-zinc-700 backdrop-blur-md`
- Sticky: `position: sticky top-0 z-50`
- Smooth scroll khi click nav links (href="#tinh-nang" etc.)

## Architecture

```
app/components/navbar.tsx
├── NavbarWrapper       ← sticky container, scroll-shadow effect
├── NavLogo             ← "Coffee IoT" text logo + coffee icon
├── NavLinks            ← ul với Tab items + GSAP cursor
│   ├── Tab             ← li item, onMouseEnter → update cursor via ref
│   └── GsapCursor      ← div absolute, gsap.to() on position change
└── NavCTA              ← "Đặt lịch Demo" button
```

## Content

```
Logo: ☕ Coffee IoT
Links: Tính năng (#tinh-nang) | Cách hoạt động (#cach-hoat-dong) | Liên hệ (#lien-he)
CTA: "Đặt lịch Demo" → href="mailto:demo@coffeeiot.vn" (hoặc #lien-he)
```

## Implementation Steps

### 1. Tạo `app/components/navbar.tsx`
```
"use client"

- Copy NavHeader structure từ spec
- Replace framer-motion import → không cần import gì cho animation
- Đổi state từ `{ left, width, opacity }` giữ nguyên
- Thêm `cursorRef = useRef<HTMLDivElement>(null)`
- Trong Tab onMouseEnter: tính left + width → gọi `gsap.to(cursorRef.current, {...})`
- Dark styles: bg-zinc-900/80, border-zinc-700, text-zinc-100
- Add sticky wrapper ngoài ul
```

### 2. GSAP cursor logic
```ts
import { gsap } from 'gsap'
// Trong Tab onMouseEnter:
const { width } = ref.current.getBoundingClientRect()
gsap.to(cursorRef.current, {
  left: ref.current.offsetLeft,
  width,
  opacity: 1,
  duration: 0.25,
  ease: 'power2.out'
})
// onMouseLeave ul: gsap.to(cursorRef.current, { opacity: 0, duration: 0.2 })
```

### 3. Scroll shadow effect
```ts
// useEffect + window scroll listener
// add/remove class 'shadow-lg shadow-black/20' khi scrollY > 20
```

## Related Files
- `app/components/navbar.tsx` — tạo mới
- `app/components/NAVBAR.MD` — spec reference (không sửa)

## Todo
- [ ] Tạo `app/components/navbar.tsx`
- [ ] Implement GSAP sliding cursor (thay framer-motion)
- [ ] Dark theme styles
- [ ] Sticky + scroll shadow effect
- [ ] Nav links VN với smooth scroll anchors
- [ ] CTA button "Đặt lịch Demo"
- [ ] Test responsive (mobile: hamburger hoặc hide links)

## Success Criteria
- Cursor slides smoothly khi hover links
- Navbar sticky, không overlap content
- Links scroll đến đúng section
- Mobile: readable (min hamburger hoặc compact)

## Risks
- `useGSAP` hook recommended thay raw `gsap.to` trong component — nhưng cho cursor hover effect, `gsap.to` trực tiếp trong event handler là acceptable
- SSR: GSAP chạy client-side → `"use client"` directive required

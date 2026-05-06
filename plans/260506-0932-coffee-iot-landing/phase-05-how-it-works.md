---
title: "Phase 05 — How it Works: 3 Tabs VN + GSAP"
status: pending
priority: P2
effort: 1h
---

# Phase 05 — How it Works

**Parent plan:** [plan.md](./plan.md)
**Spec source:** `app/components/HOW-IT-WORKS.MD` (`Feature108` / `shadcnblocks-com-feature108.tsx`)

## Overview

Implement "Cách hoạt động" section với Feature108 tabs component (3 tabs VN), shadcn Badge + Button, GSAP section entrance animation. Dùng `@radix-ui/react-tabs`.

## Key Insights

- Spec dùng `@radix-ui/react-tabs` trực tiếp (không phải shadcn/ui CLI) — giữ nguyên import
- Feature108 có 3 tabs default (spec demo) — map 1:1 với 3 IoT steps
- Mỗi tab có: badge, title, description, button, image → dùng placeholder hoặc SVG mockup thay image
- GSAP: chỉ cần section entrance (không phải tab transition — Radix tự handle)
- Section id: `id="cach-hoat-dong"`
- Spec import Badge + Button từ `@/components/ui/` → đổi sang `@/app/ui/`

## Architecture

```
app/components/how-it-works.tsx
├── HowItWorksSection       ← section id="cach-hoat-dong", GSAP entrance
│   ├── SectionBadge        ← "Quy trình 3 bước"
│   ├── SectionHeading      ← "Bắt đầu chỉ trong 5 phút"
│   ├── SectionDescription  ← subtext
│   └── Tabs (Radix)
│       ├── TabsList        ← 3 triggers: Kết nối | Giám sát | Tối ưu
│       └── TabsContent x3
│           ├── Badge
│           ├── Title
│           ├── Description
│           ├── Button "Tìm hiểu thêm"
│           └── MockupImage (SVG dark placeholder)
```

## Content (3 tabs)

```
Section:
  badge:   "Quy trình 3 bước"
  heading: "Bắt đầu chỉ trong 5 phút"
  desc:    "Từ lắp đặt đến giám sát đầy đủ — không cần kỹ thuật viên chuyên biệt."

Tab 1 — "Kết nối"
  icon:    Plug (lucide)
  badge:   "Cài đặt nhanh"
  title:   "Lắp IoT module vào máy pha cà phê."
  desc:    "Module kết nối qua cổng USB hoặc gắn ngoài. Hỗ trợ mọi thương hiệu máy phổ biến. Kết nối Wifi/4G tự động."
  button:  "Xem hướng dẫn"
  image:   dark SVG placeholder (màu zinc-800)

Tab 2 — "Giám sát"
  icon:    Monitor (lucide)
  badge:   "Dashboard Real-time"
  title:   "Xem trạng thái từng máy từ xa."
  desc:    "Dashboard hiển thị nhiệt độ, áp suất, số lượt pha, trạng thái online/offline của từng máy theo thời gian thực."
  button:  "Xem demo"
  image:   dark SVG placeholder

Tab 3 — "Tối ưu"
  icon:    TrendingUp (lucide)
  badge:   "AI Insights"
  title:   "Nhận cảnh báo & tối ưu vận hành tự động."
  desc:    "AI phân tích dữ liệu, dự đoán hỏng hóc, tự động lên lịch bảo trì và gửi báo cáo hàng tuần."
  button:  "Tìm hiểu thêm"
  image:   dark SVG placeholder
```

## GSAP Animation

```ts
useGSAP(() => {
  gsap.from(sectionRef.current, {
    y: 30, opacity: 0, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
  })
}, [])
```

## Implementation Steps

### 1. Tạo `app/components/how-it-works.tsx`
- `"use client"` (Radix tabs, GSAP)
- Copy Feature108 structure từ spec
- Update import paths: Badge → `@/app/ui/badge`, Button → `@/app/ui/button`
- Replace `@radix-ui/react-tabs` imports (đã install)
- 3 tabs VN content (thay demo data)
- SVG dark placeholder thay image URL từ shadcnblocks

### 2. SVG placeholder cho image slots
```tsx
<div className="rounded-xl bg-zinc-800 aspect-video flex items-center justify-center">
  <span className="text-zinc-600 text-sm">Dashboard Preview</span>
</div>
```

### 3. Tab trigger styles (dark adaptation)
```
data-[state=active]:bg-zinc-800 data-[state=active]:text-primary
text-zinc-400 hover:text-zinc-200
```

## Related Files
- `app/components/how-it-works.tsx` — tạo mới
- `app/ui/badge.tsx` — dependency (Phase 01)
- `app/ui/button.tsx` — dependency (Phase 01)
- `app/components/HOW-IT-WORKS.MD` — spec reference

## Todo
- [ ] Tạo `app/components/how-it-works.tsx`
- [ ] 3 tabs VN content
- [ ] SVG dark placeholders cho image slots
- [ ] Dark-adapted tab trigger styles
- [ ] Badge + Button import từ `@/app/ui/`
- [ ] GSAP ScrollTrigger section entrance
- [ ] Section id="cach-hoat-dong"

## Success Criteria
- 3 tabs switch đúng khi click
- Content VN đầy đủ cho từng tab
- Badge + Button render đúng style
- GSAP entrance animation on scroll

## Risks
- `@radix-ui/react-tabs` TabsList cần explicit `display:flex` — Tailwind class `flex` trong TabsList
- Image placeholder nên có fixed aspect ratio để tránh layout shift

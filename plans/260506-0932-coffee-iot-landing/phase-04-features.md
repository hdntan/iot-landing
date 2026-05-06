---
title: "Phase 04 — Features: 4 Cards + GridPattern + GSAP ScrollTrigger"
status: pending
priority: P2
effort: 1h
---

# Phase 04 — Features

**Parent plan:** [plan.md](./plan.md)
**Spec source:** `app/components/FEATURES.MD` (`FeatureCard` + `GridPattern`)

## Overview

Implement Features section với 4 FeatureCard theo spec, GridPattern background, GSAP ScrollTrigger stagger (thay AnimatedContainer từ motion/react), nội dung tiếng Việt.

## Key Insights

- Spec dùng `AnimatedContainer` (`motion/react`) → thay bằng GSAP ScrollTrigger stagger
- `FeatureCard` và `GridPattern` không có animation riêng — chỉ `AnimatedContainer` wrapper cần thay
- `genRandomPattern()` generate random grid squares mỗi render — behavior này giữ nguyên
- Section id: `id="tinh-nang"` để navbar link hoạt động
- 4 cards (spec demo có 6) — plan chỉ cần 4

## Architecture

```
app/components/features.tsx
├── FeaturesSection         ← section id="tinh-nang"
│   ├── SectionHeader       ← headline + subtext (GSAP fade-in)
│   ├── FeatureCard x4      ← grid 2x2, GridPattern bg, GSAP stagger
│   │   ├── GridPattern     ← SVG background pattern
│   │   ├── Icon (lucide)
│   │   ├── Title
│   │   └── Description
```

## Content (4 cards)

```
1. icon: Wifi        title: "Giám sát Real-time"
                     desc:  "Theo dõi trạng thái máy qua Wifi/4G 24/7. Nhiệt độ, áp suất, lưu lượng cập nhật mỗi 30 giây."

2. icon: Bell        title: "Cảnh báo Tức thì"
                     desc:  "Nhận thông báo sự cố qua Zalo và email ngay khi máy gặp vấn đề. Phản hồi trước khi khách hàng phàn nàn."

3. icon: BarChart2   title: "Báo cáo Doanh thu"
                     desc:  "Thống kê tiêu thụ nguyên liệu, doanh thu từng máy theo ngày/tuần/tháng. Export PDF tự động."

4. icon: Bot         title: "Bảo trì Phòng ngừa AI"
                     desc:  "AI dự đoán hỏng hóc trước 7–14 ngày. Lên lịch bảo trì tự động, giảm 30% chi phí sửa chữa."
```

Section header:
```
Headline: "Mọi thứ bạn cần để vận hành thông minh hơn"
Subtext:  "Từ giám sát đến bảo trì — tất cả trong một nền tảng."
```

## GSAP ScrollTrigger Plan

```ts
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

useGSAP(() => {
  // Section header
  gsap.from(headerRef.current, {
    y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
  })
  // Cards stagger
  gsap.from(cardsRef.current.children, {
    y: 40, opacity: 0, filter: 'blur(4px)',
    stagger: 0.12, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' }
  })
}, [])
```

## Implementation Steps

### 1. Tạo `app/components/features.tsx`
- `"use client"` (GSAP ScrollTrigger)
- Copy `FeatureCard` + `GridPattern` + `genRandomPattern` từ spec nguyên văn
- Xóa `AnimatedContainer` + `motion/react` import
- Thêm `useGSAP` + ScrollTrigger refs
- 4 features VN content

### 2. Grid layout
```tsx
<div ref={cardsRef} className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2">
  {features.map((f, i) => <FeatureCard key={i} feature={f} />)}
</div>
```

### 3. ScrollTrigger registration
```ts
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```
Đặt trong module scope (ngoài component) hoặc một lần trong `useGSAP`.

## Related Files
- `app/components/features.tsx` — tạo mới
- `app/components/FEATURES.MD` — spec reference

## Todo
- [ ] Tạo `app/components/features.tsx`
- [ ] Copy FeatureCard + GridPattern + genRandomPattern từ spec
- [ ] 4 features VN content + lucide icons
- [ ] Replace AnimatedContainer → GSAP ScrollTrigger
- [ ] Section id="tinh-nang"
- [ ] Section header VN

## Success Criteria
- 4 cards render với GridPattern background
- GSAP stagger animation trigger khi scroll vào viewport
- Icons từ lucide-react hiển thị đúng
- Grid responsive: 1 col mobile, 2 col tablet+

## Risks
- `genRandomPattern()` gọi mỗi render → cards có thể re-animate pattern. Acceptable behavior.
- ScrollTrigger cần `window` — đã handled bởi `"use client"`

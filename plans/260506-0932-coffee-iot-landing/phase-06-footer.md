---
title: "Phase 06 — Footer: VN Links + GSAP ScrollTrigger"
status: pending
priority: P2
effort: 45m
---

# Phase 06 — Footer

**Parent plan:** [plan.md](./plan.md)
**Spec source:** `app/components/FOOTER.MD` (`footer-section.tsx`)

## Overview

Implement Footer với nội dung tiếng Việt, Coffee IoT branding, social links (Facebook, LinkedIn), GSAP ScrollTrigger (thay `AnimatedContainer` từ motion/react).

## Key Insights

- Spec dùng `motion/react` `AnimatedContainer` với `blur + translateY` → thay bằng GSAP ScrollTrigger stagger
- Spec có 4 sections (Product, Company, Resources, Social Links) → simplify thành 3 columns: Sản phẩm, Công ty, Mạng xã hội
- `FrameIcon` từ lucide → đổi thành Coffee logo text "☕ Coffee IoT" hoặc custom SVG
- Footer không cần `id` — cuối page

## Architecture

```
app/components/footer.tsx
├── FooterSection           ← footer element, GSAP ScrollTrigger
│   ├── FooterBrand         ← Logo + tagline + copyright
│   ├── FooterLinks         ← 2 link columns
│   │   ├── Col "Sản phẩm"  ← Tính năng, Cách hoạt động, Liên hệ
│   │   └── Col "Công ty"   ← Về chúng tôi, Chính sách bảo mật, Điều khoản
│   └── FooterSocial        ← Facebook + LinkedIn icons
```

## Content

```
Brand:
  Logo:     "☕ Coffee IoT"
  Tagline:  "Vận hành thông minh hơn mỗi ngày."
  Copy:     "© 2026 Coffee IoT. All rights reserved."

Links col 1 — "Sản phẩm":
  Tính năng       → #tinh-nang
  Cách hoạt động  → #cach-hoat-dong
  Liên hệ         → #lien-he

Links col 2 — "Công ty":
  Về chúng tôi    → /
  Chính sách bảo mật → /privacy
  Điều khoản sử dụng → /terms

Social:
  Facebook → # (FacebookIcon lucide)
  LinkedIn → # (LinkedinIcon lucide)
```

## GSAP Animation

```ts
useGSAP(() => {
  gsap.from(footerRef.current?.children, {
    y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: footerRef.current, start: 'top 90%' }
  })
}, [])
```

## Implementation Steps

### 1. Tạo `app/components/footer.tsx`
- `"use client"` (GSAP)
- Copy Footer structure từ spec
- Remove `motion/react` import + `AnimatedContainer`
- Replace `footerLinks` data → VN content (3 sections: Sản phẩm, Công ty, Mạng xã hội)
- Replace `FrameIcon` → text logo "☕ Coffee IoT"
- Thêm `useGSAP` + ScrollTrigger

### 2. Link sections
```ts
const footerLinks = [
  {
    label: 'Sản phẩm',
    links: [
      { title: 'Tính năng', href: '#tinh-nang' },
      { title: 'Cách hoạt động', href: '#cach-hoat-dong' },
      { title: 'Liên hệ', href: '#lien-he' },
    ],
  },
  {
    label: 'Công ty',
    links: [
      { title: 'Về chúng tôi', href: '/' },
      { title: 'Chính sách bảo mật', href: '/privacy' },
      { title: 'Điều khoản sử dụng', href: '/terms' },
    ],
  },
]
```

### 3. Social icons
```tsx
<div className="flex gap-4 mt-4">
  <a href="#"><FacebookIcon className="size-5 text-zinc-400 hover:text-primary transition" /></a>
  <a href="#"><LinkedinIcon className="size-5 text-zinc-400 hover:text-primary transition" /></a>
</div>
```

## Related Files
- `app/components/footer.tsx` — tạo mới
- `app/components/FOOTER.MD` — spec reference

## Todo
- [ ] Tạo `app/components/footer.tsx`
- [ ] VN content: links, brand, copyright
- [ ] Remove motion/react → GSAP ScrollTrigger
- [ ] Social icons (Facebook, LinkedIn)
- [ ] Logo text thay FrameIcon

## Success Criteria
- Footer hiển thị đúng 3 cột (brand + 2 link cols)
- Social icons clickable
- GSAP fade-in on scroll
- Copyright year correct (2026)

## Risks
- Footer `max-w-6xl mx-auto` từ spec — giữ nguyên để consistent với sections khác

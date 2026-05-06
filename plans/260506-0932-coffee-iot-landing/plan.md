---
title: "Coffee-IoT Landing Page"
description: "Dark SaaS landing page tiếng Việt cho nền tảng IoT quản lý máy pha cà phê, build trong iot-landing-page/ với Next.js 16 + GSAP"
status: pending
priority: P2
effort: 7h
branch: main
tags: [nextjs, landing-page, b2b, saas, vietnamese, iot, gsap, dark-theme]
created: 2026-05-06
---

# Coffee-IoT Landing Page

**Brainstorm report:** `plans/reports/brainstorm-260506-0932-coffee-iot-landing-page.md`

## Overview

Dark SaaS landing page tiếng Việt cho Coffee-IoT. Build trong **`iot-landing-page/`** (Next.js 16.2.4 + React 19 + Tailwind v4). 5 component specs từ `app/components/*.MD` → implement thành TSX thật, animations dùng **GSAP** thay framer-motion/motion.

**Sections:** Navbar → Hero (+ inline stats) → Features (4 cards) → How it Works (3 tabs) → Footer

---

## Phases

| # | Phase | Status | Est. | File |
|---|-------|--------|------|------|
| 1 | Setup: deps, utils, ui, dark theme | ⏳ pending | 45m | [phase-01-setup.md](./phase-01-setup.md) |
| 2 | Navbar — dark pill, GSAP cursor, sticky | ⏳ pending | 1h | [phase-02-navbar.md](./phase-02-navbar.md) |
| 3 | Hero — dithering + VN content + stats + GSAP | ⏳ pending | 1.5h | [phase-03-hero.md](./phase-03-hero.md) |
| 4 | Features — 4 cards + GridPattern + GSAP ScrollTrigger | ⏳ pending | 1h | [phase-04-features.md](./phase-04-features.md) |
| 5 | How it Works — 3 tabs VN + GSAP | ⏳ pending | 1h | [phase-05-how-it-works.md](./phase-05-how-it-works.md) |
| 6 | Footer — VN links + GSAP ScrollTrigger | ⏳ pending | 45m | [phase-06-footer.md](./phase-06-footer.md) |
| 7 | Assembly + Polish — page.tsx, SEO, build verify | ⏳ pending | 1h | [phase-07-assembly-polish.md](./phase-07-assembly-polish.md) |

---

## Key Decisions

| Decision | Choice | Reason |
|---|---|---|
| Project location | `iot-landing-page/` (existing) | Already bootstrapped, DRY |
| Animation | GSAP + @gsap/react | User preference; replaces framer-motion + motion/react |
| Hero effect | @paper-design/shaders-react | WebGL dithering — GSAP can't replace |
| How it Works | Tabs (3 steps) | Feature108 spec maps well to Kết nối→Giám sát→Tối ưu |
| Language | Tiếng Việt | B2B target market Vietnam |
| Theme | Dark SaaS | CSS vars hsl-based, html class="dark" |

## Dependencies to Install

```bash
npm install gsap @gsap/react @paper-design/shaders-react \
  @radix-ui/react-tabs lucide-react \
  class-variance-authority @radix-ui/react-slot \
  clsx tailwind-merge
```

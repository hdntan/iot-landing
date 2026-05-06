---
title: "Phase 01 — Setup: Dependencies, Utils, UI, Dark Theme"
status: pending
priority: P1
effort: 45m
---

# Phase 01 — Setup

**Parent plan:** [plan.md](./plan.md)
**Project:** `/Users/hodung/work/mobile/claude-config/iot-landing-page/`

## Overview

Install all libraries, scaffold `lib/utils.ts`, `app/ui/` primitives, update `globals.css` với dark theme CSS vars, update `layout.tsx` metadata.

## Requirements

- `cn()` utility available cho tất cả components
- shadcn Badge + Button primitives (copy từ specs)
- Dark theme CSS vars (hsl) trong globals.css
- `html` tag có `class="dark"` trong layout.tsx
- Metadata update: title "Coffee IoT", description tiếng Việt

## Implementation Steps

### 1. Install dependencies
```bash
cd /Users/hodung/work/mobile/claude-config/iot-landing-page
npm install gsap @gsap/react @paper-design/shaders-react \
  @radix-ui/react-tabs lucide-react \
  class-variance-authority @radix-ui/react-slot \
  clsx tailwind-merge
```

### 2. Tạo `app/lib/utils.ts`
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 3. Tạo `app/ui/badge.tsx`
Copy từ spec trong `app/components/HOW-IT-WORKS.MD` (shadcn/badge section).
Import path: `@/app/lib/utils` → `cn`.

### 4. Tạo `app/ui/button.tsx`
Copy từ spec trong `app/components/HOW-IT-WORKS.MD` (shadcn/button section).

### 5. Update `app/globals.css` — dark theme CSS vars
Thêm vào `:root` và `.dark`:
```css
:root {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --card: 0 0% 7%;
  --card-foreground: 0 0% 98%;
  --primary: 24 95% 53%;       /* orange-500 — coffee accent */
  --primary-foreground: 0 0% 9%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 24 95% 53%;
  --radius: 0.5rem;
}
```

### 6. Update `app/layout.tsx`
- `<html lang="vi" className="dark ...">`
- metadata: `title: "Coffee IoT — Quản lý máy pha cà phê thông minh"`, `description: "Nền tảng IoT B2B giúp chuỗi cà phê giám sát thiết bị real-time"`

## Related Files
- `app/lib/utils.ts` — tạo mới
- `app/ui/badge.tsx` — tạo mới
- `app/ui/button.tsx` — tạo mới
- `app/globals.css` — update
- `app/layout.tsx` — update

## Todo
- [ ] Install npm dependencies
- [ ] Create `app/lib/utils.ts`
- [ ] Create `app/ui/badge.tsx`
- [ ] Create `app/ui/button.tsx`
- [ ] Update `app/globals.css` dark vars
- [ ] Update `app/layout.tsx` metadata + lang + dark class
- [ ] Run `npm run build` — verify no errors

## Success Criteria
- `npm install` succeeds
- `cn()` importable từ `@/app/lib/utils`
- Badge + Button render without errors
- Dark background visible khi load page

## Risks
- Tailwind v4 CSS vars syntax khác v3 — dùng `@theme` block thay `:root` nếu cần
- Next.js 16 có thể có breaking changes trong font/metadata API — check `node_modules/next/dist/docs/`

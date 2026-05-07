---
status: pending
name: Starbucks Theme Transition
description: Transition the B2B IoT Landing Page from SpaceX dark theme to Starbucks-inspired light "Enterprise Barista" theme.
---

# Starbucks Theme Transition: The Enterprise Barista

## 1. Overview
Chuyển đổi giao diện B2B IoT Landing Page sang phong cách Starbucks (Light theme) tập trung vào tông màu ấm, font chữ bo tròn và màu xanh lá đặc trưng. 
Mục tiêu là mang lại cảm giác thân thiện với ngành F&B nhưng vẫn giữ được độ chuyên nghiệp của phần mềm quản trị (Enterprise Barista).

## 2. Design Tokens & CSS (app/globals.css)
Cập nhật CSS/Tailwind theo các biến số:

- **Colors**:
  - `page-bg`: `#f2f0eb` (Neutral Warm - Cream)
  - `card-bg`: `#ffffff` (White)
  - `brand-green`: `#006241` (Starbucks Green - Heading)
  - `accent-green`: `#00754A` (Green Accent - CTAs)
  - `house-green`: `#1E3932` (House Green - Dark bands/Footers)
  - `text-main`: `rgba(0, 0, 0, 0.87)` (Text Black)
  - `text-soft`: `rgba(0, 0, 0, 0.58)` (Text Black Soft)
  - `text-light`: `rgba(255, 255, 255, 1)` (Text White)
  
- **Typography**:
  - Font: `Inter` hoặc `Manrope` (thay thế cho SoDoSans).
  - Tracking/Letter spacing: `-0.01em` (hoặc `-0.16px`) đồng nhất.

- **Components**:
  - `btn-pill`: `50px` border-radius, background `#00754A`. Hover/Active: `transform: scale(0.95)`.
  - `card-panel`: `12px` border-radius, shadow siêu nhẹ `0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)`.
  - `frap-cta`: Nút tròn nổi `56px` góc dưới phải màn hình (thay thế chức năng cho Frap button).

## 3. Implementation Phases

### Phase 1: CSS & Typography Foundation
- [ ] Cập nhật/import Google Font (`Inter`).
- [ ] Tạo các CSS Variables trong `globals.css` dựa trên Starbucks Tokens.
- [ ] Xóa bỏ các global styles cũ của SpaceX (uppercase tràn lan, glow text, pure black backgrounds).

### Phase 2: Core Layout Components Update
- [ ] **Navbar**: Đổi giao diện sang light theme (nền `#ffffff` hoặc `#f2f0eb`), text màu `Text Black`, CTA đổi sang `Green Accent`. Shadow nhiều lớp `0 1px 3px rgba(...)`.
- [ ] **Footer**: Đổi background thành `House Green` (`#1E3932`), chữ trắng.
- [ ] **Frap Button**: Tạo Component nút nổi lơ lửng "Đặt lịch Demo".

### Phase 3: Hero Section Re-design
- [ ] Xóa hiệu ứng dark overlay ở background cũ.
- [ ] Đổi nền sang màu Cream (`#f2f0eb`) hoặc cấu trúc Split 40/60.
- [ ] Typography: Headline màu `Starbucks Green` (`#006241`), font-weight 600.
- [ ] Cập nhật Stats block sang giao diện thẻ Card hoặc Text rõ nét trên nền sáng.

### Phase 4: Inner Sections Update
- [ ] **Features / How It Works**: Đổi sang dạng lưới với `Card` trắng (`#ffffff`), bo góc `12px`.
- [ ] **Use Cases / Testimonials**: Sử dụng background `House Green` cho một số section đặc biệt làm dải phân cách (Feature Bands).

## 4. Notes
- Không dùng pure black (`#000000`) cho text.
- Không dùng pure white (`#ffffff`) cho nền website, chỉ dùng cho thẻ Card.
- Ưu tiên spacing rộng rãi dựa trên scale `1.6rem (16px)`.

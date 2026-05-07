"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

/* ─────────────────────────────────────────────────────────────
   Testimonial data — Coffee IoT / CaaS B2B context
───────────────────────────────────────────────────────────── */
interface Testimonial {
  text: string;
  highlight?: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  accentColor: string; // avatar ring color
}

const testimonials: Testimonial[] = [
  {
    text: "Mô hình Pay-per-cup giúp chúng tôi mở rộng chuỗi từ 10 lên 28 cơ sở mà không cần đầu tư vốn thiết bị ban đầu. Doanh thu tăng 40% chỉ sau 6 tháng.",
    highlight: "Pay-per-cup",
    name: "Nguyễn Minh Tuấn",
    role: "Giám đốc Vận hành",
    company: "Chuỗi cà phê — 28 cơ sở",
    initials: "NT",
    accentColor: "#00754A",
  },
  {
    text: "Dashboard IoT cho phép tôi kiểm soát nguyên liệu tiêu thụ của 15 điểm bán theo thời gian thực. Báo cáo tự động giúp tiết kiệm 3 giờ thống kê mỗi ngày.",
    highlight: "Dashboard IoT",
    name: "Trần Thị Lan",
    role: "Quản lý F&B",
    company: "Khách sạn 5 sao — Đà Nẵng",
    initials: "TL",
    accentColor: "#006241",
  },
  {
    text: "Tính năng khóa thiết bị từ xa giúp chúng tôi hoàn toàn yên tâm khi vận hành 50+ máy cho thuê. Chưa một lần mất thiết bị kể từ khi triển khai.",
    highlight: "khóa thiết bị từ xa",
    name: "Lê Văn Hùng",
    role: "CEO",
    company: "Dịch vụ CaaS — 50+ máy",
    initials: "LH",
    accentColor: "#1E3932",
  },
  {
    text: "Tích hợp phân tích AI giúp chúng tôi dự báo nhu cầu pha chế và tối ưu lịch bảo trì. Chi phí vận hành giảm 25% trong quý đầu tiên triển khai.",
    highlight: "phân tích AI",
    name: "Phạm Thu Hương",
    role: "COO",
    company: "Chuỗi F&B — 45 chi nhánh",
    initials: "PH",
    accentColor: "#00754A",
  },
  {
    text: "Asset management theo thời gian thực cho phép đội kỹ thuật phản hồi sự cố trong vòng 30 phút. Uptime thiết bị đạt 99.2% kể từ khi áp dụng nền tảng.",
    highlight: "Asset management",
    name: "Võ Đình Khoa",
    role: "IT Manager",
    company: "Tập đoàn bán lẻ — 80 store",
    initials: "VK",
    accentColor: "#006241",
  },
  {
    text: "Mô hình CaaS cho phép chúng tôi thử nghiệm không gian cà phê không gian văn phòng mà chỉ trả theo mức tiêu thụ thực tế. Rủi ro gần như bằng không.",
    highlight: "trả theo mức tiêu thụ thực tế",
    name: "Đỗ Thanh Bình",
    role: "Facility Manager",
    company: "Tòa nhà văn phòng hạng A",
    initials: "DB",
    accentColor: "#1E3932",
  },
];

/* ─────────────────────────────────────────────────────────────
   Carousel row component
───────────────────────────────────────────────────────────── */
function TestimonialsCarousel({
  items,
  speed = 28,
  direction = "left",
}: {
  items: Testimonial[];
  speed?: number;
  direction?: "left" | "right";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // duplicate to create seamless loop
  const loopItems = [...items, ...items];

  useEffect(() => {
    if (containerRef.current) {
      setCarouselWidth(containerRef.current.scrollWidth / 2);
    }
  }, [items]);

  const xAnimation =
    direction === "left"
      ? [0, -carouselWidth]
      : [-carouselWidth, 0];

  return (
    <div
      ref={containerRef}
      style={{ overflow: "hidden", width: "100%" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        animate={{ x: xAnimation }}
        transition={{
          duration: isPaused ? 0 : speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ display: "flex", gap: "24px" }}
      >
        {loopItems.map((t, index) => (
          <TestimonialCard key={`${t.name}-${index}`} testimonial={t} />
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Individual card — Starbucks card spec:
   White bg, 12px radius, whisper-soft layered shadow
───────────────────────────────────────────────────────────── */
function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  const renderText = () => {
    if (!t.highlight) return t.text;
    const parts = t.text.split(t.highlight);
    return parts.map((part, idx, arr) => (
      <React.Fragment key={idx}>
        {part}
        {idx !== arr.length - 1 && (
          <span style={{ color: "#00754A", fontWeight: 600 }}>
            {t.highlight}
          </span>
        )}
      </React.Fragment>
    ));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        flexShrink: 0,
        width: "340px",
        background: "#ffffff",
        borderRadius: "12px",
        padding: "28px 24px",
        boxShadow:
          "0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)",
        border: "1px solid rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        margin: "8px 0",
      }}
    >
      {/* Quote mark */}
      <div
        style={{
          fontSize: "48px",
          lineHeight: 0.9,
          color: "#006241",
          opacity: 0.15,
          fontFamily: "serif",
          fontWeight: 700,
          marginBottom: "12px",
          userSelect: "none",
        }}
      >
      </div>

      {/* Text */}
      <p
        style={{
          fontSize: "1.5rem",
          lineHeight: 1.65,
          color: "rgba(0,0,0,0.87)",
          letterSpacing: "-0.01em",
          marginBottom: "24px",
          flexGrow: 1,
        }}
      >
        {renderText()}
      </p>

      {/* Hairline divider */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: "#e7e7e7",
          marginBottom: "20px",
        }}
      />

      {/* Author row */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {/* Avatar circle — Starbucks 50% radius */}
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: t.accentColor,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "1.4rem",
            letterSpacing: "-0.01em",
            flexShrink: 0,
          }}
        >
          {t.initials}
        </div>

        {/* Name / role / company */}
        <div>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "rgba(0,0,0,0.87)",
              letterSpacing: "-0.01em",
              marginBottom: "2px",
            }}
          >
            {t.name}
          </p>
          <p
            style={{
              fontSize: "1.3rem",
              color: "rgba(0,0,0,0.58)",
              letterSpacing: "-0.01em",
              marginBottom: "1px",
            }}
          >
            {t.role}
          </p>
          <p
            style={{
              fontSize: "1.3rem",
              color: "rgba(0,0,0,0.45)",
              letterSpacing: "-0.01em",
            }}
          >
            {t.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section wrapper
───────────────────────────────────────────────────────────── */
export default function Testimonials() {
  return (
    <section
      id="khach-hang"
      style={{
        /* Neutral Warm canvas — Starbucks signature */
        background: "var(--neutral-warm, #f2f0eb)",
        width: "100%",
        padding: "clamp(80px, 12vh, 120px) 0",
        overflow: "hidden",
      }}
    >
      {/* ── Section header ── */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 var(--outer-gutter, 24px)",
          marginBottom: "64px",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontSize: "1.3rem",
            fontWeight: 600,
            color: "#00754A",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: "16px",
          }}
        >
          Khách hàng
        </p>

        {/* Headline — Starbucks Green for h2 heading color */}
        <h2
          style={{
            fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
            fontWeight: 600,
            color: "#006241",
            letterSpacing: "-0.016em",
            lineHeight: 1.2,
            maxWidth: "560px",
            margin: "0 auto 20px",
          }}
        >
          Họ nói gì về chúng tôi
        </h2>

        {/* Subhead */}
        <p
          style={{
            fontSize: "1.7rem",
            color: "rgba(0,0,0,0.58)",
            lineHeight: 1.55,
            maxWidth: "480px",
            margin: "0 auto",
            letterSpacing: "-0.01em",
          }}
        >
          Hàng trăm doanh nghiệp F&B đang chuyển đổi mô hình vận hành với
          Coffee IoT.
        </p>
      </div>

      {/* ── Row 1 — scrolls left ── */}
      <div style={{ marginBottom: "24px" }}>
        <TestimonialsCarousel
          items={testimonials}
          speed={32}
          direction="left"
        />
      </div>

      {/* ── Row 2 — scrolls right (reversed order for visual variety) ── */}
      <TestimonialsCarousel
        items={[...testimonials].reverse()}
        speed={28}
        direction="right"
      />

      {/* ── Fade-edge masks — left & right soft vignette ── */}
      <style>{`
        #khach-hang {
          position: relative;
        }
        #khach-hang::before,
        #khach-hang::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        #khach-hang::before {
          left: 0;
          background: linear-gradient(to right, #f2f0eb 0%, transparent 100%);
        }
        #khach-hang::after {
          right: 0;
          background: linear-gradient(to left, #f2f0eb 0%, transparent 100%);
        }
      `}</style>
    </section>
  );
}

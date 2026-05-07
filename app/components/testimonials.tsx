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
    text: "Tính năng điều khiển bật/tắt máy từ xa giúp chúng tôi xử lý sự cố ngay lập tức mà không cần cử kỹ thuật viên đến tận nơi. Tiết kiệm rất nhiều thời gian.",
    highlight: "điều khiển bật/tắt máy từ xa",
    name: "Nguyễn Minh Tuấn",
    role: "Admin hệ thống",
    company: "Chuỗi cho thuê máy — 28 cơ sở",
    initials: "NT",
    accentColor: "#00754A",
  },
  {
    text: "Dashboard quản lý máy rất trực quan. Tôi có thể xem trạng thái online/offline của tất cả máy trong chuỗi chỉ trên một màn hình, không cần gọi điện hỏi từng nơi.",
    highlight: "Dashboard quản lý máy",
    name: "Trần Thị Lan",
    role: "Shop Owner",
    company: "Chuỗi cà phê — Đà Nẵng",
    initials: "TL",
    accentColor: "#006241",
  },
  {
    text: "Quy trình đăng ký máy rất đơn giản. Kỹ thuật viên chỉ cần nhập mã định danh và thông tin khách hàng là xong, toàn bộ dữ liệu tự đồng bộ về hệ thống.",
    highlight: "đăng ký máy rất đơn giản",
    name: "Lê Văn Hùng",
    role: "Kỹ thuật viên",
    company: "Dịch vụ lắp đặt IoT",
    initials: "LH",
    accentColor: "#1E3932",
  },
  {
    text: "Báo cáo giờ sử dụng máy theo tuần/tháng giúp tôi đối soát hợp đồng thuê máy chính xác hơn. Không còn tranh chấp với khách hàng về thời gian sử dụng thực tế.",
    highlight: "Báo cáo giờ sử dụng máy",
    name: "Phạm Thu Hương",
    role: "Shop Owner",
    company: "Dịch vụ cho thuê máy — 45 điểm",
    initials: "PH",
    accentColor: "#00754A",
  },
  {
    text: "Hệ thống phân quyền RBAC rõ ràng giúp mỗi Shop chỉ thấy máy của mình. Admin có toàn quyền kiểm soát mà không lo Shop can thiệp vào dữ liệu của nhau.",
    highlight: "phân quyền RBAC",
    name: "Võ Đình Khoa",
    role: "Admin hệ thống",
    company: "Tập đoàn bán lẻ — 80 store",
    initials: "VK",
    accentColor: "#006241",
  },
  {
    text: "Kết nối MQTT qua HiveMQ rất ổn định. Lệnh bật/tắt máy được thực thi gần như tức thì, chưa bao giờ bị trễ hay mất lệnh kể từ khi triển khai.",
    highlight: "Kết nối MQTT",
    name: "Đỗ Thanh Bình",
    role: "IT Manager",
    company: "Chuỗi văn phòng hạng A",
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
          Admin và Shop trên khắp cả nước đang tin dùng CoffeeIOT để quản lý thiết bị.
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

"use client";

import React, { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  MapPin,
  CupSoda,
  BarChart3,
  Wrench,
  Lock,
  Wifi,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Feature data — Coffee IoT CaaS
───────────────────────────────────────────────────────────── */
const features = [
  {
    title: "Kiểm soát 100% tài sản",
    icon: MapPin,
    description:
      "Giám sát vị trí và tình trạng hoạt động của máy theo thời gian thực. Tự động khóa máy từ xa nếu phát hiện di dời trái phép hoặc trễ hạn thanh toán.",
    pattern: [[7, 1], [8, 2], [9, 5], [10, 3], [7, 6]],
  },
  {
    title: "Minh bạch từng ly cà phê",
    icon: CupSoda,
    description:
      "Dữ liệu chiết xuất (nhiệt độ, áp suất, thời gian) được gửi về hệ thống mỗi 30 giây. Đếm chính xác số ly pha để tính phí Pay-per-cup.",
    pattern: [[8, 1], [9, 4], [10, 2], [7, 3], [8, 6]],
  },
  {
    title: "Báo cáo doanh thu & nguyên liệu",
    icon: BarChart3,
    description:
      "Thống kê mức tiêu thụ hạt cà phê và đối chiếu với số ly bán ra. Tự động phát hiện hao hụt và gian lận tại điểm bán.",
    pattern: [[10, 1], [7, 2], [8, 5], [9, 3], [10, 6]],
  },
  {
    title: "Bảo trì phòng ngừa bằng AI",
    icon: Wrench,
    description:
      "Phân tích dữ liệu bơm, thanh nhiệt để dự đoán hỏng hóc trước 14 ngày. Chủ động thay thế linh kiện, đảm bảo máy luôn sẵn sàng.",
    pattern: [[9, 1], [10, 4], [7, 2], [8, 3], [9, 6]],
  },
  {
    title: "Bảo mật & chống trộm thông minh",
    icon: Lock,
    description:
      "Cảnh báo tức thì khi máy bị di dời ngoài giờ. Khóa thiết bị từ xa qua app trong vòng 10 giây. Lịch sử sự kiện đầy đủ để xử lý tranh chấp.",
    pattern: [[8, 2], [9, 1], [10, 5], [7, 4], [8, 3]],
  },
  {
    title: "Kết nối đa nền tảng",
    icon: Wifi,
    description:
      "Tích hợp liền mạch với POS, ERP và hệ thống quản lý chuỗi hiện có. API mở cho phép tùy chỉnh dashboard theo nhu cầu doanh nghiệp.",
    pattern: [[7, 3], [8, 5], [9, 2], [10, 1], [7, 6]],
  },
];

/* ─────────────────────────────────────────────────────────────
   GridPattern — SVG noise texture with highlighted squares
   Adapted from FEATURES.MD spec
───────────────────────────────────────────────────────────── */
function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
}) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} style={{ overflow: "visible" }}>
          {squares.map(([sx, sy], index) => (
            <rect
              strokeWidth="0"
              key={index}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}



/* ─────────────────────────────────────────────────────────────
   FeatureCard — single grid cell
   Dashed border handled by parent grid; card itself is bare
───────────────────────────────────────────────────────────── */
function FeatureCard({
  feature,
}: {
  feature: (typeof features)[0];
}) {
  const pattern = feature.pattern;
  const Icon = feature.icon;

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "32px 28px",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        // hover handled via CSS class below
      }}
      className="feature-card-inner"
    >
      {/* Decorative grid texture — top-center mask */}
      <div
        aria-hidden
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%) translateX(-80px)",
          marginTop: "-8px",
          width: "100%",
          height: "100%",
          maskImage: "linear-gradient(white, transparent)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,98,65,0.04), rgba(0,98,65,0.01))",
            maskImage:
              "radial-gradient(farthest-side at top, white, transparent)",
            opacity: 1,
          }}
        >
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={pattern}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              fill: "rgba(0,98,65,0.05)",
              stroke: "rgba(0,98,65,0.20)",
              mixBlendMode: "overlay",
            }}
          />
        </div>
      </div>

      {/* Icon */}
      <Icon
        size={24}
        strokeWidth={1.2}
        aria-hidden
        style={{
          color: "#00754A",
          marginBottom: "40px",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Title */}
      <h3
        style={{
          margin: "0 0 10px 0",
          fontSize: "1.7rem",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "rgba(0,0,0,0.87)",
          lineHeight: 1.3,
          position: "relative",
          zIndex: 1,
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          margin: 0,
          fontSize: "1.45rem",
          fontWeight: 400,
          color: "rgba(0,0,0,0.55)",
          lineHeight: 1.6,
          letterSpacing: "-0.01em",
          position: "relative",
          zIndex: 1,
        }}
      >
        {feature.description}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   AnimatedContainer — blur + slide-up on scroll
   From FEATURES.MD AnimatedContainer pattern
───────────────────────────────────────────────────────────── */
function AnimatedContainer({
  children,
  delay = 0.1,
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div style={style} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Features section
───────────────────────────────────────────────────────────── */
export default function Features() {
  return (
    <section
      id="tinh-nang"
      style={{
        /* Neutral Warm canvas — Starbucks signature */
        background: "var(--neutral-warm, #f2f0eb)",
        width: "100%",
        padding: "clamp(80px, 12vh, 120px) var(--outer-gutter, 24px)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* ── Section header ── */}
        <AnimatedContainer
          delay={0.1}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#00754A",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "16px",
            }}
          >
            Tính năng
          </p>

          {/* Headline */}
          <h2
            style={{
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              fontWeight: 600,
              color: "#006241",
              letterSpacing: "-0.016em",
              lineHeight: 1.2,
              maxWidth: "640px",
              margin: "0 auto 20px",
            }}
          >
            Mọi thứ bạn cần để vận hành thông minh hơn
          </h2>

          <p
            style={{
              fontSize: "1.7rem",
              color: "rgba(0,0,0,0.58)",
              lineHeight: 1.55,
              maxWidth: "500px",
              margin: "0 auto",
              letterSpacing: "-0.01em",
            }}
          >
            Kiểm soát toàn bộ chuỗi thiết bị — từ vị trí đến từng ly pha — trên
            một nền tảng duy nhất.
          </p>
        </AnimatedContainer>

        {/* ── Feature grid — dashed border pattern from FEATURES.MD ── */}
        <AnimatedContainer delay={0.35}>
          <div className="features-grid">
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} />
            ))}
          </div>
        </AnimatedContainer>
      </div>

      {/* ── Styles ── */}
      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px dashed rgba(0,98,65,0.25);
          border-radius: 12px;
          overflow: hidden;
        }

        /* Inner cell dividers — dashed lines between cards */
        .feature-card-inner {
          border-right: 1px dashed rgba(0,98,65,0.25);
          border-bottom: 1px dashed rgba(0,98,65,0.25);
          transition: background 0.2s ease;
        }

        /* Remove right border on last of each row */
        .features-grid > *:nth-child(3n) .feature-card-inner {
          border-right: none;
        }

        /* Remove bottom border on last row */
        .features-grid > *:nth-child(n+4) .feature-card-inner {
          border-bottom: none;
        }

        /* Hover — subtle warm lift */
        .feature-card-inner:hover {
          background: #fafaf8;
        }

        /* Tablet — 2 columns */
        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .features-grid > *:nth-child(3n) .feature-card-inner {
            border-right: 1px dashed rgba(0,98,65,0.25);
          }
          .features-grid > *:nth-child(2n) .feature-card-inner {
            border-right: none;
          }
          .features-grid > *:nth-child(n+4) .feature-card-inner {
            border-bottom: 1px dashed rgba(0,98,65,0.25);
          }
          .features-grid > *:nth-child(n+5) .feature-card-inner {
            border-bottom: none;
          }
        }

        /* Mobile — 1 column */
        @media (max-width: 560px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
          .feature-card-inner {
            border-right: none !important;
            border-bottom: 1px dashed rgba(0,98,65,0.25) !important;
          }
          .features-grid > *:last-child .feature-card-inner {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}

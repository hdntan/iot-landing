"use client";

import React, { useRef } from "react";
import { motion, useInView, Transition } from "motion/react";
import { ShieldCheck, Plus, Check } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   BorderTrail — animated shimmer around the highlighted card
   Adapted from ibelick/border-trail, no Tailwind dependency
───────────────────────────────────────────────────────────── */
type BorderTrailProps = {
  size?: number;
  duration?: number;
  color?: string;
  style?: React.CSSProperties;
};

function BorderTrail({
  size = 80,
  duration = 5,
  color = "#00754A",
  style,
}: BorderTrailProps) {
  const baseTransition: Transition = {
    repeat: Infinity,
    duration,
    ease: "linear",
  };

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        border: "1px solid transparent",
        maskClip: "padding-box, border-box",
        maskComposite: "intersect",
        maskImage:
          "linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          aspectRatio: "1",
          width: size,
          background: color,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          boxShadow: `0 0 20px 8px ${color}55, 0 0 40px 16px ${color}22`,
          ...style,
        }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={baseTransition}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Plan data — Coffee IoT CaaS
───────────────────────────────────────────────────────────── */
const plans = [
  {
    id: "lite",
    name: "CaaS LITE",
    tagline: "Quản lý tài sản cơ bản",
    price: "490.000đ",
    period: "/ máy / tháng",
    oldPrice: "590.000đ",
    discount: "17% off",
    description: "Lý tưởng cho doanh nghiệp bắt đầu số hóa thiết bị.",
    features: [
      "Định vị & chống trộm GPS",
      "Cảnh báo di dời trái phép",
      "Khóa máy từ xa",
      "Dashboard trực quan",
      "Hỗ trợ 8/5",
    ],
    cta: "Bắt đầu",
    href: "https://dimori.net/en",
    highlight: false,
    badge: null,
  },
  {
    id: "pro",
    name: "CaaS PRO",
    tagline: "Pay-per-cup toàn diện",
    price: "890.000đ",
    period: "/ máy / tháng",
    oldPrice: "1.190.000đ",
    discount: "25% off",
    description: "Giải pháp IoT đầy đủ cho chuỗi vận hành chuyên nghiệp.",
    features: [
      "Tất cả tính năng Lite",
      "Thống kê ly pha real-time",
      "Báo cáo nguyên liệu tự động",
      "Dự báo bảo trì AI",
      "Tích hợp POS / ERP cơ bản",
      "Hỗ trợ 24/7",
    ],
    cta: "Dùng thử 14 ngày",
    href: "https://dimori.net/en",
    highlight: true,
    badge: "Phổ biến nhất",
  },
  {
    id: "enterprise",
    name: "ENTERPRISE",
    tagline: "Tích hợp sâu cho chuỗi lớn",
    price: "Liên hệ",
    period: "",
    oldPrice: null,
    discount: null,
    description: "Giải pháp tùy chỉnh, triển khai riêng, hỗ trợ tận nơi.",
    features: [
      "Tất cả tính năng Pro",
      "API tích hợp ERP / POS đầy đủ",
      "Triển khai On-premise",
      "Hardware tùy chỉnh theo yêu cầu",
      "Dedicated support & SLA",
    ],
    cta: "Liên hệ Sales",
    href: "#lien-he",
    highlight: false,
    badge: null,
  },
];

/* ─────────────────────────────────────────────────────────────
   PlusMark corner accent (from pricing-section.md)
───────────────────────────────────────────────────────────── */
function PlusMark({ style }: { style: React.CSSProperties }) {
  return (
    <Plus
      size={20}
      strokeWidth={1.5}
      style={{
        position: "absolute",
        color: "rgba(0,0,0,0.20)",
        ...style,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Single plan card
───────────────────────────────────────────────────────────── */
function PlanCard({ plan }: { plan: (typeof plans)[0] }) {
  const isHighlight = plan.highlight;

  return (
    <div
      style={{
        position: "relative",
        background: isHighlight ? "#ffffff" : "#ffffff",
        borderRadius: "12px",
        border: isHighlight
          ? "2px solid #00754A"
          : "1px solid rgba(0,0,0,0.10)",
        boxShadow: isHighlight
          ? "0 0 0.5px rgba(0,0,0,0.14), 0 8px 24px rgba(0,114,74,0.12), 0 2px 4px rgba(0,0,0,0.06)"
          : "0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)",
        padding: "32px 28px 28px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Animated border trail on highlighted card */}
      {isHighlight && (
        <BorderTrail size={100} duration={4} color="#00754A" />
      )}

      {/* Popular badge */}
      {plan.badge && (
        <div
          style={{
            position: "absolute",
            top: "-1px",
            right: "24px",
            background: "#00754A",
            color: "#ffffff",
            fontSize: "1.1rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "4px 14px",
            borderRadius: "0 0 8px 8px",
          }}
        >
          {plan.badge}
        </div>
      )}

      {/* Plan name */}
      <p
        style={{
          fontSize: "1.2rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: isHighlight ? "#00754A" : "rgba(0,0,0,0.45)",
          marginBottom: "6px",
        }}
      >
        {plan.name}
      </p>

      <p
        style={{
          fontSize: "1.4rem",
          color: "rgba(0,0,0,0.58)",
          letterSpacing: "-0.01em",
          marginBottom: "20px",
        }}
      >
        {plan.description}
      </p>

      {/* Price row */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "6px",
          marginBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: plan.price === "Liên hệ" ? "2.8rem" : "3.2rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "rgba(0,0,0,0.87)",
            lineHeight: 1,
          }}
        >
          {plan.price}
        </span>
        {plan.period && (
          <span
            style={{
              fontSize: "1.4rem",
              color: "rgba(0,0,0,0.45)",
              fontWeight: 400,
            }}
          >
            {plan.period}
          </span>
        )}
      </div>

      {/* Old price + discount badge */}
      {plan.oldPrice && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "1.3rem",
              color: "rgba(0,0,0,0.35)",
              textDecoration: "line-through",
            }}
          >
            {plan.oldPrice}
          </span>
          <span
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: isHighlight ? "#006241" : "rgba(0,0,0,0.55)",
              background: isHighlight ? "#d4e9e2" : "#f2f0eb",
              padding: "2px 8px",
              borderRadius: "50px",
              letterSpacing: "0.02em",
            }}
          >
            {plan.discount}
          </span>
        </div>
      )}

      {!plan.oldPrice && <div style={{ marginBottom: "24px" }} />}

      {/* Hairline divider */}
      <div
        style={{
          height: "1px",
          background: "#e7e7e7",
          margin: "0 -28px 24px -28px",
        }}
      />

      {/* Features list */}
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flexGrow: 1,
          marginBottom: "32px",
        }}
      >
        {plan.features.map((f) => (
          <li
            key={f}
            style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
          >
            <Check
              size={16}
              strokeWidth={2.5}
              style={{
                flexShrink: 0,
                marginTop: "2px",
                color: isHighlight ? "#00754A" : "#006241",
              }}
            />
            <span
              style={{
                fontSize: "1.5rem",
                color: "rgba(0,0,0,0.75)",
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
              }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA — Starbucks pill buttons */}
      <a
        href={plan.href}
        target={plan.href.startsWith("http") ? "_blank" : undefined}
        rel={
          plan.href.startsWith("http") ? "noopener noreferrer" : undefined
        }
        style={{
          display: "block",
          width: "100%",
          padding: "12px 24px",
          borderRadius: "50px",
          fontSize: "1.5rem",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          textAlign: "center",
          textDecoration: "none",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          background: isHighlight ? "#00754A" : "transparent",
          color: isHighlight ? "#ffffff" : "#00754A",
          border: isHighlight ? "1px solid #00754A" : "1px solid #00754A",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transform = "scale(1.02)";
          el.style.boxShadow = isHighlight
            ? "0 4px 12px rgba(0,117,74,0.30)"
            : "0 2px 8px rgba(0,0,0,0.08)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transform = "scale(1)";
          el.style.boxShadow = "none";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.95)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
        }}
      >
        {plan.cta}
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Pricing section
───────────────────────────────────────────────────────────── */
export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="bang-gia"
      ref={sectionRef}
      style={{
        /* White canvas — contrasts with the cream testimonials above */
        background: "#ffffff",
        width: "100%",
        padding: "clamp(80px, 12vh, 120px) var(--outer-gutter, 24px)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
            Bảng giá
          </p>

          {/* Headline */}
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
            Chọn gói phù hợp với bạn
          </h2>

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
            Thanh toán hàng tháng, hủy bất kỳ lúc nào. Không phí ẩn.
          </p>
        </motion.div>

        {/* ── Pricing card cluster with PlusIcon corners ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative" }}
        >
          {/* Subtle dot-grid background (from pricing-section.md) */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",
              backgroundImage:
                "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage:
                "radial-gradient(ellipse at center, transparent 30%, #000 100%)",
            }}
          />

          {/* PlusIcon corner accents */}
          <PlusMark style={{ top: "-10px", left: "-10px" }} />
          <PlusMark style={{ top: "-10px", right: "-10px" }} />
          <PlusMark style={{ bottom: "-10px", left: "-10px" }} />
          <PlusMark style={{ bottom: "-10px", right: "-10px" }} />

          {/* 3-column card grid */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
              alignItems: "stretch",
            }}
          >
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.25 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <PlanCard plan={plan} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Trust badge (ShieldCheck from pricing-section.md) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            color: "rgba(0,0,0,0.45)",
          }}
        >
          <ShieldCheck size={16} strokeWidth={1.5} />
          <span
            style={{
              fontSize: "1.4rem",
              letterSpacing: "-0.01em",
            }}
          >
            Giá chưa bao gồm phí thiết bị IoT module · Hủy bất kỳ lúc nào
          </span>
        </motion.div>
      </div>
    </section>
  );
}

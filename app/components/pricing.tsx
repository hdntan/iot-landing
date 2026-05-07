"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "CaaS LITE",
    price: "490.000đ",
    period: "/ máy / tháng",
    description: "Lý tưởng cho quản lý tài sản cơ bản",
    features: [
      "Định vị & chống trộm",
      "Cảnh báo di dời trái phép",
      "Khóa máy từ xa",
      "Hỗ trợ 8/5",
    ],
    cta: "Bắt đầu",
    href: "https://dimori.net/en",
    highlight: false,
    badge: null,
  },
  {
    name: "CaaS PRO",
    price: "890.000đ",
    period: "/ máy / tháng",
    description: "Giải pháp Pay-per-cup toàn diện",
    features: [
      "Tất cả tính năng Lite",
      "Thống kê ly pha real-time",
      "Báo cáo nguyên liệu",
      "Dự báo bảo trì AI",
      "Hỗ trợ 24/7",
    ],
    cta: "Dùng thử 14 ngày",
    href: "https://dimori.net/en",
    highlight: true,
    badge: "Phổ biến nhất",
  },
  {
    name: "ENTERPRISE",
    price: "Liên hệ",
    period: "",
    description: "Tích hợp sâu cho chuỗi lớn",
    features: [
      "Tất cả tính năng Pro",
      "API tích hợp ERP / POS",
      "Triển khai On-premise",
      "Hardware tùy chỉnh",
      "Dedicated support",
    ],
    cta: "Liên hệ Sales",
    href: "#lien-he",
    highlight: false,
    badge: null,
  },
];

export default function Pricing() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (gridRef.current?.children.length) {
      gsap.fromTo(Array.from(gridRef.current.children), 
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="bang-gia"
      style={{
        background: "var(--white)",
        width: "100%",
        padding: "clamp(80px, 12vh, 120px) var(--outer-gutter)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* ── Header ──────────────────────────────────────────────── */}
        <div ref={headerRef} style={{ marginBottom: "64px", textAlign: "center" }}>
          <p
            className="sb-small"
            style={{ 
              marginBottom: "16px", 
              fontWeight: 600, 
              color: "var(--starbucks-green)",
              textTransform: "uppercase",
              letterSpacing: "1px" 
            }}
          >
            Bảng giá
          </p>
          <h2 className="sb-display" style={{ maxWidth: "540px", margin: "0 auto", color: "var(--text-main)" }}>
            Chọn gói phù hợp với bạn
          </h2>
        </div>

        {/* ── Pricing grid ─────────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="pricing-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
            alignItems: "flex-start",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: plan.highlight ? "var(--neutral-warm)" : "var(--white)",
                borderRadius: "12px",
                padding: "48px 32px",
                boxShadow: plan.highlight 
                  ? "0 12px 24px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)" 
                  : "0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)",
                border: plan.highlight ? "2px solid var(--starbucks-green)" : "1px solid #e7e7e7",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--starbucks-green)",
                    color: "var(--white)",
                    padding: "4px 16px",
                    borderRadius: "50px",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <p
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "var(--text-soft)",
                  marginBottom: "16px",
                }}
              >
                {plan.name}
              </p>

              {/* Price */}
              <div style={{ marginBottom: "8px", display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span
                  style={{
                    fontSize: "3.6rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--text-main)",
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    style={{ 
                      fontSize: "1.6rem", 
                      color: "var(--text-soft)",
                      fontWeight: 500,
                    }}
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                className="sb-body"
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: "32px",
                }}
              >
                {plan.description}
              </p>

              {/* Divider */}
              <div style={{ height: "1px", background: "#e7e7e7", margin: "0 -32px 32px -32px" }} />

              {/* Features */}
              <ul
                style={{
                  listStyle: "none",
                  margin: "0 0 40px 0",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  flexGrow: 1,
                }}
              >
                {plan.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, color: "var(--starbucks-green)" }}>
                      <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span
                      style={{
                        fontSize: "1.5rem",
                        color: "var(--text-main)",
                        lineHeight: 1.5,
                      }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.href}
                target={plan.href.startsWith("http") ? "_blank" : undefined}
                rel={plan.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={plan.highlight ? "btn-primary" : "btn-secondary"}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* ── Trial note ───────────────────────────────────────────── */}
        <p
          className="sb-small"
          style={{
            color: "var(--text-soft)",
            marginTop: "48px",
            textAlign: "center"
          }}
        >
          * Giá chưa bao gồm phí thiết bị IoT module. Thanh toán hàng tháng, hủy bất kỳ lúc nào.
        </p>
      </div>
    </section>
  );
}

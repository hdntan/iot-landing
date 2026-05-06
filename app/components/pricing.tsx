"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "STARTER",
    price: "990.000đ",
    period: "/ tháng",
    description: "Lý tưởng cho chuỗi 1–5 máy",
    features: [
      "Giám sát real-time 24/7",
      "Cảnh báo Zalo / Email",
      "Báo cáo tháng cơ bản",
      "Hỗ trợ 8/5",
    ],
    cta: "Bắt đầu",
    href: "https://dimori.net/en",
    highlight: false,
    badge: null,
  },
  {
    name: "GROWTH",
    price: "2.490.000đ",
    period: "/ tháng",
    description: "Chuỗi 6–20 máy, cần analytics sâu",
    features: [
      "Tất cả Starter",
      "AI bảo trì phòng ngừa",
      "Export PDF tự động",
      "Dashboard tùy chỉnh",
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
    description: "20+ máy, tích hợp hệ thống",
    features: [
      "Tất cả Growth",
      "API tích hợp ERP / POS",
      "SLA 99.9% guarantee",
      "Dedicated support",
      "Triển khai on-premise",
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
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      });
    }

    if (gridRef.current?.children.length) {
      gsap.from(Array.from(gridRef.current.children), {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
        },
      });
    }
  }, []);

  return (
    <section
      id="bang-gia"
      style={{
        background: "#000000",
        width: "100%",
        padding: "clamp(80px, 12vh, 160px) clamp(24px, 5vw, 80px)",
        borderTop: "1px solid rgba(240,240,250,0.12)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* ── Header ──────────────────────────────────────────────── */}
        <div ref={headerRef} style={{ marginBottom: "80px" }}>
          <p
            className="sx-micro"
            style={{ marginBottom: "24px", opacity: 0.8, letterSpacing: "2px" }}
          >
            Bảng giá
          </p>
          <h2 className="sx-heading" style={{ maxWidth: "540px", marginBottom: "0" }}>
            Chọn gói
            <br />
            phù hợp với bạn
          </h2>
        </div>

        {/* ── Pricing grid ─────────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="pricing-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "0",
          }}
        >
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              style={{
                paddingRight: i < plans.length - 1 ? "48px" : "0",
                paddingLeft: i > 0 ? "48px" : "0",
                borderRight:
                  i < plans.length - 1
                    ? "1px solid rgba(240,240,250,0.12)"
                    : "none",
                borderTop: plan.highlight ? "2px solid #f0f0fa" : "none",
                paddingTop: plan.highlight ? "32px" : "0",
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <p
                  className="sx-micro"
                  style={{
                    opacity: 0.8,
                    letterSpacing: "2px",
                    marginBottom: "20px",
                    color: "#f0f0fa",
                  }}
                >
                  {plan.badge}
                </p>
              )}

              {/* Plan name */}
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(240,240,250,0.6)",
                  marginBottom: "24px",
                }}
              >
                {plan.name}
              </p>

              {/* Price */}
              <div style={{ marginBottom: "8px" }}>
                <span
                  style={{
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 700,
                    letterSpacing: "0.96px",
                    textTransform: "uppercase",
                    color: "#f0f0fa",
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
              </div>

              {plan.period && (
                <p
                  className="sx-micro"
                  style={{ opacity: 0.45, marginBottom: "16px" }}
                >
                  {plan.period}
                </p>
              )}

              {/* Description */}
              <p
                className="sx-body"
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.4px",
                  lineHeight: 1.7,
                  marginBottom: "40px",
                  opacity: 0.65,
                }}
              >
                {plan.description}
              </p>

              {/* Divider */}
              <div className="sx-divider" style={{ marginBottom: "32px" }} />

              {/* Features */}
              <ul
                style={{
                  listStyle: "none",
                  margin: "0 0 48px 0",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
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
                    <span
                      style={{
                        fontSize: "10px",
                        letterSpacing: "1px",
                        color: "rgba(240,240,250,0.4)",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    >
                      —
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.6px",
                        textTransform: "uppercase",
                        color: "rgba(240,240,250,0.75)",
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
                className="btn-ghost"
                style={{ width: "100%", justifyContent: "center" }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* ── Trial note ───────────────────────────────────────────── */}
        <p
          className="sx-micro"
          style={{
            opacity: 0.35,
            marginTop: "48px",
            letterSpacing: "0.8px",
          }}
        >
          * Giá chưa bao gồm phí thiết bị IoT module. Thanh toán hàng tháng, hủy bất kỳ lúc nào.
        </p>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .pricing-grid > div {
            padding: 0 !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(240,240,250,0.12) !important;
            padding-bottom: 48px !important;
          }
          .pricing-grid > div:last-child {
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }
          .pricing-grid > div[style*="border-top: 2px solid"] {
            border-top: 2px solid #f0f0fa !important;
            padding-top: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}

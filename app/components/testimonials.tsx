"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Chuyển sang mô hình Pay-per-cup giúp chúng tôi dễ dàng mở rộng mạng lưới cho thuê máy mà không lo thất thoát doanh thu.",
    author: "Nguyễn Minh Tuấn",
    role: "Giám đốc Vận hành",
    company: "Chuỗi cà phê — 28 cơ sở",
  },
  {
    quote:
      "Dashboard trực quan, báo cáo tự động giúp tôi kiểm soát nguyên liệu tiêu thụ của 15 điểm bán một cách chính xác.",
    author: "Trần Thị Lan",
    role: "Quản lý F&B",
    company: "Khách sạn 5 sao — Đà Nẵng",
  },
  {
    quote:
      "Máy tự động khóa khi phát hiện di dời trái phép. Tính năng này giúp chúng tôi hoàn toàn yên tâm khi cho thuê thiết bị.",
    author: "Lê Văn Hùng",
    role: "CEO",
    company: "Dịch vụ CaaS — 50+ máy",
  },
];

export default function Testimonials() {
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
      id="khach-hang"
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
            Khách hàng
          </p>
          <h2 className="sb-display" style={{ maxWidth: "540px", margin: "0 auto", color: "var(--text-main)" }}>
            Họ nói gì về chúng tôi
          </h2>
        </div>

        {/* ── Testimonials grid ────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="testimonials-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              style={{
                background: "var(--neutral-warm)",
                borderRadius: "16px",
                padding: "48px 32px",
                display: "flex",
                flexDirection: "column",
                border: "1px solid #e7e7e7",
                boxShadow: "0 4px 12px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)"
              }}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontSize: "64px",
                  lineHeight: 0.8,
                  color: "var(--starbucks-green)",
                  opacity: 0.2,
                  fontWeight: 700,
                  marginBottom: "16px",
                  fontFamily: "serif"
                }}
              >
                
              </div>

              {/* Quote text */}
              <p
                className="sb-body"
                style={{
                  color: "var(--text-main)",
                  fontSize: "1.8rem",
                  lineHeight: 1.6,
                  marginBottom: "40px",
                  flexGrow: 1,
                  fontStyle: "italic"
                }}
              >
                {t.quote}
              </p>

              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "#e7e7e7",
                  marginBottom: "24px",
                }}
              />

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div 
                  style={{ 
                    width: "48px", 
                    height: "48px", 
                    borderRadius: "50%", 
                    background: "var(--starbucks-green)",
                    color: "var(--white)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: "1.6rem"
                  }}
                >
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      color: "var(--text-main)",
                      marginBottom: "4px",
                    }}
                  >
                    {t.author}
                  </p>
                  <p className="sb-small" style={{ color: "var(--text-soft)", marginBottom: "2px" }}>
                    {t.role}
                  </p>
                  <p className="sb-small" style={{ color: "var(--text-soft)", fontWeight: 500 }}>
                    {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

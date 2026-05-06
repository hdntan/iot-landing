"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Giảm 40% cuộc gọi hỗ trợ sau 2 tháng. Technician biết máy hỏng trước khi khách phàn nàn.",
    author: "Nguyễn Minh Tuấn",
    role: "Giám đốc Vận hành",
    company: "Chuỗi cà phê — 28 cơ sở",
  },
  {
    quote:
      "Dashboard trực quan, báo cáo tự động giúp tôi theo dõi 15 máy mà không cần đến tận nơi.",
    author: "Trần Thị Lan",
    role: "Quản lý F&B",
    company: "Khách sạn 5 sao — Đà Nẵng",
  },
  {
    quote:
      "ROI dương sau 3 tháng. Chi phí bảo trì giảm rõ rệt nhờ AI phát hiện sự cố sớm.",
    author: "Lê Văn Hùng",
    role: "CEO",
    company: "Coffee franchise — 12 chi nhánh",
  },
];

export default function Testimonials() {
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
      id="khach-hang"
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
            style={{ marginBottom: "24px", letterSpacing: "2px" }} // Removed opacity: 0.8
          >
            Khách hàng
          </p>
          <h2 className="sx-heading" style={{ maxWidth: "540px", marginBottom: "0" }}>
            Họ nói gì
            <br />
            về chúng tôi
          </h2>
        </div>

        {/* ── Testimonials grid ────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="testimonials-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "0",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              style={{
                paddingRight: i < testimonials.length - 1 ? "48px" : "0",
                paddingLeft: i > 0 ? "48px" : "0",
                borderRight:
                  i < testimonials.length - 1
                    ? "1px solid rgba(240,240,250,0.12)"
                    : "none",
              }}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontSize: "48px",
                  lineHeight: 1,
                  color: "rgba(240,240,250,0.15)",
                  fontWeight: 700,
                  marginBottom: "24px",
                  letterSpacing: "-2px",
                }}
              >
              </div>

              {/* Quote text */}
              <p
                className="sx-body"
                style={{
                  fontSize: "15px", // Increased from 14px
                  lineHeight: 1.85,
                  letterSpacing: "0.4px",
                  marginBottom: "40px",
                  minHeight: "100px",
                }}
              >
                {t.quote}
              </p>

              {/* Divider */}
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "rgba(240,240,250,0.35)",
                  marginBottom: "20px",
                }}
              />

              {/* Author */}
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "1.17px",
                  textTransform: "uppercase",
                  color: "#f0f0fa",
                  marginBottom: "6px",
                }}
              >
                {t.author}
              </p>
              <p className="sx-micro" style={{ opacity: 0.7, marginBottom: "4px" }}>
                {t.role}
              </p>
              <p className="sx-micro" style={{ opacity: 0.6 }}>
                {t.company}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .testimonials-grid > div {
            padding: 0 0 48px 0 !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(240,240,250,0.12) !important;
          }
          .testimonials-grid > div:last-child {
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }
        }
        @media (max-width: 500px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

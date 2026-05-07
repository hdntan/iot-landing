"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  {
    value: "ket-noi",
    index: "01",
    label: "Triển khai",
    title: "Lắp đặt phần cứng chuẩn công nghiệp.",
    description:
      "Module IoT gắn ngoài nhỏ gọn, tương thích với 90% máy pha cà phê chuyên nghiệp hiện nay. Tự động kết nối Wifi/4G không cần cấu hình phức tạp.",
    cta: "Xem hướng dẫn",
    image: "/images/step1.png",
    imageLabel: "Hướng dẫn lắp đặt",
  },
  {
    value: "giam-sat",
    index: "02",
    label: "Quản lý",
    title: "Đồng bộ dữ liệu an toàn.",
    description:
      "Dashboard trung tâm hiển thị toàn cảnh tình trạng thiết bị ở tất cả các điểm bán. Phân quyền truy cập rõ ràng.",
    cta: "Xem demo",
    image: "/images/step2.png",
    imageLabel: "Dashboard Preview",
  },
  {
    value: "toi-uu",
    index: "03",
    label: "Kinh doanh",
    title: "Tối ưu hóa lợi nhuận cho thuê.",
    description:
      "Thu tiền chính xác theo số ly pha (Pay-per-cup). Cung cấp giải pháp cho thuê máy không rủi ro cho cả hai bên.",
    cta: "Tìm hiểu thêm",
    image: "/images/step3.png",
    imageLabel: "AI Analytics",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(tabs[0].value);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const current = tabs.find((t) => t.value === active)!;

  return (
    <section
      id="cach-hoat-dong"
      ref={sectionRef}
      style={{
        background: "var(--house-green)",
        width: "100%",
        padding: "clamp(80px, 12vh, 120px) var(--outer-gutter)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* ── Header ────────────────────────────────────────────── */}
        <div ref={headerRef} style={{ marginBottom: "64px" }}>
          <p
            className="sb-small"
            style={{ 
              marginBottom: "16px", 
              fontWeight: 600, 
              color: "var(--accent-green)",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Quy trình
          </p>
          <h2
            className="sb-display"
            style={{ maxWidth: "540px", marginBottom: "0", color: "var(--white)" }}
          >
            Sẵn sàng triển khai trong 5 phút
          </h2>
        </div>

        {/* ── Tab triggers ──────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            gap: "0",
            marginBottom: "60px",
            borderBottom: "1px solid #e7e7e7",
          }}
        >
          {tabs.map((tab) => {
            const isActive = tab.value === active;
            return (
              <button
                key={tab.value}
                onClick={() => setActive(tab.value)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: isActive
                    ? "2px solid var(--accent-green)"
                    : "2px solid transparent",
                  marginBottom: "-1px",
                  padding: "16px 32px 16px 0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  transition: "all 0.2s ease",
                }}
              >
                <span
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    color: isActive ? "var(--accent-green)" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {tab.index}
                </span>
                <span
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: "-0.01em",
                    color: isActive ? "var(--white)" : "rgba(255,255,255,0.6)",
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Tab content ───────────────────────────────────────── */}
        <div
          key={current.value}
          className="hiw-content"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            animation: "fadeInUp 0.5s ease forwards",
          }}
        >
          {/* Text side */}
          <div>
            <h3
              style={{
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--white)",
                marginBottom: "24px",
                maxWidth: "420px",
              }}
            >
              {current.title}
            </h3>

            <p
              className="sb-body"
              style={{
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.6,
                marginBottom: "40px",
                maxWidth: "400px",
              }}
            >
              {current.description}
            </p>

            <a href="#lien-he" className="btn-primary" style={{ background: "transparent", color: "var(--accent-green)", border: "1px solid var(--accent-green)" }}>
              {current.cta}
            </a>
          </div>

          {/* Image side */}
          <div
            style={{
              position: "relative",
              aspectRatio: "16/10",
              width: "100%",
              overflow: "hidden",
              borderRadius: "12px",
              boxShadow: "0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)",
            }}
          >
            <Image
              src={current.image}
              alt={current.imageLabel}
              fill
              style={{
                objectFit: "cover",
                background: "var(--neutral-cool)", // fallback color
              }}
            />
          </div>
        </div>
      </div>

      {/* Responsive layout & animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .hiw-content {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 500px) {
          button[style*="padding: 16px 32px"] {
            padding: 12px 20px 12px 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

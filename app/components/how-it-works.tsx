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
    label: "Kết nối",
    title: "Lắp IoT module vào máy pha cà phê.",
    description:
      "Module kết nối qua cổng USB hoặc gắn ngoài. Hỗ trợ mọi thương hiệu máy phổ biến. Kết nối Wifi / 4G tự động.",
    cta: "Xem hướng dẫn",
    image: "/images/step1.png",
    imageLabel: "Hướng dẫn lắp đặt",
  },
  {
    value: "giam-sat",
    index: "02",
    label: "Giám sát",
    title: "Xem trạng thái từng máy từ xa.",
    description:
      "Dashboard hiển thị nhiệt độ, áp suất, số lượt pha, trạng thái online / offline của từng máy theo thời gian thực.",
    cta: "Xem demo",
    image: "/images/step2.png",
    imageLabel: "Dashboard Preview",
  },
  {
    value: "toi-uu",
    index: "03",
    label: "Tối ưu",
    title: "Nhận cảnh báo & tối ưu vận hành tự động.",
    description:
      "AI phân tích dữ liệu, dự đoán hỏng hóc, tự động lên lịch bảo trì và gửi báo cáo hàng tuần.",
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
  }, []);

  const current = tabs.find((t) => t.value === active)!;

  return (
    <section
      id="cach-hoat-dong"
      ref={sectionRef}
      style={{
        background: "#000000",
        width: "100%",
        padding: "clamp(80px, 12vh, 160px) clamp(24px, 5vw, 80px)",
        borderTop: "1px solid rgba(240,240,250,0.12)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* ── Header ────────────────────────────────────────────── */}
        <div ref={headerRef} style={{ marginBottom: "80px" }}>
          <p
            className="sx-micro"
            style={{ marginBottom: "24px", opacity: 0.8, letterSpacing: "2px" }}
          >
            Quy trình
          </p>
          <h2
            className="sx-heading"
            style={{ maxWidth: "540px", marginBottom: "0" }}
          >
            Bắt đầu chỉ
            <br />
            trong 5 phút
          </h2>
        </div>

        {/* ── Tab triggers — horizontal step selector ─────────── */}
        <div
          style={{
            display: "flex",
            gap: "0",
            marginBottom: "60px",
            borderBottom: "1px solid rgba(240,240,250,0.12)",
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
                    ? "2px solid #f0f0fa"
                    : "2px solid transparent",
                  marginBottom: "-1px",
                  padding: "16px 32px 16px 0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  transition: "opacity 0.2s ease",
                }}
              >
                <span
                  className="sx-micro"
                  style={{ opacity: isActive ? 0.7 : 0.4 }}
                >
                  {tab.index}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "1.17px",
                    textTransform: "uppercase",
                    color: "#f0f0fa",
                    opacity: isActive ? 1 : 0.6,
                    transition: "opacity 0.2s ease",
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
              className="sx-subheading"
              style={{
                fontSize: "clamp(22px, 3vw, 34px)",
                marginBottom: "24px",
                maxWidth: "420px",
              }}
            >
              {current.title}
            </h3>

            <p
              className="sx-body"
              style={{
                fontSize: "14px",
                letterSpacing: "0.4px",
                lineHeight: 1.85,
                marginBottom: "40px",
                maxWidth: "400px",
              }}
            >
              {current.description}
            </p>

            <a href="#lien-he" className="btn-ghost">
              {current.cta}
            </a>
          </div>

          {/* Image side — full bleed, no border radius */}
          <div
            style={{
              position: "relative",
              aspectRatio: "16/10",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Image
              src={current.image}
              alt={current.imageLabel}
              fill
              style={{
                objectFit: "cover",
                transition: "transform 0.7s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform =
                  "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform =
                  "scale(1)";
              }}
            />
            {/* Subtle dark overlay on image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 60%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Responsive layout */}
      <style>{`
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

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    sector: "Cho thuê thiết bị",
    title: "Mô hình kinh doanh Pay-per-cup.",
    description:
      "Tối đa hóa doanh thu từ việc cho thuê máy. Thu tiền dựa trên số ly cà phê thực tế pha ra, không lo thất thoát hay tranh chấp với đối tác.",
    cta: "Tìm hiểu thêm",
    href: "https://dimori.net/en",
    image: "/images/usecase-chain.jpg",
  },
  {
    sector: "Chuỗi cà phê & Franchise",
    title: "Kiểm soát chất lượng đồng đều.",
    description:
      "Giám sát nhiệt độ, áp suất chiết xuất ở hàng trăm chi nhánh từ xa. Đảm bảo mọi ly cà phê đều đạt chuẩn, đồng thời bảo vệ máy móc.",
    cta: "Khám phá",
    href: "https://dimori.net/en",
    image: "/images/usecase-hotel.jpg",
  },
  {
    sector: "Văn phòng & Khách sạn",
    title: "Dịch vụ tự động 24/7.",
    description:
      "Máy tự phục vụ hoạt động liên tục. Quản lý cảnh báo hết hạt, hỏng hóc tự động gửi đến kỹ thuật viên trước khi khách phàn nàn.",
    cta: "Xem giải pháp",
    href: "https://dimori.net/en",
    image: "/images/usecase-office.jpg",
  },
];

export default function UseCases() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".usecase-card");
    
    gsap.fromTo(cards, 
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section
      id="use-cases"
      style={{
        background: "var(--white)",
        width: "100%",
        padding: "clamp(80px, 12vh, 120px) var(--outer-gutter)",
        color: "var(--text-main)",
      }}
    >
      <div ref={containerRef} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            className="sb-small"
            style={{
              color: "var(--starbucks-green)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "16px",
            }}
          >
            Ứng dụng
          </p>
          <h2
            className="sb-display"
            style={{ color: "var(--text-main)", maxWidth: "600px", margin: "0 auto" }}
          >
            Giải pháp cho mọi mô hình
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          {cases.map((c, idx) => (
            <div
              key={idx}
              className="usecase-card"
              style={{
                background: "var(--neutral-warm)",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #e7e7e7",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.02)";
              }}
            >
              {/* Image Header */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "220px",
                  background: "var(--neutral-cool)", // Fallback color
                }}
              >
                {/* Fallback pattern if images don't exist */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                
                {/* Image display */}
                <Image src={c.image} alt={c.title} fill style={{ objectFit: 'cover' }} />
                
                <div style={{ position: "absolute", bottom: "16px", left: "24px" }}>
                  <span
                    style={{
                      background: "var(--white)",
                      color: "var(--starbucks-green)",
                      padding: "6px 12px",
                      borderRadius: "50px",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {c.sector}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "32px 24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h3
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    marginBottom: "16px",
                    lineHeight: 1.3,
                  }}
                >
                  {c.title}
                </h3>
                <p
                  className="sb-body"
                  style={{
                    color: "var(--text-secondary)",
                    marginBottom: "32px",
                    flexGrow: 1,
                  }}
                >
                  {c.description}
                </p>
                
                <a
                  href={c.href}
                  target="_blank"
                  className="sb-body"
                  style={{
                    color: "var(--accent-green)",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {c.cta}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33334 8H12.6667M12.6667 8L8 3.33334M12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    index: "01",
    title: "Kiểm soát 100% tài sản",
    description:
      "Giám sát vị trí và tình trạng hoạt động của máy. Tự động khóa máy từ xa nếu phát hiện di dời trái phép hoặc trễ hạn thanh toán.",
  },
  {
    index: "02",
    title: "Minh bạch từng ly cà phê",
    description:
      "Dữ liệu chiết xuất (nhiệt độ, áp suất, thời gian) được gửi về hệ thống mỗi 30 giây. Đếm chính xác số ly pha để tính phí Pay-per-cup.",
  },
  {
    index: "03",
    title: "Báo cáo doanh thu & nguyên liệu",
    description:
      "Thống kê mức tiêu thụ hạt cà phê và đối chiếu với số ly bán ra. Phát hiện hao hụt, gian lận tại điểm bán một cách tự động.",
  },
  {
    index: "04",
    title: "Bảo trì phòng ngừa bằng AI",
    description:
      "Phân tích dữ liệu bơm, thanh nhiệt để dự đoán hỏng hóc trước 14 ngày. Chủ động thay thế linh kiện, đảm bảo máy luôn sẵn sàng.",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

    if (listRef.current?.children.length) {
      gsap.fromTo(Array.from(listRef.current.children), 
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
            trigger: listRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="tinh-nang"
      ref={sectionRef}
      style={{
        background: "var(--neutral-warm)",
        width: "100%",
        padding: "clamp(80px, 12vh, 120px) var(--outer-gutter)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* ── Section header ──────────────────────────────────────── */}
        <div
          ref={headerRef}
          style={{
            marginBottom: "80px",
          }}
        >
          <p
            className="sb-small"
            style={{
              marginBottom: "24px",
              fontWeight: 600,
              color: "var(--starbucks-green)",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Tính năng
          </p>
          <h2
            className="sb-display"
            style={{ 
              maxWidth: "640px", 
              margin: "0",
              color: "var(--text-main)" 
            }}
          >
            Mọi thứ bạn cần để
            <br />
            vận hành thông minh hơn
          </h2>
        </div>

        {/* ── Feature rows — NO cards, Starbucks text on cream ──────────────── */}
        <div ref={listRef}>
          {features.map((f, i) => (
            <div key={f.index}>
              {/* Divider */}
              <div style={{ height: "1px", background: "#d1cec5" }} />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 2fr",
                  gap: "40px",
                  padding: "48px 0",
                  alignItems: "start",
                }}
                className="feature-row"
              >
                {/* Index */}
                <span
                  style={{
                    paddingTop: "4px",
                    color: "var(--starbucks-green)",
                    fontWeight: 700,
                    fontSize: "1.6rem",
                    letterSpacing: "1px"
                  }}
                >
                  {f.index}
                </span>

                {/* Title */}
                <h3
                  style={{
                    margin: 0,
                    fontSize: "clamp(20px, 2.5vw, 28px)",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: "var(--text-main)",
                  }}
                >
                  {f.title}
                </h3>

                {/* Description */}
                <p
                  className="sb-body"
                  style={{
                    margin: 0,
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    maxWidth: "560px",
                  }}
                >
                  {f.description}
                </p>
              </div>

              {/* Last row — bottom divider */}
              {i === features.length - 1 && (
                <div style={{ height: "1px", background: "#d1cec5" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Responsive feature rows ──────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .feature-row {
            grid-template-columns: 40px 1fr !important;
            grid-template-rows: auto auto;
            gap: 16px !important;
            padding: 36px 0 !important;
          }
          .feature-row > *:nth-child(3) {
            grid-column: 2 / 3;
          }
        }
        @media (max-width: 500px) {
          .feature-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .feature-row > *:nth-child(3) {
            grid-column: 1;
          }
        }
      `}</style>
    </section>
  );
}

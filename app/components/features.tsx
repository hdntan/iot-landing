"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    index: "01",
    title: "Giám sát Real-time",
    description:
      "Theo dõi trạng thái máy qua Wifi/4G 24/7. Nhiệt độ, áp suất, lưu lượng cập nhật mỗi 30 giây.",
  },
  {
    index: "02",
    title: "Cảnh báo Tức thì",
    description:
      "Nhận thông báo sự cố qua Zalo và email ngay khi máy gặp vấn đề. Phản hồi trước khi khách hàng phàn nàn.",
  },
  {
    index: "03",
    title: "Báo cáo Doanh thu",
    description:
      "Thống kê tiêu thụ nguyên liệu, doanh thu từng máy theo ngày / tuần / tháng. Export PDF tự động.",
  },
  {
    index: "04",
    title: "Bảo trì Phòng ngừa AI",
    description:
      "AI dự đoán hỏng hóc trước 7–14 ngày. Lên lịch bảo trì tự động, giảm 30% chi phí sửa chữa.",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

    if (listRef.current?.children.length) {
      gsap.from(Array.from(listRef.current.children), {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 75%",
        },
      });
    }
  }, []);

  return (
    <section
      id="tinh-nang"
      ref={sectionRef}
      style={{
        background: "#000000",
        width: "100%",
        padding: "clamp(80px, 12vh, 160px) clamp(24px, 5vw, 80px)",
      }}
    >
      {/* ── Section header ──────────────────────────────────────── */}
      <div
        ref={headerRef}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          marginBottom: "80px",
        }}
      >
        {/* Section label */}
        <p
          className="sx-micro"
          style={{
            marginBottom: "24px",
            opacity: 0.8,
            letterSpacing: "2px",
          }}
        >
          Tính năng
        </p>

        {/* Main heading */}
        <h2
          className="sx-heading"
          style={{ maxWidth: "640px", marginBottom: "0" }}
        >
          Mọi thứ bạn cần
          <br />
          để vận hành thông minh hơn
        </h2>
      </div>

      {/* ── Feature rows — NO cards, text on black ──────────────── */}
      <div
        ref={listRef}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {features.map((f, i) => (
          <div key={f.index}>
            {/* Divider */}
            <div className="sx-divider" />

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
                className="sx-micro"
                style={{ opacity: 0.6, paddingTop: "4px" }}
              >
                {f.index}
              </span>

              {/* Title */}
              <h3
                className="sx-subheading"
                style={{
                  margin: 0,
                  fontSize: "clamp(16px, 2vw, 22px)",
                }}
              >
                {f.title}
              </h3>

              {/* Description */}
              <p
                className="sx-body"
                style={{
                  margin: 0,
                  fontSize: "14px",
                  letterSpacing: "0.4px",
                  lineHeight: 1.8,
                  maxWidth: "560px",
                }}
              >
                {f.description}
              </p>
            </div>

            {/* Last row — bottom divider */}
            {i === features.length - 1 && <div className="sx-divider" />}
          </div>
        ))}
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

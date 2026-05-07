"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "Mô hình Pay-per-cup hoạt động như thế nào?",
    a: "Chúng tôi lắp đặt module IoT đọc dữ liệu chiết xuất (áp suất, thời gian, lưu lượng nước) vào máy pha. Bạn sẽ thu phí hoặc trả phí dựa trên số ly cà phê thực tế được pha ra, đảm bảo minh bạch tuyệt đối.",
  },
  {
    q: "Có hỗ trợ các dòng máy pha cà phê cũ không?",
    a: "Có. Module của chúng tôi tương thích với 90% các dòng máy pha espresso bán tự động và tự động trên thị trường, kể cả những model cũ không có bo mạch điện tử thông minh.",
  },
  {
    q: "Làm sao để biết nhân viên không gian lận?",
    a: "Hệ thống liên tục đối chiếu số lượng ly pha được (dữ liệu IoT) với định lượng hạt cà phê tiêu hao. Bất kỳ sự sai lệch nào vượt mức cho phép sẽ kích hoạt cảnh báo gửi ngay đến quản lý.",
  },
  {
    q: "Nếu mất kết nối Wifi thì dữ liệu có bị mất?",
    a: "Không. Module được trang bị bộ nhớ đệm lưu trữ dữ liệu offline lên đến 72 giờ và sẽ tự động đồng bộ lên Cloud ngay khi có kết nối mạng trở lại.",
  },
  {
    q: "Tôi có thể khóa máy pha cà phê từ xa không?",
    a: "Có. Tính năng bảo vệ tài sản cho phép bạn vô hiệu hóa (khóa) máy ngay trên điện thoại nếu phát hiện thiết bị bị di dời trái phép hoặc đối tác trễ hạn thanh toán.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 78%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="faq"
      style={{
        background: "var(--neutral-warm)",
        width: "100%",
        padding: "clamp(80px, 12vh, 160px) var(--outer-gutter)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* ── Header ──────────────────────────────────────────────── */}
        <div
          ref={headerRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            marginBottom: "80px",
            alignItems: "end",
          }}
          className="faq-header"
        >
          <div>
            <p
              className="sb-small"
              style={{ 
                marginBottom: "24px", 
                fontWeight: 600,
                color: "var(--starbucks-green)",
                textTransform: "uppercase",
                letterSpacing: "1px" 
              }}
            >
              FAQ
            </p>
            <h2 className="sb-display" style={{ marginBottom: "0", color: "var(--text-main)" }}>
              Câu hỏi
              <br />
              thường gặp
            </h2>
          </div>
          <p
            className="sb-body"
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Có câu hỏi nào khác? Liên hệ trực tiếp qua{" "}
            <a
              href="https://dimori.net/en"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--starbucks-green)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 500
              }}
            >
              dimori.net
            </a>
          </p>
        </div>

        {/* ── FAQ list ─────────────────────────────────────────────── */}
        <div ref={listRef}>
          {faqs.map((faq, i) => (
            <div key={faq.q}>
              <div style={{ height: "1px", background: "#d1cec5" }} />
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "32px",
                  alignItems: "center",
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: "32px 0",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(18px, 2vw, 22px)",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: openIndex === i ? "var(--starbucks-green)" : "var(--text-main)",
                    margin: 0,
                    lineHeight: 1.3,
                    transition: "color 0.2s ease",
                  }}
                >
                  {faq.q}
                </h3>
                {/* Toggle icon (+ / -) */}
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    flexShrink: 0,
                    position: "relative",
                    color: openIndex === i ? "var(--starbucks-green)" : "var(--text-main)",
                    transition: "color 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "currentColor",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 0,
                      bottom: 0,
                      width: "2px",
                      background: "currentColor",
                      transform: `translateX(-50%) scaleY(${openIndex === i ? 0 : 1})`,
                      transition: "transform 0.3s ease",
                    }}
                  />
                </div>
              </button>

              {/* Answer panel */}
              <div
                style={{
                  maxHeight: openIndex === i ? "300px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <p
                  className="sb-body"
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    paddingBottom: "32px",
                    maxWidth: "680px",
                    margin: 0,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
          {/* Final divider */}
          <div style={{ height: "1px", background: "#d1cec5" }} />
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .faq-header {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}

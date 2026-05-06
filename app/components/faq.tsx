"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "Cần bao lâu để lắp đặt?",
    a: "Module IoT lắp trong 15–30 phút qua cổng USB hoặc gắn ngoài. Không cần kỹ thuật viên chuyên biệt — nhân viên kỹ thuật tại chỗ có thể tự thực hiện theo hướng dẫn.",
  },
  {
    q: "Hỗ trợ thương hiệu máy nào?",
    a: "Nuova Simonelli, La Marzocco, Jura, Franke, DeLonghi, Schaerer, WMF và 20+ thương hiệu phổ biến tại thị trường Việt Nam. Liên hệ để kiểm tra thiết bị cụ thể của bạn.",
  },
  {
    q: "Dữ liệu được lưu trữ ở đâu?",
    a: "Server đặt tại Việt Nam, tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân. Dữ liệu được mã hóa end-to-end, chỉ bạn mới có quyền truy cập.",
  },
  {
    q: "Nếu mất kết nối internet thì sao?",
    a: "Module lưu dữ liệu offline tối đa 72 giờ và tự đồng bộ khi có kết nối trở lại. Cảnh báo khẩn cấp vẫn gửi qua SIM 4G dự phòng (gói Growth trở lên).",
  },
  {
    q: "Có thể dùng thử trước khi mua không?",
    a: "Có. Gói Growth có 14 ngày dùng thử miễn phí, không cần thẻ tín dụng, không tự động gia hạn. Đặt lịch demo để được tư vấn và cài đặt trực tiếp.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 78%",
        },
      });
    }
  }, []);

  return (
    <section
      id="faq"
      style={{
        background: "#000000",
        width: "100%",
        padding: "clamp(80px, 12vh, 160px) clamp(24px, 5vw, 80px)",
        borderTop: "1px solid rgba(240,240,250,0.12)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
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
              className="sx-micro"
              style={{ marginBottom: "24px", opacity: 0.8, letterSpacing: "2px" }}
            >
              FAQ
            </p>
            <h2 className="sx-heading" style={{ marginBottom: "0" }}>
              Câu hỏi
              <br />
              thường gặp
            </h2>
          </div>
          <p
            className="sx-body"
            style={{
              fontSize: "14px",
              letterSpacing: "0.4px",
              lineHeight: 1.85,
              opacity: 0.65,
            }}
          >
            Có câu hỏi nào khác? Liên hệ trực tiếp qua{" "}
            <a
              href="https://dimori.net/en"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#f0f0fa",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
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
              <div className="sx-divider" />
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
                    fontSize: "clamp(14px, 1.5vw, 18px)",
                    fontWeight: 700,
                    letterSpacing: "0.96px",
                    textTransform: "uppercase",
                    color: "#f0f0fa",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {faq.q}
                </h3>
                {/* Toggle icon */}
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    flexShrink: 0,
                    position: "relative",
                    opacity: 0.5,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: "#f0f0fa",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 0,
                      bottom: 0,
                      width: "1px",
                      background: "#f0f0fa",
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
                  className="sx-body"
                  style={{
                    fontSize: "14px",
                    letterSpacing: "0.4px",
                    lineHeight: 1.85,
                    paddingBottom: "32px",
                    maxWidth: "680px",
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
          {/* Final divider */}
          <div className="sx-divider" />
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

"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  {
    label: "Sản phẩm",
    links: [
      { title: "Tính năng", href: "#tinh-nang" },
      { title: "Cách hoạt động", href: "#cach-hoat-dong" },
      { title: "Liên hệ", href: "#lien-he" },
    ],
  },
  {
    label: "Công ty",
    links: [
      { title: "Về chúng tôi", href: "/" },
      { title: "Chính sách bảo mật", href: "/privacy" },
      { title: "Điều khoản sử dụng", href: "/terms" },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;
    gsap.fromTo(footerRef.current, 
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <footer
      id="lien-he"
      ref={footerRef}
      style={{
        background: "var(--house-green)",
        padding: "clamp(64px, 10vh, 120px) var(--outer-gutter)",
        color: "var(--white)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* ── Top: CTA block ─────────────────────────────────────── */}
        <div
          style={{
            paddingBottom: "64px",
            marginBottom: "64px",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <p
            className="sb-small"
            style={{ marginBottom: "16px", fontWeight: 600, color: "var(--white)" }}
          >
            Liên hệ
          </p>
          <h2
            className="sb-display"
            style={{ maxWidth: "600px", marginBottom: "36px", color: "var(--white)" }}
          >
            Sẵn sàng chuyển đổi
            <br />
            mô hình kinh doanh?
          </h2>
          <a
            href="https://dimori.net/en"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              background: "var(--white)",
              color: "var(--house-green)",
            }}
          >
            Đặt lịch Demo
          </a>
        </div>

        {/* ── Bottom: brand + links ───────────────────────────────── */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontSize: "1.8rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "var(--white)",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {/* Starbucks-inspired circular logo mark */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" fill="var(--white)" />
                <path
                  d="M12 6v6l4 2"
                  stroke="var(--house-green)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Coffee IoT
            </p>
            <p
              className="sb-small"
              style={{ lineHeight: 1.6, maxWidth: "200px", color: "rgba(255,255,255,0.8)" }}
            >
              Nền tảng quản lý và cho thuê máy pha cà phê thông minh (CaaS).
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.label}>
              <p
                className="sb-small"
                style={{ marginBottom: "20px", fontWeight: 700, color: "var(--white)" }}
              >
                {section.label}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "1.4rem",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--white)";
                        (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)";
                        (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none";
                      }}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Copyright bar ──────────────────────────────────────── */}
        <div
          style={{
            marginTop: "64px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            className="sb-small"
            style={{ color: "rgba(255,255,255,0.6)", margin: 0, fontWeight: 400 }}
          >
            © 2026 Coffee IoT. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            <p
              className="sb-small"
              style={{ color: "rgba(255,255,255,0.6)", margin: 0, fontWeight: 400 }}
            >
              Vietnam
            </p>
          </div>
        </div>
      </div>

      {/* Responsive footer grid */}
      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
            margin-bottom: 24px;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

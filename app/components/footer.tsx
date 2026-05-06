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
    gsap.from(footerRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      },
    });
  }, []);

  return (
    <footer
      id="lien-he"
      ref={footerRef}
      style={{
        background: "#000000",
        borderTop: "1px solid rgba(240,240,250,0.12)",
        padding: "clamp(64px, 10vh, 120px) clamp(24px, 5vw, 80px)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* ── Top: CTA block ─────────────────────────────────────── */}
        <div
          style={{
            paddingBottom: "64px",
            marginBottom: "64px",
            borderBottom: "1px solid rgba(240,240,250,0.12)",
          }}
        >
          <p
            className="sx-micro"
            style={{ marginBottom: "24px", letterSpacing: "2px", color: "#ffffff" }}
          >
            Liên hệ
          </p>
          <h2
            className="sx-heading"
            style={{ maxWidth: "600px", marginBottom: "36px" }}
          >
            Sẵn sàng vận hành
            <br />
            thông minh hơn?
          </h2>
          <a 
            href="https://dimori.net/en" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-ghost"
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
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#f0f0fa",
                marginBottom: "12px",
              }}
            >
              Coffee IoT
            </p>
            <p
              className="sx-micro"
              style={{ lineHeight: 1.7, maxWidth: "200px", color: "#ffffff" }} 
            >
              Vận hành thông minh hơn mỗi ngày.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.label}>
              <p
                className="sx-micro"
                style={{ marginBottom: "20px", letterSpacing: "1.5px", color: "#ffffff" }} 
              >
                {section.label}
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                {section.links.map((link) => (
                  <li key={link.title}>
                    {link.href.startsWith("#") ? (
                      <a
                        href={link.href}
                        style={{
                          color: "#f0f0fa",
                          fontSize: "13px",
                          fontWeight: 500,
                          letterSpacing: "0.8px",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          opacity: 1,
                          transition: "opacity 0.2s ease, transform 0.2s ease",
                          display: "inline-block"
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7";
                          (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                          (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(0)";
                        }}
                      >
                        {link.title}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        style={{
                          color: "#f0f0fa",
                          fontSize: "12px",
                          fontWeight: 400,
                          letterSpacing: "0.8px",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          opacity: 1,
                          transition: "opacity 0.2s ease, transform 0.2s ease",
                          display: "inline-block"
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7";
                          (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                          (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(0)";
                        }}
                      >
                        {link.title}
                      </Link>
                    )}
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
            borderTop: "1px solid rgba(240,240,250,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p className="sx-micro" style={{ color: "rgba(255,255,255,0.6)", margin: 0 }}>
            © 2026 Coffee IoT. All rights reserved.
          </p>
          <p className="sx-micro" style={{ color: "rgba(255,255,255,0.6)", margin: 0 }}>
            Vietnam
          </p>
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

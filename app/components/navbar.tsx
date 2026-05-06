"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Tính năng", href: "#tinh-nang" },
  { label: "Cách hoạt động", href: "#cach-hoat-dong" },
  { label: "Bảng giá", href: "#bang-gia" },
  { label: "Liên hệ", href: "#lien-he" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "16px 48px" : "24px 48px",
          background: scrolled ? "rgba(0, 0, 0, 0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "padding 0.3s ease, background 0.3s ease, backdrop-filter 0.3s ease",
          borderBottom: scrolled ? "1px solid rgba(240, 240, 250, 0.08)" : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            color: "#f0f0fa",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
          >
            <circle
              cx="10"
              cy="10"
              r="9"
              stroke="#f0f0fa"
              strokeWidth="1.5"
              opacity="0.8"
            />
            <circle cx="10" cy="10" r="3" fill="#f0f0fa" />
            <path
              d="M10 2v4M10 14v4M2 10h4M14 10h4"
              stroke="#f0f0fa"
              strokeWidth="1.2"
              opacity="0.5"
            />
          </svg>
          Coffee IoT
        </Link>

        {/* Desktop nav links */}
        <nav 
          className="hidden md:flex" 
          style={{ 
            gap: "36px",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="sx-nav"
              style={{
                textDecoration: "none",
                opacity: 0.9, // Increased from 0.75
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.9")
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a 
          href="https://dimori.net/en" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-ghost header-cta-desktop" 
          style={{ fontSize: "12px", padding: "12px 28px" }}
        >
          Đặt lịch Demo
        </a>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Mở menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: "#f0f0fa",
              }}
            />
          ))}
        </button>
      </header>

      {/* Mobile full-screen menu — SpaceX style */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000000",
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "48px",
          }}
        >
          {/* Close */}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Đóng menu"
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "none",
              border: "none",
              color: "#f0f0fa",
              fontSize: "20px",
              cursor: "pointer",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            ✕
          </button>

          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#f0f0fa",
                fontSize: "clamp(28px, 8vw, 42px)",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                textDecoration: "none",
                opacity: 1, // Increased from 0.85
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
              }
            >
              {item.label}
            </a>
          ))}

          <a
            href="https://dimori.net/en"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            onClick={() => setMenuOpen(false)}
          >
            Đặt lịch Demo
          </a>
        </div>
      )}

      {/* SpaceX scrollbar & global fixes */}
      <style>{`
        header { transition: all 0.4s var(--cubic-default); }
        
        @media (max-width: 768px) {
          header { padding: 16px 24px !important; }
          .header-cta-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}

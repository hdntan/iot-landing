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
      setScrolled(window.scrollY > 20);
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
          padding: "0 var(--outer-gutter)",
          height: scrolled ? "72px" : "83px", // Progressive heights
          background: scrolled ? "var(--white)" : "var(--neutral-warm)",
          boxShadow: scrolled
            ? "0 1px 3px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.06), 0 0 2px rgba(0,0,0,0.07)"
            : "none",
          transition: "height 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
        }}
        className="px-6 md:px-10 lg:px-16"
      >
        {/* Logo */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            color: "var(--starbucks-green)",
            fontSize: "2.0rem",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M10 2v2" />
            <path d="M14 2v2" />
            <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
            <path d="M6 2v2" />
          </svg>
          Coffee IoT
        </Link>

        {/* Desktop nav links */}
        <nav
          className="hidden md:flex"
          style={{
            gap: "3.2rem",
            marginLeft: "auto",
            marginRight: "3.2rem",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                textDecoration: "none",
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "var(--text-main)",
                letterSpacing: "-0.01em",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "var(--green-accent)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-main)")
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://dimori.net/en"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: "1.4rem", padding: "0.7rem 1.6rem" }}
          >
            Đặt lịch Demo
          </a>
        </div>

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
            padding: "8px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "var(--text-main)",
                borderRadius: "2px",
              }}
            />
          ))}
        </button>
      </header>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--neutral-warm)",
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "8.8rem 3.2rem 3.2rem",
            gap: "3.2rem",
          }}
        >
          {/* Close */}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Đóng menu"
            style={{
              position: "absolute",
              top: "2.4rem",
              right: "2.4rem",
              background: "none",
              border: "none",
              color: "var(--text-main)",
              fontSize: "2.4rem",
              cursor: "pointer",
              fontWeight: 400,
              padding: "8px",
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
                color: "var(--text-main)",
                fontSize: "2.4rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                textDecoration: "none",
              }}
            >
              {item.label}
            </a>
          ))}

          <a
            href="https://dimori.net/en"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            onClick={() => setMenuOpen(false)}
            style={{ marginTop: "1.6rem", width: "100%", justifyContent: "center" }}
          >
            Đặt lịch Demo
          </a>
        </div>
      )}
    </>
  );
}

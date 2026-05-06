"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const navItems = [
  { label: "Tính năng", href: "#tinh-nang" },
  { label: "Cách hoạt động", href: "#cach-hoat-dong" },
  { label: "Liên hệ", href: "#lien-he" },
];

export default function Navbar() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY > 20) {
        headerRef.current.classList.add("shadow-lg", "shadow-black/20");
      } else {
        headerRef.current.classList.remove("shadow-lg", "shadow-black/20");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    const li = e.currentTarget;
    const { width } = li.getBoundingClientRect();
    gsap.to(cursorRef.current, {
      left: li.offsetLeft,
      width,
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleNavLeave = () => {
    gsap.to(cursorRef.current, { opacity: 0, duration: 0.2 });
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 transition-shadow duration-300"
    >
      <nav className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-100 font-semibold text-lg select-none"
        >
          ☕ Coffee IoT
        </Link>

        {/* Desktop nav */}
        <ul
          onMouseLeave={handleNavLeave}
          className="relative hidden md:flex items-center gap-0 rounded-full border border-zinc-700 bg-zinc-900/80 backdrop-blur-md p-1"
        >
          {navItems.map((item) => (
            <li
              key={item.href}
              onMouseEnter={handleTabEnter}
              className="relative z-10 cursor-pointer px-4 py-2 text-sm text-zinc-100 hover:text-white transition-colors"
            >
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          {/* GSAP-driven sliding cursor */}
          <div
            ref={cursorRef}
            aria-hidden
            className="absolute top-1 bottom-1 left-0 rounded-full bg-zinc-700/60 opacity-0 pointer-events-none"
            style={{ width: 0 }}
          />
        </ul>

        <a
          href="#lien-he"
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Đặt lịch Demo
        </a>
      </nav>
    </header>
  );
}

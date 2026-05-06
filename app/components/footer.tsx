"use client";

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
    if (!footerRef.current?.children.length) return;
    gsap.from(Array.from(footerRef.current.children), {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
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
      className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t border-border bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/5%),transparent)] px-6 py-12 lg:py-16"
    >
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <div className="text-xl font-semibold text-foreground">
            ☕ Coffee IoT
          </div>
          <p className="text-muted-foreground text-sm">
            Vận hành thông minh hơn mỗi ngày.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-zinc-400 hover:text-primary transition-colors"
            >
              {/* Facebook icon */}
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-zinc-400 hover:text-primary transition-colors"
            >
              {/* LinkedIn icon */}
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
          <p className="text-muted-foreground text-sm mt-4">
            © 2026 Coffee IoT. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="mt-10 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section) => (
            <div key={section.label}>
              <h3 className="text-xs font-medium text-foreground uppercase tracking-wider">
                {section.label}
              </h3>
              <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="hover:text-foreground transition-colors duration-300"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

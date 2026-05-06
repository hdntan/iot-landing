"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const stats = [
  { value: "500+", label: "Máy kết nối" },
  { value: "99.9%", label: "Uptime đảm bảo" },
  { value: "-30%", label: "Chi phí bảo trì" },
];

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const targets = [
      headlineRef.current,
      descRef.current,
      statsRef.current,
      ctaRef.current,
    ].filter(Boolean);
    if (!targets.length) return;
    gsap.from(targets, {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 1.4,
      ease: "power3.out",
      delay: 0.4,
    });
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
      }}
    >
      {/* ── Background photography ─────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      {/* ── Cinematic dark overlay gradient ────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.15) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Content — left-aligned, bottom-anchored ────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "clamp(32px, 5vw, 80px) clamp(24px, 5vw, 80px)",
          maxWidth: "820px",
          paddingBottom: "clamp(48px, 8vh, 100px)",
        }}
      >
        {/* Headline */}
        <h1
          ref={headlineRef}
          className="sx-display"
          style={{ marginBottom: "20px" }}
        >
          Giám sát toàn bộ
          <br />
          máy pha cà phê,
          <br />
          từ xa.
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="sx-body"
          style={{
            marginBottom: "36px",
            maxWidth: "520px",
            fontSize: "14px",
            letterSpacing: "0.5px",
          }}
        >
          Platform IoT B2B — theo dõi thiết bị real-time,
          <br />
          nhận cảnh báo sự cố và tối ưu vận hành.
        </p>

        {/* Stats */}
        <div
          ref={statsRef}
          style={{
            display: "flex",
            gap: "clamp(24px, 5vw, 56px)",
            marginBottom: "40px",
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: 700,
                  letterSpacing: "0.96px",
                  textTransform: "uppercase",
                  color: "#f0f0fa",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                className="sx-micro"
                style={{ marginTop: "6px", opacity: 0.6 }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef}>
          <a href="https://dimori.net/en" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Đặt lịch Demo
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          right: "clamp(24px, 5vw, 80px)",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span className="sx-micro" style={{ opacity: 0.4 }}>
          Scroll
        </span>
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "rgba(240,240,250,0.3)",
          }}
        />
      </div>
    </section>
  );
}

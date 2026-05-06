"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { raw: 500, suffix: "+", prefix: "", label: "Máy đang kết nối" },
  { raw: 99.9, suffix: "%", prefix: "", label: "Uptime đảm bảo" },
  { raw: 30, suffix: "%", prefix: "-", label: "Chi phí bảo trì" },
  { raw: 7, suffix: " ngày", prefix: "", label: "Dự báo hỏng hóc trước" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    stats.forEach((stat, i) => {
      const el = numberRefs.current[i];
      if (!el) return;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.raw,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          const formatted =
            stat.raw % 1 !== 0
              ? obj.val.toFixed(1)
              : Math.floor(obj.val).toString();
          el.textContent = stat.prefix + formatted + stat.suffix;
        },
        onComplete: () => {
          el.textContent = stat.prefix + stat.raw + stat.suffix;
        },
      });
    });

    // Parallax on bg
    if (sectionRef.current) {
      const bg = sectionRef.current.querySelector(".stats-bg") as HTMLElement;
      if (bg) {
        gsap.to(bg, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* ── Background photography ─────────────────────────────── */}
      <div
        className="stats-bg"
        style={{
          position: "absolute",
          inset: "-60px 0",
          backgroundImage: "url('/images/stats-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      {/* ── Cinematic dark overlay ──────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.2) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Stats grid ─────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          padding:
            "clamp(32px, 5vw, 80px) clamp(24px, 5vw, 80px) clamp(60px, 10vh, 100px)",
        }}
      >
        <div
          className="stats-grid"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "0",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                borderRight:
                  i < stats.length - 1
                    ? "1px solid rgba(240,240,250,0.12)"
                    : "none",
                paddingRight: i < stats.length - 1 ? "40px" : "0",
                paddingLeft: i > 0 ? "40px" : "0",
              }}
            >
              {/* Number */}
              <div
                style={{
                  fontSize: "clamp(40px, 6vw, 80px)",
                  fontWeight: 700,
                  letterSpacing: "0.96px",
                  textTransform: "uppercase",
                  color: "#f0f0fa",
                  lineHeight: 1,
                  marginBottom: "16px",
                }}
              >
                <span
                  ref={(el) => {
                    numberRefs.current[i] = el;
                  }}
                >
                  {stat.prefix}0{stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="sx-micro" style={{ opacity: 0.55, lineHeight: 1.5 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
          .stats-grid > div {
            border-right: none !important;
            padding: 0 !important;
            border-bottom: 1px solid rgba(240,240,250,0.12);
            padding-bottom: 32px !important;
          }
          .stats-grid > div:nth-child(odd) {
            border-right: 1px solid rgba(240,240,250,0.12) !important;
            padding-right: 24px !important;
          }
          .stats-grid > div:nth-last-child(-n+2) {
            border-bottom: none !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}

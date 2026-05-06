"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    sector: "01 — Chuỗi cà phê",
    title: "Quản lý tập trung\nmọi chi nhánh.",
    description:
      "Theo dõi 28 máy từ một dashboard duy nhất. Nhận cảnh báo tức thì, không cần di chuyển đến tận nơi.",
    cta: "Tìm hiểu thêm",
    href: "https://dimori.net/en",
    image: "/images/usecase-chain.jpg",
  },
  {
    sector: "02 — Khách sạn",
    title: "Máy espresso lobby\nluôn hoạt động.",
    description:
      "Uptime 99.9% cho máy phòng khách. AI dự báo bảo trì trước kỳ cao điểm, không bao giờ để máy dừng giữa mùa peak.",
    cta: "Khám phá",
    href: "https://dimori.net/en",
    image: "/images/usecase-hotel.jpg",
  },
  {
    sector: "03 — Văn phòng",
    title: "Phúc lợi nhân viên,\nkhông đau đầu vận hành.",
    description:
      "Máy tự phục vụ hoạt động liên tục. Báo cáo tiêu thụ và chi phí tự động mỗi tuần, không cần quản lý thủ công.",
    cta: "Xem giải pháp",
    href: "https://dimori.net/en",
    image: "/images/usecase-office.jpg",
  },
];

export default function UseCases() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const scenes = containerRef.current.querySelectorAll(".usecase-scene");
    scenes.forEach((scene) => {
      const bg = scene.querySelector(".usecase-bg") as HTMLElement;
      const content = scene.querySelector(".usecase-content") as HTMLElement;

      // Parallax on bg
      if (bg) {
        gsap.to(bg, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: scene,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Content fade-in
      if (content) {
        gsap.from(content.children, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scene,
            start: "top 70%",
          },
        });
      }
    });
  }, []);

  return (
    <div ref={containerRef}>
      {/* Section label — only on first scene */}
      {cases.map((c, idx) => (
        <section
          key={c.sector}
          className="usecase-scene"
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
          {/* ── Background photography ──────────────────────────── */}
          <div
            className="usecase-bg"
            style={{
              position: "absolute",
              inset: "-60px 0",
              backgroundImage: `url('${c.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              zIndex: 0,
            }}
          />

          {/* ── Dark overlay ────────────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 100%)",
              zIndex: 1,
            }}
          />

          {/* ── Content — left bottom ───────────────────────────── */}
          <div
            className="usecase-content"
            style={{
              position: "relative",
              zIndex: 2,
              padding: "clamp(32px, 5vw, 80px) clamp(24px, 5vw, 80px)",
              paddingBottom: "clamp(48px, 8vh, 100px)",
              maxWidth: "720px",
            }}
          >
            {/* Sector label */}
            {idx === 0 && (
              <p
                className="sx-micro"
                style={{
                  letterSpacing: "2px",
                  marginBottom: "24px",
                }}
              >
                Ứng dụng
              </p>
            )}
            <p
              className="sx-micro"
              style={{
                opacity: 0.8, // Increased from 0.65
                letterSpacing: "1.5px",
                marginBottom: "20px",
              }}
            >
              {c.sector}
            </p>

            {/* Title */}
            <h2
              className="sx-heading"
              style={{
                marginBottom: "24px",
                whiteSpace: "pre-line",
              }}
            >
              {c.title}
            </h2>

            {/* Description */}
            <p
              className="sx-body"
              style={{
                fontSize: "15px", // Increased from 14px
                letterSpacing: "0.4px",
                lineHeight: 1.85,
                marginBottom: "40px",
                maxWidth: "500px",
              }}
            >
              {c.description}
            </p>

            {/* CTA */}
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              {c.cta}
            </a>
          </div>

          {/* ── Scene number — right bottom ──────────────────────── */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(32px, 5vh, 60px)",
              right: "clamp(24px, 5vw, 80px)",
              zIndex: 2,
            }}
          >
            <span
              className="sx-micro"
              style={{ opacity: 0.5, fontSize: "10px" }} // Increased from 0.25
            >
              {String(idx + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}
            </span>
          </div>
        </section>
      ))}
    </div>
  );
}

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Bold entrance animation
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      
      tl.fromTo(
        ".sb-hero-bg",
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2 }
      )
      .from(
        ".hero-badge",
        { y: 20, opacity: 0, duration: 1 },
        "-=1.5"
      )
      .from(
        ".hero-text",
        { y: 40, opacity: 0, stagger: 0.1, duration: 1.2 },
        "-=1.2"
      )
      .from(
        ".hero-stat",
        { y: 20, opacity: 0, stagger: 0.1, duration: 1 },
        "-=1"
      )
      .from(
        ".hero-visual-container",
        { x: 60, opacity: 0, duration: 1.5 },
        "-=1.5"
      )
      .from(
        ".hero-floating-badge",
        { scale: 0, rotation: -15, opacity: 0, duration: 1, ease: "back.out(1.7)" },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="sb-hero-wrapper">
      <style>{`
        .sb-hero-wrapper {
          width: 100%;
          min-height: 100vh;
          background: var(--house-green, #1E3932);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .sb-hero-bg-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(0, 117, 74, 0.15) 0%, transparent 60%);
          z-index: 1;
        }

        .sb-hero-content {
          width: 100%;
          padding: 140px var(--outer-gutter) 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 2;
        }

        .sb-hero-inner {
          max-width: 640px;
          width: 100%;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 16px;
          border: 1px solid #cba258;
          border-radius: 50px;
          color: #cba258;
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .sb-hero-visual {
          width: 100%;
          height: 60vh;
          min-height: 400px;
          position: relative;
          z-index: 2;
          padding: 0 var(--outer-gutter) 60px;
        }
        
        .hero-visual-container {
          width: 100%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .hero-floating-badge {
          position: absolute;
          bottom: 40px;
          left: -20px;
          background: #ffffff;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          gap: 16px;
          z-index: 10;
        }

        /* Desktop Asymmetric Split */
        @media (min-width: 1024px) {
          .sb-hero-wrapper {
            flex-direction: row;
            align-items: center;
          }
          .sb-hero-content {
            width: 55vw;
            padding: 160px 4vw 100px 8vw;
            align-items: flex-end;
          }
          .sb-hero-inner {
            margin-right: 2vw;
          }
          .sb-hero-visual {
            width: 45vw;
            height: 100vh;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .hero-visual-container {
            width: 100%;
            height: 100%;
            border-radius: 0;
            /* Make it look like a seamless bleed on the right */
          }
          .hero-floating-badge {
            left: -80px;
            bottom: 15vh;
            padding: 20px 32px;
            border-radius: 12px;
          }
        }
          
        .btn-inverted {
          background: #ffffff;
          color: var(--green-accent, #00754A);
          border: 1px solid #ffffff;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
          text-decoration: none;
        }
        .btn-inverted:hover {
          transform: scale(0.95);
        }

        .btn-outline-dark {
          background: transparent;
          color: #ffffff;
          border: 1px solid #ffffff;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
          text-decoration: none;
        }
        .btn-outline-dark:hover {
          transform: scale(0.95);
          background: rgba(255,255,255,0.1);
        }
      `}</style>

      <div className="sb-hero-bg-overlay"></div>

      {/* Left side: Content (55%) */}
      <div className="sb-hero-content">
        <div className="sb-hero-inner">
          <div className="hero-badge">
            <span style={{ marginRight: '6px' }}>★</span> Nền tảng F&B IoT thế hệ mới
          </div>
          
          <h1
            className="hero-text sb-display"
            style={{
              marginBottom: "24px",
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            Coffee-as-a-Service.
            <br />
            <span style={{ color: '#cba258' }}>Minh bạch đến từng ly.</span>
          </h1>

          <p
            className="hero-text sb-body-large"
            style={{
              marginBottom: "48px",
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "520px",
              fontSize: "2rem",
            }}
          >
            Nâng cấp mô hình cho thuê máy pha cà phê của bạn. Thu phí theo lượng ly thực tế (Pay-per-cup), kiểm soát tài sản 100% và bảo trì chủ động chỉ với một chạm.
          </p>

          <div
            className="hero-text"
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "80px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://dimori.net/en"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-inverted"
              style={{ padding: "14px 40px", fontSize: "1.6rem", fontWeight: 600 }}
            >
              Trải nghiệm ngay
            </a>
            <a
              href="#cach-hoat-dong"
              className="btn-outline-dark"
              style={{ padding: "14px 40px", fontSize: "1.6rem", fontWeight: 600 }}
            >
              Tìm hiểu thêm
            </a>
          </div>

          {/* Stats inline */}
          <div
            style={{
              display: "flex",
              gap: "clamp(32px, 4vw, 64px)",
              flexWrap: "wrap",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              paddingTop: "32px"
            }}
          >
            {[
              { value: "500+", label: "Máy đang quản lý" },
              { value: "0%", label: "Thất thoát sản lượng" },
              { value: "-30%", label: "Chi phí vận hành" },
            ].map((s) => (
              <div key={s.label} className="hero-stat">
                <div
                  style={{
                    fontSize: "3.6rem",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "#cba258",
                    marginBottom: "4px",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="sb-small"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Image/Graphic (45%) */}
      <div className="sb-hero-visual">
        <div className="hero-visual-container sb-hero-bg">
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/images/hero-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Subtle dark gradient overlay to blend image nicely with the dark background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, var(--house-green, #1E3932) -5%, transparent 40%)",
            }}
          />
        </div>
        
        {/* Floating element overlapping the image and background */}
        <div className="hero-floating-badge">
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(0, 117, 74, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--green-accent, #00754A)"
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div>
            <div style={{ color: "rgba(0,0,0,0.87)", fontWeight: 700, fontSize: "1.6rem" }}>
              Mô hình Pay-per-cup
            </div>
            <div style={{ color: "rgba(0,0,0,0.58)", fontSize: "1.4rem", marginTop: "2px" }}>
              Thống kê sản lượng chính xác
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

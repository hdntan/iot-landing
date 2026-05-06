"use client";

import { useRef, useState, Suspense, lazy } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({
    default: mod.Dithering,
  }))
);

const stats = [
  { value: "500+", label: "máy đang kết nối" },
  { value: "99.9%", label: "uptime đảm bảo" },
  { value: "-30%", label: "chi phí bảo trì" },
];

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const targets = [
      badgeRef.current,
      headlineRef.current,
      descRef.current,
      statsRef.current,
      ctaRef.current,
    ].filter(Boolean);
    if (!targets.length) return;
    gsap.from(targets, {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  return (
    <section className="py-12 w-full flex justify-center items-center px-4 md:px-6">
      <div
        className="w-full max-w-7xl relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-[48px] border border-border bg-card shadow-sm min-h-[600px] md:min-h-[680px] flex flex-col items-center justify-center duration-500">
          <Suspense
            fallback={<div className="absolute inset-0 bg-muted/20" />}
          >
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen">
              <Dithering
                colorBack="#00000000"
                colorFront="#EC4E02"
                shape="warp"
                type="4x4"
                speed={isHovered ? 0.6 : 0.15}
                className="size-full"
                minPixelRatio={1}
              />
            </div>
          </Suspense>

          <div className="relative z-10 px-6 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Nền tảng IoT cho chuỗi cà phê
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="font-sans text-5xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]"
            >
              Giám sát toàn bộ <br />
              <span className="text-foreground/80">máy pha cà phê, từ xa.</span>
            </h1>

            {/* Description */}
            <p
              ref={descRef}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed"
            >
              Platform IoT B2B giúp chuỗi cà phê theo dõi thiết bị real-time,
              nhận cảnh báo sự cố và tối ưu vận hành.
            </p>

            {/* Stats */}
            <div
              ref={statsRef}
              className="flex flex-wrap justify-center gap-8 mt-2"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div ref={ctaRef}>
              <a
                href="#lien-he"
                className="group inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-12 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95"
              >
                <span>Đặt lịch Demo</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

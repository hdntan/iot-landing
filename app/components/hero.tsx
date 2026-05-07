"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

const highlightPills = [
  "Kết nối Wifi/4G",
  "Điều khiển từ xa",
  "Phân quyền Admin & Shop",
] as const;

const heroStats: { label: string; value: string }[] = [
  { label: "Máy đang quản lý", value: "1000+" },
  { label: "Phản hồi API", value: "<2s" },
  { label: "Uptime đảm bảo", value: "99.9%" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const statsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
  },
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let animationId: number;
    let time = 0;

    const computeThemeColors = () => {
      // Hardcoded Starbucks Design System colors
      return {
        backgroundTop: "#1E3932", // House Green
        backgroundBottom: "#0b1c18", // Darker shading for depth
        wavePalette: [
          {
            offset: 0,
            amplitude: 70,
            frequency: 0.003,
            color: "rgba(203, 162, 88, 0.8)", // Gold
            opacity: 0.45,
          },
          {
            offset: Math.PI / 2,
            amplitude: 90,
            frequency: 0.0026,
            color: "rgba(0, 117, 74, 0.7)", // Accent Green
            opacity: 0.35,
          },
          {
            offset: Math.PI,
            amplitude: 60,
            frequency: 0.0034,
            color: "rgba(242, 240, 235, 0.65)", // Warm Canvas
            opacity: 0.3,
          },
          {
            offset: Math.PI * 1.5,
            amplitude: 80,
            frequency: 0.0022,
            color: "rgba(203, 162, 88, 0.25)", // Gold
            opacity: 0.25,
          },
          {
            offset: Math.PI * 2,
            amplitude: 55,
            frequency: 0.004,
            color: "rgba(242, 240, 235, 0.2)", // Warm Canvas
            opacity: 0.2,
          },
        ] satisfies WaveConfig[],
      };
    };

    const themeColors = computeThemeColors();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const mouseInfluence = prefersReducedMotion ? 10 : 70;
    const influenceRadius = prefersReducedMotion ? 160 : 320;
    const smoothing = prefersReducedMotion ? 0.04 : 0.1;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const recenterMouse = () => {
      const centerPoint = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = centerPoint;
      targetMouseRef.current = centerPoint;
    };

    const handleResize = () => {
      resizeCanvas();
      recenterMouse();
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseLeave = () => {
      recenterMouse();
    };

    resizeCanvas();
    recenterMouse();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();

      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const mouseEffect =
          influence *
          mouseInfluence *
          Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) *
            wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) *
            (wave.amplitude * 0.45) +
          mouseEffect;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 35;
      ctx.shadowColor = wave.color;
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      time += 1;

      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, themeColors.backgroundTop);
      gradient.addColorStop(1, themeColors.backgroundBottom);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      themeColors.wavePalette.forEach(drawWave);

      animationId = window.requestAnimationFrame(animate);
    };

    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden"
      role="region"
      aria-label="Glowing waves hero section"
      style={{ backgroundColor: "#1E3932" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-[140px]" style={{ backgroundColor: "rgba(242, 240, 235, 0.035)" }} />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full blur-[120px]" style={{ backgroundColor: "rgba(242, 240, 235, 0.025)" }} />
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full blur-[150px]" style={{ backgroundColor: "rgba(203, 162, 88, 0.02)" }} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-28 text-center md:px-8 lg:px-12 mt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[12px] font-bold uppercase tracking-[0.25em]"
            style={{ 
              borderColor: "rgba(242, 240, 235, 0.2)", 
              backgroundColor: "rgba(30, 57, 50, 0.6)", 
              color: "rgba(242, 240, 235, 0.9)",
              backdropFilter: "blur(8px)"
            }}
          >
            <Sparkles className="h-4 w-4" style={{ color: "#cba258" }} aria-hidden="true" />
            Nền tảng quản lý máy pha cà phê thông minh
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-8 text-6xl font-bold tracking-tighter md:text-[5.5rem] lg:text-[6.5rem] leading-[1.05]"
            style={{ color: "#ffffff" }}
          >
            Quản lý máy pha cà phê.{" "}
            <span 
              className="bg-clip-text text-transparent" 
              style={{ 
                backgroundImage: "linear-gradient(to right, #cba258, rgba(203,162,88,0.8), rgba(242,240,235,0.9))" 
              }}
            >
              Thông minh & Toàn diện.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-14 max-w-4xl text-2xl md:text-3xl leading-relaxed"
            style={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            Hệ thống IoT giúp Admin và Shop theo dõi, điều khiển và báo cáo toàn bộ máy pha cà phê theo thời gian thực — từ đăng ký thiết bị đến bật/tắt từ xa chỉ với một chạm.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="https://dimori.net/en"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 rounded-full px-10 py-5 text-lg font-bold uppercase tracking-[0.1em] transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: "#ffffff",
                color: "#00754A",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              }}
            >
              Trải nghiệm ngay
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
           {/* <a
              href="#cach-hoat-dong"
              className="rounded-full border px-8 py-4 text-base font-semibold transition-all hover:-translate-y-0.5"
              style={{
                borderColor: "rgba(255, 255, 255, 0.4)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "#ffffff",
                backdropFilter: "blur(8px)"
              }} 
            >
              Tìm hiểu thêm
            </a> */}
          </motion.div>

          <motion.ul
            variants={itemVariants}
            className="mb-16 flex flex-wrap items-center justify-center gap-5 text-[12px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            {highlightPills.map((pill) => (
              <li
                key={pill}
                className="rounded-full border px-7 py-3"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  backgroundColor: "rgba(30, 57, 50, 0.4)",
                  backdropFilter: "blur(8px)"
                }}
              >
                {pill}
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={statsVariants}
            className="grid gap-8 rounded-3xl border p-8 lg:p-10 sm:grid-cols-3"
            style={{
              borderColor: "rgba(255, 255, 255, 0.15)",
              backgroundColor: "rgba(30, 57, 50, 0.6)",
              backdropFilter: "blur(12px)"
            }}
          >
            {heroStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="space-y-1"
              >
                <div 
                  className="text-sm font-bold uppercase tracking-[0.25em]"
                  style={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  {stat.label}
                </div>
                <div 
                  className="text-5xl md:text-6xl font-bold mt-3"
                  style={{ color: "#cba258" }}
                >
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

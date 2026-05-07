"use client";

import React from "react";
import { motion } from "motion/react";
import { MapPin, Activity, Cpu, ArrowRight } from "lucide-react";
import DottedMap from "dotted-map";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   DottedMap — SVG world map
───────────────────────────────────────────────────────────── */
const map = new DottedMap({ height: 55, grid: "diagonal" });
const mapPoints = map.getPoints();

function WorldMap() {
  return (
    <svg
      viewBox="0 0 120 60"
      style={{ width: "100%", background: "transparent", color: "#006241", opacity: 0.22 }}
    >
      {mapPoints.map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y} r={0.15} fill="currentColor" />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Area chart — cups per month trend
───────────────────────────────────────────────────────────── */
const chartData = [
  { month: "T1", cups: 980 },
  { month: "T2", cups: 1450 },
  { month: "T3", cups: 1320 },
  { month: "T4", cups: 2100 },
  { month: "T5", cups: 3400 },
  { month: "T6", cups: 4800 },
];

function CupsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="fillCupsUC" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00754A" stopOpacity={0.4} />
            <stop offset="80%" stopColor="#00754A" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="rgba(0,98,65,0.10)" />
        <Tooltip
          contentStyle={{
            background: "#fff",
            border: "1px solid #e7e7e7",
            borderRadius: "8px",
            fontSize: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
          formatter={(value) => [`${Number(value).toLocaleString()} ly`, "Số ly pha"]}
          labelFormatter={(l) => `Tháng ${l}`}
        />
        <Area
          strokeWidth={2}
          dataKey="cups"
          type="monotone"
          fill="url(#fillCupsUC)"
          stroke="#00754A"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ─────────────────────────────────────────────────────────────
   Use-case cards data
───────────────────────────────────────────────────────────── */
const cases = [
  {
    sector: "Cho thuê thiết bị",
    title: "Mô hình kinh doanh Pay-per-cup.",
    description:
      "Tối đa hóa doanh thu từ việc cho thuê máy. Thu tiền dựa trên số ly cà phê thực tế pha ra, không lo thất thoát hay tranh chấp với đối tác.",
    cta: "Tìm hiểu thêm",
    href: "https://dimori.net/en",
    image: "/images/usecase-chain.jpg",
  },
  {
    sector: "Chuỗi cà phê & Franchise",
    title: "Kiểm soát chất lượng đồng đều.",
    description:
      "Giám sát nhiệt độ, áp suất chiết xuất ở hàng trăm chi nhánh từ xa. Đảm bảo mọi ly cà phê đều đạt chuẩn, đồng thời bảo vệ máy móc.",
    cta: "Khám phá",
    href: "https://dimori.net/en",
    image: "/images/usecase-hotel.jpg",
  },
  {
    sector: "Văn phòng & Khách sạn",
    title: "Dịch vụ tự động 24/7.",
    description:
      "Máy tự phục vụ hoạt động liên tục. Quản lý cảnh báo hết hạt, hỏng hóc tự động gửi đến kỹ thuật viên trước khi khách phàn nàn.",
    cta: "Xem giải pháp",
    href: "https://dimori.net/en",
    image: "/images/usecase-office.jpg",
  },
];

/* ─────────────────────────────────────────────────────────────
   AnimatedCell
───────────────────────────────────────────────────────────── */
function AnimCell({
  children,
  delay = 0,
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Cell label (icon + text)
───────────────────────────────────────────────────────────── */
function CellLabel({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "rgba(0,0,0,0.45)",
        fontSize: "1.3rem",
        letterSpacing: "-0.01em",
        marginBottom: "20px",
      }}
    >
      <Icon size={14} strokeWidth={1.5} />
      <span>{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main UseCases section
───────────────────────────────────────────────────────────── */
export default function UseCases() {
  return (
    <section
      id="use-cases"
      style={{
        background: "#ffffff",
        width: "100%",
        padding: "clamp(80px, 12vh, 120px) var(--outer-gutter, 24px)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* ── Section header ── */}
        <AnimCell delay={0.05} style={{ textAlign: "center", marginBottom: "56px" }}>
          <p
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#00754A",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "16px",
            }}
          >
            Ứng dụng
          </p>
          <h2
            style={{
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              fontWeight: 600,
              color: "#006241",
              letterSpacing: "-0.016em",
              lineHeight: 1.2,
              maxWidth: "520px",
              margin: "0 auto 20px",
            }}
          >
            Giải pháp cho mọi mô hình
          </h2>
          <p
            style={{
              fontSize: "1.7rem",
              color: "rgba(0,0,0,0.58)",
              lineHeight: 1.55,
              maxWidth: "440px",
              margin: "0 auto",
              letterSpacing: "-0.01em",
            }}
          >
            Từ chuỗi nhỏ đến tập đoàn — Coffee IoT vận hành cùng bạn.
          </p>
        </AnimCell>

        {/* ── Bento grid ── */}
        <div className="uc-bento">

          {/* ── Row 1: Map + Chart ── */}
          {/* Cell A — Location tracking */}
          <AnimCell delay={0.1} className="uc-cell uc-map">
            <div style={{ padding: "28px 28px 0" }}>
              <CellLabel icon={MapPin} label="Theo dõi vị trí thiết bị" />
              <p
                style={{
                  fontSize: "clamp(1.8rem, 2.2vw, 2.2rem)",
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.87)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                  maxWidth: "280px",
                  marginBottom: 0,
                }}
              >
                Biết vị trí chính xác của từng máy — mọi lúc, mọi nơi.
              </p>
            </div>
            {/* Map */}
            <div style={{ position: "relative", marginTop: "16px", overflow: "hidden" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e7e7e7",
                    borderRadius: "8px",
                    padding: "6px 14px",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.75)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  <span>📍</span> Đà Nẵng — Kết nối 30 giây trước
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(ellipse at center, transparent 30%, #ffffff 100%)",
                  zIndex: 5,
                  pointerEvents: "none",
                }}
              />
              <WorldMap />
            </div>
          </AnimCell>

          {/* Cell B — Activity chart */}
          <AnimCell delay={0.18} className="uc-cell uc-chart">
            <div
              style={{
                position: "absolute",
                top: "28px",
                left: "28px",
                right: "28px",
                zIndex: 10,
              }}
            >
              <CellLabel icon={Activity} label="Sản lượng theo tháng" />
              <p
                style={{
                  fontSize: "clamp(1.8rem, 2.2vw, 2.2rem)",
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.87)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                  maxWidth: "280px",
                }}
              >
                Theo dõi số ly pha thực tế theo thời gian thực.{" "}
                <span style={{ color: "rgba(0,0,0,0.40)", fontWeight: 400 }}>
                  Phát hiện ngay biến động bất thường.
                </span>
              </p>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "50%",
              }}
            >
              <CupsChart />
            </div>
          </AnimCell>

          {/* ── Row 2: Stat full-width ── */}
          <AnimCell delay={0.25} className="uc-cell uc-stat">
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "clamp(3.6rem, 8vw, 7.2rem)",
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.87)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                50,000+
              </p>
              <p
                style={{
                  fontSize: "1.7rem",
                  color: "rgba(0,0,0,0.45)",
                  letterSpacing: "-0.01em",
                  marginTop: "8px",
                }}
              >
                Ly cà phê được theo dõi mỗi ngày trên nền tảng Coffee IoT
              </p>
            </div>
          </AnimCell>

          {/* ── Row 3: 3 use-case cards ── */}
          {cases.map((c, i) => (
            <AnimCell
              key={i}
              delay={0.3 + i * 0.1}
              className="uc-cell uc-card"
            >
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "180px",
                  background: "#e7e7e7",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                {/* Sector badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    left: "16px",
                    background: "#ffffff",
                    color: "#006241",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    borderRadius: "50px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  }}
                >
                  {c.sector}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "24px 20px 20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h3
                  style={{
                    fontSize: "1.9rem",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "rgba(0,0,0,0.87)",
                    lineHeight: 1.3,
                    marginBottom: "12px",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontSize: "1.45rem",
                    color: "rgba(0,0,0,0.55)",
                    lineHeight: 1.6,
                    letterSpacing: "-0.01em",
                    flexGrow: 1,
                    marginBottom: "20px",
                  }}
                >
                  {c.description}
                </p>

                {/* CTA link — Starbucks Green Accent */}
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#00754A",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    textDecoration: "none",
                    transition: "gap 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.gap = "10px";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.gap = "6px";
                  }}
                >
                  {c.cta}
                  <ArrowRight size={14} strokeWidth={2.5} />
                </a>
              </div>
            </AnimCell>
          ))}
        </div>
      </div>

      {/* ── Grid styles ── */}
      <style>{`
        .uc-bento {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid rgba(0,0,0,0.10);
          border-radius: 12px;
          overflow: hidden;
          background: #ffffff;
        }

        /* Row 3 — 3 equal cards */
        .uc-bento {
          grid-template-rows: auto auto auto;
        }

        .uc-cell {
          border-right: 1px solid rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(0,0,0,0.08);
          overflow: hidden;
        }

        /* Cell A — map, left col row 1 */
        .uc-map {
          grid-column: 1;
          grid-row: 1;
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        /* Cell B — chart, right col row 1 */
        .uc-chart {
          grid-column: 2;
          grid-row: 1;
          position: relative;
          min-height: 300px;
          border-right: none;
          background: #fafaf8;
        }

        /* Stat — full-width row 2 */
        .uc-stat {
          grid-column: 1 / -1;
          grid-row: 2;
          border-right: none;
          padding: 40px 28px;
        }

        /* Cards — row 3, 3 cols */
        .uc-bento {
          grid-template-columns: 1fr 1fr 1fr;
        }

        /* Override for top rows to span correctly */
        .uc-map { grid-column: 1 / 2; grid-row: 1; }
        .uc-chart { grid-column: 2 / 4; grid-row: 1; }
        .uc-stat { grid-column: 1 / -1; grid-row: 2; }

        /* Cards */
        .uc-card {
          grid-row: 3;
          display: flex;
          flex-direction: column;
          background: #fafaf8;
          transition: background 0.2s ease;
        }

        .uc-card:last-child {
          border-right: none;
        }

        .uc-card:hover {
          background: #f2f0eb;
        }

        /* Bottom row — remove bottom border */
        .uc-stat,
        .uc-card {
          border-bottom: none;
        }
        /* But stat still needs bottom border since cards follow */
        .uc-stat {
          border-bottom: 1px solid rgba(0,0,0,0.08) !important;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .uc-bento {
            grid-template-columns: 1fr 1fr !important;
          }
          .uc-map { grid-column: 1 / 2 !important; grid-row: 1 !important; }
          .uc-chart { grid-column: 2 / 3 !important; grid-row: 1 !important; }
          .uc-stat { grid-column: 1 / -1 !important; grid-row: 2 !important; }
          .uc-card { grid-column: auto !important; grid-row: auto !important; }
          .uc-card:last-child { border-right: none !important; }
          .uc-card:nth-child(even) { border-right: none !important; }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .uc-bento {
            grid-template-columns: 1fr !important;
          }
          .uc-map,
          .uc-chart,
          .uc-stat,
          .uc-card {
            grid-column: 1 !important;
            grid-row: auto !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(0,0,0,0.08) !important;
          }
          .uc-chart { min-height: 260px; }
        }
      `}</style>
    </section>
  );
}

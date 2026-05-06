"use client";

import React, { useRef } from "react";
import { Wifi, Bell, BarChart2, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/app/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Feature = {
  title: string;
  icon: LucideIcon;
  description: string;
};

const features: Feature[] = [
  {
    icon: Wifi,
    title: "Giám sát Real-time",
    description:
      "Theo dõi trạng thái máy qua Wifi/4G 24/7. Nhiệt độ, áp suất, lưu lượng cập nhật mỗi 30 giây.",
  },
  {
    icon: Bell,
    title: "Cảnh báo Tức thì",
    description:
      "Nhận thông báo sự cố qua Zalo và email ngay khi máy gặp vấn đề. Phản hồi trước khi khách hàng phàn nàn.",
  },
  {
    icon: BarChart2,
    title: "Báo cáo Doanh thu",
    description:
      "Thống kê tiêu thụ nguyên liệu, doanh thu từng máy theo ngày/tuần/tháng. Export PDF tự động.",
  },
  {
    icon: Bot,
    title: "Bảo trì Phòng ngừa AI",
    description:
      "AI dự đoán hỏng hóc trước 7–14 ngày. Lên lịch bảo trì tự động, giảm 30% chi phí sửa chữa.",
  },
];

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<"svg"> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
}) {
  const patternId = React.useId();
  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy], index) => (
            <rect
              strokeWidth="0"
              key={index}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function genRandomPattern(length = 5): number[][] {
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
}

type FeatureCardProps = React.ComponentProps<"div"> & { feature: Feature };

function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
  const [p, setP] = React.useState<number[][]>([]);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setP(genRandomPattern());
  }, []);

  return (
    <div className={cn("relative overflow-hidden p-6", className)} {...props}>
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="from-foreground/5 to-foreground/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="fill-foreground/5 stroke-foreground/25 absolute inset-0 h-full w-full mix-blend-overlay"
          />
        </div>
      </div>
      <feature.icon
        className="text-foreground/75 size-6"
        strokeWidth={1}
        aria-hidden
      />
      <h3 className="mt-10 text-sm md:text-base font-medium">{feature.title}</h3>
      <p className="text-muted-foreground relative z-20 mt-2 text-xs font-light">
        {feature.description}
      </p>
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      });
    }
    if (cardsRef.current?.children.length) {
      gsap.from(Array.from(cardsRef.current.children), {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
        },
      });
    }
  }, []);

  return (
    <section
      id="tinh-nang"
      ref={sectionRef}
      className="py-16 md:py-32"
    >
      <div className="mx-auto w-full max-w-5xl space-y-8 px-4">
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl">
            Mọi thứ bạn cần để vận hành thông minh hơn
          </h2>
          <p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
            Từ giám sát đến bảo trì — tất cả trong một nền tảng.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2"
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

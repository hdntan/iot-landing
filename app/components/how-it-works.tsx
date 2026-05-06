"use client";

import Image from "next/image";
import { useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Plug, Monitor, TrendingUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Badge } from "@/app/ui/badge";
import { Button } from "@/app/ui/button";

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  {
    value: "ket-noi",
    icon: <Plug className="h-auto w-4 shrink-0" />,
    label: "Kết nối",
    content: {
      badge: "Cài đặt nhanh",
      title: "Lắp IoT module vào máy pha cà phê.",
      description:
        "Module kết nối qua cổng USB hoặc gắn ngoài. Hỗ trợ mọi thương hiệu máy phổ biến. Kết nối Wifi/4G tự động.",
      buttonText: "Xem hướng dẫn",
      image: "/images/step1.png",
      imageLabel: "Hướng dẫn lắp đặt",
    },
  },
  {
    value: "giam-sat",
    icon: <Monitor className="h-auto w-4 shrink-0" />,
    label: "Giám sát",
    content: {
      badge: "Dashboard Real-time",
      title: "Xem trạng thái từng máy từ xa.",
      description:
        "Dashboard hiển thị nhiệt độ, áp suất, số lượt pha, trạng thái online/offline của từng máy theo thời gian thực.",
      buttonText: "Xem demo",
      image: "/images/step2.png",
      imageLabel: "Dashboard Preview",
    },
  },
  {
    value: "toi-uu",
    icon: <TrendingUp className="h-auto w-4 shrink-0" />,
    label: "Tối ưu",
    content: {
      badge: "AI Insights",
      title: "Nhận cảnh báo & tối ưu vận hành tự động.",
      description:
        "AI phân tích dữ liệu, dự đoán hỏng hóc, tự động lên lịch bảo trì và gửi báo cáo hàng tuần.",
      buttonText: "Tìm hiểu thêm",
      image: "/images/step3.png",
      imageLabel: "AI Analytics",
    },
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section
      id="cach-hoat-dong"
      ref={sectionRef}
      className="py-16 md:py-32"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">Quy trình 3 bước</Badge>
          <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">
            Bắt đầu chỉ trong 5 phút
          </h2>
          <p className="text-muted-foreground">
            Từ lắp đặt đến giám sát đầy đủ — không cần kỹ thuật viên chuyên biệt.
          </p>
        </div>

        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className="flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition-colors data-[state=active]:bg-zinc-800 data-[state=active]:text-primary"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-muted/70 p-6 lg:p-16">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-4xl">
                    {tab.content.title}
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    {tab.content.description}
                  </p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg">
                    {tab.content.buttonText}
                  </Button>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-zinc-800 aspect-video w-full flex items-center justify-center border border-white/5">
                  <Image
                    src={tab.content.image}
                    alt={tab.content.imageLabel}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}

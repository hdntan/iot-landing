"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HelpCircle, MessageCircle, ChevronDown } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

gsap.registerPlugin(ScrollTrigger);

// Self-contained cn utility
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

const CustomAccordion = AccordionPrimitive.Root;

const CustomAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("mb-6", className)} {...props} />
));
CustomAccordionItem.displayName = "CustomAccordionItem";

const CustomAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-6 rounded-2xl p-5 text-left border",
        "bg-white border-[#d6dbde] transition-all hover:bg-[#fafaf8] hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006241]",
        "data-[state=open]:border-[#cba258] data-[state=open]:shadow-md data-[state=open]:bg-white",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-5">
        <HelpCircle className="h-6 w-6 text-[#006241] flex-shrink-0" />
        <span style={{ fontSize: "1.7rem", fontWeight: 600, color: "#1e3932", letterSpacing: "-0.01em" }}>
          {children}
        </span>
      </div>
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#f2f0eb] transition-transform duration-300 group-hover:bg-[#e2e0da] group-hover:scale-105 group-data-[state=open]:rotate-180 group-data-[state=open]:bg-[#cba258]">
        <ChevronDown className="h-5 w-5 text-[#1e3932] group-data-[state=open]:text-white" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
CustomAccordionTrigger.displayName = "CustomAccordionTrigger";

const CustomAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
  >
    <div className="mt-4 md:ml-[3.25rem] ml-0 pb-2">
      <div className="flex items-start gap-5 rounded-2xl bg-[#fafaf8] border border-[#e2e0da] p-6 shadow-sm transition-all">
        <span className="flex-1" style={{ fontSize: "1.6rem", lineHeight: 1.6, color: "rgba(0,0,0,0.7)" }}>{children}</span>
        <div className="hidden sm:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white border border-[#e2e0da] transition-transform hover:scale-105">
          <MessageCircle className="h-5 w-5 text-[#006241]" />
        </div>
      </div>
    </div>
  </AccordionPrimitive.Content>
));
CustomAccordionContent.displayName = "CustomAccordionContent";

const faqs = [
  {
    question: "Shop có thể tự đăng ký tài khoản không?",
    answer: "Không. Shop không thể tự đăng ký. Tài khoản Shop phải do Admin tạo và cấp phát. Nếu quên mật khẩu, Shop cũng cần liên hệ Admin để được cấp lại mật khẩu mới.",
  },
  {
    question: "Quy trình đăng ký máy diễn ra như thế nào?",
    answer: "Admin nạp mã thiết bị vào hệ thống trước. Sau đó Shop kết nối wifi nội bộ và tạo mã định danh máy (ví dụ: MA-12345). Thiết bị IoT gửi dữ liệu xác nhận về, Shop chấp nhận kết nối là hoàn tất.",
  },
  {
    question: "Giờ sử dụng máy được tính như thế nào?",
    answer: "Thời gian sử dụng chỉ được tính khi máy đang ở trạng thái trực tuyến (online) VÀ đang hoạt động. Dữ liệu được lưu trữ theo ngày và có thể xuất báo cáo theo tuần, tháng hoặc năm.",
  },
  {
    question: "Shop có thể quản lý máy của Shop khác không?",
    answer: "Không. Hệ thống phân quyền RBAC đảm bảo mỗi Shop chỉ thấy và quản lý các máy thuộc sở hữu của mình. Chỉ Admin mới có quyền xem và điều khiển toàn bộ máy trong hệ thống.",
  },
  {
    question: "Lệnh bật/tắt máy được gửi đi như thế nào?",
    answer: "Lệnh điều khiển được gửi qua giao thức MQTT thông qua broker HiveMQ. Thiết bị IoT gắn trên máy nhận tín hiệu và thực thi lệnh gần như tức thì, hỗ trợ cả kết nối Wifi và 4G.",
  },
];

export default function Faq() {
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (listRef.current) {
      gsap.fromTo(listRef.current, 
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 78%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="faq"
      className="w-full"
      style={{ background: "var(--neutral-warm)", padding: "clamp(80px, 12vh, 120px) var(--outer-gutter, 1.6rem)" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* ── Header ──────────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16"
        >
          <div className="flex-1 max-w-2xl">
            <p
              style={{
                marginBottom: "16px",
                fontWeight: 700,
                color: "#00754A",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontSize: "16px"
              }}
            >
              FAQ
            </p>
            <h2 style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 600, color: "#006241", letterSpacing: "-0.016em", lineHeight: 1.2, margin: 0 }}>
              Câu hỏi<br />thường gặp.
            </h2>
          </div>
          <div className="md:max-w-md pb-2">
            <p style={{ fontSize: "1.7rem", color: "rgba(0,0,0,0.58)", lineHeight: 1.55, letterSpacing: "-0.01em" }}>
              Có câu hỏi nào khác? Liên hệ trực tiếp với chúng tôi qua{" "}
              <a
                href="https://dimori.net/en"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#006241] hover:text-[#1e3932] underline underline-offset-4 transition-colors"
              >
                dimori.net
              </a>
            </p>
          </div>
        </div>

        {/* ── FAQ list ─────────────────────────────────────────────── */}
        <div ref={listRef} className="mx-auto max-w-4xl">
          <CustomAccordion
            type="single"
            collapsible
            className="w-full"
          >
            {faqs.map((faq, index) => (
              <CustomAccordionItem key={index} value={`item-${index}`}>
                <CustomAccordionTrigger>{faq.question}</CustomAccordionTrigger>
                <CustomAccordionContent>{faq.answer}</CustomAccordionContent>
              </CustomAccordionItem>
            ))}
          </CustomAccordion>
        </div>
      </div>
    </section>
  );
}

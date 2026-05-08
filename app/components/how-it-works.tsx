"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowRightCircle } from "lucide-react";


// Self-contained cn utility
const classNames = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

const stepsData = [
  {
    id: "step-1",
    title: "1. Admin nạp mã thiết bị",
    description:
      "Admin đăng nhập hệ thống và nạp mã thiết bị (ví dụ: Device1) để đăng ký thiết bị IoT mới vào hệ thống.",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "step-2",
    title: "2. Shop tạo mã định danh máy",
    description:
      "Shop kết nối với wifi nội bộ và tạo mã định danh máy (ví dụ: MA-12345) để liên kết với thiết bị IoT tương ứng.",
    image:
      "https://images.unsplash.com/photo-1551250928-243dc937c49d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "step-3",
    title: "3. Thiết bị xác nhận kết nối",
    description:
      "Thiết bị IoT gửi dữ liệu mã định danh về hệ thống. Shop xác nhận chấp nhận kết nối để hoàn tất đăng ký máy.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "step-4",
    title: "4. Kỹ thuật viên cài đặt thông tin khách hàng",
    description:
      "Kỹ thuật viên nhập thông tin khách thuê máy (Tên, SĐT, Địa chỉ). Thiết bị gửi dữ liệu về hệ thống để lưu trữ.",
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: "step-5",
    title: "5. Quản lý & điều khiển từ xa",
    description:
      "Admin hoặc Shop đăng nhập, chọn máy trong danh sách và thực hiện bật/tắt từ xa. Tín hiệu được gửi tức thì đến thiết bị qua MQTT.",
    image:
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2069&auto=format&fit=crop",
  },
];

export default function HowItWorks() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    breakpoints: {
      "(min-width: 768px)": { dragFree: false },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    // Defer the initial state update to avoid synchronous setState warning
    const timeoutId = setTimeout(() => {
      onSelect();
    }, 0);

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      clearTimeout(timeoutId);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="cach-hoat-dong" className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#f2f0eb" }}>
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="mb-12 flex flex-col md:flex-row items-end justify-between md:mb-16">
          <div className="flex flex-col gap-6 max-w-3xl">
            <p
              className="sb-small"
              style={{
                fontWeight: 700,
                color: "#006241", // Starbucks Accent Green
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontSize: "16px",
              }}
            >
              Cách hoạt động
            </p>
            <h2 className="text-5xl font-bold md:text-6xl lg:text-7xl text-[#006241] tracking-tighter">
              Triển khai nhanh<br />trong 5 bước.
            </h2>
            <p className="text-xl md:text-2xl text-[rgba(0,0,0,0.65)] leading-[1.6] mt-4">
              Từ lúc nạp mã thiết bị đến khi điều khiển máy từ xa — quy trình đơn giản, rõ ràng cho cả Admin lẫn Shop.
            </p>
          </div>
          <div className="hidden shrink-0 gap-3 md:flex pb-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="flex items-center justify-center h-14 w-14 rounded-full border border-[rgba(0,98,65,0.2)] transition-colors disabled:opacity-30 hover:bg-[#1e3932] hover:text-white text-[#1e3932]"
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="flex items-center justify-center h-14 w-14 rounded-full border border-[rgba(0,98,65,0.2)] transition-colors disabled:opacity-30 hover:bg-[#1e3932] hover:text-white text-[#1e3932]"
              aria-label="Next slide"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 pl-6 md:pl-8 lg:pl-12">
            {stepsData.map((item, index) => (
              <div
                key={item.id}
                className="min-w-0 shrink-0 grow-0 basis-full pl-4 max-w-[380px] md:max-w-[460px] lg:max-w-[560px]"
              >
                <div className="group relative h-full min-h-[36rem] md:min-h-[42rem] w-full overflow-hidden rounded-3xl bg-[#1e3932]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover object-center opacity-60 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Starbucks Gradient Overlay: House Green to Darker Green */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c18] via-[#1e3932]/70 to-transparent mix-blend-multiply" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-12 text-white">
                    <div className="transform transition-transform duration-500 ease-out translate-y-4 group-hover:translate-y-0">
                      <h3 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-[#f2f0eb]">
                        {item.title}
                      </h3>
                      <p className="mb-10 text-lg md:text-xl text-[rgba(242,240,235,0.8)] line-clamp-3 leading-[1.6]">
                        {item.description}
                      </p>
                      <div className="flex items-center text-base font-bold uppercase tracking-[0.15em] text-[#cba258]">
                        Chi tiết bước {index + 1}
                        <ArrowRightCircle className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Pagination Dots */}
        <div className="mt-10 flex justify-center gap-2 md:hidden">
          {stepsData.map((_, index) => (
            <button
              key={index}
              className={classNames(
                "h-2 rounded-full transition-all duration-300",
                currentSlide === index ? "w-6 bg-[#1e3932]" : "w-2 bg-[rgba(30,57,50,0.2)]"
              )}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

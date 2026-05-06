import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coffee IoT — Quản lý máy pha cà phê thông minh",
  description:
    "Nền tảng IoT B2B giúp chuỗi cà phê giám sát thiết bị real-time, nhận cảnh báo sự cố và tối ưu vận hành.",
  openGraph: {
    title: "Coffee IoT",
    description: "Giám sát toàn bộ máy pha cà phê, từ xa.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${barlow.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-black text-[#f0f0fa]">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="vi" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}

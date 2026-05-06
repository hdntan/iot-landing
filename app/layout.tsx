import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "캘린더 공유 - 일정을 .ics로 내보내기",
  description: "일정을 입력하고 .ics 파일로 다운로드하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}

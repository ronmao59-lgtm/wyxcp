import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI一人公司不可替代性测评",
  description: "测出你在市场里最难被替代的优势",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

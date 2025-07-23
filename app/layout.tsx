import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Timer from "./Components/Timer";
import Link from "next/link";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

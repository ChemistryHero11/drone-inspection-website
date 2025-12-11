import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SkyHigh Imaging | Precision Drone Inspections",
  description: "Advanced drone inspection services for commercial construction, industrial facilities, and infrastructure projects. FAA Part 107 certified aerial imaging.",
  keywords: ["drone inspection", "aerial imaging", "construction", "thermal analysis", "LiDAR"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis lenis-smooth">
      <body className={`${geistMono.variable} antialiased bg-background text-foreground`}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

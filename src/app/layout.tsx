import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DBOptima - AI-Powered Database Optimization Platform | King Group Of Technology",
  description: "Enterprise-grade database performance optimization tool with AI-driven query analysis, intelligent indexing recommendations, and real-time monitoring.",
  keywords: "database optimization, query analysis, performance tuning, AI database tools, PostgreSQL optimization, MySQL tuning",
  authors: [{ name: "Muhammad Jawad", url: "https://kingtech.com" }],
  creator: "Muhammad Jawad",
  publisher: "King Group Of Technology",
  openGraph: {
    title: "DBOptima - AI-Powered Database Optimization Platform",
    description: "Enterprise-grade database performance optimization by King Group Of Technology",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

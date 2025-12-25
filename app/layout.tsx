import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Menu",
  description: "FORM DDA BPS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        {children}

        <div className="fixed bottom-6 right-10 z-50">
          <Link
            href="/"
            className="
        text-4xl
        font-bold
        tracking-widest
        hover:text-[#00A859]
        transition-colors
    "
          >
            ~/
          </Link>
        </div>
      </body>
    </html>
  );
}

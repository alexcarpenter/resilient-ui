import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fontSans = localFont({
  src: "../public/fonts/MartianGrotesk-VFVF.woff2",
  variable: "--font-sans",
  display: "swap",
});

const fontMono = localFont({
  src: "../public/fonts/MartianMono-Regular.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resilient — UI",
  description: "by Alex Carpenter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        <div className="h-3 background-grid" />
        {children}
      </body>
    </html>
  );
}

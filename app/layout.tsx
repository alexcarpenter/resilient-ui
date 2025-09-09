import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";

import "@/styles/globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        <ThemeProvider>
          <div className="h-3 background-grid" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

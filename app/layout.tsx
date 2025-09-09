import type { Metadata } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/lib/config"

import "@/styles/globals.css"

const fontSans = localFont({
  src: "../public/fonts/MartianGrotesk-VFVF.woff2",
  variable: "--font-sans",
  display: "swap",
})

const fontMono = localFont({
  src: "../public/fonts/MartianMono-Regular.woff2",
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        <ThemeProvider>
          <div className="background-grid h-3" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

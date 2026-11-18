import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/lib/portfolio"

const inter = localFont({
  src: "../public/fonts/inter-latin.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: profile.name + " | Site Reliability Engineer",
  description: "Site reliability engineer. Writing about Linux, networking, cloud infrastructure, AI applications, and the things I build.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  )
}

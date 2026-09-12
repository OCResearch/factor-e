import type { Metadata } from "next"
import { Geist, Geist_Mono, League_Gothic } from "next/font/google"
import { Providers } from "@/components/providers"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const display = League_Gothic({
  variable: "--font-display",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "factor-e — websites and systems that compound",
    template: "%s · factor-e",
  },
  description:
    "factor-e builds websites and the business systems around them. Book a working session, rebuild a live site in studio, and keep hosting on the client record.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-[#f3f3f3] font-sans text-[#111]">
        <Providers>
          <SiteHeader />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  )
}

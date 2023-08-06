import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"

export const metadata: Metadata = {
  openGraph: {
    title: "iCover",
    description:
      "Design a captivating and visually appealing cover artwork for your Apple Music playlist to engage listeners and convey the theme or mood of the curated songs.",
    url: "https://icover.vercel.app",
    siteName: "iCover",
    images: [
      {
        url: "/assets/brand/banner.png",
        width: 1280,
        height: 640,
        alt: "iCover Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

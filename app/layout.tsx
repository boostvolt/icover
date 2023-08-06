import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "iCover - Apple-Style Cover Creator",
  description:
    "Design a captivating and visually appealing cover artwork for your Apple Music playlist to engage listeners and convey the theme or mood of the curated songs.",
  keywords: [
    "Apple Music",
    "Playlist",
    "Cover",
    "Artwork",
    "Design",
    "Music",
    "Album",
    "Cover Art",
    "Cover Artwork",
    "Cover Design",
    "Cover Maker",
    "Cover Creator",
    "Cover Generator",
    "Cover Designer",
    "Cover Art Maker",
    "Cover Art Creator",
    "Cover Art Generator",
    "Cover Art Designer",
    "Playlist Cover",
    "Playlist Artwork",
    "Playlist Design",
    "Playlist Maker",
    "Playlist Creator",
    "Playlist Generator",
    "Playlist Designer",
    "Playlist Art Maker",
    "Playlist Art Creator",
    "Playlist Art Generator",
    "Playlist Art Designer",
    "Apple Music Cover",
    "Apple Music Artwork",
    "Apple Music Design",
    "Apple Music Maker",
    "Apple Music Creator",
    "Apple Music Generator",
    "Apple Music Designer",
    "Apple Music Art Maker",
    "Apple Music Art Creator",
    "Apple Music Art Generator",
    "Apple Music Art Designer",
  ],
  authors: [{ name: "Boostvolt", url: "https://github.com/boostvolt" }],
  openGraph: {
    title: "iCover - Apple-Style Cover Creator",
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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

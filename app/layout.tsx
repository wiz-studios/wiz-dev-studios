import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import "./globals.css"
import "./studio.css"

const studioDisplay = localFont({
  src: "./fonts/bricolage-latin.woff2",
  variable: "--font-studio-display",
  weight: "400 800",
  display: "swap",
})
const studioBody = localFont({
  src: "./fonts/source-sans-3-latin.woff2",
  variable: "--font-studio-body",
  weight: "400 700",
  display: "swap",
})

const title = "Wiz Dev Studios | Web & Software Development"
const description = "A Nairobi-based development studio building web applications, custom software, and cloud infrastructure."

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Wiz Dev Studios" }],
  openGraph: { title, description, type: "website", siteName: "Wiz Dev Studios" },
  other: { "page-type": "service", "site-kind": "other" },
}
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#14171c" },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-type="service" suppressHydrationWarning>
      <body className={`${studioDisplay.variable} ${studioBody.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <a className="studio-skip" href="#main-content">Skip to content</a>
          <Navigation />
          <main className="studio-main" id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </ThemeProvider>
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  )
}

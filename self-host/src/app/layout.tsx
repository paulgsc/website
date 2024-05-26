import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { siteConfig } from "@/config"

import { Toaster as Sonner } from "@/components/ui/sonner"
import { Toaster as DefaultToaster } from "@/components/ui/toaster"
import Footer from "@/components/layout-components/footer/footer"
import SiteNav from "@/components/layout-components/navbar/site-nav"
import { ThemeProvider } from "@/components/providers"
import { ThemeSwitcher } from "@/components/theme-switcher"

import "@/styles/globals.css"

import { fontSans } from "@/lib/fonts"
import cn from "@/lib/utils/cn"

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ["zero user website"],
  authors: [
    {
      name: "pgdev",
      url: "https://maishatu.com",
    },
  ],
  creator: "pgdev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@pgdev",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}
// eslint-disable-next-line react/function-component-definition
export default function RootLayout({
  children,
}: Readonly<{
  // eslint-disable-next-line no-undef
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "bg-background min-h-screen font-sans antialiased",
            fontSans.className
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div vaul-drawer-wrapper="">
              <div className="bg-background relative flex-col">
                <SiteNav />
                <div className="flex w-full min-w-0 items-center justify-center px-4 py-14 md:px-14 lg:px-28">
                  {children}
                </div>
              </div>
            </div>

            <ThemeSwitcher />

            <DefaultToaster />
            <Sonner />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

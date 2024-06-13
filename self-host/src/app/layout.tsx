import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { siteConfig } from "@/config"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"

import { Toaster as Sonner } from "@/components/ui/sonner"
import Toaster from "@/components/ui/toaster"
import Footer from "@/components/footer/footer"
import SiteNav from "@/components/layout-components/navbar/site-nav"
import ThemeProvider from "@/components/providers"
import ThemeSwitcher from "@/components/theme-switcher"

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
export default async function RootLayout({
  children,
}: Readonly<{
  // eslint-disable-next-line no-undef
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()
  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <head />

        <body className={cn("min-h-screen antialiased", fontSans.className)}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative flex min-h-screen flex-col">
                <SiteNav />
                <main className="min flex shrink-0 flex-col">{children}</main>
                <Footer />
              </div>

              <ThemeSwitcher />
              <Toaster />
              <Sonner />
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  )
}

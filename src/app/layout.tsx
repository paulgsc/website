import { ThemeProvider } from "@/components/providers";
import { SiteNav } from "@/components/site-nav";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster as DefaultToaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config";
import { cn, fontSans } from "@/lib";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

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
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
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
              <div className="relative flex min-h-screen flex-col bg-background">
                <SiteNav />
                <main className="flex-1">{children}</main>
              </div>
            </div>
            <Footer />
            <ThemeSwitcher />

            <DefaultToaster />
            <Sonner />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}

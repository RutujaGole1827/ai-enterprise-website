import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { brand } from "@/lib/content";
import { Z } from "@/lib/z-index";
import { themeInitScript } from "@/components/layout/theme-toggle";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

import "./globals.css";

const siteUrl = "https://www.exponentia.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.fullName}, ${brand.descriptor}`,
    template: `%s | ${brand.fullName}`,
  },
  description:
    "We build the data platforms, AI systems and governance that move enterprise pilots into production.",
  openGraph: {
    type: "website",
    siteName: brand.fullName,
    url: siteUrl,
    title: `${brand.fullName}, ${brand.descriptor}`,
    description:
      "Data platforms, applied AI and governance for enterprise operations.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/brand/favicon.png", apple: "/brand/favicon.png" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f8" },
    { media: "(prefers-color-scheme: dark)", color: "#060c19" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* Applies the stored or system theme before first paint. */}
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          style={{ zIndex: Z.skipLink }}
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-[var(--radius-control)] focus:bg-accent focus:px-4 focus:py-2.5 focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

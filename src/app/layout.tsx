import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/site-config";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.propertyName + " — Gudauri, Georgia",
  description:
    "A cosy apartment in Gudauri, Georgia. Cool mountain air and direct access to Caucasus hiking trails. Book your stay.",
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    title: siteConfig.propertyName,
    description: siteConfig.shortTagline,
    url: siteConfig.siteUrl,
    siteName: siteConfig.propertyName,
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: "Goodauri Mountain Apartment",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.propertyName,
    description: siteConfig.shortTagline,
    images: [siteConfig.ogImagePath],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  icons: {
    icon: "/favicon.svg",
  },
  verification: {
    google: "Pu2WtVSda2iU2jifeF19ZQR3RaowaGgabkUQ9us4l9w",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-stone-50 text-stone-800 antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}

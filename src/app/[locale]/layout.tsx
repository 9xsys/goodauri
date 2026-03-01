import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Playfair_Display } from "next/font/google";
import { siteConfig, type Locale } from "@/site-config";
import { createT } from "@/lib/i18n";
import JsonLd from "@/components/JsonLd";
import "../globals.css";

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

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

const ogLocaleMap: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  ka: "ka_GE",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = createT(locale as Locale);
  const url = `${siteConfig.siteUrl}/${locale}`;

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    metadataBase: new URL(siteConfig.siteUrl),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url,
      siteName: siteConfig.propertyName,
      images: [
        {
          url: siteConfig.ogImagePath,
          width: 1200,
          height: 630,
          alt: siteConfig.propertyName,
        },
      ],
      locale: ogLocaleMap[locale] ?? "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [siteConfig.ogImagePath],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        siteConfig.locales.map((loc) => [loc, `${siteConfig.siteUrl}/${loc}`])
      ),
    },
    icons: { icon: "/favicon.svg" },
    verification: {
      google: "Pu2WtVSda2iU2jifeF19ZQR3RaowaGgabkUQ9us4l9w",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!siteConfig.locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-stone-50 text-stone-800 antialiased">
        <JsonLd locale={locale as Locale} />
        {children}
      </body>
    </html>
  );
}

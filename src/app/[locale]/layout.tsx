import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, JetBrains_Mono } from "next/font/google";
import { getTranslations } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";
import { ThemeProvider } from "@/components/theme-provider";
import { DirectionSync } from "@/components/direction-sync";

import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import { languages } from "@/data/language.data";

import "../globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

type LocaleParams = {
  params: Promise<{
    locale: string;
  }>;
};

async function getValidLocale(params: LocaleParams["params"]) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await getValidLocale(params);
  const t = await getTranslations({
    locale,
    namespace: "Metadata",
  });

  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
  }

  const pageUrl = `${BASE_URL}/${locale}`;
  const ogImage = `${BASE_URL}/og/kk3.png`;

  return {
    metadataBase: new URL(BASE_URL),

    title: {
      default: t("title"),
      template: `%s | KK3`,
    },

    description: t("description"),

    applicationName: "KK3",
    generator: "Next.js",
    category: "Technology",

    authors: [
      {
        name: "Asilbek Egamnazarov",
      },
    ],

    creator: "Asilbek Egamnazarov",
    publisher: "KK3",

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    alternates: {
      canonical: pageUrl,

      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${BASE_URL}/${locale}`]),
      ),
    },

    openGraph: {
      type: "website",
      locale,
      siteName: "KK3",
      url: pageUrl,

      title: t("ogTitle"),
      description: t("ogDescription"),

      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "KK3 — AI Chat",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [ogImage],
    },

    icons: {
      icon: [
        {
          url: "/favicon.ico",
        },
        {
          url: "/icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: "/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],

      apple: [
        {
          url: "/apple-touch.png",
          sizes: "180x180",
        },
      ],

      shortcut: "/favicon.ico",
    },

    manifest: "/site.webmanifest",

    ...(GOOGLE_SITE_VERIFICATION && {
      verification: {
        google: GOOGLE_SITE_VERIFICATION,
      },
    }),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
} & LocaleParams) {
  const locale = await getValidLocale(params);

  const language = languages.find(({ id }) => id === locale);
  const direction = language?.rtl ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        geist.variable,
        jetbrainsMono.variable,
      )}
    >
      <body>
        <NextIntlClientProvider>
          <DirectionSync />

          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delay={0}>{children}</TooltipProvider>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

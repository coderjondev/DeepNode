import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";
import { ThemeProvider } from "@/components/theme-provider";
import { DirectionSync } from "@/components/direction-sync";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import { languages } from "@/data/language.data";
import { notFound } from "next/navigation";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://k3.vercel.app";
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;

type LocaleParams = { params: Promise<{ locale: string }> };

async function resolveLocale(params: LocaleParams["params"]) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(BASE_URL),

    title: {
      default: t("title"),
      template: `%s | K3`,
    },
    description: t("description"),

    authors: [{ name: "Asilbek Egamnazarov" }],
    creator: "Asilbek Egamnazarov",
    publisher: "K3",
    applicationName: "K3",
    category: "Technology",

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
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${BASE_URL}/${loc}`]),
      ),
    },

    openGraph: {
      type: "website",
      locale,
      siteName: "K3",
      url: `${BASE_URL}/${locale}`,
      title: t("ogTitle"),
      description: t("ogDescription"),
    },

    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },

    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch.png", sizes: "180x180" }],
      shortcut: "/favicon.ico",
    },

    manifest: "/site.webmanifest",
    ...(GOOGLE_SITE_VERIFICATION && {
      verification: { google: GOOGLE_SITE_VERIFICATION },
    }),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
} & LocaleParams) {
  const locale = await resolveLocale(params);

  const isRtl = languages.find((lang) => lang.id === locale)?.rtl ?? false;
  const dir = isRtl ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        inter.variable,
        jetbrainsMono.variable,
      )}
    >
      <body className="h-dvh overflow-hidden">
        <NextIntlClientProvider>
          <DirectionSync />

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
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

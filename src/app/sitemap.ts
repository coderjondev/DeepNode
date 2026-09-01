import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://kk3.uz";

const PUBLIC_ROUTES = ["", "pricing", "plugins", "library"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routing.locales.flatMap((locale) =>
    PUBLIC_ROUTES.map((route) => ({
      url: route ? `${BASE_URL}/${locale}/${route}` : `${BASE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.8,
    })),
  );
}

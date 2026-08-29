import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "en", "ru", "tr"],

  defaultLocale: "uz",

  localePrefix: "as-needed",

  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];

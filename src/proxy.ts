import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

function getCountry(request: NextRequest) {
  const cfCountry = request.headers.get("cf-ipcountry");

  if (cfCountry) {
    return cfCountry.toUpperCase();
  }

  const vercelCountry = request.headers.get("x-vercel-ip-country");

  if (vercelCountry) {
    return vercelCountry.toUpperCase();
  }

  return null;
}

function getLocale(country: string | null) {
  switch (country) {
    case "UZ":
      return "uz";

    case "TR":
      return "tr";

    case "RU":
      return "ru";

    case "GB":
    case "US":
    case "CA":
    case "AU":
    case "NZ":
      return "en";

    default:
      return "uz";
  }
}

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const hasLocale = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    return intlMiddleware(request);
  }

  const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;

  if (
    savedLocale &&
    routing.locales.includes(savedLocale as (typeof routing.locales)[number])
  ) {
    if (savedLocale === routing.defaultLocale) {
      return intlMiddleware(request);
    }

    const url = request.nextUrl.clone();

    url.pathname = `/${savedLocale}${pathname === "/" ? "" : pathname}`;

    return NextResponse.redirect(url);
  }

  const country = getCountry(request);
  const locale = getLocale(country);

  if (locale === routing.defaultLocale) {
    return intlMiddleware(request);
  }

  const url = request.nextUrl.clone();

  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);

  response.headers.set("x-detected-country", country ?? "unknown");

  response.headers.set("x-detected-locale", locale);

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

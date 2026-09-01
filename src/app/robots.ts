import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://kk3.uz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/pricing", "/plugins", "/library"],
      disallow: ["/chat/", "/images", "/api/"],
    },

    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}

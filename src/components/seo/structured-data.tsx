type StructuredDataProps = {
  locale: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://kk3.uz";

export function StructuredData({ locale }: StructuredDataProps) {
  const pageUrl = `${BASE_URL}/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "KK3",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/icon-512.png`,
          width: 512,
          height: 512,
        },
      },

      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "KK3",
        publisher: {
          "@id": `${BASE_URL}/#organization`,
        },
        inLanguage: locale,
      },

      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: "KK3 — AI Chat",
        isPartOf: {
          "@id": `${BASE_URL}/#website`,
        },
        about: {
          "@id": `${BASE_URL}/#software`,
        },
        inLanguage: locale,
      },

      {
        "@type": "SoftwareApplication",
        "@id": `${BASE_URL}/#software`,
        name: "KK3",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Artificial Intelligence",
        operatingSystem: "Web",
        url: BASE_URL,
        description:
          "KK3 is an AI chat platform for interacting with artificial intelligence models.",
        image: `${BASE_URL}/icon-512.png`,
        publisher: {
          "@id": `${BASE_URL}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

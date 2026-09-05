import { siteUrl } from "@/lib/site-url";
import type { OrgProfile } from "@/lib/types";

/**
 * Organization schema for the home page.
 *
 * Deliberately schema.org/Organization, never BankOrCreditUnion or
 * FinancialService: presenting the society as a bank in structured data would
 * breach the same rule that governs the page copy, and search engines surface
 * that type as a bank listing.
 */
export function OrganizationJsonLd({ org }: { org: OrgProfile }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name.en,
    alternateName: org.name.mr,
    description:
      "A credit co-operative society of teachers in Kolhapur, registered with the Registrar of Co-operative Societies. Not a bank and not regulated by the Reserve Bank of India.",
    url: siteUrl,
    ...(org.address ? { address: { "@type": "PostalAddress", streetAddress: org.address.en, addressLocality: "Kolhapur", addressRegion: org.state, addressCountry: "IN" } } : {}),
    ...(org.phone ? { telephone: `+91${org.phone.replace(/\D/g, "")}` } : {}),
    ...(org.email ? { email: org.email } : {}),
    ...(org.registrationNo
      ? {
          identifier: {
            "@type": "PropertyValue",
            name: "Co-operative society registration number",
            value: org.registrationNo,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

import type { Metadata } from "next";
import { getContent } from "@/lib/store";
import { t } from "@/content/strings";
import { Txt } from "@/components/Txt";
import { PageHero, Section } from "@/components/ui";
import { DocumentList } from "@/components/DocumentList";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Info of Secured Assets",
  description:
    "Disclosure of assets held by the society as security against member loans.",
};

const note = {
  en: "Assets held as security against member loans are disclosed here as required under co-operative society disclosure norms.",
  mr: "सभासद कर्जांसाठी तारण म्हणून ठेवलेल्या मालमत्तांची माहिती सहकारी संस्था प्रकटीकरण नियमांनुसार येथे दिली जाते.",
};

export default async function SecuredAssetsPage() {
  const { documents } = await getContent();
  return (
    <>
      <PageHero title={t.securedAssets} />
      <Section tone="white">
        <p className="mb-4 max-w-2xl text-sm text-ink-700">
          <Txt v={note} />
        </p>
        <DocumentList
          items={documents.filter((d) => d.category === "secured-assets")}
        />
      </Section>
    </>
  );
}

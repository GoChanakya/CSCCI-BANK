import type { Metadata } from "next";
import { getContent } from "@/lib/store";
import { t } from "@/content/strings";
import { PageHero, Section } from "@/components/ui";
import { DocumentList } from "@/components/DocumentList";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Annual Reports",
  description:
    "Audited annual reports of the credit co-operative society, newest first.",
};

export default async function AnnualReportsPage() {
  const { documents } = await getContent();
  return (
    <>
      <PageHero title={t.annualReports} />
      <Section tone="white">
        <DocumentList
          items={documents.filter((d) => d.category === "annual-report")}
        />
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { getContent } from "@/lib/store";
import { t } from "@/content/strings";
import { PageHero, Section } from "@/components/ui";
import { SchemeCard } from "@/components/SchemeCard";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Loan Schemes",
  description:
    "Quick-approval member loans and home construction loans from the credit co-operative society.",
};

const lead = {
  en: "Loans are sanctioned to members against approved security and guarantors, as decided by the board under the society's bye-laws.",
  mr: "पोटनियमांनुसार व संचालक मंडळाच्या निर्णयानुसार, मान्यताप्राप्त तारण व जामीनदारांवर सभासदांना कर्ज मंजूर केले जाते.",
};

export default async function LoanSchemesPage() {
  const { schemes } = await getContent();
  const items = schemes
    .filter((s) => s.active && s.kind === "loan")
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero title={t.loanSchemes} lead={lead} />
      <Section tone="white">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <SchemeCard key={s.id} scheme={s} />
          ))}
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { getContent } from "@/lib/store";
import { t } from "@/content/strings";
import { PageHero, Section } from "@/components/ui";
import { SchemeCard } from "@/components/SchemeCard";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Schemes",
  description:
    "Deposit schemes and member loan schemes offered by the credit co-operative society.",
};

const lead = {
  en: "Savings and credit schemes open to enrolled members of the society. Current rates are declared by the board and are available at the office.",
  mr: "पतसंस्थेच्या नोंदणीकृत सभासदांसाठी बचत व कर्ज योजना. सध्याचे दर संचालक मंडळाकडून जाहीर केले जातात व कार्यालयात उपलब्ध आहेत.",
};

export default async function SchemesPage() {
  const { schemes } = await getContent();
  const active = schemes.filter((s) => s.active).sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero title={t.schemes} lead={lead} />
      <Section tone="white" title={t.depositSchemes}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {active
            .filter((s) => s.kind === "deposit")
            .map((s) => (
              <SchemeCard key={s.id} scheme={s} />
            ))}
        </div>
      </Section>
      <Section title={t.loanSchemes}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {active
            .filter((s) => s.kind === "loan")
            .map((s) => (
              <SchemeCard key={s.id} scheme={s} />
            ))}
        </div>
      </Section>
    </>
  );
}

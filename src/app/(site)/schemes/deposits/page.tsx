import type { Metadata } from "next";
import { getContent } from "@/lib/store";
import { t } from "@/content/strings";
import { PageHero, Section } from "@/components/ui";
import { SchemeCard } from "@/components/SchemeCard";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Deposit Schemes",
  description:
    "Savings, recurring and monthly income deposit schemes for members of the credit co-operative society.",
};

const lead = {
  en: "Deposit schemes are open to enrolled members. Deposits are accepted at the society office and are governed by the society's bye-laws.",
  mr: "ठेव योजना नोंदणीकृत सभासदांसाठी खुल्या आहेत. ठेवी पतसंस्थेच्या कार्यालयात स्वीकारल्या जातात व पोटनियमांनुसार चालतात.",
};

export default async function DepositSchemesPage() {
  const { schemes } = await getContent();
  const items = schemes
    .filter((s) => s.active && s.kind === "deposit")
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero title={t.depositSchemes} lead={lead} />
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

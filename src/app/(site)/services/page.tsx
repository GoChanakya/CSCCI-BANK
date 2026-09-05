import Image from "next/image";
import type { Metadata } from "next";
import { getContent } from "@/lib/store";
import { t } from "@/content/strings";
import { Txt } from "@/components/Txt";
import { PageHero, PendingValue, Section } from "@/components/ui";
import { EnquiryButton } from "@/components/Enquiry";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Services & Fees",
  description:
    "Equipment finance, card facility and locker facility for members, with the society's schedule of charges.",
};

const feesNote = {
  en: "Charges are set by the board and revised from time to time. Figures below are published only after the society confirms them.",
  mr: "शुल्क संचालक मंडळाकडून ठरवले जाते व वेळोवेळी सुधारित होते. खालील रक्कम पतसंस्थेकडून निश्चित झाल्यावरच प्रसिद्ध केली जाते.",
};

export default async function ServicesPage() {
  const { services, fees } = await getContent();
  const items = services
    .filter((s) => s.active && s.imageUrl)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero title={t.services} />

      <Section tone="white">
        <div className="space-y-10">
          {items.map((s, i) => (
            <article
              key={s.id}
              className={`grid items-center gap-6 lg:grid-cols-2 ${
                i % 2 ? "lg:[&>figure]:order-2" : ""
              }`}
            >
              <figure className="overflow-hidden rounded-xl ring-1 ring-sand-200">
                <Image
                  src={s.imageUrl}
                  alt={s.title.en}
                  width={1600}
                  height={900}
                  className="h-56 w-full object-cover"
                />
              </figure>
              <div>
                <h2 className="font-display text-xl font-bold text-maroon-700">
                  <Txt v={s.title} />
                </h2>
                <p className="mt-2 leading-relaxed text-ink-700">
                  <Txt v={s.description} />
                </p>
                <EnquiryButton
                  scheme={s.title.en}
                  className="mt-4 inline-block rounded border border-maroon-600 px-4 py-2 text-sm font-semibold text-maroon-700 hover:bg-maroon-50"
                >
                  <Txt v={t.enquire} />
                </EnquiryButton>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title={{ en: "Schedule of charges", mr: "शुल्क तक्ता" }}>
        <p className="mb-4 max-w-2xl text-sm text-ink-500">
          <Txt v={feesNote} />
        </p>
        <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-sand-200">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-maroon-700 text-sand-50">
              <tr>
                <th className="px-4 py-3 font-semibold">
                  <Txt v={{ en: "Service", mr: "सेवा" }} />
                </th>
                <th className="px-4 py-3 font-semibold">
                  <Txt v={{ en: "Fee", mr: "शुल्क" }} />
                </th>
                <th className="px-4 py-3 font-semibold">
                  <Txt v={{ en: "Conditions", mr: "अटी" }} />
                </th>
              </tr>
            </thead>
            <tbody>
              {fees.map((row) => (
                <tr key={row.id} className="border-t border-sand-200">
                  <td className="px-4 py-3 text-ink-900">
                    <Txt v={row.service} />
                  </td>
                  <td className="px-4 py-3">
                    {row.fee ?? <PendingValue />}
                  </td>
                  <td className="px-4 py-3 text-ink-500">
                    {row.conditions ? <Txt v={row.conditions} /> : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

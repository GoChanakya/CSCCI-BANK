import type { Metadata } from "next";
import { getContent } from "@/lib/store";
import { t } from "@/content/strings";
import { Txt } from "@/components/Txt";
import { PageHero, PendingValue, Section } from "@/components/ui";
import { DisclosureFull } from "@/components/Disclosure";
import { MapSearch } from "@/components/MapSearch";
import type { DirectoryContact, L } from "@/lib/types";

/** One table per role, in the order the manager arranged the contacts. */
function groupByRole(contacts: DirectoryContact[]) {
  const groups = new Map<string, DirectoryContact[]>();
  for (const c of contacts) {
    const key = c.role.en;
    groups.set(key, [...(groups.get(key) ?? []), c]);
  }
  return [...groups.entries()];
}

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Head office address, helpline, office hours and department contacts of the credit co-operative society in Kolhapur.",
};

const lead: L = {
  en: "Please give us the opportunity to serve you — get in touch with the head office.",
  mr: "आम्हाला तुमच्या सेवेची संधी द्या — मुख्य कार्यालयाशी संपर्क साधा.",
};

function Row({ label, value }: { label: L; value: string | null }) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 border-b border-sand-200 py-2 last:border-0">
      <dt className="w-36 shrink-0 text-sm text-ink-500">
        <Txt v={label} />
      </dt>
      <dd className="text-sm font-medium text-ink-900">
        {value ?? <PendingValue />}
      </dd>
    </div>
  );
}

export default async function ContactPage() {
  const { org, directory } = await getContent();

  return (
    <>
      <PageHero title={t.contact} lead={lead} />

      <Section tone="white">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-sand-50 p-5 ring-1 ring-sand-200">
            <h2 className="font-display text-lg font-bold text-maroon-700">
              <Txt v={t.headOffice} />
            </h2>
            <dl className="mt-3">
              <div className="flex flex-wrap gap-x-2 border-b border-sand-200 py-2">
                <dt className="w-36 shrink-0 text-sm text-ink-500">
                  <Txt v={{ en: "Address", mr: "पत्ता" }} />
                </dt>
                <dd className="text-sm font-medium text-ink-900">
                  {org.address ? <Txt v={org.address} /> : <PendingValue />}
                </dd>
              </div>
              <Row label={t.phone} value={org.phone} />
              <Row label={{ en: "Fax", mr: "फॅक्स" }} value={org.fax} />
              <Row label={t.email} value={org.email} />
              <Row label={{ en: "GST No.", mr: "जीएसटी क्र." }} value={org.gst} />
              <Row label={{ en: "PAN", mr: "पॅन" }} value={org.pan} />
              <Row
                label={{ en: "Registration No.", mr: "नोंदणी क्र." }}
                value={org.registrationNo}
              />
            </dl>

            <div className="mt-4 flex flex-wrap gap-2">
              {org.whatsapp ? (
                <a
                  href={`https://wa.me/91${org.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
                >
                  <Txt v={t.whatsapp} />
                </a>
              ) : (
                <span className="rounded bg-sand-200 px-4 py-2 text-sm text-ink-500">
                  <Txt v={t.whatsapp} /> — <Txt v={t.toBeAnnounced} />
                </span>
              )}
            </div>

            <div className="mt-5 rounded-lg bg-maroon-700 px-4 py-3 text-center text-sand-50">
              <p className="text-xs tracking-wide uppercase">
                <Txt v={t.helpline} />
              </p>
              <p className="font-display text-2xl font-bold text-saffron-300">
                {org.helpline ?? "—"}
              </p>
              <p className="text-[11px] text-sand-300">
                <Txt
                  v={{
                    en: "Sample number shown until the society's line is confirmed.",
                    mr: "पतसंस्थेचा क्रमांक निश्चित होईपर्यंत नमुना क्रमांक दाखवला आहे.",
                  }}
                />
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-ink-700">
                <Txt v={t.officeHours} />
              </h3>
              <p className="mt-1 text-sm text-ink-700">
                <Txt v={org.officeHours} />
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-maroon-700">
              <Txt v={t.findUs} />
            </h2>
            <div className="mt-3">
              <MapSearch defaultQuery={org.mapQuery} />
            </div>
          </div>
        </div>
      </Section>

      <Section title={t.departments}>
        <div className="grid gap-5 lg:grid-cols-2">
          {groupByRole(directory).map(([role, rows]) => (
            <div
              key={role}
              className="overflow-hidden rounded-xl bg-white ring-1 ring-sand-200"
            >
              <h3 className="bg-maroon-700 px-4 py-2 font-display font-semibold text-sand-50">
                <Txt v={rows[0].role} />
              </h3>
              <table className="w-full text-left text-sm">
                <thead className="bg-sand-100 text-ink-500">
                  <tr>
                    <th className="px-4 py-2 font-medium">
                      <Txt v={t.name} />
                    </th>
                    <th className="px-4 py-2 font-medium">
                      <Txt v={t.email} />
                    </th>
                    <th className="px-4 py-2 font-medium">
                      <Txt v={t.phone} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="border-t border-sand-200">
                      <td className="px-4 py-2">{row.name ?? <PendingValue />}</td>
                      <td className="px-4 py-2 break-all">
                        {row.email ? (
                          <a
                            href={`mailto:${row.email}`}
                            className="text-maroon-700 underline"
                          >
                            {row.email}
                          </a>
                        ) : (
                          <PendingValue />
                        )}
                      </td>
                      <td className="px-4 py-2">{row.phone ?? <PendingValue />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </Section>

      <div className="container-page pb-4">
        <DisclosureFull org={org} />
      </div>
    </>
  );
}

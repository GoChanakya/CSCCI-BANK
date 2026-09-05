import Link from "next/link";
import type { Metadata } from "next";
import { t } from "@/content/strings";
import { Txt } from "@/components/Txt";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Policies, disclosures, annual reports and app links published by the society.",
};

const links = [
  { label: t.privacy, href: "/downloads/privacy" },
  { label: t.accessibility, href: "/downloads/accessibility" },
  { label: t.appDownload, href: "/downloads/app" },
  { label: t.securedAssets, href: "/downloads/secured-assets" },
  { label: t.annualReports, href: "/downloads/annual-reports" },
];

export default function DownloadsPage() {
  return (
    <>
      <PageHero title={t.downloads} />
      <Section tone="white">
        <ul className="grid gap-2 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="flex items-center justify-between rounded-lg bg-sand-50 px-4 py-3 font-medium text-maroon-700 ring-1 ring-sand-200 hover:ring-saffron-400"
              >
                <Txt v={l.label} />
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

import Link from "next/link";
import { t } from "@/content/strings";
import { Txt } from "@/components/Txt";
import { DisclosureFull } from "@/components/Disclosure";
import type { OrgProfile } from "@/lib/types";

const columns = [
  {
    heading: t.footerAbout,
    links: [
      { label: t.mission, href: "/about/mission" },
      { label: t.vision, href: "/about/vision" },
      { label: t.chairman, href: "/about/chairman" },
      { label: t.board, href: "/about/board" },
      { label: t.achievements, href: "/about/achievements" },
    ],
  },
  {
    heading: t.footerMembers,
    links: [
      { label: t.depositSchemes, href: "/schemes/deposits" },
      { label: t.loanSchemes, href: "/schemes/loans" },
      { label: t.services, href: "/services" },
      { label: t.annualReports, href: "/downloads/annual-reports" },
    ],
  },
  {
    heading: t.footerSupport,
    links: [
      { label: t.contact, href: "/contact" },
      { label: t.accessibility, href: "/downloads/accessibility" },
      { label: t.appDownload, href: "/downloads/app" },
      { label: t.gallery, href: "/about/gallery" },
    ],
  },
  {
    heading: t.footerLegal,
    links: [
      { label: t.privacy, href: "/downloads/privacy" },
      { label: t.securedAssets, href: "/downloads/secured-assets" },
    ],
  },
];

export function Footer({ org }: { org: OrgProfile }) {
  return (
    <footer className="mt-16 bg-maroon-900 text-sand-200">
      <div className="brand-rule h-1" />
      <div className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col, i) => (
          <div key={i}>
            <h2 className="font-display text-sm font-semibold tracking-wide text-saffron-300 uppercase">
              <Txt v={col.heading} />
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white hover:underline">
                    <Txt v={link.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-page pb-8">
        <DisclosureFull org={org} tone="dark" />
        <p className="mt-4 text-xs text-sand-400">
          © {new Date().getFullYear()} <Txt v={org.name} />.{" "}
          {org.registrationNo ? `Reg. No. ${org.registrationNo}.` : ""} All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

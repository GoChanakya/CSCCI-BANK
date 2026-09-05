import { t } from "@/content/strings";
import type { L } from "@/lib/types";

export type NavItem = { label: L; href: string; children?: NavItem[] };

export const nav: NavItem[] = [
  { label: t.home, href: "/" },
  {
    label: t.about,
    href: "/about",
    children: [
      { label: t.mission, href: "/about/mission" },
      { label: t.vision, href: "/about/vision" },
      { label: t.chairman, href: "/about/chairman" },
      { label: t.board, href: "/about/board" },
      { label: t.achievements, href: "/about/achievements" },
      { label: t.gallery, href: "/about/gallery" },
    ],
  },
  {
    label: t.schemes,
    href: "/schemes",
    children: [
      { label: t.depositSchemes, href: "/schemes/deposits" },
      { label: t.loanSchemes, href: "/schemes/loans" },
    ],
  },
  { label: t.services, href: "/services" },
  {
    label: t.downloads,
    href: "/downloads",
    children: [
      { label: t.privacy, href: "/downloads/privacy" },
      { label: t.accessibility, href: "/downloads/accessibility" },
      { label: t.appDownload, href: "/downloads/app" },
      { label: t.securedAssets, href: "/downloads/secured-assets" },
      { label: t.annualReports, href: "/downloads/annual-reports" },
    ],
  },
  { label: t.contact, href: "/contact" },
];

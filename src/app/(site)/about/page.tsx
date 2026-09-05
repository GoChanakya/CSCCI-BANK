import Link from "next/link";
import type { Metadata } from "next";
import { getContent } from "@/lib/store";
import { t } from "@/content/strings";
import { Txt } from "@/components/Txt";
import { PageHero, Prose, Section } from "@/components/ui";
import { ValueIcon } from "@/components/ValueIcon";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A teachers' credit co-operative society in Kolhapur — our values, mission, board and history.",
};

const values = [
  { title: t.transparency, body: t.transparencyBody, icon: "transparency" as const },
  { title: t.trust, body: t.trustBody, icon: "trust" as const },
  { title: t.credibility, body: t.credibilityBody, icon: "credibility" as const },
  { title: t.oneness, body: t.onenessBody, icon: "oneness" as const },
];

const links = [
  { label: t.mission, href: "/about/mission" },
  { label: t.vision, href: "/about/vision" },
  { label: t.chairman, href: "/about/chairman" },
  { label: t.board, href: "/about/board" },
  { label: t.achievements, href: "/about/achievements" },
  { label: t.gallery, href: "/about/gallery" },
];

export default async function AboutPage() {
  const { org, blocks } = await getContent();
  const history = blocks.find((b) => b.slug === "history")!;

  return (
    <>
      <PageHero title={t.about} lead={org.tagline} />

      <Section tone="white" title={t.coreValues}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <article
              key={v.title.en}
              className="group flex h-full flex-col rounded-xl border border-sand-200 border-t-2 border-t-saffron-400 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sand-100 text-maroon-700 transition duration-300 group-hover:bg-saffron-100">
                <ValueIcon name={v.icon} />
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold text-maroon-700">
                <Txt v={v.title} />
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                <Txt v={v.body} />
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section title={history.heading}>
        <Prose v={history.body} />
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm font-medium text-maroon-700 ring-1 ring-sand-200 transition hover:ring-saffron-400"
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

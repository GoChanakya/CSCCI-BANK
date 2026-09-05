import type { Metadata } from "next";
import { getContent } from "@/lib/store";
import { t } from "@/content/strings";
import { Txt } from "@/components/Txt";
import { EmptyNote, PageHero, Section } from "@/components/ui";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Awards and recognitions received by the credit co-operative society, newest first.",
};

export default async function AchievementsPage() {
  const { achievements } = await getContent();
  const items = [...achievements].sort((a, b) => b.year.localeCompare(a.year));

  return (
    <>
      <PageHero title={t.achievements} />
      <Section tone="white">
        {items.length === 0 ? (
          <EmptyNote />
        ) : (
          <ol className="relative max-w-3xl border-l-2 border-saffron-300 pl-6">
            {items.map((a) => (
              <li key={a.id} className="relative pb-8 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[1.9rem] top-1 grid h-4 w-4 place-items-center rounded-full bg-saffron-500 ring-4 ring-white"
                />
                <p className="font-display text-sm font-bold tracking-wide text-saffron-600">
                  {a.year}
                </p>
                <h3 className="font-display text-lg font-semibold text-maroon-700">
                  <Txt v={a.title} />
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-700">
                  <Txt v={a.description} />
                </p>
              </li>
            ))}
          </ol>
        )}
      </Section>
    </>
  );
}

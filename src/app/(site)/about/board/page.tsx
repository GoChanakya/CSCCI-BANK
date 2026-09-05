import Image from "next/image";
import type { Metadata } from "next";
import { getContent } from "@/lib/store";
import { t } from "@/content/strings";
import { Txt } from "@/components/Txt";
import { EmptyNote, PageHero, Section } from "@/components/ui";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Board of Directors",
  description:
    "The managing committee of the credit co-operative society — names, designations and photographs.",
};

export default async function BoardPage() {
  const { board } = await getContent();
  const members = [...board].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero title={t.board} />
      <Section tone="white">
        {members.length === 0 ? (
          <EmptyNote />
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m) => (
              <li
                key={m.id}
                className="overflow-hidden rounded-xl bg-sand-50 text-center shadow-sm ring-1 ring-sand-200"
              >
                <Image
                  src={m.photoUrl ?? "/img/portrait.svg"}
                  alt={m.name}
                  width={800}
                  height={800}
                  className="aspect-square w-full object-cover"
                />
                <div className="p-3">
                  <p className="font-display font-semibold text-maroon-700">
                    {m.name}
                  </p>
                  <p className="text-sm text-ink-500">
                    <Txt v={m.designation} />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}

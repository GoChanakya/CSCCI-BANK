import type { Metadata } from "next";
import { getContent } from "@/lib/store";
import { t } from "@/content/strings";
import { EmptyNote, PageHero, Section } from "@/components/ui";
import { Gallery } from "@/components/Gallery";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from the society's meetings, member events and award ceremonies.",
};

export default async function GalleryPage() {
  const { gallery } = await getContent();
  const items = [...gallery].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero title={t.gallery} />
      <Section tone="white">
        {items.length === 0 ? <EmptyNote /> : <Gallery items={items} />}
      </Section>
    </>
  );
}

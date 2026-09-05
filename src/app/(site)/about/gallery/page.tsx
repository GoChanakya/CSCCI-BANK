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
  // A row saved before its photo finished uploading has no url — skip it
  // rather than render a broken image.
  const items = gallery
    .filter((item) => item.url)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero title={t.gallery} />
      <Section tone="white">
        {items.length === 0 ? <EmptyNote /> : <Gallery items={items} />}
      </Section>
    </>
  );
}

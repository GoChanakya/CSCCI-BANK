import { getContent } from "@/lib/store";
import { PageHero, Prose, Section } from "@/components/ui";

/** Renders one CMS-managed text block as a full page. */
export async function BlockPage({ slug }: { slug: string }) {
  const { blocks } = await getContent();
  const block = blocks.find((b) => b.slug === slug);
  if (!block) return null;
  return (
    <>
      <PageHero title={block.heading} />
      <Section tone="white">
        <Prose v={block.body} />
      </Section>
    </>
  );
}

export async function blockMetadata(slug: string) {
  const { blocks, org } = await getContent();
  const block = blocks.find((b) => b.slug === slug);
  return {
    title: block?.heading.en ?? org.name.en,
    description: block?.body.en.slice(0, 155),
  };
}

import Image from "next/image";
import { getContent } from "@/lib/store";
import { Txt } from "@/components/Txt";
import { PageHero, Prose, Section } from "@/components/ui";
import { blockMetadata } from "@/components/BlockPage";

export const revalidate = 300;
export const generateMetadata = () => blockMetadata("chairman");

export default async function ChairmanPage() {
  const { blocks, board } = await getContent();
  const block = blocks.find((b) => b.slug === "chairman")!;
  const chair = board.find((m) => m.designation.en === "Chairperson");

  return (
    <>
      <PageHero title={block.heading} />
      <Section tone="white">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <figure className="mx-auto w-56 lg:mx-0">
            <Image
              src={chair?.photoUrl ?? "/img/portrait.svg"}
              alt={chair?.name ?? "Chairperson"}
              width={800}
              height={800}
              className="aspect-square w-full rounded-xl object-cover ring-1 ring-sand-300"
            />
            <figcaption className="mt-2 text-center text-sm">
              <span className="block font-semibold text-maroon-700">
                {chair?.name}
              </span>
              {chair && (
                <span className="text-ink-500">
                  <Txt v={chair.designation} />
                </span>
              )}
            </figcaption>
          </figure>
          <Prose v={block.body} />
        </div>
      </Section>
    </>
  );
}

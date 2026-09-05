import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/store";
import { t } from "@/content/strings";
import { Txt } from "@/components/Txt";
import { Carousel } from "@/components/Carousel";
import { SchemeCard } from "@/components/SchemeCard";
import { DisclosureFull, DisclosureShort } from "@/components/Disclosure";
import { Prose, Section } from "@/components/ui";
import { EnquiryButton } from "@/components/Enquiry";
import { ValueIcon } from "@/components/ValueIcon";

export const revalidate = 300;

const values = [
  { title: t.transparency, body: t.transparencyBody, icon: "transparency" as const },
  { title: t.trust, body: t.trustBody, icon: "trust" as const },
  { title: t.credibility, body: t.credibilityBody, icon: "credibility" as const },
  { title: t.oneness, body: t.onenessBody, icon: "oneness" as const },
];

export default async function HomePage() {
  const { org, banners, schemes, services, blocks } = await getContent();
  const welcome = blocks.find((b) => b.slug === "welcome")!;
  const history = blocks.find((b) => b.slug === "history")!;
  const featured = schemes.filter((s) => s.active).slice(0, 3);

  return (
    <>
      <Carousel banners={banners.filter((b) => b.imageUrl)} />

      <div className="border-b border-sand-200 bg-white">
        <div className="container-page py-2">
          <DisclosureShort />
        </div>
      </div>

      {/* Welcome — bilingual text beside the office photograph */}
      <Section tone="white">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-maroon-700 sm:text-3xl">
              <Txt v={welcome.heading} />
            </h2>
            <div className="mt-4">
              <Prose v={welcome.body} />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <EnquiryButton className="rounded bg-maroon-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-maroon-700">
                <Txt v={t.becomeMember} />
              </EnquiryButton>
              <Link
                href="/schemes/deposits"
                className="rounded border border-maroon-600 px-4 py-2.5 text-sm font-semibold text-maroon-700 hover:bg-maroon-50"
              >
                <Txt v={t.depositSchemes} />
              </Link>
            </div>
          </div>
          <figure className="overflow-hidden rounded-xl ring-1 ring-sand-300">
            <Image
              src="/img/office.svg"
              alt="The society's head office building in Kolhapur"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
            <figcaption className="bg-sand-100 px-4 py-2 text-xs text-ink-500">
              <Txt v={history.heading} />
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* Core values */}
      <Section title={t.coreValues}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <article
              key={v.title.en}
              className="group rounded-xl border border-sand-200 border-t-2 border-t-saffron-400 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-sand-100 text-maroon-700 transition duration-300 group-hover:bg-saffron-100">
                <ValueIcon name={v.icon} />
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold text-maroon-700">
                <Txt v={v.title} />
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                <Txt v={v.body} />
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Scheme highlights */}
      <Section title={t.schemes} tone="white">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <SchemeCard key={s.id} scheme={s} />
          ))}
        </div>
        <div className="mt-6 flex gap-4 text-sm font-semibold text-maroon-700">
          <Link href="/schemes/deposits" className="hover:underline">
            <Txt v={t.depositSchemes} /> →
          </Link>
          <Link href="/schemes/loans" className="hover:underline">
            <Txt v={t.loanSchemes} /> →
          </Link>
        </div>
      </Section>

      {/* Services strip */}
      <Section title={t.services}>
        <div className="grid gap-4 sm:grid-cols-3">
          {services
            .filter((s) => s.active)
            .map((s) => (
              <article
                key={s.id}
                className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-sand-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <Image
                  src={s.imageUrl}
                  alt={s.title.en}
                  width={1600}
                  height={900}
                  className="h-32 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-display font-semibold text-maroon-700">
                    <Txt v={s.title} />
                  </h3>
                  <p className="mt-1.5 line-clamp-3 text-sm text-ink-700">
                    <Txt v={s.description} />
                  </p>
                </div>
              </article>
            ))}
        </div>
      </Section>

      {/* Full statutory disclosure, in full on the home page (s.9) */}
      <div className="container-page pb-4">
        <DisclosureFull org={org} />
      </div>
    </>
  );
}

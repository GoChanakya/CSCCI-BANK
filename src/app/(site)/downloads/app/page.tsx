import type { Metadata } from "next";
import { getContent } from "@/lib/store";
import { t } from "@/content/strings";
import { Txt } from "@/components/Txt";
import { EmptyNote, PageHero, Section } from "@/components/ui";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "App Download",
  description: "Download the society's member app, when available.",
};

const note = {
  en: "The member app is not published yet. Links will appear here once it is available on the app stores.",
  mr: "सभासद अ‍ॅप अद्याप प्रसिद्ध झालेले नाही. अ‍ॅप स्टोअरवर उपलब्ध होताच येथे दुवे दिसतील.",
};

export default async function AppDownloadPage() {
  const { org } = await getContent();
  const links = [
    { label: "Google Play", href: org.appAndroidUrl },
    { label: "App Store", href: org.appIosUrl },
  ].filter((l) => l.href);

  return (
    <>
      <PageHero title={t.appDownload} />
      <Section tone="white">
        {links.length === 0 ? (
          <EmptyNote>
            <Txt v={note} />
          </EmptyNote>
        ) : (
          <ul className="flex flex-wrap gap-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-maroon-600 px-5 py-3 font-semibold text-white hover:bg-maroon-700"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}

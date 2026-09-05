import type { L } from "@/lib/types";

/**
 * Bilingual text. Both languages are rendered into the HTML and the inactive
 * one is hidden by CSS keyed off `<html data-lang>`. That keeps every page
 * fully static (good for SSG + low bandwidth) and keeps Marathi text in the
 * markup for search engines, which a JS-only toggle would not.
 */
export function Txt({ v, className }: { v: L; className?: string }) {
  return (
    <>
      <span lang="en" data-l="en" className={className}>
        {v.en}
      </span>
      <span lang="mr" data-l="mr" className={className}>
        {v.mr}
      </span>
    </>
  );
}

/** Same, for multi-paragraph blocks: blank lines become paragraphs. */
export function TxtBlock({ v, className }: { v: L; className?: string }) {
  return (
    <>
      <div lang="en" data-l="en" className={className}>
        {v.en.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div lang="mr" data-l="mr" className={className}>
        {v.mr.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </>
  );
}

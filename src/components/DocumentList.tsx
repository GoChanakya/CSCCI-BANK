import { Txt } from "@/components/Txt";
import { EmptyNote } from "@/components/ui";
import type { DocumentItem } from "@/lib/types";

/** Download rows. A document with no uploaded file is simply not listed. */
export function DocumentList({ items }: { items: DocumentItem[] }) {
  const available = items
    .filter((d) => d.fileUrl)
    .sort((a, b) => (b.year ?? "").localeCompare(a.year ?? ""));

  if (available.length === 0) return <EmptyNote />;

  return (
    <ul className="divide-y divide-sand-200 overflow-hidden rounded-xl bg-white ring-1 ring-sand-200">
      {available.map((d) => (
        <li key={d.id}>
          <a
            href={d.fileUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 transition hover:bg-sand-50"
          >
            <span aria-hidden className="text-lg">
              📄
            </span>
            <span className="flex-1">
              <span className="block font-medium text-maroon-700">
                <Txt v={d.title} />
              </span>
              {d.year && <span className="text-xs text-ink-500">{d.year}</span>}
            </span>
            <span className="text-sm font-semibold text-saffron-600">PDF ↓</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Txt } from "@/components/Txt";
import type { GalleryItem } from "@/lib/types";

/** Event-grouped photo grid with a keyboard-navigable lightbox. */
export function Gallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  const events = Array.from(new Set(items.map((i) => i.eventTag)));

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => ((i ?? 0) + 1) % items.length);
      if (e.key === "ArrowLeft")
        setActive((i) => ((i ?? 0) - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, items.length]);

  return (
    <>
      {events.map((event) => (
        <section key={event} className="mb-10">
          <h2 className="mb-3 font-display text-lg font-semibold text-maroon-700">
            {event}
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {items
              .filter((i) => i.eventTag === event)
              .map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActive(items.indexOf(item))}
                    className="group block w-full overflow-hidden rounded-lg ring-1 ring-sand-200"
                  >
                    <Image
                      src={item.url}
                      alt={item.caption.en}
                      width={800}
                      height={600}
                      className="aspect-[4/3] w-full object-cover transition group-hover:scale-105"
                    />
                  </button>
                </li>
              ))}
          </ul>
        </section>
      ))}

      {active !== null && items[active] && (
        <div
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-ink-900/90 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <Image
            src={items[active].url}
            alt={items[active].caption.en}
            width={1600}
            height={1200}
            className="max-h-[80vh] w-auto max-w-full rounded object-contain"
          />
          <p className="mt-3 text-center text-sm text-sand-200">
            <Txt v={items[active].caption} />
          </p>
          <button
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1.5 text-white"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}

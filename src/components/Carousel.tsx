"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Txt } from "@/components/Txt";
import type { Banner } from "@/lib/types";

/** Full-width hero carousel with manual dots; auto-rotate pauses on hover. */
export function Carousel({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || banners.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % banners.length), 6000);
    return () => clearInterval(id);
  }, [paused, banners.length]);

  if (!banners.length) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative isolate h-[46vw] max-h-[520px] min-h-[260px] w-full overflow-hidden bg-maroon-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {banners.map((b, i) => (
        <div
          key={b.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={b.imageUrl}
            alt={b.heading.en}
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/70 via-maroon-900/30 to-transparent" />
          <div className="container-page relative flex h-full flex-col justify-center">
            <h2 className="max-w-xl font-display text-2xl font-bold text-sand-50 drop-shadow sm:text-4xl">
              <Txt v={b.heading} />
            </h2>
            <p className="mt-3 max-w-lg text-sm text-sand-200 sm:text-lg">
              <Txt v={b.subheading} />
            </p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((b, i) => (
          <button
            key={b.id}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-saffron-400" : "w-2.5 bg-sand-100/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

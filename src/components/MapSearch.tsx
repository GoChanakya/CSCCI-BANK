"use client";

import { useState } from "react";
import { t } from "@/content/strings";
import { Txt } from "@/components/Txt";

/**
 * Branch search on Google Maps. Uses the keyless embed endpoint so nothing has
 * to be provisioned before launch; swap in the Embed API with a key if the
 * client later wants styled maps or multiple pinned branches.
 */
export function MapSearch({ defaultQuery }: { defaultQuery: string | null }) {
  const [query, setQuery] = useState(defaultQuery ?? "");
  const [applied, setApplied] = useState(defaultQuery ?? "");

  return (
    <div>
      <form
        className="flex flex-wrap gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setApplied(query.trim());
        }}
      >
        <label className="sr-only" htmlFor="map-q">
          <Txt v={t.findUs} />
        </label>
        <input
          id="map-q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kolhapur"
          className="min-w-0 flex-1 rounded border border-sand-300 bg-white px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-maroon-600 px-4 py-2 font-medium text-white hover:bg-maroon-700"
        >
          <Txt v={t.search} />
        </button>
      </form>

      {applied ? (
        <iframe
          key={applied}
          title="Branch location on Google Maps"
          src={`https://www.google.com/maps?q=${encodeURIComponent(applied)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-3 h-72 w-full rounded-lg ring-1 ring-sand-200"
        />
      ) : (
        <p className="mt-3 rounded-lg border border-dashed border-sand-300 px-4 py-8 text-center text-sm text-ink-500">
          <Txt
            v={{
              en: "Enter a location to see it on the map.",
              mr: "नकाशावर पाहण्यासाठी ठिकाण लिहा.",
            }}
          />
        </p>
      )}
    </div>
  );
}

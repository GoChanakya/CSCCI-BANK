"use client";

import { useState } from "react";
import { t } from "@/content/strings";
import { Txt } from "@/components/Txt";
import { useEnquiry } from "@/components/Enquiry";
import type { L } from "@/lib/types";

/**
 * Bottom-right chat prompt, mirroring the reference site's widget.
 * Backend is not decided yet (live agent vs WhatsApp vs form), so "I have a
 * question" routes into the enquiry flow, and the WhatsApp hand-off is used
 * instead whenever the client has supplied a number.
 */
export function ChatWidget({
  orgName,
  whatsapp,
}: {
  orgName: L;
  whatsapp: string | null;
}) {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const { open } = useEnquiry();

  if (dismissed) {
    return (
      <button
        onClick={() => {
          setDismissed(false);
          setExpanded(true);
        }}
        aria-label="Open chat prompt"
        className="fixed bottom-4 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-saffron-500 text-xl text-maroon-900 shadow-lg"
      >
        💬
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-sand-300">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-start gap-2 bg-maroon-700 px-3 py-2.5 text-left text-sm font-semibold text-sand-50"
      >
        <span className="flex-1">
          <Txt v={orgName} />
        </span>
        <span aria-hidden>{expanded ? "▾" : "▴"}</span>
      </button>

      {expanded && (
        <div className="space-y-2.5 p-3">
          <p className="text-sm text-ink-700">
            <Txt v={t.chatGreeting} />
          </p>
          {whatsapp ? (
            <a
              href={`https://wa.me/91${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded bg-saffron-500 px-3 py-2 text-center text-sm font-medium text-maroon-900"
            >
              <Txt v={t.chatAsk} />
            </a>
          ) : (
            <button
              onClick={() => open()}
              className="block w-full rounded bg-saffron-500 px-3 py-2 text-sm font-medium text-maroon-900"
            >
              <Txt v={t.chatAsk} />
            </button>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="block w-full rounded border border-sand-300 px-3 py-2 text-sm text-ink-700"
          >
            <Txt v={t.chatNo} />
          </button>
        </div>
      )}
    </div>
  );
}

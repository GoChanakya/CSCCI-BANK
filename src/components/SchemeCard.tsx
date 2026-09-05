import { Txt } from "@/components/Txt";
import { t } from "@/content/strings";
import { PendingValue } from "@/components/ui";
import { EnquiryButton } from "@/components/Enquiry";
import type { Scheme } from "@/lib/types";

const icons: Record<string, string> = {
  piggy: "🪙",
  calendar: "🗓️",
  coins: "💰",
  bolt: "⚡",
  home: "🏠",
};

/** Minimalist scheme card (requirements doc, s.4.3 reference image). */
export function SchemeCard({ scheme }: { scheme: Scheme }) {
  const deposit = scheme.kind === "deposit";
  return (
    <article
      className={`flex flex-col rounded-xl p-5 text-sand-50 shadow-sm ring-1 ring-black/5 transition hover:shadow-md ${
        deposit
          ? "bg-gradient-to-br from-maroon-600 to-maroon-800"
          : "bg-gradient-to-br from-maroon-800 to-maroon-900"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg leading-snug font-semibold">
          <Txt v={scheme.name} />
        </h3>
        <span aria-hidden className="text-2xl opacity-80">
          {icons[scheme.icon] ?? "•"}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-sand-200">
        <Txt v={scheme.description} />
      </p>

      <dl className="mt-4 space-y-1.5 border-t border-sand-100/20 pt-3 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <dt className="text-sand-300">
            <Txt v={t.rate} />:
          </dt>
          <dd>
            {scheme.rate ? (
              <span className="font-semibold text-saffron-300">{scheme.rate}</span>
            ) : (
              <PendingValue label={t.rateOnRequest} />
            )}
          </dd>
        </div>
        {scheme.eligibility && (
          <div className="flex flex-wrap gap-2">
            <dt className="text-sand-300">
              <Txt v={t.eligibility} />:
            </dt>
            <dd className="text-sand-100">
              <Txt v={scheme.eligibility} />
            </dd>
          </div>
        )}
      </dl>

      <EnquiryButton
        scheme={scheme.name.en}
        className="mt-4 self-start rounded bg-saffron-500 px-3.5 py-2 text-sm font-semibold text-maroon-900 transition hover:bg-saffron-400"
      >
        <Txt v={t.enquire} />
      </EnquiryButton>
    </article>
  );
}

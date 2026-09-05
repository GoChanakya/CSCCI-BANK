import { Txt } from "@/components/Txt";
import { t } from "@/content/strings";
import { PendingValue } from "@/components/ui";
import { EnquiryButton } from "@/components/Enquiry";
import type { Scheme } from "@/lib/types";


/** Minimalist scheme card (requirements doc, s.4.3 reference image). */
export function SchemeCard({ scheme }: { scheme: Scheme }) {
  const deposit = scheme.kind === "deposit";
  return (
    <article
      className="group flex flex-col rounded-xl border border-sand-200 border-t-2 border-t-saffron-400 bg-white p-5 text-ink-900 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-ink-500 uppercase">
            <Txt
              v={
                deposit
                  ? { en: "Deposit scheme", mr: "ठेव योजना" }
                  : { en: "Loan scheme", mr: "कर्ज योजना" }
              }
            />
          </p>
          <h3 className="mt-1 font-display text-lg leading-snug font-bold text-maroon-700">
            <Txt v={scheme.name} />
          </h3>
        </div>
        <span
          aria-hidden
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sand-100 text-sm text-maroon-700 transition duration-300 group-hover:bg-saffron-100"
        >
          →
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-700">
        <Txt v={scheme.description} />
      </p>

      <dl className="mt-4 space-y-1.5 border-t border-sand-200 pt-3 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <dt className="text-ink-500">
            <Txt v={t.rate} />:
          </dt>
          <dd>
            {scheme.rate ? (
              <span className="font-semibold text-maroon-700">{scheme.rate}</span>
            ) : (
              <PendingValue label={t.rateOnRequest} />
            )}
          </dd>
        </div>
        {scheme.eligibility && (
          <div className="flex flex-wrap gap-2">
            <dt className="text-ink-500">
              <Txt v={t.eligibility} />:
            </dt>
            <dd className="text-ink-700">
              <Txt v={scheme.eligibility} />
            </dd>
          </div>
        )}
      </dl>

      <EnquiryButton
        scheme={scheme.name.en}
        className="mt-4 self-start rounded-md bg-maroon-700 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-maroon-800 hover:shadow"
      >
        <Txt v={t.enquire} />
      </EnquiryButton>
    </article>
  );
}

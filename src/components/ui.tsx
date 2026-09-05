import { Txt, TxtBlock } from "@/components/Txt";
import { t } from "@/content/strings";
import type { L } from "@/lib/types";

export function PageHero({ title, lead }: { title: L; lead?: L }) {
  return (
    <div className="bg-maroon-800 text-sand-50">
      <div className="container-page py-10 sm:py-14">
        <h1 className="font-display text-2xl font-bold sm:text-4xl">
          <Txt v={title} />
        </h1>
        {lead && (
          <p className="mt-3 max-w-2xl text-sm text-sand-200 sm:text-base">
            <Txt v={lead} />
          </p>
        )}
      </div>
      <div className="brand-rule h-1" />
    </div>
  );
}

export function Section({
  title,
  children,
  tone = "sand",
}: {
  title?: L;
  children: React.ReactNode;
  tone?: "sand" | "white";
}) {
  return (
    <section className={tone === "white" ? "bg-white" : ""}>
      <div className="container-page py-10 sm:py-14">
        {title && (
          <h2 className="mb-6 font-display text-xl font-bold text-maroon-700 sm:text-2xl">
            <Txt v={title} />
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

export function Prose({ v }: { v: L }) {
  return <TxtBlock v={v} className="prose-cscci max-w-3xl text-ink-700" />;
}

/**
 * Stands in for any figure the client has not supplied. Nothing invented is
 * ever shown to the public — the site says the value is pending instead.
 */
export function PendingValue({ label }: { label?: L }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded bg-sand-100 px-2 py-0.5 text-xs text-ink-500 ring-1 ring-sand-300">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-saffron-400" />
      <Txt v={label ?? t.toBeAnnounced} />
    </span>
  );
}

export function EmptyNote({ children }: { children?: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-sand-300 bg-white px-4 py-8 text-center text-sm text-ink-500">
      {children ?? <Txt v={t.awaitingClientData} />}
    </p>
  );
}

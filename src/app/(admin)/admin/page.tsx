import Link from "next/link";
import { getContent, listLeads, usingFirestore } from "@/lib/store";
import { guard, Screen } from "@/components/admin/Screen";

export const dynamic = "force-dynamic";

/**
 * Overview doubles as the launch checklist: it lists exactly which
 * client-supplied values are still missing, because no page may go live with
 * placeholder financial or contact data on it.
 */
export default async function AdminHome() {
  await guard();
  const content = await getContent();
  const leads = await listLeads();
  const org = content.org;

  const missing: { label: string; href: string }[] = [];
  const need = (cond: boolean, label: string, href: string) => {
    if (cond) missing.push({ label, href });
  };

  need(!org.registrationNo, "Registration number (used in the legal disclosure)", "/admin/organisation");
  need(!org.address, "Head office address", "/admin/organisation");
  need(!org.phone, "Office phone number", "/admin/organisation");
  need(!org.email, "Office email", "/admin/organisation");
  need(!org.whatsapp, "WhatsApp number", "/admin/organisation");
  need(!org.gst, "GST number", "/admin/organisation");
  need(!org.pan, "PAN", "/admin/organisation");
  need(
    content.schemes.some((s) => s.active && !s.rate),
    "Interest rates for one or more schemes",
    "/admin/schemes",
  );
  need(content.fees.some((f) => !f.fee), "Fees in the charges table", "/admin/fees");
  need(
    content.board.some((m) => m.name.includes("to be supplied")),
    "Board member names and photographs",
    "/admin/board",
  );
  need(
    !content.documents.some((d) => d.category === "annual-report" && d.fileUrl),
    "At least one annual report PDF",
    "/admin/documents",
  );
  need(content.gallery.length === 0, "Gallery photographs", "/admin/gallery");
  need(
    content.directory.some((d) => !d.name || !d.phone),
    "Department contact directory (name, email, phone)",
    "/admin/organisation",
  );

  const newLeads = leads.filter((l) => l.status === "new").length;

  return (
    <Screen title="Overview">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Member enquiries" value={String(leads.length)} href="/admin/leads" />
        <Stat label="New, not yet contacted" value={String(newLeads)} href="/admin/leads" />
        <Stat label="Schemes on the website" value={String(content.schemes.filter((s) => s.active).length)} href="/admin/schemes" />
      </div>

      <div className="mt-6 rounded-xl bg-white p-5 ring-1 ring-sand-300">
        <h2 className="font-semibold text-maroon-700">Before the website goes live</h2>
        <p className="mt-1 text-sm text-ink-500">
          These details have not been filled in yet. Until they are, the website
          hides them rather than showing a placeholder.
        </p>
        {missing.length === 0 ? (
          <p className="mt-3 rounded bg-sand-100 px-3 py-2 text-sm text-ink-700">
            Everything on the checklist is filled in.
          </p>
        ) : (
          <ul className="mt-3 space-y-1.5">
            {missing.map((m) => (
              <li key={m.label} className="flex items-start gap-2 text-sm">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-500" />
                <Link href={m.href} className="text-ink-700 underline decoration-sand-400 hover:text-maroon-700">
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-6 text-xs text-ink-500">
        Content is stored in {usingFirestore ? "Firestore" : "a local data file"}.
      </p>
    </Screen>
  );
}

function Stat({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link href={href} className="rounded-xl bg-white p-4 ring-1 ring-sand-300 hover:ring-saffron-400">
      <p className="text-sm text-ink-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-maroon-700">{value}</p>
    </Link>
  );
}

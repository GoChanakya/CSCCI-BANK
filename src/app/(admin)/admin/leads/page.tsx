import { listLeads } from "@/lib/store";
import { guard, Screen } from "@/components/admin/Screen";
import { setLeadStatusAction } from "@/app/(admin)/admin/actions";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
};

export default async function LeadsAdmin() {
  await guard();
  const leads = await listLeads();

  return (
    <Screen
      title="Member enquiries"
      intro="People who verified their mobile number on the website and asked to be contacted. Nothing here is an account — it is a call-back list."
    >
      {leads.length === 0 ? (
        <p className="rounded-lg border border-dashed border-sand-300 bg-white px-4 py-10 text-center text-sm text-ink-500">
          No enquiries yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-sand-300">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="bg-sand-100 text-ink-500">
              <tr>
                <th className="px-4 py-2 font-medium">Received</th>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Phone</th>
                <th className="px-4 py-2 font-medium">Interested in</th>
                <th className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-sand-200 align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-ink-500">
                    {new Date(lead.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-4 py-3 font-medium text-ink-900">
                    {lead.name}
                    {lead.note && (
                      <span className="mt-0.5 block text-xs font-normal text-ink-500">
                        {lead.note}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a href={`tel:+91${lead.phone}`} className="text-maroon-700 underline">
                      +91 {lead.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3">{lead.schemeInterest}</td>
                  <td className="px-4 py-3">
                    <form className="flex flex-wrap gap-1">
                      {(["new", "contacted", "closed"] as const).map((s) => (
                        <button
                          key={s}
                          formAction={async () => {
                            "use server";
                            await setLeadStatusAction(lead.id, s);
                          }}
                          className={`rounded px-2 py-1 text-xs ${
                            lead.status === s
                              ? "bg-maroon-600 text-white"
                              : "bg-sand-100 text-ink-700 hover:bg-sand-200"
                          }`}
                        >
                          {statusLabel[s]}
                        </button>
                      ))}
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Screen>
  );
}

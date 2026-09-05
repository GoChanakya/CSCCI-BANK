import { getContent } from "@/lib/store";
import { guard, Screen } from "@/components/admin/Screen";
import { RecordEditor, SingleEditor } from "@/components/admin/Editor";
import { orgFields } from "@/components/admin/schemas";
import type { Field } from "@/components/admin/Editor";

export const dynamic = "force-dynamic";

const directoryFields: Field[] = [
  { key: "role", label: "Department / role", type: "bilingual" },
  { key: "name", label: "Name", type: "text", clientSupplied: true },
  { key: "email", label: "Email", type: "text", clientSupplied: true },
  { key: "phone", label: "Phone", type: "text", clientSupplied: true },
];

export default async function OrganisationAdmin() {
  await guard();
  const { org, directory } = await getContent();

  return (
    <div className="space-y-10">
      <Screen
        title="Institution details"
        intro="Address, contact details and statutory identifiers. Anything left blank is hidden on the website instead of showing a placeholder. The registration number and state feed the legal disclosure printed on every page."
      >
        <SingleEditor sectionKey="org" fields={orgFields} initial={org} />
      </Screen>

      <Screen
        title="Contact directory"
        intro="The department tables on the Contact page. Give two contacts the same department name to list them under one heading."
      >
        <RecordEditor
          sectionKey="directory"
          fields={directoryFields}
          titleField="role"
          initial={directory}
          blank={{ role: { en: "", mr: "" }, name: null, email: null, phone: null }}
        />
      </Screen>
    </div>
  );
}

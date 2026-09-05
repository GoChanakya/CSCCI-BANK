import { getContent } from "@/lib/store";
import { guard, Screen } from "@/components/admin/Screen";
import { RecordEditor } from "@/components/admin/Editor";
import { schemeFields } from "@/components/admin/schemas";

export const dynamic = "force-dynamic";

export default async function SchemesAdmin() {
  await guard();
  const { schemes } = await getContent();

  return (
    <Screen
      title="Schemes"
      intro="Deposit and loan schemes shown on the website. A scheme with no rate filled in still appears — the website simply says the rate is available at the office."
    >
      <RecordEditor
        sectionKey="schemes"
        fields={schemeFields}
        titleField="name"
        initial={[...schemes].sort((a, b) => a.order - b.order)}
        blank={{
          kind: "deposit",
          name: { en: "", mr: "" },
          description: { en: "", mr: "" },
          eligibility: null,
          rate: null,
          icon: "piggy",
          order: schemes.length + 1,
          active: true,
        }}
      />
    </Screen>
  );
}

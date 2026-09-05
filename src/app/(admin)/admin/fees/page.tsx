import { getContent } from "@/lib/store";
import { guard, Screen } from "@/components/admin/Screen";
import { RecordEditor } from "@/components/admin/Editor";
import { feeFields } from "@/components/admin/schemas";

export const dynamic = "force-dynamic";

export default async function FeesAdmin() {
  await guard();
  const { fees } = await getContent();

  return (
    <Screen
      title="Fees table"
      intro="The schedule of charges on the Services & Fees page. Rows with no fee filled in show as 'to be announced'."
    >
      <RecordEditor
        sectionKey="fees"
        fields={feeFields}
        titleField="service"
        initial={fees}
        blank={{ service: { en: "", mr: "" }, fee: null, conditions: null }}
      />
    </Screen>
  );
}

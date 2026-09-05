import { getContent } from "@/lib/store";
import { guard, Screen } from "@/components/admin/Screen";
import { RecordEditor } from "@/components/admin/Editor";
import { blockFields } from "@/components/admin/schemas";

export const dynamic = "force-dynamic";

export default async function BlocksAdmin() {
  await guard();
  const { blocks } = await getContent();

  return (
    <Screen
      title="Page text"
      intro="The written sections of the website - welcome message, mission, vision, chairman's message, privacy policy and accessibility information."
    >
      <RecordEditor
        sectionKey="blocks"
        fields={blockFields}
        titleField="label"
        initial={blocks}
        blank={{ slug: "", label: "", heading: { en: "", mr: "" }, body: { en: "", mr: "" } }}
        allowAdd={false}
      />
    </Screen>
  );
}

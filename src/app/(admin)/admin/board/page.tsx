import { getContent } from "@/lib/store";
import { guard, Screen } from "@/components/admin/Screen";
import { RecordEditor } from "@/components/admin/Editor";
import { boardFields } from "@/components/admin/schemas";

export const dynamic = "force-dynamic";

export default async function BoardAdmin() {
  await guard();
  const { board } = await getContent();

  return (
    <Screen title="Board of directors" intro="Managing committee members, in the order they should appear.">
      <RecordEditor
        sectionKey="board"
        fields={boardFields}
        titleField="name"
        initial={[...board].sort((a, b) => a.order - b.order)}
        blank={{
          name: "",
          designation: { en: "", mr: "" },
          photoUrl: null,
          order: board.length + 1,
        }}
      />
    </Screen>
  );
}

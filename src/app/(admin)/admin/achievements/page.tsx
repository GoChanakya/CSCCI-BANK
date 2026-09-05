import { getContent } from "@/lib/store";
import { guard, Screen } from "@/components/admin/Screen";
import { RecordEditor } from "@/components/admin/Editor";
import { achievementFields } from "@/components/admin/schemas";

export const dynamic = "force-dynamic";

export default async function AchievementsAdmin() {
  await guard();
  const { achievements } = await getContent();

  return (
    <Screen title="Achievements" intro="Awards and recognitions. The website shows the newest year first.">
      <RecordEditor
        sectionKey="achievements"
        fields={achievementFields}
        titleField="title"
        initial={achievements}
        blank={{ year: "", title: { en: "", mr: "" }, description: { en: "", mr: "" } }}
      />
    </Screen>
  );
}

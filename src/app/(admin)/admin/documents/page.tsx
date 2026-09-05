import { getContent } from "@/lib/store";
import { guard, Screen } from "@/components/admin/Screen";
import { RecordEditor } from "@/components/admin/Editor";
import { documentFields } from "@/components/admin/schemas";

export const dynamic = "force-dynamic";

export default async function DocumentsAdmin() {
  await guard();
  const { documents } = await getContent();

  return (
    <Screen
      title="Documents & reports"
      intro="Annual reports, policies and disclosures. Only documents with a PDF attached are listed on the website."
    >
      <RecordEditor
        sectionKey="documents"
        fields={documentFields}
        titleField="title"
        initial={documents}
        blank={{
          title: { en: "", mr: "" },
          category: "annual-report",
          fileUrl: null,
          year: null,
        }}
      />
    </Screen>
  );
}

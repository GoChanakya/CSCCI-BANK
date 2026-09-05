import { getContent } from "@/lib/store";
import { guard, Screen } from "@/components/admin/Screen";
import { RecordEditor } from "@/components/admin/Editor";
import { galleryFields } from "@/components/admin/schemas";

export const dynamic = "force-dynamic";

export default async function GalleryAdmin() {
  await guard();
  const { gallery } = await getContent();

  return (
    <Screen
      title="Gallery"
      intro="Photographs grouped by event. Give photos from the same programme the same album name."
    >
      <RecordEditor
        sectionKey="gallery"
        fields={galleryFields}
        titleField="eventTag"
        initial={[...gallery].sort((a, b) => a.order - b.order)}
        blank={{
          url: "",
          caption: { en: "", mr: "" },
          eventTag: "",
          order: gallery.length + 1,
        }}
      />
    </Screen>
  );
}

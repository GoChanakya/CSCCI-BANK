import { getContent } from "@/lib/store";
import { guard, Screen } from "@/components/admin/Screen";
import { RecordEditor } from "@/components/admin/Editor";
import { serviceFields } from "@/components/admin/schemas";

export const dynamic = "force-dynamic";

export default async function ServicesAdmin() {
  await guard();
  const { services } = await getContent();

  return (
    <Screen title="Services" intro="Each service appears on the Services & Fees page with its photograph.">
      <RecordEditor
        sectionKey="services"
        fields={serviceFields}
        titleField="title"
        initial={[...services].sort((a, b) => a.order - b.order)}
        blank={{
          title: { en: "", mr: "" },
          description: { en: "", mr: "" },
          imageUrl: "/img/service-card.svg",
          order: services.length + 1,
          active: true,
        }}
      />
    </Screen>
  );
}

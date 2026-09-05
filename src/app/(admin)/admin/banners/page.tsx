import { getContent } from "@/lib/store";
import { guard, Screen } from "@/components/admin/Screen";
import { RecordEditor } from "@/components/admin/Editor";
import { bannerFields } from "@/components/admin/schemas";

export const dynamic = "force-dynamic";

export default async function BannersAdmin() {
  await guard();
  const { banners } = await getContent();

  return (
    <Screen
      title="Home banners"
      intro="The large rotating images at the top of the home page. Use the arrows to change their order."
    >
      <RecordEditor
        sectionKey="banners"
        fields={bannerFields}
        titleField="heading"
        initial={[...banners].sort((a, b) => a.order - b.order)}
        blank={{
          imageUrl: "/img/banner-founder.svg",
          heading: { en: "", mr: "" },
          subheading: { en: "", mr: "" },
          order: banners.length + 1,
        }}
      />
    </Screen>
  );
}

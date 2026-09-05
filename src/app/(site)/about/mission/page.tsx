import { BlockPage, blockMetadata } from "@/components/BlockPage";

export const revalidate = 300;
export const generateMetadata = () => blockMetadata("mission");

export default function Page() {
  return <BlockPage slug="mission" />;
}

// SERVER COMPONENT
import SectionBuilderClient from "@/components/cms/SectionBuilder/SectionBuilderClient";

export default async function SectionBuilderPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params; // Server에서 params await 가능

  return <SectionBuilderClient slug={slug} />;
}



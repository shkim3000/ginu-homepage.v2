import { SectionMap } from "@/components/cms/SectionRenderer";

export async function GET() {
  // SectionMap = { HeroSection: Component, AboutSection: Component, ... }

  const templates = Object.keys(SectionMap).map((key) => ({
    id: key,
    name: key,
  }));

  return Response.json({ templates });
}

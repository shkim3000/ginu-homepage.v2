import { NextResponse } from "next/server";
import pages from "@/cms/pages.json";

export async function GET(req: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;   // ⭐ 반드시 await 필요!

  const page = (pages as any)[slug];

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  return NextResponse.json(page);
}

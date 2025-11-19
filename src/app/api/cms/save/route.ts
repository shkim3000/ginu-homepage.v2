import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { target, filename, data, pageKey } = body;

    if (!target || !filename || data) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    const baseDir = path.join(process.cwd(), "src", "cms");
    let filePath = "";

    /** -------------------------
     * ① Page 전체 업데이트 요청
     * ------------------------- */
    if (target === "page") {
      filePath = path.join(baseDir, "pages.json");

      // 기존 pages.json 읽기
      const raw = await readFile(filePath, "utf-8");
      const pages = JSON.parse(raw);

      if (!pageKey) {
        return NextResponse.json(
          { error: "Missing pageKey" },
          { status: 400 }
        );
      }

      // pageKey에 해당하는 페이지만 업데이트
      pages[pageKey] = data;

      await writeFile(filePath, JSON.stringify(pages, null, 2), "utf-8");
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid target" }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { error: "Save failed", details: String(e) },
      { status: 500 }
    );
  }
}

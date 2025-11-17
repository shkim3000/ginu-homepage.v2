import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { target, filename, data } = body;

    if (!target || !filename || !data) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    // cms 디렉토리 기준 경로 구성
    const baseDir = path.join(process.cwd(), "src", "cms");

    let filePath = "";

    // 1) pages.json 저장 요청
    if (target === "page") {
      filePath = path.join(baseDir, "pages.json");
    }

    // 2) 특정 섹션 저장 요청
    else if (target === "section") {
      filePath = path.join(baseDir, "sections", filename);
    }

    // 3) 에러 처리
    else {
      return NextResponse.json(
        { error: "Invalid target type" },
        { status: 400 }
      );
    }

    // 파일 저장
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Save error:", e);
    return NextResponse.json(
      { error: "Failed to save JSON", details: String(e) },
      { status: 500 }
    );
  }
}

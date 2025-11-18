// src/app/api/cms/sections/[type]/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(
  req: Request,
  context: { params: Promise<{ type: string }> }
) {
  const { type } = await context.params;

  try {
    const bodyText = await req.text();

    if (!bodyText) {
      return NextResponse.json(
        { error: "Empty body" },
        { status: 400 }
      );
    }

    let parsed: any = null;

    try {
      parsed = JSON.parse(bodyText);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid JSON" },
        { status: 400 }
      );
    }

    // Ensure required structure: { type: string, props: {} }
    if (!parsed.type || typeof parsed.props !== "object") {
      return NextResponse.json(
        { error: "Invalid template format" },
        { status: 400 }
      );
    }

    // Build file path
    const sectionsDir = path.join(process.cwd(), "src", "cms", "sections");
    const filePath = path.join(sectionsDir, `${type}.json`);

    // Ensure directory exists
    if (!fs.existsSync(sectionsDir)) {
      fs.mkdirSync(sectionsDir, { recursive: true });
    }

    // Write file
    fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), "utf8");

    return NextResponse.json(
      { success: true, template: parsed },
      { status: 200 }
    );
  } catch (error) {
    console.error("Template Save Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error", detail: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ type: string }> }
) {
  const { type } = await context.params;

  try {
    const sectionsDir = path.join(process.cwd(), "src", "cms", "sections");
    const filePath = path.join(sectionsDir, `${type}.json`);

    // 파일이 없으면 404가 아니라 "이미 삭제된 것으로 처리"
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: true, message: "File already removed." },
        { status: 200 }
      );
    }

    // 파일 삭제
    fs.unlinkSync(filePath);

    return NextResponse.json(
      { success: true, deleted: type },
      { status: 200 }
    );
  } catch (error) {
    console.error("Template Delete Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error", detail: String(error) },
      { status: 500 }
    );
  }
}
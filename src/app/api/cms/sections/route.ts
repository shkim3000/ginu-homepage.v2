// src/app/api/cms/sections/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const base = path.join(process.cwd(), "src/cms/sections");

  try {
    const files = fs.readdirSync(base);
    const list = files
      .filter(f => f.endsWith(".json"))
      .map(f => f.replace(".json", ""));

    return NextResponse.json({ ok: true, list });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}

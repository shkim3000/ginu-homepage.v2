"use client";

import { useState } from "react";
import pages from "@/cms/pages.json";
import PageRenderer from "@/components/PageRenderer";

export default function AdminPageEditor() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [jsonText, setJsonText] = useState<string>("{}");

  const pageKeys = Object.keys(pages);

  let previewData: any = null;
  try {
    previewData = JSON.parse(jsonText);
  } catch {
    previewData = null;
  }

  return (
    <div className="flex flex-row w-full h-full overflow-hidden">
      
      {/* LEFT: Pages (고정폭) */}
      <div className="w-[220px] border-r border-gray-200 p-4 overflow-y-auto">
        <h2 className="font-bold text-lg mb-4">Pages</h2>
        <ul className="space-y-2">
          {Object.entries(pages).map(([key, p]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedPage({ ...p, key });  // ⭐ key 저장
                setJsonText(JSON.stringify(p, null, 2));
              }}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100"
            >
              {p.title}
            </button>
          ))}
        </ul>
      </div>

      {/* CENTER: JSON Editor (고정폭) */}
      <div className="w-[450px] border-r border-gray-200 p-4 flex flex-col">
        <h2 className="font-bold text-lg mb-4">JSON Editor</h2>

        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="flex-1 border border-gray-300 rounded p-3 font-mono text-sm resize-none"
        />

        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          onClick={async () => {
            if (!selectedPage) {
              alert("No page selected.");
              return;
            }

            // 1) JSON 파싱
            let parsed: any;
            try {
              parsed = JSON.parse(jsonText);
            } catch (err) {
              alert("Invalid JSON format.");
              return;
            }

            // 2) pages.json 전체 객체 생성
            const updatedPages = {
              ...pages,
              [selectedPage.key]: parsed, // 해당 페이지만 업데이트
            };

            // 3) 저장 요청
            try {
              const res = await fetch("/api/cms/save", {
                method: "POST",
                body: JSON.stringify({
                  target: "page",
                  filename: "pages.json",
                  data: updatedPages,
                }),
              });

              if (!res.ok) {
                throw new Error("Save failed");
              }

              alert("Saved successfully!");
              location.reload(); // 최신 pages.json 로딩
            } catch (err) {
              console.error(err);
              alert("Failed to save pages.json");
            }
          }}
        >
          Save
        </button>
      </div>

      {/* RIGHT: Preview (유동적 영역) */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <h2 className="font-bold text-lg mb-4">Preview</h2>

        <div className="border border-gray-200 rounded p-4 min-h-[400px] bg-white">
          {!previewData ? (
            <p className="text-gray-500 text-sm">Invalid JSON — Preview unavailable</p>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-6">{previewData.title}</h1>
              <PageRenderer page={previewData} />
            </>
          )}
        </div>

        <div >
          {selectedPage && (
            <a
              href={`/admin/page-editor/${selectedPage.key}`}
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Sections →
            </a>
          )}
        </div>
      </div>

    </div>
  );
}



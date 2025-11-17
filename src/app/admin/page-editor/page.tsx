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
          {pageKeys.map((key) => (
            <li
              key={key}
              className={`cursor-pointer hover:text-blue-500 ${
                selectedPage === key ? "text-blue-600 font-bold" : ""
              }`}
              onClick={() => {
                setSelectedPage(key);
                setJsonText(JSON.stringify(pages[key], null, 2));
              }}
            >
              {key}
            </li>
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
          onClick={() => alert("Save 기능은 WP-7.5-3에서 구현되었습니다.")}
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
      </div>

    </div>
  );
}



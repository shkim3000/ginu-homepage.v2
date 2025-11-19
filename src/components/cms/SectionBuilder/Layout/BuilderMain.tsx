"use client";

import SectionEditForm from "../SectionEditForm";

type SectionEntry = {
  id: string;
  template?: string;
  type?: string;
  props?: Record<string, any>;
};

type BuilderMainProps = {
  sections: SectionEntry[];
  selectedIndex: number | null;
  handleSectionChange: (index: number, key: string, value: any) => void;
  setSections: (next: any[]) => void;
};

export default function BuilderMain({
  sections,
  selectedIndex,
  handleSectionChange,
  setSections,
}: BuilderMainProps) {
  const selectedSection =
    selectedIndex !== null && selectedIndex >= 0
      ? sections[selectedIndex]
      : undefined;

  const onFieldChange = (key: string, value: any) => {
    if (selectedIndex === null) return;
    handleSectionChange(selectedIndex, key, value);
  };

  return (
    <div className="flex flex-1 gap-4 p-4 overflow-hidden">
      {/* 가운데: Section Form */}
      <div className="flex-1 border rounded-lg p-4 bg-white">
        <h3 className="font-semibold mb-3">Edit Section</h3>

        {selectedSection ? (
          <>
            {/* Section ID (읽기 전용) */}
            <div className="mb-4">
              <label className="text-xs text-gray-500">Section ID</label>
              <input
                value={selectedSection.id}
                disabled
                className="border rounded px-2 py-1 w-full bg-gray-100"
              />
            </div>

            <SectionEditForm
              section={selectedSection}
              onChange={onFieldChange}
            />
          </>
        ) : (
          <p className="text-sm text-gray-500">
            왼쪽 리스트에서 편집할 섹션을 선택하세요.
          </p>
        )}
      </div>

      {/* 오른쪽: Raw JSON 미리보기 */}
      <div className="w-[360px] border rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold mb-3">Section JSON</h3>
        <pre className="text-xs bg-white border rounded p-3 overflow-auto h-full">
          {selectedSection
            ? JSON.stringify(selectedSection, null, 2)
            : "// No section selected"}
        </pre>
      </div>
    </div>
  );
}

// src/components/cms/SectionBuilder/Layout/Sidebar.tsx
"use client";

import { useState } from "react";
import SectionList from "../SectionList";
import TemplateSelectModal from "../TemplateSelectModal";

type SidebarProps = {
  sections: any[];
  selectedIndex: number | null;
  setSelectedIndex: (index: number) => void;
  onAddFromTemplate: (templateId: string) => void;   // ⭐ 부모에서 내려줌
};

export default function Sidebar({
  sections,
  selectedIndex,
  setSelectedIndex,
  onAddFromTemplate,
}: SidebarProps) {
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  return (
    <div className="w-64 border-r h-full overflow-y-auto p-4 bg-gray-50">
      <h2 className="text-sm font-semibold mb-3 text-gray-600">Sections</h2>

      <SectionList
        sections={sections}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />

      <button
        onClick={() => setShowTemplateModal(true)}
        className="w-full px-3 py-2 mt-3 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
      >
        + Add Section
      </button>

      {showTemplateModal && (
        <TemplateSelectModal
          onClose={() => setShowTemplateModal(false)}
          onSelect={(templateId) => {
            onAddFromTemplate(templateId);           // ⭐ 여기서 부모 콜백 호출
            setShowTemplateModal(false);
          }}
        />
      )}
    </div>
  );
}

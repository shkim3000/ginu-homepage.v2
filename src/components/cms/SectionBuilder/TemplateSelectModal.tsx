"use client";

import { useEffect, useState } from "react";

type TemplateItem = {
  id: string;
  name: string;
};

export default function TemplateSelectModal({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (templateId: string) => void;
}) {
  const [templates, setTemplates] = useState<TemplateItem[]>([]);

  // API에서 템플릿 목록 불러오기
  useEffect(() => {
    fetch("/api/cms/section-templates")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.templates)) {
          setTemplates(data.templates);
        }
      });
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Choose a Template</h2>

        <div className="flex flex-col gap-3 max-h-[300px] overflow-auto">
          {templates.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => onSelect(tmpl.id)}
              className="w-full px-4 py-2 rounded border hover:bg-gray-100 text-left"
            >
              {tmpl.name}
            </button>
          ))}
        </div>

        <button
          className="mt-4 w-full px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

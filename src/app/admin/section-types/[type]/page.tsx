"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const FIELD_TYPES = [
  "string",
  "text",
  "number",
  "boolean",
  "color",
  "image",
  "video",
  "link",
  "object",
  "array",
];

export default function TemplateEditorPage({ params }) {
  const { type } = params;

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/cms/sections/${type}`)
      .then((res) => res.json())
      .then((data) => {
        setTemplate(data.template);
        setLoading(false);
      });
  }, [type]);

  const handleSave = async () => {
    await fetch(`/api/cms/sections/${type}`, {
      method: "POST",
      body: JSON.stringify(template),
    });
    alert("Saved!");
  };

  const handleAddField = () => {
    const name = prompt("Field name?");
    if (!name) return;

    setTemplate({
      ...template,
      props: {
        ...template.props,
        [name]: {
          type: "string",
          default: "",
        },
      },
    });
  };

  const handleChangeFieldType = (key, newType) => {
    setTemplate({
      ...template,
      props: {
        ...template.props,
        [key]: {
          ...template.props[key],
          type: newType,
        },
      },
    });
  };

  const handleChangeDefault = (key, value) => {
    setTemplate({
      ...template,
      props: {
        ...template.props,
        [key]: { ...template.props[key], default: value },
      },
    });
  };

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Editing Template: {type}</h1>

        <div className="flex gap-3">
          <Link href="/admin/section-types" className="border px-3 py-1 rounded">
            ← Back
          </Link>

          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="border p-4 rounded bg-white">
        <div className="flex justify-between mb-3">
          <h2 className="font-medium">Fields</h2>
          <button
            onClick={handleAddField}
            className="border px-3 py-1 rounded text-sm"
          >
            + Add Field
          </button>
        </div>

        {Object.keys(template.props).map((key) => {
          const field = template.props[key];

          return (
            <div key={key} className="bg-gray-50 border rounded p-3 mb-3">
              <div className="flex justify-between mb-2">
                <div className="font-medium">{key}</div>
              </div>

              <div className="flex gap-3 mb-2">
                <select
                  value={field.type}
                  onChange={(e) =>
                    handleChangeFieldType(key, e.target.value)
                  }
                  className="border rounded px-2 py-1"
                >
                  {FIELD_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>

                <input
                  className="border rounded px-2 py-1 flex-1"
                  placeholder="Default value"
                  value={String(field.default ?? "")}
                  onChange={(e) => handleChangeDefault(key, e.target.value)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

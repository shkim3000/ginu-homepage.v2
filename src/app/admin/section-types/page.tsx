"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SectionTypesPage() {
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load section type list
  const loadTypes = async () => {
    const res = await fetch("/api/cms/sections");
    const data = await res.json();
    setTypes(data.list || []);
    setLoading(false);
  };

  useEffect(() => {
    loadTypes();
  }, []);

  // Delete section template
  const handleDelete = async (type: string) => {
    if (!confirm(`Delete section template "${type}"?`)) return;

    const res = await fetch(`/api/cms/sections/${type}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Deleted successfully.");
      loadTypes();
    } else {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Section Template List</h1>

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Templates stored in <code>/src/cms/sections</code>
        </p>

        <Link
          href="/admin/section-types/new"
          className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
        >
          + New Section Type
        </Link>
      </div>

      <div className="border rounded bg-white">
        {loading ? (
          <div className="p-4 text-gray-400 text-sm">Loading...</div>
        ) : types.length === 0 ? (
          <div className="p-4 text-gray-400 text-sm">No templates found.</div>
        ) : (
          <ul className="divide-y">
            {types.map((t) => (
              <li
                key={t}
                className="flex items-center justify-between p-3 hover:bg-gray-50"
              >
                {/* Template Name */}
                <div className="font-medium">{t}</div>

                {/* Right Side Buttons */}
                <div className="flex gap-3">
                  {/* Edit */}
                  <Link
                    href={`/admin/section-types/${t}`}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(t)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


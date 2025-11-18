"use client";

export default function SectionEditForm({ section, onChange, template }) {
  if (!section) return <p>No section selected</p>;

  const props = section.props || {};
  const schema = template?.props || {};

  const updateField = (key, value) => {
    onChange({
      ...section,
      props: { ...props, [key]: value },
    });
  };

  const renderField = (key, fieldSchema) => {
    const type = fieldSchema.type;
    const value = props[key] ?? fieldSchema.default;

    switch (type) {
      case "string":
        return (
          <input
            className="border rounded px-2 py-1 w-full"
            value={value}
            onChange={(e) => updateField(key, e.target.value)}
          />
        );

      case "text":
        return (
          <textarea
            className="border rounded px-2 py-1 w-full"
            value={value}
            onChange={(e) => updateField(key, e.target.value)}
          />
        );

      case "number":
        return (
          <input
            type="number"
            className="border rounded px-2 py-1 w-full"
            value={value}
            onChange={(e) => updateField(key, Number(e.target.value))}
          />
        );

      case "boolean":
        return (
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => updateField(key, e.target.checked)}
          />
        );

      case "color":
        return (
          <input
            type="color"
            value={value}
            onChange={(e) => updateField(key, e.target.value)}
          />
        );

      case "image":
        return (
          <input
            className="border px-2 py-1 rounded w-full"
            placeholder="/image.jpg"
            value={value}
            onChange={(e) => updateField(key, e.target.value)}
          />
        );

      default:
        return (
          <p className="text-xs text-red-500">
            Unsupported type: {type}
          </p>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-xs text-gray-500">Section ID</label>
        <input
          value={section.id}
          disabled
          className="border rounded px-2 py-1 w-full bg-gray-100"
        />
      </div>

      {Object.entries(schema).map(([key, fieldSchema]) => (
        <div key={key}>
          <label className="text-xs text-gray-500">{key}</label>
          {renderField(key, fieldSchema)}
        </div>
      ))}
    </div>
  );
}



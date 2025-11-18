import SectionEditForm from "../SectionEditForm";

export default function BuilderMain({
  sections,
  selectedIndex,
  handleSectionChange,
}: any) {
  const section = sections[selectedIndex];

  return (
    <div className="flex-1 overflow-auto p-6">
      <h2 className="text-gray-500 text-sm mb-3">Edit Section</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Form */}
        <div className="border rounded p-4">
          <SectionEditForm
            section={section}
            onChange={(key, value) =>
              handleSectionChange(selectedIndex, key, value)
            }
          />
        </div>

        {/* JSON Preview */}
        <div className="border rounded p-4 bg-gray-50">
          <p className="text-sm text-gray-500 mb-2">Section JSON</p>
          <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify(section, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

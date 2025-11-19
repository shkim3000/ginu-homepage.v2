import Link from "next/link";

type TopBarProps = {
  slug: string;
  title: string;
  onSave: () => void;
  isSaving: boolean;
  sections?: any[];
 }

export default function TopBar({
  slug,
  title,
  onSave,
  isSaving,
  sections,   // ← 필요하다면 유지 / 아니면 제거 가능 
 }: TopBarProps) {
  return (
    <div className="h-14 flex items-center justify-between px-6 border-b bg-white">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/page-editor"
          className="text-blue-600 hover:underline"
        >
          ← Back
        </Link>
        <h1 className="text-lg font-semibold">{title} / Sections</h1>
      </div>

      <button
        onClick={onSave}
        disabled={isSaving}
        className="
          bg-blue-600 text-white px-4 py-2 rounded
          hover:bg-blue-700 transition
          disabled:bg-gray-400 disabled:cursor-not-allowed
        "
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

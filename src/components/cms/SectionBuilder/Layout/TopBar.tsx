import Link from "next/link";

export default function TopBar({ slug, title }: any) {
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
        className="
          bg-blue-600 text-white px-4 py-2 rounded
          hover:bg-blue-700 transition
        "
      >
        Save
      </button>
    </div>
  );
}

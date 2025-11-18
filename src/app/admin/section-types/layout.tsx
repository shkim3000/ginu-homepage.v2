// src/app/admin/section-types/layout.tsx
// ➡ Admin 내부 전용 layout (공통 스타일 유지 목적)

export default function SectionTypesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto py-10">{children}</div>
    </div>
  );
}

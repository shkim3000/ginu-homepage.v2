export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-row bg-white overflow-hidden">
      {children}
    </div>
  );
}

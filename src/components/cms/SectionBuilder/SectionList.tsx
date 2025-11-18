type SectionEntry = {
  id: string;
  props?: Record<string, any>;
};

export default function SectionList({
  sections,
  selectedIndex,
  setSelectedIndex,
}: {
  sections: SectionEntry[];
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
}) {
  return (
    <div>
      {sections?.map((sec, idx) => (
        <div
          key={`${sec.id}-${idx}`}
          onClick={() => setSelectedIndex(idx)}
          className={`
            p-3 mb-2 rounded border shadow-sm cursor-pointer
            ${selectedIndex === idx ? "bg-blue-50 border-blue-500" : "bg-white"}
          `}
        >
          {sec.id || "section"}
        </div>
      ))}
    </div>
  );
}

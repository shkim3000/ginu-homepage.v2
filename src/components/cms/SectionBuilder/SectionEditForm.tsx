"use client";

import templateMap from "@/cms/templates-index";

type SectionEntry = {
  id: string;
  template?: string;
  type?: string; // 과거 호환용
  props?: Record<string, any>;
};

export default function SectionEditForm({
  section,
  onChange,
}: {
  section?: SectionEntry;
  onChange: (key: string, value: any) => void;
}) {
  if (!section) {
    return (
      <p className="text-sm text-gray-500">
        왼쪽에서 편집할 섹션을 선택하세요.
      </p>
    );
  }

  // 1) templateKey 결정 (template 우선, 없으면 type 사용)
  const templateKey = section.template || section.type;

  // 2) 템플릿 정의에서 기본 props 가져오기
  const templateDef =
    templateKey && (templateMap as any)[templateKey]
      ? (templateMap as any)[templateKey]
      : null;

  const baseProps = (templateDef && templateDef.props) || {};

  // 3) 섹션에 저장된 override props
  const overrideProps = section.props || {};

  // 4) merge (baseProps < overrideProps)
  const mergedProps: Record<string, any> = {
    ...baseProps,
    ...overrideProps,
  };

  const fieldKeys = Object.keys(mergedProps);

  return (
    <div className="flex flex-col gap-4">
      {/* Template 표시 (읽기 전용) */}
      <div>
        <label className="text-xs text-gray-500">Template</label>
        <input
          value={templateKey || "(none)"}
          disabled
          className="border rounded px-2 py-1 w-full bg-gray-100"
        />
      </div>

      {/* props가 하나도 없는 템플릿인 경우 안내 */}
      {fieldKeys.length === 0 && (
        <p className="text-xs text-gray-400">
          이 템플릿에는 정의된 props가 없습니다. templates-index에 props를
          추가하면 여기 자동으로 나타납니다.
        </p>
      )}

      {/* 필드 자동 생성 (지금은 전부 text로 처리) */}
      {fieldKeys.map((key) => {
        const value = mergedProps[key] ?? "";

        return (
          <div key={key}>
            <label className="text-xs text-gray-500">{key}</label>
            <input
              value={value}
              onChange={(e) => onChange(key, e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        );
      })}
    </div>
  );
}

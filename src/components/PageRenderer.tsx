// src/components/cms/PageRenderer.tsx
"use client";

import { Fragment } from "react";
import { SectionMap } from "@/components/cms/SectionRenderer";
import templateMap from "@/cms/templates-index";

type SectionEntry = {
  id: string;
  template?: string;
  type?: string; // 과거 호환용
  props?: Record<string, any>;
};

type CMSPage = {
  title: string;
  layout: string;
  sections: SectionEntry[];
};

/**
 * PageRenderer (WP-7.11)
 * - pages.json의 sections[] 에서 { id, template/type, props } 를 읽고
 * - 템플릿 기본 props + override props 를 merge 해서 렌더링
 * - SectionMap[type] 으로 실제 React 컴포넌트를 찾아 렌더링
 */
export default function PageRenderer({ page }: { page: CMSPage }) {
  if (!page || !page.sections) return null;

  return (
    <Fragment>
      {page.sections.map((entry, index) => {
        const id = entry.id;
        const type = entry.type || entry.template; // template 우선, 없으면 type

        if (!type) {
          return (
            <div
              key={id}
              className="p-4 bg-red-100 border border-red-300 text-red-700"
            >
              Missing field <b>type/template</b> for section id: <b>{id}</b>
            </div>
          );
        }

        const Renderer = SectionMap[type];

        if (!Renderer) {
          console.warn(`PageRenderer: Unknown section type → ${type}`);
          return (
            <div
              key={id}
              className="p-4 bg-red-100 border border-red-300 text-red-700"
            >
              Missing component for section type: <b>{type}</b>
            </div>
          );
        }

        // 1) 템플릿 기본 props
        const templateDef =
          (templateMap as any)[type] || (templateMap as any)[entry.template || ""];

        const baseProps = (templateDef && templateDef.props) || {};

        // 2) 섹션에 저장된 override props
        const overrideProps = entry.props || {};

        // 3) merge (base < override)
        const mergedProps = {
          ...baseProps,
          ...overrideProps,
        };

        return <Renderer key={`${id}-${index}`} {...mergedProps} />;
      })}
    </Fragment>
  );
}

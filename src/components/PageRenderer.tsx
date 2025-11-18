// src/components/cms/PageRenderer.tsx
"use client";

import { Fragment } from "react";
import { SectionMap } from "@/components/cms/SectionRenderer";
import templateMap from "@/cms/templates-index";

type SectionEntry = {
  id: string;
  template?: string;     // 새 구조
  type?: string;         // 과거 호환용
  props?: Record<string, any>;
};

type CMSPage = {
  title: string;
  layout: string;
  sections: SectionEntry[];
};

/**
 * PageRenderer
 * ----------------------------------------
 * - page.sections[] 에서 { id, template, type, props }를 읽고
 * - templateMap에서 템플릿 기본값(type, props) 조회
 * - baseProps (template.props) + override props (section.props) merge
 * - SectionMap[type] 컴포넌트를 찾아 렌더링
 */
export default function PageRenderer({ page }: { page: CMSPage }) {
  if (!page || !page.sections) return null;

  return (
    <Fragment>
      {page.sections.map((entry, index) => {
        const id = entry.id;
        const templateKey = entry.template || entry.type; // HeroSection, AboutSection ...
        const overrideProps = entry.props || {};

        if (!templateKey) {
          return (
            <div
              key={id}
              className="p-4 bg-red-100 border text-red-600"
            >
              Missing field: template/type for section id "{id}"
            </div>
          );
        }

        // 1) 템플릿 정의 조회
        const templateDef = (templateMap as any)[templateKey];

        // type 결정: 템플릿에 type이 있으면 우선, 없으면 templateKey 그대로 사용
        const componentKey = templateDef?.type || templateKey;

        // 2) 실제 React 컴포넌트 찾기
        const Renderer = (SectionMap as any)[componentKey];

        if (!Renderer) {
          return (
            <div
              key={id}
              className="p-4 bg-red-100 border text-red-600"
            >
              Missing component for type "{componentKey}"
            </div>
          );
        }

        // 3) 템플릿 기본 props + override props merge
        const baseProps = (templateDef?.props || {}) as Record<string, any>;
        const mergedProps = {
          ...baseProps,
          ...overrideProps,
        };

        return (
          <Renderer
            key={`${id}-${index}`}
            {...mergedProps}
          />
        );
      })}
    </Fragment>
  );
}

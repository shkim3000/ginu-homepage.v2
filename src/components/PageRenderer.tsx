"use client";

import dynamic from "next/dynamic";
import sections from "@/cms/sections/sections-index";
import { Fragment } from "react";

type CMSPage = {
  title: string;
  layout: string;
  sections: string[];
};

/**
 * Dynamic Page Renderer
 * - pages.json에서 받아온 page.sections[]를 읽어
 * - 섹션 JSON → 섹션 컴포넌트 자동 import → 렌더링
 * --------------------------------------------
 * PageRenderer 동작 흐름
 * pages.json         ## (@/cms/pages.json)
 *    ↓        (page.sections = ["hero", "about", ...])
 * sections-index.js  ## (@/cms/sections/section-index.js)
 *    ↓
 * hero.json → { type: "HeroSection", props: {...} }
 *    ↓
 * import("@/components/sections/HeroSection")
 *    ↓
 * <HeroSection {...props} />
 */
export default function PageRenderer({ page }: { page: CMSPage }) {
  if (!page || !page.sections) return null;

  return (
    <Fragment>
      {page.sections.map((sectionId) => {
        const sectionData = sections[sectionId];

        if (!sectionData) {
          console.warn(`⚠ Unknown section: ${sectionId}`);
          return null;
        }

        // type → 컴포넌트명
        const ComponentName = sectionData.type;

        // dynamic import
        const SectionComponent = dynamic(
          () => import(`@/components/sections/${ComponentName}`),
          { ssr: false }
        );

        // props → JSON에서 불러온 데이터
        const props = sectionData.props || {};

        return (
          <SectionComponent
            key={sectionId}
            {...props}
          />
        );
      })}
    </Fragment>
  );
}

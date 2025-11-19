"use client";

import { useEffect, useState } from "react";
import TopBar from "./Layout/TopBar";
import Sidebar from "./Layout/Sidebar";
import BuilderMain from "./Layout/BuilderMain";
import templateMap from "@/cms/templates-index";

type SectionEntry = {
  id: string;
  template?: string;
  type?: string;                     // 과거 호환용
  props?: Record<string, any>;
};

type CMSPage = {
  title: string;
  layout: string;
  sections: SectionEntry[];
};

export default function SectionBuilderClient({ slug }: { slug: string }) {
  const [pageData, setPageData] = useState<CMSPage | null>(null);
  const [sections, setSections] = useState<SectionEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [isSaving, setIsSaving] = useState(false);

  /* -----------------------------
   * 1) 페이지 데이터 로드
   * ----------------------------- */
  useEffect(() => {
    fetch(`/api/cms/page/${slug}`)
      .then((res) => res.json())
      .then((data: CMSPage) => {
        // ⭐ sections에서 type이 없으면 template → type 자동 변환
        const normalized = (data.sections || []).map((s) => ({
          ...s,
          type: s.type || s.template, // 호환용
        }));

        setPageData(data);
        setSections(normalized);
        setSelectedIndex(normalized.length > 0 ? 0 : null);
      });
  }, [slug]);

  /* -----------------------------
   * 2) 섹션 내용 수정 핸들러
   * ----------------------------- */
  const handleSectionChange = (
    index: number,
    key: string,
    value: any
  ) => {
    setSections((prev) => {
      const cloned = [...prev];
      const target = cloned[index] || { id: "", props: {} };

      if (!target.props) target.props = {};
      target.props[key] = value;

      cloned[index] = target;
      return cloned;
    });
  };

  /* -----------------------------
   * 3) 템플릿 기반 새 섹션 추가
   * ----------------------------- */
  const handleAddFromTemplate = (templateId: string) => {
    const templateDef = (templateMap as any)[templateId];

    if (!templateDef) {
      console.warn("Unknown template:", templateId);
      return;
    }

    const newId = `${templateId}_${Date.now()}`;

    const newSection: SectionEntry = {
      id: newId,
      template: templateId,
      type: templateDef.type || templateId,       // HeroSection
      props: { ...(templateDef.props || {}) },    // ⭐ 기본 props 주입
    };

    setSections((prev) => {
      const next = [...prev, newSection];
      setSelectedIndex(next.length - 1);
      return next;
    });
  };

  /* -----------------------------
   * 4) 저장 기능
   * ----------------------------- */
  const handleSave = async () => {
    if (!pageData) return;

    try {
      setIsSaving(true);

      // pages.json 전체 업데이트 구조라면 AdminPageEditor 쪽에서 처리
      const res = await fetch("/api/cms/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target: "page",
          filename: "pages.json",
          pageKey: slug,           // ★ labs or home 같은 page key
          data: {
            ...pageData,
            sections,
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to save.");

      alert("Page saved successfully!");
    } catch (e) {
      console.error(e);
      alert("Save failed.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!pageData) {
    return <div className="p-6">Loading...</div>;
  }

  /* -----------------------------
   * 5) 렌더링
   * ----------------------------- */
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar
        slug={slug}
        title={pageData.title}
        sections={sections}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          sections={sections}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          onAddFromTemplate={handleAddFromTemplate}   // ⭐ 템플릿 추가 기능 연결
        />

        <BuilderMain
          sections={sections}
          selectedIndex={selectedIndex}
          handleSectionChange={handleSectionChange}
          setSections={setSections}                   // 섹션 배열 편집 가능
        />
      </div>
    </div>
  );
}

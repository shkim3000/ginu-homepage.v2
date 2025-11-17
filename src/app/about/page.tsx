'use client'
import SectionWrapper from "@/components/common/SectionWrapper";

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* 🔥 page title을 최상단에서 별도 관리 */}
      <h1 className="text-3xl font-bold text-sky-600 mb-10">About</h1>

      {/* 기존 섹션들은 title 없이 Section만 렌더링 */}
      <SectionWrapper direction="up">
        <p>GINU is a technology company...</p>
      </SectionWrapper>

      <SectionWrapper direction="up">
        <p>Our mission is...</p>
      </SectionWrapper>
    </div>
  );
}


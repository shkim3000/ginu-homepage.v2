// src/cms/templates-index.ts

// ✅ 각 섹션 템플릿 JSON 로드
//    파일명은 예시야. 실제 파일명이 hero.json / about.json / contact.json 이라면
//    그에 맞게 수정하면 됨.
import hero from "./sections/hero.json";
import about from "./sections/about.json";
import contact from "./sections/contact.json";

// 템플릿 구조 타입 (선택사항)
export type TemplateDef = {
  type: string;                 // "HeroSection", "AboutSection", ...
  props?: Record<string, any>;  // 기본 props (default)
};

// ✅ 템플릿 ID → 템플릿 정의 매핑
//    pages.json 의 "template" 값이 여기의 key 와 같아야 함.
const templateMap: Record<string, TemplateDef> = {
  HeroSection: hero as TemplateDef,
  AboutSection: about as TemplateDef,
  ContactSection: contact as TemplateDef,
};

export default templateMap;

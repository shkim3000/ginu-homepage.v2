import { notFound } from "next/navigation";
import PageRenderer from "@/components/PageRenderer";
import pages from "@/cms/pages.json";

/*----------------------------------------------
 * [[ 동작 요약 ]]
 * 1. /[slug] 요청 → params.slug로 들어옴
 * 2. pages.json에서 slug key로 CMSPage 찾음
 * 3. 있으면 → PageRenderer에 넘겨서 섹션 렌더링
 * 4. 없으면 → notFound() → Next의 기본 404 처리
 * 5. generateStaticParams()로 빌드시 모든 CMS 페이지를 정적으로 뽑아냄
 * ---------------------------------------------
 * << 이 구조의 중요한 점 3가지 >>
 * 1. 기존 정적 페이지는 그대로 사용
 *    - /, /about, /business, /products, /support  → 기존 app 하위 폴더가 처리
 *    - /[slug]는 그 외 slug만 담당
 * 2. pages.json의 key = slug
 *    - 예:
 *      {
 *        'labs': { "title": "Labs", ...},
 *        "careers": { "title": "Careers", ...}
 *      }
 *    - 그럼 /labs, /careers가 자동으로 CMS 동적 페이지가 됨.
 * 3. PageRenderer와 100% 분리된 책임
 *    - [slug]/page.tsx는 'page 찾기 + 404 처리"만 담당
 *    - 실제 화면 그리기, 섹션 매핑은 PageRenderer가 전담 → 유지보수 쉬움
 *----------------------------------------------*/
/*
 * pages.json 구조랑 1:1 매칭되는 타입
 */
type CMSPage = {
  title: string;
  layout: string;
  sections: string[];
};

type PageProps = {
  params: {
    slug: string;
  };
};

/**
 * CMS 기반 Dynamic Route Loader
 * - /[slug] 경로로 들어온 요청을 pages.json에서 찾아서 렌더링
 * - 해당 slug가 없으면 404(notFound) 처리
 */
export default async function CMSPageRoute({ params }: PageProps) {
  const { slug } = await params;      // 👈 Next.js 15 대응

  // pages.json을 타입 캐스팅해서 안전하게 사용
  const cmsPages = pages as Record<string, CMSPage>;
  const page = cmsPages[slug];

  if (!page) {
    // 정의되지 않은 slug는 404 페이지로
    return notFound();
  }

  return (
    <div className="w-full">
      {/* 🔥 CMS Page Title */}
      <h1 className="text-3xl font-bold  text-sky-600 mb-10">{page.title}</h1>

      {/* 섹션 렌더링 */}
      <PageRenderer page={page} />
    </div>
  );
}

/**
 * 정적 생성용 파라미터
 * - next build 시 pages.json에 정의된 slug들을 정적 페이지로 미리 생성
 */
export async function generateStaticParams() {
  const cmsPages = pages as Record<string, CMSPage>;

  return Object.keys(cmsPages).map((slug) => ({
    slug,
  }));
}


import SectionWrapper from "@/components/common/SectionWrapper";

export default function BusinessPage() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-sky-600 mb-10" >Business</h1>

      <SectionWrapper direction="up">
        <p className="mt-2 text-gray-700">
          Explore our business areas and partnerships.
        </p>
      </SectionWrapper>
    </div>
  );
}

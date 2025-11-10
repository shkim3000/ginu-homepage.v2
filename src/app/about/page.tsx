'use client'
import SectionWrapper from "@/components/common/SectionWrapper";

export default function AboutPage() {
  return (
    <div className="space-y-20">
      <SectionWrapper>
        <h1 className="text-3xl font-bold text-sky-700">About GINU</h1>
        <p className="text-gray-600 mt-4">
          We are a creative technology company building innovative BLE-based solutions.
        </p>
      </SectionWrapper>

      <SectionWrapper delay={0.2}>
        <h2 className="text-2xl font-semibold mt-10">Our Vision</h2>
        <p className="text-gray-500 mt-3">
          To create barrier-free digital experiences powered by intelligent accessibility.
        </p>
      </SectionWrapper>
    </div>
  );
}

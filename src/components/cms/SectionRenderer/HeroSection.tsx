"use client";

import SectionWrapper from "@/components/common/SectionWrapper";

type HeroProps = {
  title: string;
  subtitle?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
};

export default function HeroSection(props: HeroProps) {
  const { title, subtitle, image, buttonText, buttonLink } = props;

  return (
    <SectionWrapper direction="up">
      <div className="w-full flex flex-col md:flex-row items-center gap-8">
        {/* Text */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-lg text-gray-600">{subtitle}</p>
          )}
          {buttonText && (
            <a
              href={buttonLink || "#"}
              className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl"
            >
              {buttonText}
            </a>
          )}
        </div>

        {/* Image */}
        {image && (
          <div className="flex-1">
            <img
              src={image}
              alt={title}
              className="rounded-2xl shadow-lg w-full"
            />
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

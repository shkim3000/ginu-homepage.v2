"use client";

import SectionWrapper from "@/components/common/SectionWrapper";

type AboutProps = {
  heading: string;
  description: string;
  image?: string;
};

export default function AboutSection(props: AboutProps) {
  const { heading, description, image } = props;

  return (
    <SectionWrapper direction="up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Text */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">{heading}</h2>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Image */}
        {image && (
          <img
            src={image}
            className="rounded-2xl shadow-lg w-full"
            alt={heading}
          />
        )}
      </div>
    </SectionWrapper>
  );
}

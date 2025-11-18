"use client";

import SectionWrapper from "@/components/common/SectionWrapper";

type ContactProps = {
  title: string;
  description?: string;
  email?: string;
  phone?: string;
};

export default function ContactSection(props: ContactProps) {
  const { title, description, email, phone } = props;

  return (
    <SectionWrapper direction="up">
      <h2 className="text-3xl font-semibold">{title}</h2>
      {description && (
        <p className="text-gray-600 mt-2 mb-6">{description}</p>
      )}

      <div className="space-y-2">
        {email && (
          <p>
            <strong>Email:</strong> {email}
          </p>
        )}
        {phone && (
          <p>
            <strong>Phone:</strong> {phone}
          </p>
        )}
      </div>
    </SectionWrapper>
  );
}

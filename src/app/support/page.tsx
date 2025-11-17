'use client'

import SectionWrapper from "@/components/common/SectionWrapper";
import { useFeedback } from "@/components/micro/FeedbackLayer";
import Button from "@/components/ui/Button";

export default function SupportPage() {
  const { showToast } = useFeedback();

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-sky-600 mb-10">Support</h1>

      <SectionWrapper direction="up">  
        <p className="mt-2 text-gray-700">
          Need help? Reach out to our support team.
        </p>

        <div className="flex gap-4 items-center  ">
          <Button onClick={() => showToast("정보 메시지입니다", "info")}>Info</Button>
         <Button onClick={() => showToast("성공했습니다!", "success")}>Success</Button>
          <Button onClick={() => showToast("오류 발생!", "error")}>Error</Button>
        </div>
      </SectionWrapper>
    </div>
  );
}

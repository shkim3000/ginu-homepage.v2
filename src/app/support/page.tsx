'use client'
import { useFeedback } from "@/components/micro/FeedbackLayer";
import Button from "@/components/ui/Button";

export default function SupportPage() {
  const { showToast } = useFeedback();

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold text-sky-600">Support</h1>
      <p className="mt-2 text-gray-700">
        Need help? Reach out to our support team.
      </p>

      <div className="flex gap-4 items-center  ">
        <Button onClick={() => showToast("정보 메시지입니다", "info")}>Info</Button>
        <Button onClick={() => showToast("성공했습니다!", "success")}>Success</Button>
        <Button onClick={() => showToast("오류 발생!", "error")}>Error</Button>
    </div>
    </section>
  );
}

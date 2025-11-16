"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

type Toast = { id: number; message: string; type?: "info" | "success" | "error" };
type FeedbackContextType = {
  showToast: (message: string, type?: Toast["type"]) => void;
};

const FeedbackContext = createContext<FeedbackContextType | null>(null);

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false); // ✅ 클라이언트 마운트 확인용

  useEffect(() => {
    console.log("[FeedbackProvider] mounted");
    setMounted(true);
  }, []);

  const showToast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  }, []);

  // ✅ 클라이언트 렌더링 이후에만 Portal 생성
  const portal = mounted
    ? createPortal(
        <div className="fixed top-4 right-4 flex flex-col gap-2 z-[9999]">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`
                px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-white
                ${t.type === "success" ? "bg-green-500" :
                  t.type === "error" ? "bg-red-500" : "bg-sky-500"}
                animate-fadeInOut
              `}
            >
              {t.message}
            </div>
          ))}
        </div>,
        document.body
      )
    : null;

  return (
    <FeedbackContext.Provider value={{ showToast }}>
      {children}
      {portal}
    </FeedbackContext.Provider>
  );
}

export const useFeedback = () => {
  const ctx = useContext(FeedbackContext);
  if (!ctx) throw new Error("useFeedback must be used within FeedbackProvider");
  return ctx;
};

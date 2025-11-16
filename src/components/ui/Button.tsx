"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/motion/presets";
import useRipple from "@/hooks/useRipple"; // 💧 Step-2 추가
import { useEffect, useState } from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
}: ButtonProps) {
  const { containerRef, onClick: rippleClick, RippleElements } = useRipple();
  const [isTouch, setIsTouch] = useState(false); // ✅ 환경 감지

  // 🔹 환경 감지 (최초 터치 입력 시 모바일 환경으로 판정)
  useEffect(() => {
    const handleFirstTouch = () => setIsTouch(true);
    window.addEventListener("touchstart", handleFirstTouch, { once: true });
    return () => window.removeEventListener("touchstart", handleFirstTouch);
  }, []);

  // 🔹 variant별 스타일
  const base =
    variant === "primary"
      ? "bg-sky-600 text-white hover:bg-sky-700"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200";

  // 🔹 통합 이벤트 핸들러
  const handleEvent = (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    console.log("[Button] handleClicked");
    rippleClick(e.nativeEvent);
    onClick?.();
  };

  return (
    <motion.button
      ref={containerRef}
      variants={motionPresets.uiVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      // ✅ 모바일은 touchstart만, PC는 click만
      {...(isTouch
        ? { onTouchStart: handleEvent }
        : { onClick: handleEvent })}
      style={{
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation", // ✅ click fallback 제거
      }}
      className={`
        relative overflow-hidden rounded-lg px-5 py-2.5 font-medium
        transition-all duration-300 ease-in-out shadow-sm select-none
        ${base} ${className}
      `}
    >
      {children}
      {RippleElements}
    </motion.button>
  );
}

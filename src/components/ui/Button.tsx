"use client";

import { motion } from "framer-motion";
import { useState, MouseEvent, TouchEvent } from "react";

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
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const createRipple = (x: number, y: number) => {
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 500);
  };

  // ✅ PC 클릭
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    createRipple(e.clientX - rect.left, e.clientY - rect.top);
    onClick?.();
  };

  // ✅ 모바일 터치 (즉시 반응)
  const handleTouchStart = (e: TouchEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    createRipple(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const base =
    variant === "primary"
      ? "bg-sky-600 text-white hover:bg-sky-700"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200";

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      style={{ WebkitTapHighlightColor: "transparent" }}  // ✅ 추가
      className={`
        relative overflow-hidden rounded-lg px-5 py-2.5 font-medium
        transition-all duration-300 ease-in-out shadow-sm
        ${base} ${className}
      `}
    >
      {children}

      {/* Ripple */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute bg-white/60 rounded-full transform scale-0 animate-ripple"
          style={{
            left: r.x,
            top: r.y,
            width: "160px",
            height: "160px",
            opacity: 0.7,
          }}
        />
      ))}
    </motion.button>
  );
}

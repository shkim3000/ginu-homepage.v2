"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { motionPresets } from "@/motion/presets";
import useRipple from "@/hooks/useRipple";

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
};

export default function LinkButton({
  href,
  children,
  className = "",
  variant = "outline",
}: LinkButtonProps) {
  const { containerRef, onClick: rippleClick, RippleElements } = useRipple();

  const base =
    variant === "primary"
      ? "bg-sky-600 text-white hover:bg-sky-700 border border-sky-600"
      : "text-sky-700 border border-sky-300 hover:bg-sky-100";

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>
  ) => {
    rippleClick(e.nativeEvent);
  };

  return (
    <motion.a
      ref={containerRef as any}
      href={href}
      variants={motionPresets.uiVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      onTouchStart={handleClick}
      className={`
        relative overflow-hidden inline-flex items-center justify-center
        rounded-lg px-5 py-2.5 font-medium
        transition-all duration-300 ease-in-out shadow-sm
        ${base} ${className}
      `}
    >
      {children}
      {RippleElements}
    </motion.a>
  );
}

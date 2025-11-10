"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface MotionWrapperProps {
  children: React.ReactNode;
}

const pageOrder = ["/", "/about", "/business", "/products", "/support"];

export default function MotionWrapper({ children }: MotionWrapperProps) {
  const pathname = usePathname();
  const [direction, setDirection] = useState(1);
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    if (prevPath.current !== null) {
      const prevIndex = pageOrder.indexOf(prevPath.current);
      const currentIndex = pageOrder.indexOf(pathname);
      if (prevIndex !== -1 && currentIndex !== -1) {
        setDirection(currentIndex > prevIndex ? 1 : -1);
      }
    }
    prevPath.current = pathname;
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, x: 80 * direction }}
      animate={{ opacity: 1, x: 0 }}
      // ✅ 이전 화면이 완전히 사라지지 않도록 opacity를 0.5로 유지
      exit={{ opacity: 0.5, x: -40 * direction }}
      transition={{
        duration: 0.45,
        ease: [0.45, 0, 0.55, 1],
      }}
      className="min-h-screen relative overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

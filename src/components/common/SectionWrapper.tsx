"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type SectionWrapperProps = {
  children: ReactNode;
  delay?: number;       // 전체 섹션 시작 지연
  stagger?: number;     // 자식 간 간격 (기본 0.12s)
  direction?: "up" | "down" | "left" | "right"; // 이동 방향
};

export default function SectionWrapper({
  children,
  delay = 0,
  stagger = 0.12,
  direction = "up",
}: SectionWrapperProps) {
  // 방향별 초기값
  const dirMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };
  const initialPos = dirMap[direction];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, ...initialPos },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="space-y-4"
    >
      {/* 직계 자식 요소들을 motion.div로 감싸기 */}
      {Array.isArray(children)
        ? children.map((child, idx) => (
            <motion.div key={idx} variants={item}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={item}>{children}</motion.div>}
    </motion.section>
  );
}

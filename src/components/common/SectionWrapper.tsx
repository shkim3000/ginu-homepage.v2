"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type SectionWrapperProps = {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right";
};

export default function SectionWrapper({
  children,
  delay = 0,
  stagger = 0.12,
  direction = "up",
}: SectionWrapperProps) {
  const dirMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };
  const initialPos = dirMap[direction];

  /*
   * MotionWrapper보다 살짝 늦게 시작 (delay +0.1)
   * 완전 0 대신 opacity 0.3으로 시작 → 자연스럽게 연결
  */
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay + 0.1, // ✅ MotionWrapper보다 살짝 늦게 시작
      },
    },
  };

  const item = {
    hidden: { opacity: 0.3, ...initialPos }, // ✅ 완전 0 대신 0.3
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

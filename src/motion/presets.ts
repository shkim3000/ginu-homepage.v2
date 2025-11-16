/**
 * motion/presets.ts
 * --------------------------------------------------
 * Micro Interaction Presets
 * - WP-6 (Micro Interaction & Feedback Motion)
 * - 모든 UI 요소(Button, Link, Card 등)의 기본 모션 정의
 * --------------------------------------------------
 */

import { Variants, Transition } from "framer-motion";

/**
 * 🔹 공통 트랜지션 기본값
 */
export const defaultTransition: Transition = {
  duration: 0.25,
  ease: [0.25, 0.1, 0.25, 1.0], // ease-out cubic
};

/**
 * 🔹 마이크로 인터랙션 프리셋
 * 각 상태(hover, tap, fade 등)를 Variants 객체로 정의
 */
export const micro = {
  hover: {
    scale: 1.03,
    transition: { ...defaultTransition },
  },
  tap: {
    scale: 0.96,
    transition: { duration: 0.12 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
};

/**
 * 🔹 UI 상태별 variant 세트
 * hover / tap / focus 를 함께 관리하고 싶은 경우
 */
export const uiVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
  hover: micro.hover,
  tap: micro.tap,
};

/**
 * 🔹 export 기본 객체
 */
export const motionPresets = {
  micro,
  uiVariants,
  defaultTransition,
};

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { menuItems } from "@/lib/navItems";

type SidebarNavProps = {
  isOpen: boolean;     // ✅ 열림/닫힘 상태
  onClose: () => void; // ✅ 닫기 이벤트
  isOverlayMode: boolean;   // ✅ 반응형 구분
};

export default function SidebarNav({ isOpen, onClose, isOverlayMode }: SidebarNavProps) {
  const variants = {
    hidden: { x: isOverlayMode ? "-100%" : 0, opacity: isOverlayMode ? 0 : 1 },
    visible: { x: 0, opacity: 1 },
  };

  // ✅ 데스크탑은 항상 보여주고, 모바일만 애니메이션 처리
  if (!isOverlayMode) {
    return (
      <aside
        className={`
          fixed top-[var(--header-height)] left-0
          h-[calc(100vh-var(--header-height))]
          w-[var(--sidebar-width)]
          bg-white border-r border-gray-200
          flex flex-col shadow-md z-[var(--z-sidebar)]
        `}
      >
        <nav className="flex flex-col py-4 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="
                px-6 py-3 text-gray-700 font-medium
                hover:bg-sky-100 hover:text-sky-700
                transition-colors rounded
              "
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    );
  }

  // ✅ 모바일 모션
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🔹 Overlay (배경 어둡게 + 클릭 시 닫기) */}
          {isOverlayMode && (
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/40 z-[var(--z-overlay)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              onClick={onClose} // ✅ 클릭 시 닫기
            />
          )}

          {/* 🔹 Sidebar 본체 */}
          <motion.aside
            key="sidebar"
            className={`
              fixed top-[var(--header-height)] left-0
              h-[calc(100vh-var(--header-height))]
              bg-white border-r border-gray-200
              z-[var(--z-sidebar)]
              ${isOverlayMode ? "w-3/4 max-w-[240px]" : "w-[var(--sidebar-width)]"}
              flex flex-col shadow-md
            `}
            variants={variants}
            initial={{ opacity: 0, x: -40, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, x: 0, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, x: -20, backdropFilter: "blur(0px)" }}
            transition={{
              duration: 0.6,
              ease: [0.645, 0.045, 0.355, 1.000], // easeInOutCubic
            }}
          >
            <nav className="flex flex-col py-4 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={
                    isOverlayMode
                      ? () => setTimeout(onClose, 150)
                      : undefined
                  }
                  className="
                    px-6 py-3 text-gray-700 font-medium
                    hover:bg-sky-100 hover:text-sky-700
                    transition-colors rounded
                  "
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

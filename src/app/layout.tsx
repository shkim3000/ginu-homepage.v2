"use client";

import { useState } from "react";
import { useDevice } from "@/hooks/useDevice";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header";
import SidebarNav from "@/components/layout/SidebarNav";
import MotionWrapper from "@/components/common/MotionWrapper"; // ✅ 추가
import { FeedbackProvider } from "@/components/micro/FeedbackLayer";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isMobile, isTablet } = useDevice();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname(); // ✅ 라우팅 감지용

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        <FeedbackProvider>
        {/* ✅ Header는 항상 고정 */}
        <Header onMenuClick={toggleSidebar} />

        {/* ✅ 메인 레이아웃 */}
        <div className="flex pt-[var(--content-top-gap)] min-h-screen bg-gray-50 text-gray-800">
          {/* Sidebar */}
          <SidebarNav
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
            isOverlayMode={isMobile || isTablet}
          />

          {/* Dim overlay */}
          {(isMobile || isTablet) && isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-[var(--z-overlay)]"
              onClick={closeSidebar}
            />
          )}

          {/* ✅ 메인 콘텐츠 영역 + 페이지 전환 애니메이션 */}
          <main
            className="
              flex-1 overflow-auto
              px-[var(--content-padding)] py-10
              lg:ml-[var(--sidebar-width)]
              max-w-screen-xl mx-auto leading-relaxed
            "
          >
            {/* 
                exit 애니메이션이 처음 mount 때 실행되지 않도록 initial={false} 추가
                (첫 페이지 진입 시 깜빡임 방지)
              */}
            <AnimatePresence mode="wait" initial={false}>
              <MotionWrapper key={pathname}>
                {children}
              </MotionWrapper>
            </AnimatePresence>
          </main>
        </div>
        </FeedbackProvider>
      </body>
    </html>
  );
}

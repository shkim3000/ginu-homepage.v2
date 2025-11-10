"use client";

import { useState } from "react";
import { useDevice } from "@/hooks/useDevice";

import Header from "@/components/layout/Header";
import SidebarNav from "@/components/layout/SidebarNav";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isMobile, isTablet } = useDevice();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        {/* ✅ scroll-blur 기능은 Header 내부에서 자체적으로 처리 */}
        <Header onMenuClick={toggleSidebar} />

        {/* 메인 영역 */}
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

          {/* Main Content */}
          <main
            className="
              flex-1 overflow-auto
              px-[var(--content-padding)] py-10
              lg:ml-[var(--sidebar-width)]
              max-w-screen-xl mx-auto leading-relaxed
            "
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "@/lib/navItems";
import { useDevice } from "@/hooks/useDevice";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { isMobile, isTablet } = useDevice();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // ✅ 렌더 직후 1회 초기화 (강제 스크롤 0 상태 반영)
    const initialScroll = window.scrollY > 50;
    setScrolled(initialScroll);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ “scrolled=false” 상태일 때 기본 높이/투명도 유지
  return (
    <header
      className={`
        fixed top-0 left-0 right-0
        border-b border-gray-200/50
        z-[var(--z-header)]
        flex items-center justify-between
        px-6 shadow-sm
        transition-all duration-500 ease-in-out
        header-blur
        ${scrolled ? "h-[var(--header-height)]" : "h-[var(--header-height)]"}  /* 높이 유지 */
      `}
      style={{
        ["--blur" as any]: scrolled ? "8px" : "0px",
        ["--opacity" as any]: scrolled ? "1" : "0",
      }}
    >
      {/* 로고 영역 */}
      <div className="flex items-center gap-4">
        <Image
          src="/logo.png"
          alt="Ginu Logo"
          width={51}
          height={51}
          style={{ height: "calc(var(--header-height) * 0.6)", width: "auto" }}
          className="rounded"
        />
        <span className="font-semibold text-lg text-sky-700">GINU</span>
      </div>

      {/* 메뉴 영역 */}
      <nav className="hidden md:flex items-center gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-gray-700 hover:text-sky-600 font-medium transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {(isMobile || isTablet) && (
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-600 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded"
          aria-label="Toggle Sidebar Menu"
        >
          ☰
        </button>
      )}
    </header>
  );
}

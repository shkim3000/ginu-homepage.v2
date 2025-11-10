// src/hooks/useDevice.ts
import { useEffect, useState } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

export const useDevice = () => {
  const [device, setDevice] = useState<DeviceType>("desktop");

  useEffect(() => {
    const calcDevice = () => {
      const width = window.innerWidth;
      if (width < 640) return "mobile";
      if (width < 1024) return "tablet";
      return "desktop";
    };

    const handleResize = () => setDevice(calcDevice());
    setDevice(calcDevice());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = device === "mobile";
  const isTablet = device === "tablet";
  const isDesktop = device === "desktop";

  return { device, isMobile, isTablet, isDesktop };
};

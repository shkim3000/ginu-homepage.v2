import { useState, useCallback, useRef } from "react";

export default function useRipple() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);
  const lastTouchTime = useRef(0); // 💡 터치 감지 시간 저장

  const createRipple = useCallback((x: number, y: number) => {
    const id = Date.now();
    console.log("[RIPPLE] createRipple", { x, y, id });
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  }, []);

  const onClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // 💡 모바일에서 touch 이후 click 이벤트가 연속 발생하는 경우 방지
      const now = Date.now();
      if (now - lastTouchTime.current < 700) {
        console.log("[CLICK] ignored (within 700ms)");
        return;
      }
      let clientX = 0;
      let clientY = 0;

      // ✅ 터치 이벤트인 경우
      if (e instanceof TouchEvent) {
        const touch = e.touches[0];
        lastTouchTime.current = now;
        console.log("[TOUCH] start", now);
        createRipple(touch.clientX - rect.left, touch.clientY - rect.top);
        return;
      }
      
      clientX = e.clientX;
      clientY = e.clientY;
      console.log("[CLICK] accepted", now - lastTouchTime.current, "ms after touch");
      createRipple(clientX - rect.left, clientY - rect.top);
    },
    [createRipple]
  );

  const RippleElements = ripples.map((r) => (
    <span
      key={r.id}
      className="absolute bg-white/60 rounded-full transform scale-0 animate-ripple pointer-events-none"
      style={{
        left: r.x,
        top: r.y,
        width: "160px",
        height: "160px",
        opacity: 0.7,
      }}
    />
  ));

  return { containerRef, onClick, RippleElements };
}

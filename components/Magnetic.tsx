"use client";

import { useEffect, useRef, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  /** Biên độ hút tối đa, tính bằng pixel */
  strength?: number;
  className?: string;
};

/**
 * Nút bị con trỏ hút nhẹ về phía nó.
 *
 * Chỉ bật khi có con trỏ thật. Trên cảm ứng thì `pointermove` chỉ nổ lúc
 * ngón tay đã chạm vào màn hình, nên hiệu ứng vừa không ai thấy vừa làm nút
 * dịch đi ngay dưới ngón tay đang bấm — đúng kiểu lỗi khiến người ta bấm trượt.
 *
 * Toạ độ được ghi vào biến CSS chứ không đổi style trực tiếp: phần dịch
 * chuyển do CSS lo (`.magnetic`), nên nó hợp nhất được với hiệu ứng nhấn
 * xuống thay vì hai bên tranh nhau ghi đè `transform`.
 */
export function Magnetic({ children, strength = 16, className = "" }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Vẫn kiểm tra con trỏ, nhưng KHÔNG kiểm tra prefers-reduced-motion:
    // xem ghi chú cuối app/globals.css.
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    let frame = 0;

    function onMove(pointerEvent: PointerEvent) {
      if (!el) return;
      const box = el.getBoundingClientRect();
      const offsetX = pointerEvent.clientX - (box.left + box.width / 2);
      const offsetY = pointerEvent.clientY - (box.top + box.height / 2);

      // Gộp nhiều sự kiện con trỏ vào một khung hình. Chuột báo toạ độ dày
      // hơn nhịp vẽ của màn hình, ghi thẳng vào style là làm thừa.
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${(offsetX / box.width) * strength}px`);
        el.style.setProperty("--my", `${(offsetY / box.height) * strength}px`);
      });
    }

    function release() {
      if (!el) return;
      cancelAnimationFrame(frame);
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", release);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", release);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`magnetic inline-flex ${className}`}>
      {children}
    </span>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";

type InViewProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Gắn class `in-view` cho khối khi nó cuộn vào khung nhìn, rồi thôi.
 *
 * Bản thân khối không đổi gì cả — nó chỉ bật cờ. Mọi chuyển động do các class
 * trong `globals.css` lo: `.fade` cho từng dòng hiện so le (độ trễ đặt qua
 * biến `--d`), `.rise` cho chữ dựng lên từng từ, `.rule` cho gạch ngang tự
 * kéo dài. Cách chia này để một khối mười mấy dòng chỉ tốn đúng một
 * IntersectionObserver, thay vì mỗi dòng một cái.
 *
 * Quan sát xong thì thôi theo dõi — hiệu ứng chạy một lần, không lặp lại mỗi
 * lần cuộn qua. Trình duyệt không có IntersectionObserver thì cờ được bật
 * ngay, nội dung hiện luôn thay vì ẩn vĩnh viễn.
 */
export function InView({ children, className = "" }: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in-view");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      },
      // Lùi mép dưới vào 60px để nội dung hiện khi đã vào hẳn khung nhìn,
      // chứ không phải lúc vừa mới ló ra một sợi.
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

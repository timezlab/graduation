"use client";

import { useEffect, useRef, useState } from "react";
import { event } from "@/data/event";
import { formatShortDate, formatTime } from "@/lib/datetime";
import { directionsUrl } from "@/lib/geo";

/**
 * Thanh dính hiện lên sau khi khách cuộn qua màn thiệp.
 *
 * Hai việc duy nhất mà một tấm thiệp cần người ta làm được, lưu vào lịch và
 * tìm đường, luôn nằm trong tầm tay chứ không phải cuộn ngược lên tìm.
 *
 * Cách phát hiện dùng một mốc mỏng đặt ngay dưới màn thiệp thay vì nghe sự
 * kiện scroll: trình duyệt tự báo khi mốc đi qua mép trên, không có hàm nào
 * của mình chạy trên mỗi khung hình cuộn.
 */
export function Dock() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Chỉ hiện khi mốc đã trôi lên phía trên khung nhìn. Thiếu vế kiểm
        // tra vị trí thì thanh cũng bật lên khi mốc còn nằm dưới màn hình,
        // tức là ngay lúc trang vừa mở, giữa lúc phong bì còn đóng kín.
        setDocked(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden className="h-px w-full" />

      <div
        // Khi thanh còn ẩn, `inert` gỡ nó khỏi cả thứ tự tab lẫn cây trợ năng.
        // Chỉ dùng aria-hidden thôi thì bàn phím vẫn tab được vào hai cái nút
        // đang nằm ngoài màn hình.
        inert={!docked}
        className={`dock fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6 ${
          docked ? "is-docked" : ""
        }`}
      >
        <nav
          aria-label="Lối tắt"
          className="flex items-center gap-2 rounded-xs border border-line bg-night/90 py-2 pr-2 pl-4 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.85)] backdrop-blur-md sm:gap-4 sm:pl-6"
        >
          <span className="tabular hidden text-[0.82rem] whitespace-nowrap text-ash sm:inline">
            <span className="text-bone">{formatShortDate(event.startISO)}</span>
            <span aria-hidden className="mx-2 text-line">
              ·
            </span>
            {formatTime(event.startISO)}
          </span>

          <a
            href="#chi-tiet"
            className="press rounded-xs px-3 py-2 text-[0.85rem] font-medium whitespace-nowrap text-bone transition-colors hover:text-flame"
          >
            Lưu vào lịch
          </a>

          <a
            href={directionsUrl({ lat: event.venue.lat, lng: event.venue.lng })}
            target="_blank"
            rel="noopener noreferrer"
            className="sheen press rounded-xs bg-seal px-4 py-2 text-[0.85rem] font-medium whitespace-nowrap text-onseal"
          >
            Chỉ đường
          </a>
        </nav>
      </div>
    </>
  );
}

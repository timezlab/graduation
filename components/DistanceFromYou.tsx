"use client";

import { useEffect, useState } from "react";
import {
  directionsUrl,
  estimateTravelMinutes,
  formatDistance,
  formatDuration,
  haversineKm,
  type Coords,
} from "@/lib/geo";

type Status =
  | { kind: "idle" }
  | { kind: "locating" }
  | { kind: "done"; origin: Coords; km: number }
  | { kind: "error"; message: string };

/**
 * Cho khách tự đo khoảng cách từ chỗ họ tới địa điểm tổ chức.
 *
 * Chủ ý không tự động hỏi quyền truy cập vị trí khi trang vừa tải: một hộp
 * thoại xin quyền bật lên ngay khi mở thiệp mời vừa gây khó chịu vừa dễ bị
 * bấm "Chặn" theo phản xạ — mà đã chặn một lần thì lần sau khó xin lại.
 * Khách bấm nút thì mới hỏi.
 *
 * Mọi nhánh lỗi đều kết thúc bằng một câu giải thích cộng đường vòng khả dụng
 * (nút chỉ đường thủ công), không bao giờ để khách mắc kẹt.
 */
export function DistanceFromYou({ venue }: { venue: Coords }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function locate() {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setStatus({ kind: "error", message: "Trình duyệt của bạn không hỗ trợ định vị." });
      return;
    }

    // Trình duyệt chỉ cấp quyền định vị trên HTTPS (localhost được miễn).
    // Báo trước cho rõ, thay vì để hàm bên dưới lặng lẽ báo lỗi khó hiểu.
    if (!window.isSecureContext) {
      setStatus({
        kind: "error",
        message: "Tính năng định vị chỉ hoạt động khi trang được mở qua HTTPS.",
      });
      return;
    }

    setStatus({ kind: "locating" });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setStatus({ kind: "done", origin, km: haversineKm(origin, venue) });
      },
      (error) => {
        const messages: Record<number, string> = {
          1: "Bạn đã từ chối chia sẻ vị trí. Không sao, nút chỉ đường bên dưới vẫn dùng được bình thường.",
          2: "Chưa xác định được vị trí của bạn lúc này. Thử lại sau một chút nhé.",
          3: "Việc lấy vị trí mất quá nhiều thời gian nên đã dừng lại.",
        };
        setStatus({
          kind: "error",
          message: messages[error.code] ?? "Không lấy được vị trí của bạn.",
        });
      },
      {
        // Chỉ cần độ chính xác cỡ trăm mét là đủ để tính quãng đường —
        // bật độ chính xác cao chỉ tổ chậm và tốn pin.
        enableHighAccuracy: false,
        timeout: 10_000,
        maximumAge: 300_000,
      },
    );
  }

  if (status.kind === "done") {
    return <Result km={status.km} origin={status.origin} venue={venue} />;
  }

  if (status.kind === "error") {
    return (
      <div className="rounded-xs border border-line bg-night/70 p-5">
        <p className="text-[0.88rem] leading-relaxed text-ash">{status.message}</p>
        <button
          type="button"
          onClick={locate}
          className="mt-3 text-[0.88rem] font-medium text-flame underline decoration-flame/30 underline-offset-4 transition-colors hover:decoration-flame"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xs border border-dashed border-line bg-night/50 p-5">
      <p className="text-[0.88rem] leading-relaxed text-ash">Muốn biết chỗ bạn cách toà C1 bao xa?</p>
      <button
        type="button"
        onClick={locate}
        disabled={status.kind === "locating"}
        className="sheen press mt-4 inline-flex items-center gap-2 rounded-xs border border-bone/25 px-4 py-2.5 text-[0.85rem] font-medium text-bone hover:border-bone/55 hover:bg-bone/5 disabled:cursor-wait disabled:opacity-60"
      >
        {status.kind === "locating" ? (
          <>
            <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-bone/25 border-t-bone" />
            Đang xác định vị trí…
          </>
        ) : (
          "Tính khoảng cách"
        )}
      </button>
    </div>
  );
}

/**
 * Kết quả, với con số chạy từ 0 lên.
 *
 * Con số nhảy phịch ra ngay thì đọc như một ô dữ liệu; chạy lên trong hơn một
 * giây thì đọc như một phép đo vừa xong. Đơn vị được chốt theo giá trị đích
 * ngay từ đầu, nếu không thì giữa chừng nó nhảy từ "m" sang "km".
 */
function Result({ km, origin, venue }: { km: number; origin: Coords; venue: Coords }) {
  const shown = useCountUp(km);
  const minutes = estimateTravelMinutes(km);

  return (
    <div className="rounded-xs border border-line bg-night/70 p-5">
      <p className="text-[0.7rem] tracking-[0.18em] text-faint uppercase">Từ vị trí của bạn</p>
      <p className="tabular mt-3 font-display text-3xl text-bone">
        {formatDistance(shown, km)}
      </p>
      <p className="mt-1.5 text-[0.88rem] text-ash">{formatDuration(minutes)} đi xe, nếu đường không tắc.</p>
      <a
        href={directionsUrl(venue, origin)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-flame underline decoration-flame/30 underline-offset-4 transition-colors hover:decoration-flame"
      >
        Chỉ đường từ đây
        <span aria-hidden>→</span>
      </a>
      <p className="mt-3 text-[0.74rem] leading-relaxed text-faint">
        Số liệu tính theo đường chim bay có bù thêm hệ số đường vòng, chỉ mang tính ước lượng.
      </p>
    </div>
  );
}

/** Đếm từ 0 lên `target`, hãm dần về cuối. */
function useCountUp(target: number, duration = 1200): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Không kiểm tra prefers-reduced-motion: xem ghi chú cuối app/globals.css,
    // trang này cố ý chạy hoạt cảnh với mọi giá trị của cài đặt ấy.
    let frame = 0;
    const startedAt = performance.now();

    function step(nowMs: number) {
      const progress = Math.min((nowMs - startedAt) / duration, 1);
      // Hãm mũ: chạy rất nhanh ở đoạn đầu rồi bò dần về đích, giống kim đồng
      // hồ đo đang ổn định lại chứ không phải một thanh tiến độ chạy đều.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

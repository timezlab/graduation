/**
 * Tiện ích thời gian.
 *
 * Mọi hàm định dạng ở đây đều ghim cứng `timeZone: "Asia/Ho_Chi_Minh"`.
 * Đây là chủ ý: nhờ vậy kết quả render trên server và trên máy khách luôn
 * giống nhau (tránh hydration mismatch), đồng thời khách ở múi giờ khác
 * vẫn đọc được đúng giờ Việt Nam thay vì giờ máy họ.
 */

export const TIME_ZONE = "Asia/Ho_Chi_Minh";
const LOCALE = "vi-VN";

function fmt(options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(LOCALE, { ...options, timeZone: TIME_ZONE });
}

/** "Chủ Nhật, 27 tháng 9, 2026" */
export function formatFullDate(iso: string): string {
  return fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

/** "27.09.2026" */
export function formatShortDate(iso: string): string {
  const parts = fmt({ day: "2-digit", month: "2-digit", year: "numeric" }).formatToParts(new Date(iso));
  const get = (t: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("day")}.${get("month")}.${get("year")}`;
}

/** "09:30" */
export function formatTime(iso: string): string {
  return fmt({ hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(iso));
}

/** "Chủ Nhật" */
export function formatWeekday(iso: string): string {
  return fmt({ weekday: "long" }).format(new Date(iso));
}

// ── Đếm ngược ──────────────────────────────────────────────────

export type Phase = "before" | "during" | "after";

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Chia khoảng thời gian còn lại thành ngày/giờ/phút/giây.
 * Nhận số ms; giá trị âm được kẹp về 0 để không bao giờ hiện số âm.
 */
export function splitDuration(ms: number): CountdownParts {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/** Sự kiện đang ở giai đoạn nào so với thời điểm `nowMs`. */
export function resolvePhase(nowMs: number, startISO: string, endISO: string): Phase {
  const start = new Date(startISO).getTime();
  const end = new Date(endISO).getTime();
  if (nowMs < start) return "before";
  if (nowMs <= end) return "during";
  return "after";
}

/** Thêm số 0 đằng trước cho đủ hai chữ số. */
export function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

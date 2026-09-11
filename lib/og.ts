import { event } from "@/data/event";

/**
 * Mô tả ảnh xem trước, dùng chung cho hai nơi:
 *   app/og.png/route.tsx  dựng ảnh đúng kích thước này
 *   app/layout.tsx        khai thẻ og:image / twitter:image trỏ về nó
 *
 * Để ở đây thay vì xuất từ route.tsx: một tệp route chỉ nên xuất các
 * handler (GET…) và cấu hình đoạn (dynamic…), Next soi các export khác.
 */
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `Thiệp mời ${event.eventTitle.toLowerCase()} của ${event.hostName}`,
};

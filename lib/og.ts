import { event } from "@/data/event";

/**
 * Mô tả ảnh xem trước, dùng chung cho hai nơi:
 *   app/og.png/route.tsx  dựng ảnh đúng kích thước này
 *   app/layout.tsx        khai thẻ og:image / twitter:image trỏ về nó
 *
 * Để ở đây thay vì xuất từ route.tsx: một tệp route chỉ nên xuất các
 * handler (GET…) và cấu hình đoạn (dynamic…), Next soi các export khác.
 *
 * Đuôi `?v=`: Facebook/Messenger tải ảnh xem trước qua proxy riêng và cache
 * theo URL ảnh — kể cả khi tải thất bại. Lần đầu link được gửi đi lúc HTTPS
 * chưa cấp xong, proxy đã ghi nhớ "ảnh hỏng" cho /og.png và không quên.
 * "Thu thập lại" ở Sharing Debugger chỉ làm mới thẻ meta, không làm mới
 * proxy ảnh. Tăng số này mỗi khi cần Facebook coi ảnh là mới.
 */
export const ogImage = {
  url: "/og.png?v=2",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `Thiệp mời ${event.eventTitle.toLowerCase()} của ${event.hostName}`,
};

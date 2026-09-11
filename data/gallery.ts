/**
 * ─────────────────────────────────────────────────────────────
 *  DẢI ẢNH KỶ NIỆM — bảy "lần đầu", và một lần cuối
 *
 *  Chú thích cả dải đi theo một khuôn: mỗi tấm là một lần đầu tiên.
 *  Không phải lần thắng, lần được giải, lần lên báo — chỉ là lần đầu
 *  làm một việc mà trước đó chưa từng. Tấm cuối phá khuôn thành "lần
 *  cuối", để cả dải khép lại đúng chỗ khối này đang đứng: ngay trước
 *  ngày ra trường.
 *
 *  ─── CÁCH THÊM / THAY ─────────────────────────────────────────
 *  1. Bỏ ảnh vào  public/anh/  (đặt tên không dấu)
 *  2. Ghi `width` / `height` đúng kích thước thật — sai số này gây
 *     nhảy khung lúc ảnh đang tải
 *  3. Khung hiển thị theo đúng tỉ lệ của ảnh (chỉ cố định chiều cao),
 *     nên không tấm nào bị cắt — cứ để nguyên ảnh gốc, không cần crop
 *     trước. Ảnh quá ngang (panorama) thì khung sẽ rất dài, nên tránh.
 *
 *  Sáu tới tám tấm là khoảng đẹp nhất. Mảng rỗng thì cả khối tự biến
 *  mất khỏi trang, không để lại khoảng hở.
 *
 *  Hai tấm thi (khởi nghiệp, blockchain) có chữ giải thưởng in sẵn
 *  trên phông và bảng. Chủ nhân đã xem và chọn giữ — chú thích không
 *  nhắc tới giải, chỉ nhắc tới việc đi thi.
 * ─────────────────────────────────────────────────────────────
 */

export type Photo = {
  id: string;
  /** Chú thích ngắn hiện dưới ảnh — vài chữ thôi, đừng thành câu */
  caption: string;
  year: string;
  /** Ảnh trong public/ thì trỏ "/anh/ten-file.jpg", hoặc dùng URL đầy đủ.
   *  Dùng tên miền ngoài thì nhớ khai báo thêm trong next.config.ts. */
  src: string;
  /** Mô tả cho trình đọc màn hình */
  alt: string;
  width: number;
  height: number;
};

export const photos: Photo[] = [
  {
    id: "tham-gia-clb",
    caption: "Lần đầu tham gia câu lạc bộ",
    year: "2023",
    src: "/anh/tham-gia-clb.jpg",
    alt: "Buổi bế mạc của câu lạc bộ, cả nhóm mặc áo trắng đồng phục đứng chụp chung sau dãy bàn họp, hai bạn ở giữa ôm hoa hướng dương.",
    width: 2048,
    height: 1152,
  },
  {
    id: "thi-khoi-nghiep",
    caption: "Lần đầu đi thi khởi nghiệp",
    year: "2023",
    src: "/anh/thi-khoi-nghiep.jpg",
    alt: "Cả đội đứng trên sân khấu chung kết cuộc thi khởi nghiệp, cầm hoa và bảng tên đội, phông nền xanh thẫm phía sau.",
    width: 1080,
    height: 720,
  },
  {
    id: "di-may-bay",
    caption: "Lần đầu đi máy bay",
    year: "2023",
    src: "/anh/di-may-bay.jpg",
    alt: "Ảnh selfie cả nhóm ở sảnh sân bay Nội Bài, vali kéo bên cạnh, vài người đeo gối cổ chờ giờ bay.",
    width: 2048,
    height: 1536,
  },
  {
    id: "thi-blockchain",
    caption: "Lần đầu thử sức với blockchain",
    year: "2024",
    src: "/anh/thi-blockchain.jpg",
    alt: "Ảnh tập thể ngày pitching của một hackathon blockchain trong giảng đường, mọi người giơ tay chào máy ảnh.",
    width: 2048,
    height: 1365,
  },
  {
    id: "di-tu",
    caption: "Lần đầu đi tu",
    year: "2024",
    src: "/anh/di-tu.jpg",
    alt: "Ảnh selfie bốn bạn mặc áo khoá tu trong hội trường chùa, tay cầm giấy chứng nhận hoàn thành khoá tu mùa hè.",
    width: 2048,
    height: 1536,
  },
  {
    id: "bao-ve-tot-nghiep",
    caption: "Lần đầu bảo vệ tốt nghiệp",
    year: "2026",
    src: "/anh/bao-ve-tot-nghiep.jpg",
    alt: "Đứng cạnh màn hình lớn trong phòng bảo vệ, áo sơ mi trắng, hai tay chắp trước, hội đồng ngồi phía dưới đang xem slide cảm ơn.",
    width: 2560,
    height: 1920,
  },
  {
    id: "thanks-party",
    caption: "Lần cuối làm sinh viên",
    year: "2026",
    src: "/anh/thanks-party-1.jpg",
    alt: "Ảnh selfie cụng ly cùng bạn bè trong sảnh tiệc sau lễ tốt nghiệp, đèn chùm và gương lớn phía sau.",
    width: 1538,
    height: 2048,
  },
];

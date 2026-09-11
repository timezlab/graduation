/**
 * Hình mũ cử nhân dùng chung cho app/icon.tsx và app/apple-icon.tsx.
 *
 * Đường nét lấy nguyên từ icon `graduation-cap` của Lucide (ISC), KHÔNG
 * chỉnh path — chỉ đặt lên nền tối bo góc và tô một màu flame (đỏ Bách khoa
 * sắc dùng cho chữ trên nền tối, xem globals.css). Ô nền 32 đơn vị, icon 24
 * đơn vị của Lucide đặt giữa — lề 4 mỗi bên — bằng cách nới viewBox chứ
 * không dịch path. Cả khung phóng theo `size` nên favicon 64px và icon màn
 * hình chính 180px cùng một nét vẽ. Satori (bộ dựng ảnh của
 * next/og) hiểu trực tiếp các phần tử SVG cơ bản nên không cần qua ảnh.
 *
 * Cùng bảng màu với app/globals.css.
 */
export function GradCap({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="-4 -4 32 32">
      <rect x="-4" y="-4" width="32" height="32" rx="6" fill="#07080c" />
      <g fill="none" stroke="#e8676b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
        />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </g>
    </svg>
  );
}

/**
 * Hình mũ cử nhân dùng chung cho app/icon.tsx và app/apple-icon.tsx.
 *
 * Icon mũ đặc (viewBox 48) do chủ nhân đưa, giữ nguyên đường nét. Tệp gốc
 * gộp dây tua và thân mũ vào một path; ở đây tách ra tại lệnh `M` thứ hai
 * để tô riêng — geometry không đổi, chỉ cắt chuỗi `d` làm hai. Thân và nóc
 * mũ màu bone, riêng dây tua đỏ flame (đỏ Bách khoa sắc dùng trên nền tối,
 * xem globals.css).
 *
 * Ô nền 60 đơn vị, icon 48 đặt giữa — lề 6 mỗi bên — bằng cách nới viewBox
 * chứ không dịch path. Cả khung phóng theo `size` nên favicon 64px và icon
 * màn hình chính 180px cùng một nét vẽ. Satori (bộ dựng ảnh của next/og)
 * hiểu trực tiếp các phần tử SVG cơ bản nên không cần qua ảnh.
 */
export function GradCap({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="-6 -6 60 60">
      <rect x="-6" y="-6" width="60" height="60" rx="11" fill="#07080c" />
      {/* Dây tua */}
      <path
        d="M44.485 31.5A2.489 2.489 0 0 0 44 27.211V23.79l-2 .85v2.571a2.489 2.489 0 0 0-.485 4.29 2.49 2.49 0 0 0-1.015 2V36a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-2.5a2.49 2.49 0 0 0-1.015-2"
        fill="#e8676b"
      />
      {/* Thân mũ */}
      <path
        d="M39 25.91v7.4a4.96 4.96 0 0 1-2.4 4.28 24.98 24.98 0 0 1-25.2 0A4.96 4.96 0 0 1 9 33.31v-7.4l12.27 5.19a7.05 7.05 0 0 0 5.46 0z"
        fill="#edeae3"
      />
      {/* Nóc mũ */}
      <path
        d="m46.036 15.237-20.088-8.5a5.03 5.03 0 0 0-3.9 0l-20.088 8.5a3 3 0 0 0 0 5.526l20.088 8.5a5.02 5.02 0 0 0 3.9 0l20.088-8.5a3 3 0 0 0 0-5.526"
        fill="#edeae3"
      />
    </svg>
  );
}

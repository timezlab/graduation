/**
 * Hình mũ cử nhân dùng chung cho app/icon.tsx và app/apple-icon.tsx.
 *
 * Đường nét lấy nguyên từ icon `graduation-cap` của Lucide (ISC), KHÔNG
 * chỉnh path — chỉ đặt lên nền tối bo góc và tô màu: thân mũ bone, dây tua
 * flame. Viewbox 24 của Lucide được phóng theo `size` nên favicon 64px và
 * icon màn hình chính 180px cùng một nét vẽ. Satori (bộ dựng ảnh của
 * next/og) hiểu trực tiếp các phần tử SVG cơ bản nên không cần qua ảnh.
 *
 * Cùng bảng màu với app/globals.css.
 */
export function GradCap({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <rect width="24" height="24" rx="4.5" fill="#07080c" />
      <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
          stroke="#edeae3"
        />
        <path d="M22 10v6" stroke="#e8676b" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" stroke="#edeae3" />
      </g>
    </svg>
  );
}

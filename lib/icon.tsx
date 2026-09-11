/**
 * Hình mũ cử nhân dùng chung cho app/icon.tsx và app/apple-icon.tsx.
 *
 * Vẽ bằng SVG thuần trong một viewBox 32×32, phóng theo `size` — nhờ vậy
 * favicon 64px và icon màn hình chính 180px cùng một nét vẽ, chỉ khác độ
 * phân giải. Satori (bộ dựng ảnh của next/og) hiểu trực tiếp các phần tử
 * SVG cơ bản nên không cần chuyển sang đường dẫn ảnh.
 *
 * Cùng bảng màu với app/globals.css: nền void, mũ bone, dây tua flame.
 */
export function GradCap({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32">
      <rect width="32" height="32" rx="6" fill="#07080c" />
      <path
        d="M8.5 15.2v5.1c0 2.2 3.4 3.7 7.5 3.7s7.5-1.5 7.5-3.7v-5.1"
        fill="none"
        stroke="#edeae3"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M16 7.5 3.5 13.2 16 18.9l12.5-5.7z" fill="#edeae3" />
      <path d="M28.5 13.2v6.2" stroke="#e8676b" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28.5" cy="21.2" r="1.9" fill="#e8676b" />
    </svg>
  );
}

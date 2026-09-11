import { ImageResponse } from "next/og";
import { GradCap } from "@/lib/icon";

/**
 * Favicon: mũ cử nhân, dựng bằng mã theo quy ước `app/icon.tsx` của Next.
 * Hình vẽ nằm ở lib/icon.tsx, dùng chung với apple-icon.tsx.
 *
 * Host tĩnh (GitHub Pages) nên phải `force-static` để ảnh được dựng sẵn
 * lúc build. Tệp xuất ra là /icon không đuôi; thẻ <link> mang sẵn
 * type="image/png" và trình duyệt tự dò nội dung ảnh, nên vẫn hiện đúng.
 */
export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<GradCap size={size.width} />, size);
}

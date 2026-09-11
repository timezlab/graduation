import { ImageResponse } from "next/og";
import { GradCap } from "@/lib/icon";

/** Icon khi thêm vào màn hình chính iOS. Cùng hình với icon.tsx, cỡ 180. */
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<GradCap size={size.width} />, size);
}

"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  /**
   * Biên độ trôi, tính bằng phần trăm chiều cao của chính phần tử.
   * Số dương thì phần tử trôi chậm hơn trang (lùi ra sau), số âm thì
   * nhanh hơn trang (tiến lên trước).
   */
  distance?: number;
  /** Phóng to nhẹ trong lúc trôi, dùng cho ảnh nền toàn khung */
  zoom?: boolean;
  className?: string;
};

/**
 * Lớp trôi theo nhịp cuộn.
 *
 * Vị trí lấy từ `useScroll` của Motion rồi đổ thẳng vào một motion value,
 * nên toàn bộ chuyển động nằm ngoài vòng render của React: cuộn một trăm
 * khung hình cũng không sinh một lần render nào. Đây là lý do không dùng
 * `useState` cho những giá trị liên tục kiểu này — mỗi khung hình một lần
 * render thì trang sập ngay trên điện thoại.
 *
 * Có một lớp lò xo rất căng đặt sau cùng. Nó không để làm nảy, mà để nuốt
 * mấy bước nhảy thô của bánh xe chuột: cuộn bằng bánh xe là những cú nhích
 * rời rạc, ánh xạ thẳng thì lớp ảnh giật theo từng nấc.
 *
 * Không kiểm tra prefers-reduced-motion: xem ghi chú cuối app/globals.css,
 * trang này cố ý chạy hoạt cảnh với mọi giá trị của cài đặt ấy.
 */
export function Parallax({ children, distance = 12, zoom = false, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Mốc "start end" tới "end start" là toàn bộ quãng phần tử nằm trong tầm
  // nhìn, tính từ lúc mép trên vừa chạm đáy khung nhìn cho tới lúc mép dưới
  // rời khỏi đỉnh. Dùng mốc này thì biên độ trôi không đổi theo chiều cao
  // màn hình.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 260, damping: 42, mass: 0.4 });

  const y = useTransform(smooth, [0, 1], [`${distance}%`, `${-distance}%`]);
  const scale = useTransform(smooth, [0, 0.5, 1], zoom ? [1.14, 1.06, 1.14] : [1, 1, 1]);

  return (
    <motion.div ref={ref} style={{ y, scale }} className={className}>
      {children}
    </motion.div>
  );
}

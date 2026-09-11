import type { CSSProperties } from "react";
import { InView } from "./InView";
import { RiseText } from "./RiseText";

type SectionHeadingProps = {
  title: string;
  /** Đoạn dẫn tuỳ chọn, đặt thẳng dưới tiêu đề */
  lead?: string;
  align?: "left" | "center";
  /** Cỡ chữ tiêu đề. "lg" dành cho khối mở đầu một mạch nội dung dài. */
  size?: "md" | "lg";
};

/**
 * Cụm tiêu đề dùng chung, giữ nhịp chữ đồng nhất suốt trang.
 *
 * Không có nhãn nhỏ in hoa phía trên tiêu đề. Đặt một cái nhãn như thế lên
 * mọi khối là cách nhanh nhất khiến các khối trông giống hệt nhau, và bản
 * thân cái nhãn thường chỉ nhắc lại đúng chữ đã có trong tiêu đề. Thay vào
 * đó, mỗi khối mở bằng một vạch đỏ tự kéo dài — cùng một dấu hiệu với vạch
 * ở dòng giấy tiêu đề trên màn thiệp, và không tốn một dòng chữ nào.
 *
 * Tiêu đề và đoạn dẫn xếp dọc chứ không tách hai cột trái phải. Kiểu hai
 * cột ấy đẩy đoạn dẫn thành một mẩu chữ trôi nổi ở góc, không neo vào đâu.
 *
 * Tự lo phần quan sát khung nhìn cho chính nó, nên nơi gọi chỉ việc đặt nó
 * vào chỗ cần.
 */
export function SectionHeading({
  title,
  lead,
  align = "left",
  size = "md",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <InView className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span aria-hidden className={`rule w-14 ${centered ? "mx-auto" : ""}`} />

      <h2
        className={`mt-6 font-display leading-[1.08] font-normal text-balance text-bone ${
          size === "lg"
            ? "text-[2.1rem] sm:text-5xl lg:text-[3.4rem]"
            : "text-3xl sm:text-4xl lg:text-[2.6rem]"
        }`}
      >
        <RiseText baseDelay={80}>{title}</RiseText>
      </h2>

      {lead && (
        <p
          className="fade mt-5 text-[0.95rem] leading-relaxed text-pretty text-ash sm:text-base"
          style={{ "--d": "300ms" } as CSSProperties}
        >
          {lead}
        </p>
      )}
    </InView>
  );
}

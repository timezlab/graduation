import { Fragment, type CSSProperties } from "react";

type RiseTextProps = {
  children: string;
  /** Độ trễ chung trước khi từ đầu tiên bắt đầu, tính bằng mili giây */
  baseDelay?: number;
  className?: string;
};

/**
 * Chữ dựng lên theo từng từ.
 *
 * Mỗi từ nằm trong một ô cắt cụt và bắt đầu ở dưới đáy ô. Khi khối cha nhận
 * class `in-view` (hoặc `on-load` với hero), các từ lần lượt trượt lên —
 * trông như dòng chữ được kéo ra từ sau mép giấy. Phần tính giờ nằm hết trong
 * CSS qua `--rise-index`, nên đây vẫn là server component, không gửi thêm một
 * byte JavaScript nào xuống trình duyệt.
 *
 * Cắt theo từ chứ không theo chữ cái, và khoảng trắng giữa các từ được giữ
 * nguyên làm nút văn bản thật. Nhờ vậy trình đọc màn hình vẫn đọc liền mạch
 * và người dùng bôi đen copy vẫn ra đúng câu — không cần nhân thêm một bản
 * `sr-only` nào, thứ mà bôi đen sẽ ra chữ lặp hai lần.
 */
export function RiseText({ children, baseDelay = 0, className = "" }: RiseTextProps) {
  const words = children.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            className="rise"
            style={{ "--rise-index": index, "--rise-base": `${baseDelay}ms` } as CSSProperties}
          >
            <span>{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

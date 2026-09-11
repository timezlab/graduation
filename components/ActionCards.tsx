import type { CSSProperties } from "react";

export type ActionCard = {
  href: string;
  label: string;
  /** Dòng chữ nhỏ dưới nhãn. Nên nói thêm một điều mới, đừng nhắc lại nhãn. */
  hint: string;
  /** Mở sang tab mới. Để trống với đường dẫn trong chính trang này. */
  external?: boolean;
  /** Tên file khi trình duyệt tải về. Chỉ đặt cho link tải, không đặt cho link mở. */
  download?: string;
};

// Tailwind chỉ nhận ra tên class được viết nguyên vẹn trong mã nguồn, nên số
// cột phải tra từ bảng này chứ không ghép chuỗi `sm:grid-cols-${n}` — ghép
// chuỗi thì class không bao giờ được sinh ra và lưới im lặng tụt về một cột.
const columnClass: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

/**
 * Một nhóm việc khách có thể làm: nhãn nhỏ in hoa, rồi vài tấm thẻ bấm được
 * xếp ngang hàng.
 *
 * Tách ra dùng chung vì khối chi tiết có hai nhóm như vậy đứng liền nhau —
 * đường đi và lịch. Cho hai nhóm cùng một hình dạng thì mắt đọc ra "đây là
 * những việc mình có thể làm"; mỗi nhóm một kiểu thì chúng thành hai món đồ
 * rời nhau, và cái thứ hai phải được đọc lại từ đầu.
 *
 * Tất cả đều là thẻ <a> tĩnh, không cần một dòng JavaScript nào.
 */
export function ActionCards({
  title,
  items,
  baseDelay = 240,
}: {
  title: string;
  items: ActionCard[];
  /** Độ trễ của tấm thẻ đầu tiên trong hiệu ứng hiện dần, tính bằng ms. */
  baseDelay?: number;
}) {
  return (
    <div>
      <p className="fade text-[0.7rem] tracking-[0.18em] text-faint uppercase">{title}</p>

      <div className={`mt-4 grid gap-2.5 ${columnClass[items.length] ?? "sm:grid-cols-3"}`}>
        {items.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            {...(item.download ? { download: item.download } : {})}
            style={{ "--d": `${baseDelay + index * 90}ms` } as CSSProperties}
            className="fade sheen press group flex flex-col rounded-xs border border-line bg-night/70 px-4 py-4 hover:border-seal/60 hover:bg-seal/10"
          >
            <span className="flex items-center justify-between gap-2 text-[0.9rem] font-medium text-bone">
              {item.label}
              <span
                aria-hidden
                className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-flame"
              >
                →
              </span>
            </span>
            <span className="mt-1 text-[0.75rem] text-faint">{item.hint}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

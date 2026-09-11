import Image from "next/image";
import { photos, type Photo } from "@/data/gallery";

/**
 * ═══════════════════════════════════════════════════════════════
 *  DẢI ẢNH CHẠY VÒNG
 *
 *  Hai hàng chạy ngược chiều nhau, không bao giờ dừng. Đây là khối
 *  duy nhất trên trang tự chuyển động khi người xem đứng yên, và đó
 *  là chủ ý: cả trang còn lại chỉ động khi có người cuộn, nên một
 *  dải tự trôi ở giữa khiến chỗ này thành nơi mắt nghỉ lại.
 *
 *  ─── Vì sao lặp được liền mạch ─────────────────────────────
 *  Danh sách được in ra hai lần trong markup, rồi cả dải trượt đi
 *  đúng -50% chiều rộng của chính nó. Khi vòng lặp về 0, tấm đang ở
 *  giữa màn hình chính là bản sao của tấm vừa ở đó — không có mối nối
 *  nào để mà thấy. Bản sao thứ hai mang `aria-hidden`, nên trình đọc
 *  màn hình chỉ nghe danh sách một lần.
 *
 *  ─── Vì sao dừng hẳn khi rê chuột chứ không giảm tốc ───────
 *  Đổi animation-duration giữa chừng làm cả dải nhảy vị trí: thời
 *  gian đã trôi được ánh xạ lại theo chu kỳ mới, nên vị trí tính ra
 *  khác hẳn vị trí đang hiển thị. Dừng hẳn thì không có cú nhảy nào,
 *  và người muốn xem kỹ một tấm cũng được đúng cái họ cần.
 *
 *  Không cần "use client": mọi thứ ở đây là CSS thuần, không một
 *  byte JavaScript nào xuống trình duyệt.
 * ═══════════════════════════════════════════════════════════════
 */
export function PhotoMarquee() {
  // Chưa có ảnh nào thì không dựng gì cả. Thà thiếu hẳn một khối còn hơn
  // để lại hai dải ô xám chạy vòng quanh chờ ảnh.
  if (photos.length === 0) return null;

  // Chia đôi để hai hàng không chạy cùng một bộ ảnh. Số lẻ thì hàng trên
  // nhiều hơn một tấm.
  const half = Math.ceil(photos.length / 2);
  const top = photos.slice(0, half);
  const bottom = photos.slice(half);

  return (
    <section
      aria-label="Vài khoảnh khắc bốn năm qua"
      className="rail-mask relative overflow-hidden py-4"
    >
      <Rail items={top} direction="left" />
      <div className="mt-4 sm:mt-5">
        <Rail items={bottom.length > 0 ? bottom : top} direction="right" />
      </div>
    </section>
  );
}

function Rail({
  items,
  direction,
}: {
  items: Photo[];
  direction: "left" | "right";
}) {
  return (
    <div className="marquee-rail">
      <ul className={`marquee marquee--${direction}`}>
        {items.map((photo) => (
          <Frame key={photo.id} photo={photo} />
        ))}
        {/* Bản sao chỉ để nối vòng. Ẩn khỏi cây trợ năng để không đọc lặp. */}
        {items.map((photo) => (
          <Frame key={`${photo.id}-copy`} photo={photo} duplicate />
        ))}
      </ul>
    </div>
  );
}

function Frame({
  photo,
  duplicate = false,
}: {
  photo: Photo;
  duplicate?: boolean;
}) {
  // Khung theo đúng tỉ lệ của từng tấm, chỉ cố định chiều cao. Ảnh nhóm
  // chụp ngang thì khung rộng, selfie dọc thì khung hẹp — không tấm nào bị
  // cắt, nên không có ai trong ảnh bị mất nửa mặt vì đứng lệch khung.
  // Ba mức chiều cao ở className phải khớp với ba con số trong `sizes`.
  const ratio = photo.width / photo.height;
  const sizes = [
    `(min-width: 1024px) ${(19 * ratio).toFixed(1)}rem`,
    `(min-width: 640px) ${(15 * ratio).toFixed(1)}rem`,
    `${(12 * ratio).toFixed(1)}rem`,
  ].join(", ");

  return (
    <li
      {...(duplicate ? { "aria-hidden": true } : {})}
      className="plate mr-4 shrink-0 sm:mr-5"
    >
      <div
        className="relative h-48 overflow-hidden rounded-xs border border-line bg-slate sm:h-60 lg:h-76"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        <Image
          src={photo.src}
          alt={duplicate ? "" : photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          className="h-full w-full object-cover"
        />
      </div>

      <p className="mt-2.5 flex items-baseline gap-2 text-[0.78rem] leading-snug">
        <span className="text-ash">{photo.caption}</span>
        <span className="tabular text-faint">{photo.year}</span>
      </p>
    </li>
  );
}

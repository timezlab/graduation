import type { CSSProperties, ReactNode } from "react";
import { event } from "@/data/event";
import { formatFullDate, formatShortDate, formatTime } from "@/lib/datetime";
import { directionsUrl } from "@/lib/geo";
import { ActionCards, type ActionCard } from "./ActionCards";
import { AddToCalendar } from "./AddToCalendar";
import { Countdown } from "./Countdown";
import { InView } from "./InView";
import { SectionHeading } from "./SectionHeading";

const venue = { lat: event.venue.lat, lng: event.venue.lng };

/**
 * Khối thông tin thực dụng: khi nào, ở đâu, đi lối nào, cần lưu ý gì.
 *
 * Bố cục lệch hẳn hai bên. Cột trái dính lại và chỉ trả lời "bao giờ": ngày
 * cỡ lớn kèm đồng hồ đếm ngược. Cột phải cuộn qua với mọi thứ còn lại, và
 * đọc theo đúng thứ tự một người sắp đi: biết gì (bảng) → nhớ gì (lời dặn)
 * → làm gì (hai nhóm nút).
 *
 * Đồng hồ nằm ở đây chứ không ở màn thiệp là có lý do: nó chỉ có nghĩa khi
 * đứng cạnh cái ngày mà nó đang đếm tới, còn nhét vào màn thiệp thì thành
 * khối chữ thứ năm và làm vỡ màn đó.
 *
 * Tiêu đề khối cố tình gọi thẳng tên hai thứ nó chứa chứ không phải một
 * dòng chữ đẹp. Chỗ này là chỗ người ta đang tìm thông tin để đi, không
 * phải chỗ để đọc văn — mọi dòng không nói được địa điểm hay thời gian đều
 * đang đứng chắn giữa câu hỏi và câu trả lời.
 */
export function EventDetails() {
  // Ngày cỡ lớn cắt ra từ chính startISO. Trước đây chuỗi "27.09" được gõ
  // thẳng vào đây — đổi ngày trong data/event.ts thì mọi chỗ khác đổi theo,
  // riêng con số to nhất khối này vẫn đứng nguyên ở ngày cũ.
  const [day, month] = formatShortDate(event.startISO).split(".");
  const year = new Date(event.startISO).getFullYear();

  const rows: { label: string; value: ReactNode }[] = [
    { label: "Ngày", value: formatFullDate(event.startISO) },
    // Gạch nối dùng dấu – (en dash) chứ không phải dấu trừ: đây là một
    // khoảng từ… đến…, và đó đúng là việc của dấu này.
    // "Khoảng": giờ bắt đầu là ước tính lễ tan, không phải giờ ấn định.
    // Ghi trần một con số thì ai đến đúng 09:30 mà chưa thấy ai sẽ tưởng
    // mình nhầm chỗ.
    {
      label: "Giờ",
      value: `Khoảng ${formatTime(event.startISO)} – ${formatTime(event.endISO)}`,
    },
    // "Điểm hẹn" chứ không phải "Nơi tổ chức": C1 là chỗ gặp nhau, còn lễ
    // thì diễn ra trong hội trường toà C2.
    { label: "Điểm hẹn", value: event.venue.name },
    { label: "Địa chỉ", value: event.venue.address },
    // Số điện thoại đứng ngay dưới địa chỉ chứ không chỉ nằm ở chân trang.
    // Nhiều khách dừng lại đúng ở khối này: họ mở web ra để tìm đường, và
    // lúc cần gọi là lúc đã đứng trước cổng, không phải lúc đang cuộn xuống
    // đọc lời cảm ơn. Bắt người đang lạc đi tìm số là bắt sai người vào
    // đúng lúc họ không còn kiên nhẫn để tìm.
    {
      label: "Liên hệ",
      value: (
        <a
          href={`tel:${event.contact.phoneE164}`}
          className="tabular underline decoration-line underline-offset-4 transition-colors hover:text-flame hover:decoration-flame/40"
        >
          {event.contact.phone}
        </a>
      ),
    },
  ];

  // Hai đích đến, không phải một. Khách đi xe máy hay ô tô đều phải giải
  // xong bài toán gửi xe TRƯỚC khi tới được cửa hội trường, nên chỗ gửi xe
  // đứng ngang hàng với điểm đến chứ không nấp trong một dòng ghi chú.
  const wayIn: ActionCard[] = [
    {
      href: directionsUrl(venue),
      label: "Đường tới toà C1",
      hint: "Chỗ mọi người hay chụp ảnh",
      external: true,
    },
    {
      href: event.parking.shortLink,
      label: event.parking.name,
      hint: event.parking.hint,
      external: true,
    },
  ];

  return (
    <section
      id="chi-tiet"
      className="relative scroll-mt-20 border-t border-line px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-24">
        {/* ── Cột trái: bao giờ ──────────────────────────────── */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading title="Địa điểm và thời gian" size="lg" />

          <InView>
            {/* Ngày và tháng dính liền thành một khối số, năm tụt xuống dòng
                dưới cỡ nhỏ. Năm 2026 là phần ai cũng đoán được, cho nó cùng
                cỡ với ngày thì nó ăn mất chỗ của phần không đoán được. */}
            <p
              className="fade tabular mt-9 font-display text-6xl leading-none font-normal text-bone sm:text-7xl"
              style={{ "--d": "220ms" } as CSSProperties}
            >
              {day}.{month}
            </p>
            <p
              className="fade tabular mt-2 text-sm tracking-[0.24em] text-faint uppercase"
              style={{ "--d": "300ms" } as CSSProperties}
            >
              {year}
            </p>

            <div
              className="fade mt-10 border-t border-line pt-8"
              style={{ "--d": "400ms" } as CSSProperties}
            >
              <Countdown startISO={event.startISO} endISO={event.endISO} />
            </div>
          </InView>
        </div>

        {/* ── Cột phải: mọi thứ còn lại ──────────────────────── */}
        <div>
          <InView>
            {/* Chỉ có đường kẻ GIỮA các dòng, không viền trên cũng không viền
                dưới. Gạch cả bốn phía mỗi dòng thì bảng trông như bảng tính,
                và mắt đếm đường kẻ nhiều hơn đọc chữ. */}
            <dl className="divide-y divide-line">
              {rows.map((row, index) => (
                <div
                  key={row.label}
                  className="fade grid gap-1.5 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6"
                  style={{ "--d": `${index * 90}ms` } as CSSProperties}
                >
                  <dt className="text-[0.7rem] tracking-[0.16em] text-faint uppercase sm:pt-1">
                    {row.label}
                  </dt>
                  <dd className="text-[0.95rem] leading-relaxed text-bone sm:text-base">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Lời dặn xếp một cột chứ không hai. Đây là chữ để đọc theo
                dòng, không phải thẻ để quét bằng mắt — chia đôi thì dòng
                ngắn lại còn dăm chữ và mắt phải nhảy qua nhảy lại. */}
            {event.notes.length > 0 && (
              <ul className="mt-8 grid gap-3">
                {event.notes.map((note, index) => (
                  <li
                    key={note}
                    className="fade rounded-xs border-l border-seal/60 bg-night/70 py-3 pr-4 pl-4 text-[0.88rem] leading-relaxed text-ash"
                    style={{ "--d": `${420 + index * 90}ms` } as CSSProperties}
                  >
                    {note}
                  </li>
                ))}
              </ul>
            )}
          </InView>

          <InView className="mt-14">
            <ActionCards title="Đường đi và chỗ gửi xe" items={wayIn} />
          </InView>

          <InView className="mt-10">
            <AddToCalendar />
          </InView>

          {/* Câu mời đứng sau cùng, khi khách đã có đủ giờ, chỗ và nút để
              đi. Đặt trước bảng thì nó chắn giữa câu hỏi và câu trả lời;
              đặt sau thì nó là lời chào lúc tiễn, đúng chỗ của một câu mời. */}
          <InView className="mt-14 border-t border-line pt-8">
            <p className="fade font-display text-lg leading-[1.45] text-pretty text-bone italic sm:text-xl">
              {event.inviteNote}
            </p>
          </InView>
        </div>
      </div>
    </section>
  );
}

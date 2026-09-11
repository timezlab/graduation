import Image from "next/image";
import type { CSSProperties } from "react";
import { c1Square } from "@/data/campus";
import { event } from "@/data/event";
import { directionsUrl, embedMapUrl } from "@/lib/geo";
import { InView } from "./InView";
import { Magnetic } from "./Magnetic";
import { SectionHeading } from "./SectionHeading";

const venue = { lat: event.venue.lat, lng: event.venue.lng };

/**
 * Ba chặng từ ngoài đường vào tới điểm hẹn. Không ghi số phút đi bộ: chưa
 * ai đo, mà một con số bịa thì tệ hơn không có số.
 */
const wayIn = [
  { title: "Cổng Đại Cồ Việt", hint: "Rẽ vào từ đường Đại Cồ Việt, ngay số 1." },
  { title: event.parking.name, hint: "Gửi xe ở đây rồi đi bộ." },
  { title: "Quảng trường C1", hint: "Chỗ có chữ BK và trái tim đỏ." },
];

/**
 * Bản đồ và đường tới nơi.
 *
 * Bản đồ nằm trong khung, ngang với lưới nội dung, và có ba thứ đè lên nó,
 * mỗi thứ một việc:
 *
 *   vòng ngắm đỏ    đúng giữa bản đồ, nơi Google cắm ghim: trả lời "ở đâu"
 *   tấm ảnh         góc trên phải, thò ra ngoài khung như một tấm ảnh in
 *                   đặt lên tờ bản đồ: trả lời "tới nơi thì nhận ra bằng gì"
 *   dải địa chỉ     vắt ngang mép dưới, ba ngăn như một tấm vé: địa chỉ,
 *                   lối vào, và hai nút bấm để đi
 *
 * Đây là khối duy nhất trên trang dùng lối xếp chồng ấy, cố ý để không lặp
 * lại kiểu chia đôi trái phải của khối giờ giấc ngay trên nó.
 *
 * Bản đồ từng trải hết chiều ngang màn hình. Bỏ vì hai lẽ: lớp bản đồ của
 * Google không có mép, nên tràn tới hai cạnh màn hình thì trông như một
 * mảng xám lỗi chứ không như một tấm bản đồ; và mọi khối khác trên trang
 * đều bó trong lưới 80rem, riêng nó phá khung thì nó thành ngoại lệ mà
 * không ai hiểu vì sao.
 *
 * Bản đồ nhúng dùng dạng URL không cần API key, nên không có hạn mức để hết
 * và không có hoá đơn nào phát sinh sau ngày lễ. Phần dẫn đường từng chặng
 * thì đẩy sang ứng dụng Google Maps, nó làm việc đó tốt hơn bất cứ thứ gì
 * nhúng trong trang.
 */
export function VenueMap() {
  return (
    <section id="ban-do" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          title="Tìm đến toà C1"
          lead="Kéo bản đồ để xem quanh đó, hoặc mở thẳng ứng dụng chỉ đường trên điện thoại."
          align="center"
        />

        <InView className="relative mt-16 sm:mt-24">
          <div className="fade relative">
            {/* ── Bản đồ ────────────────────────────────────────
                Bản đồ của Google là mảng sáng duy nhất trên cả trang tối.
                Bộ lọc đảo sáng và rút gần hết màu, để cả tấm bản đồ thành
                nền xám mà vòng ngắm đỏ là thứ có màu duy nhất trên đó.

                Lớp phủ tối `pointer-events-none`: thiếu nó thì lớp phủ nuốt
                hết thao tác kéo và phóng to, và bản đồ thành một tấm ảnh
                chết. */}
            <div className="relative overflow-hidden border border-line bg-night">
              <iframe
                title={`Bản đồ đường tới ${event.venue.name}`}
                src={embedMapUrl(venue)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block h-96 w-full border-0 sm:h-128 lg:h-152"
                style={{
                  filter:
                    "invert(0.92) hue-rotate(180deg) saturate(0.18) brightness(0.88) contrast(1.06)",
                }}
              />

              {/* Tối dần về mép dưới, nơi dải địa chỉ sẽ đè lên; một chút
                  ở mép trên để tấm ảnh không dính vào đường viền. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,8,12,0.8), rgba(7,8,12,0.3) 30%, transparent 52%), linear-gradient(to bottom, rgba(7,8,12,0.45), transparent 20%)",
                }}
              />

              {/* Vòng ngắm. Bản đồ nhúng dạng `q=lat,lng` luôn đặt ghim
                  đúng giữa khung, nên căn 50%/50% là trùng với ghim của
                  Google mà không phải tính toạ độ gì. Vòng trong đứng yên,
                  hai vòng ngoài thay nhau loang ra rồi tan. */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <span className="ping absolute inset-0 -m-6 rounded-full border border-seal" />
                <span className="ping absolute inset-0 -m-6 rounded-full border border-seal [animation-delay:1.3s]" />
                <span className="block h-11 w-11 rounded-full border border-flame/80 bg-seal/10" />
                <span className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame" />
              </div>
            </div>

            {/* ── Tấm ảnh quảng trường ───────────────────────────
                Đè lên góc trên phải, thò ra ngoài khung bản đồ ở cả hai
                mép như một tấm ảnh in đặt lên tờ bản đồ. Góc trên phải là
                phần ít có ích nhất của bản đồ (mấy con phố phía bắc hồ),
                nên ảnh che vào đó không mất thông tin nào.

                Trên điện thoại ảnh nhỏ lại chứ không ẩn đi: đây chính là
                lúc người ta cần nó nhất, khi đang đứng trong sân và tìm
                xem chỗ hẹn là chỗ nào. */}
            <figure
              className="fade absolute -top-5 -right-2 z-10 w-38 sm:-top-9 sm:-right-5 sm:w-56 lg:-top-12 lg:-right-8 lg:w-84"
              style={{ "--d": "180ms" } as CSSProperties}
            >
              <div className="plate border border-line bg-night p-1.5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] sm:p-2">
                <div className="overflow-hidden">
                  <Image
                    src={c1Square.src}
                    alt={c1Square.alt}
                    width={c1Square.width}
                    height={c1Square.height}
                    sizes="(min-width: 1024px) 21rem, (min-width: 640px) 14rem, 9.5rem"
                    className="block aspect-3/2 w-full object-cover"
                  />
                </div>
                <figcaption className="px-1.5 pt-2.5 pb-1 text-[0.7rem] leading-snug text-ash sm:px-2 sm:pt-3 sm:text-[0.8rem]">
                  Điểm hẹn: trước cửa C1, chỗ có chữ BK.
                </figcaption>
              </div>
            </figure>

            {/* ── Dải địa chỉ ────────────────────────────────────
                Ba ngăn ngang hàng, vắt qua mép dưới của bản đồ và thụt vào
                hai bên để còn thấy mép bản đồ ló ra. Trên màn hẹp thì xếp
                dọc và nằm hẳn dưới bản đồ, vì đè lên thì che mất đúng cái
                vòng ngắm mà người ta đang muốn nhìn. */}
            <div
              className="fade relative z-10 -mt-px grid divide-y divide-line border border-line bg-night/95 backdrop-blur-sm lg:mx-12 lg:-mt-24 lg:grid-cols-[1.15fr_1fr_1fr] lg:divide-x lg:divide-y-0"
              style={{ "--d": "260ms" } as CSSProperties}
            >
              {/* Ngăn 1: ở đâu */}
              <div className="p-7 sm:p-9">
                <p className="font-display text-2xl leading-snug text-bone sm:text-[1.75rem]">
                  {event.venue.name}
                </p>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ash">{event.venue.address}</p>
                <a
                  href={event.venue.shortLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-flame underline decoration-flame/30 underline-offset-4 transition-colors hover:decoration-flame"
                >
                  Mở trong Google Maps
                  <span aria-hidden>↗</span>
                </a>
              </div>

              {/* Ngăn 2: vào lối nào. Số thứ tự bằng chữ serif, để ba chặng
                  đọc như ba dòng trên một tấm vé chứ không phải danh sách. */}
              <div className="p-7 sm:p-9">
                <p className="text-[0.7rem] tracking-[0.18em] text-faint uppercase">Lối vào</p>
                <ol className="mt-5 grid gap-4">
                  {wayIn.map((step, index) => (
                    <li key={step.title} className="grid grid-cols-[1.6rem_1fr] gap-x-3">
                      <span className="tabular font-display text-xl leading-none text-flame">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-[0.95rem] text-bone">{step.title}</p>
                        <p className="mt-1 text-[0.84rem] leading-relaxed text-ash">{step.hint}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Ngăn 3: đi thôi. Hai đích, hai nút: chỉ đường tới C1 là
                  việc chính nên là nút đỏ duy nhất của khối; bãi xe là đích
                  phụ, nút viền. Cùng bộ đôi với khối chi tiết ở trên. */}
              <div className="flex flex-col justify-between gap-6 p-7 sm:p-9">
                <p className="text-[0.84rem] leading-relaxed text-ash">
                  Mở bằng Google Maps trên điện thoại, dẫn từng chặng tới nơi.
                </p>
                <div className="grid gap-3">
                  <Magnetic className="w-full">
                    <a
                      href={directionsUrl(venue)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sheen press inline-flex w-full items-center justify-center gap-2.5 rounded-xs bg-seal px-6 py-3.5 text-sm font-medium text-onseal"
                    >
                      Chỉ đường tới C1
                      <span aria-hidden>→</span>
                    </a>
                  </Magnetic>
                  <a
                    href={event.parking.shortLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press inline-flex w-full items-center justify-center rounded-xs border border-bone/25 px-6 py-3.5 text-sm font-medium text-bone hover:border-bone/55 hover:bg-bone/5"
                  >
                    Chỉ đường tới {event.parking.name}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}

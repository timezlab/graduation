"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { marks } from "@/data/campus";
import { event } from "@/data/event";
import { formatShortDate, formatTime, formatWeekday } from "@/lib/datetime";
import { directionsUrl } from "@/lib/geo";
import { Magnetic } from "./Magnetic";

/**
 * ═══════════════════════════════════════════════════════════════
 *  TRANG CHÍNH — phần chữ
 *
 *  Đây là nội dung của tấm thiệp sau khi nó đã nở ra kín màn hình.
 *  Ảnh nền thư viện và hai lớp phủ không nằm ở đây mà nằm trong khung
 *  morph của components/Envelope.tsx: chúng phải bị ô cắt clip-path
 *  xén cùng một nhịp với mặt giấy, nếu tách ra thì lúc khung mở dần,
 *  ảnh sẽ hiện tràn ra ngoài mép tấm thiệp.
 *
 *  Chữ dồn về trái chứ không căn giữa. Ảnh có trọng lượng thị giác
 *  dồn về phía phải và phía trên (khối nhà, cái mái cong), nên đặt
 *  khối chữ ở góc trái dưới thì hai bên cân nhau mà không phải cắt
 *  xén ảnh.
 *
 *  ─── Năm khối, đọc từ trên xuống ─────────────────────────────
 *    1. giấy tiêu đề — chữ HUST + ngày tháng, trên cùng một dòng
 *    2. tên buổi lễ  — cỡ nhỏ, chỉ để dẫn vào
 *    3. TÊN NGƯỜI    — chữ to nhất trên màn hình
 *    4. ngành + trường, rồi lời mời có giờ và địa điểm
 *    5. hai nút
 *
 *  Không có khối thứ sáu. Đồng hồ đếm ngược nằm ở khối Chi tiết bên
 *  dưới — nhồi thêm nó vào đây thì không còn đọc được cái nào.
 *
 *  Mỗi mẩu thông tin chỉ được xuất hiện MỘT lần trong năm khối này.
 *  Ngày tháng ở khối 1 thì lời mời ở khối 4 không nhắc lại, tên buổi
 *  lễ ở khối 2 thì lời mời cũng không. Thêm gì vào đây thì kiểm lại
 *  điều đó trước.
 *
 *  ─── Vì sao mọi thứ ở đây neo vào một motion value ───────────
 *  Cả khối này hiện ra theo VỊ TRÍ CUỘN chứ không theo đồng hồ. Nó là
 *  đoạn cuối của một cảnh liên tục bắt đầu từ chiếc phong bì đóng kín;
 *  cho nó chạy theo giờ riêng thì đẩy ngược lên một chút là chữ vẫn
 *  hiện, trong khi tấm thiệp đang thu nhỏ lại — hai thứ đi hai đường.
 * ═══════════════════════════════════════════════════════════════
 */

/** Một nhịp hiện ra: mờ dần lên kèm nhích lên vài pixel. */
function useBeat(reveal: MotionValue<number>, from: number, to: number) {
  const opacity = useTransform(reveal, [from, to], [0, 1]);
  const y = useTransform(reveal, [from, to], [20, 0]);
  return { opacity, y };
}

/** Một dòng chữ kéo lên từ sau mép giấy, trong ô cắt cụt .curtain. */
function useCurtain(reveal: MotionValue<number>, from: number, to: number) {
  const opacity = useTransform(reveal, [from, to], [0, 1]);
  const y = useTransform(reveal, [from, to], ["112%", "0%"]);
  return { opacity, y };
}

export function HeroPanel({ reveal }: { reveal: MotionValue<number> }) {
  const weekday = formatWeekday(event.startISO);
  const date = formatShortDate(event.startISO);

  const stamp = useBeat(reveal, 0, 0.2);
  const title = useCurtain(reveal, 0.05, 0.42);
  const host = useCurtain(reveal, 0.13, 0.5);
  // Bỏ dòng ngành học đi thì nhịp mở phải khép lại theo, không thì còn
  // nguyên một khoảng lặng ở chỗ dòng chữ vừa biến mất. Hai beat cuối dồn
  // lên đúng khoảng trống ấy, giữ nguyên quãng cách giữa các nhịp.
  const intro = useBeat(reveal, 0.28, 0.6);
  const actions = useBeat(reveal, 0.42, 0.78);

  // Vạch đỏ tự kéo dài, cùng một cử chỉ với .rule ở các khối bên dưới
  // nhưng lấy nhịp từ vị trí cuộn thay vì từ IntersectionObserver.
  const ruleScale = useTransform(reveal, [0, 0.22], [0, 1]);

  return (
    <div className="envelope-hero absolute inset-0 flex flex-col justify-end">
      <div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-16 sm:px-10 sm:pb-20">
        <div className="max-w-2xl">
          {/* Dòng giấy tiêu đề: dấu hiệu của trường đứng TRƯỚC ngày tháng,
              đúng thứ tự của một tấm thiệp in — ai mời, rồi mới đến khi
              nào.

              Trước đây chữ HUST nằm tận dưới cùng, sau cả hai cái nút. Ở
              đó nó vừa là thứ đọc sau cùng, vừa không dính vào cái gì:
              một hình lẻ treo dưới đáy khối chữ. Đưa lên đầu thì nó có
              việc để làm, và khối chữ được kết thúc bằng hai cái nút —
              tức là bằng một lời rủ, đúng chỗ nên dừng của một tấm thiệp.

              Vạch đỏ không tách logo với ngày tháng; nó vẫn thuộc về
              riêng dòng ngày tháng như cũ. Chỗ tách hai thứ là khoảng
              trống gap-x-3, không cần thêm một nét kẻ nào nữa. Khoảng ấy
              chỉ cần đủ để mắt đọc ra hai cụm, không cần rộng tới mức
              hai cụm rời nhau thành hai món đồ. */}
          <motion.div
            style={stamp}
            className="flex flex-wrap items-center gap-x-3 gap-y-3"
          >
            <Image
              src={marks.hustWordmark.src}
              alt={marks.hustWordmark.alt}
              width={200}
              height={40}
              className="h-[0.95rem] w-auto sm:h-[1.15rem]"
            />

            <span className="flex items-center gap-3">
              <motion.span
                aria-hidden
                style={{ scaleX: ruleScale }}
                className="h-px w-5 shrink-0 origin-left bg-seal sm:w-7"
              />
              <p className="tabular text-[0.66rem] tracking-[0.24em] text-bone/85 uppercase sm:text-[0.72rem]">
                {weekday} · {date}
              </p>
            </span>
          </motion.div>

          {/* Tên người to hơn tên buổi lễ, không phải ngược lại.
              "Lễ tốt nghiệp" là dòng chữ có trên thiệp tốt nghiệp của tất
              cả mọi người; "Lê Xuân Đại" là thứ duy nhất ở đây chỉ thuộc
              về một người. Cái nào riêng hơn thì to hơn.

              Đổi lại, tên buổi lễ tụt xuống cỡ một dòng dẫn. Nó vẫn phải
              đứng trước, vì người đọc cần biết đây là chuyện gì trước khi
              biết đây là chuyện của ai. */}
          <h1 className="mt-9">
            <span className="curtain font-display text-[1.55rem] leading-[1.15] font-normal text-bone/90 sm:text-[2rem] lg:text-[2.4rem]">
              <motion.span style={title} className="block">
                {event.eventTitle}
              </motion.span>
            </span>
            <span className="curtain mt-1.5 font-display text-[2.75rem] leading-[1.04] font-medium text-flame sm:text-6xl lg:text-7xl">
              <motion.span style={host} className="block">
                {event.hostName}
              </motion.span>
            </span>
          </h1>

          {/* Lời mời chỉ nói phần chưa ai nói: giờ và địa điểm.
              Bản cũ là "…đến chung vui trong lễ tốt nghiệp, 09:30 ngày
              27.09.2026, tại Toà C1" — trong đó "lễ tốt nghiệp" đã là
              dòng chữ ngay phía trên, còn "27.09.2026" đã nằm ở dòng giấy
              tiêu đề. Ba dòng liền nhau nhắc lại nhau hai lần thì đoạn
              văn thành bản tóm tắt của chính nó. */}
          <motion.p
            style={intro}
            className="mt-7 max-w-lg text-[0.95rem] leading-relaxed text-pretty text-ash sm:text-base"
          >
            {event.invitationLine}. Hẹn gặp từ khoảng {formatTime(event.startISO)} sáng tại{" "}
            {event.venue.name}.
          </motion.p>

          <motion.div
            style={actions}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#chi-tiet"
                className="sheen press inline-flex items-center gap-2.5 rounded-xs bg-seal px-6 py-3 text-sm font-medium text-onseal"
              >
                Lưu vào lịch
                <span aria-hidden>↓</span>
              </a>
            </Magnetic>

            <a
              href={directionsUrl({
                lat: event.venue.lat,
                lng: event.venue.lng,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex items-center gap-2.5 rounded-xs border border-bone/25 px-6 py-3 text-sm font-medium text-bone hover:border-bone/55 hover:bg-bone/5"
            >
              Chỉ đường
              <span aria-hidden>→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

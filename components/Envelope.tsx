"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { heroPhoto, marks } from "@/data/campus";
import { event } from "@/data/event";
import { formatShortDate, formatWeekday } from "@/lib/datetime";
import { HeroPanel } from "./HeroPanel";
import { ScrollCue } from "./ScrollCue";

/**
 * ═══════════════════════════════════════════════════════════════
 *  MÀN MỞ THƯ — VÀ TRANG CHÍNH
 *
 *  Trang mở ra bằng một chiếc phong bì đóng kín có con dấu sáp dập chữ
 *  HUST. Cuộn xuống thì sáp vỡ, nắp thư lật ngược lên, thân bì tụt
 *  xuống khỏi tấm thiệp, rồi mặt giấy của tấm thiệp tan ra để lộ ảnh
 *  Thư viện Tạ Quang Bửu bên dưới — và chính khung tấm thiệp ấy nở ra
 *  thành trang chính.
 *
 *  Không có cú cắt cảnh nào ở giữa. Trang chính KHÔNG phải một khối
 *  riêng nằm dưới khối này; nó nằm bên trong khung thiệp ngay từ đầu,
 *  chỉ bị ô cắt giữ lại trong kích thước một tấm thiệp. Đây là lý do
 *  components/Hero.tsx không còn tồn tại: có hai bản của cùng một màn
 *  thì lúc chuyển giao mắt sẽ thấy nội dung lặp lại một lần.
 *
 *  Toàn bộ diễn biến neo vào VỊ TRÍ CUỘN chứ không chạy theo đồng hồ.
 *  Người dùng đẩy tới đâu thì nắp thư mở tới đó, đẩy ngược lên thì nó
 *  đóng lại. Đây là khác biệt giữa "một hoạt cảnh phát khi cuộn tới"
 *  và "một vật thể mình đang cầm".
 *
 *  ─── Cách xếp lớp trên sân khấu ─────────────────────────────
 *      z-0   thân sau phong bì + bóng tiếp đất
 *      z-10  KHUNG MORPH: ảnh nền, mặt giấy thiệp, chữ trang chính
 *      z-20  thân trước phong bì, có ba nếp gấp tĩnh
 *      z-30  NẮP THƯ (tụt xuống dưới z-10 từ mốc 0.38)
 *      z-40  con dấu sáp
 *      z-50  dòng "chưa mở" ở trên, chỉ dẫn cuộn ở dưới
 *
 *  ─── Ba chỗ dễ sai nhất ─────────────────────────────────────
 *  1. Mặt trong nắp thư phải lật bằng rotateY(180deg), KHÔNG PHẢI
 *     rotateX. Cả hai đều cho ra một mặt sau đúng nghĩa, nhưng rotateX
 *     lật quanh tâm chính nó nên nó lộn ngược hình tam giác đã cắt
 *     trong hệ toạ độ cục bộ; bản lề ở mép trên lật thêm một lần nữa,
 *     và kết quả là mở xong thì mũi nhọn vẫn CHÚC XUỐNG thay vì CHỔNG
 *     LÊN. rotateY chỉ soi gương trái–phải, mà tam giác thì đối xứng
 *     trái–phải nên không ai thấy, đồng thời vẫn đảo được mặt để
 *     backface-visibility làm đúng việc của nó.
 *
 *  2. Khi nắp đã lật quá 90° thì nó chiếm chỗ ở PHÍA TRÊN mép phong
 *     bì, đúng vào vùng mà khung thiệp sắp nở ra. Để z-index của nắp
 *     cao hơn khung thì trang chính mở ra sau lưng cái nắp. Nên ở mốc
 *     0.38, lúc nắp đã lật gần hết và chưa có gì chồng lên nó, z-index
 *     của nắp bị hạ xuống dưới khung. Cú đổi ấy rơi vào khung hình mà
 *     không vật thể nào giao nhau nên mắt không bắt được.
 *
 *  3. Tấm thiệp nhô lên rồi PHẢI hạ về đúng 0 trước lúc morph. Ô cắt
 *     nở ra từ chính vị trí tấm thiệp đang đứng; còn lệch một chút thì
 *     cả trang chính nở ra lệch tâm rồi nhảy về giữa ở khung hình cuối.
 * ═══════════════════════════════════════════════════════════════
 */

/* ── Hình học phong bì, tính theo phần trăm chiều cao thân bì ─────
   Bốn con số này ràng buộc nhau, không đổi riêng lẻ được:

     WINDOW < FLAP    nắp thư phải sâu hơn miệng bì thì lúc đóng nó
                      mới che kín. Bằng nhau thì hai mép trùng nhau và
                      khử răng cưa để lọt một sợi sáng chạy dọc.
     WINDOW < BOTTOM  mũi cánh đáy phải nằm DƯỚI mũi miệng bì, không
                      thì nó chọc vào ô cửa và che mất tấm thiệp.
     BOTTOM < SIDE    cánh đáy gấp SAU CÙNG nên nó phải với cao hơn
                      chỗ hai cánh hông gặp nhau — xem ngay dưới đây.

   ─── Vì sao mũi cánh đáy cao hơn chỗ hai cánh hông gặp nhau ─────
   Đây không phải chuyện thẩm mỹ mà là điều kiện để thứ tự gấp còn
   đúng. Mép cánh đáy và mép dưới cánh hông cùng xuất phát từ góc
   (0,100%); cái nào DỐC HƠN thì cái ấy nằm trên. Cánh đáy dốc
   -1%/% còn cánh hông -0.9%/%, nên cánh đáy luôn phủ kín cánh hông.
   Cho hai mũi trùng nhau ở 55% thì hai mép chồng khít lên nhau và
   cả bốn nếp gấp quy về đúng MỘT điểm giữa mặt bì — thành ra hình
   chiếc phong bì trong bộ emoji, thứ mắt đọc ra biểu tượng trước
   khi kịp đọc ra vật thể.

   Lệch 5% là đủ. Mũi cánh đáy nhô lên khỏi chỗ giao của hai cánh
   hông, che nốt hai cánh tay dưới của chúng, và hai cánh tay trên
   thì chui xuống dưới mép cánh đáy ở 47.4% chứ không chạy tới tâm.
   Bốn đường gấp giờ có ba chỗ gặp nhau chứ không phải một. */
const WINDOW_APEX = 44;
const FLAP_APEX = 48;
const SIDE_MEET = 55;
const BOTTOM_APEX = 50;

/* Cánh hông KHÔNG đối xứng trên–dưới: mép trên bắt đầu ở 10%, mép dưới
   chạy thẳng xuống góc 100%.

   Chỗ 10% ấy là để tách hẳn cánh hông khỏi mép nắp thư. Cho nó xuất
   phát sát góc thì hai đường gần như song song chạy cạnh nhau, và mặt
   bì có bốn tia cùng toả ra từ bốn góc.

   Còn chỗ 100% thì bắt buộc, không phải chọn cho đẹp: mép dưới cánh
   hông phải nằm TRỌN dưới cánh đáy. Cho nó dừng ở 88% thì gần hai góc
   dưới nó thò ra khỏi cánh đáy, và ta được thêm hai đoạn gấp cụt lủng
   chẳng đi tới đâu. */
const SIDE_TOP = 10;

/* Khung dập chìm — xem .env-frame trong globals.css.
   Toạ độ trong hệ viewBox 150×100, tức là đúng tỉ lệ 1.5 của thân bì.

   Bốn số này KHÔNG phải "thụt vào 3% mỗi bên": một đường viền thụt đều
   thì mọi cạnh phải cách cạnh gốc đúng 3 đơn vị theo phương PHÁP TUYẾN
   của nó, và ở hai cạnh chéo của miệng bì thì phương ấy không phải
   phương dọc. Trừ thẳng 3 vào toạ độ y sẽ cho một đường viền hở dần ra
   ở chỗ dốc — sai đúng theo hệ số 1/sin(góc).

   Cạnh chéo trái đi qua gốc theo hướng (75,44), pháp tuyến hướng vào
   trong là (-44,75)/87. Dời cạnh ấy 3 đơn vị rồi cắt với x=3 ra y=5.2;
   hai cạnh chéo đã dời cắt nhau ở x=75 ra y=47.5 — mũi khung nằm thấp
   hơn mũi miệng bì 3.5 đơn vị chứ không phải 3, đúng như một góc nhọn
   khi bị vát vào. */
const FRAME = "3,5.2 75,47.5 147,5.2 147,97 3,97";

const POCKET = `polygon(0 0, 50% ${WINDOW_APEX}%, 100% 0, 100% 100%, 0 100%)`;
const FLAP = "polygon(0 0, 100% 0, 50% 100%)";
const FOLD_LEFT = `polygon(0 ${SIDE_TOP}%, 50% ${SIDE_MEET}%, 0 100%)`;
const FOLD_RIGHT = `polygon(100% ${SIDE_TOP}%, 50% ${SIDE_MEET}%, 100% 100%)`;
const FOLD_BOTTOM = `polygon(0 100%, 50% ${BOTTOM_APEX}%, 100% 100%)`;

export function Envelope() {
  const ref = useRef<HTMLDivElement>(null);

  // "start start" tới "end end": tiến độ bằng 0 đúng lúc khối bắt đầu dính
  // vào đỉnh màn hình và bằng 1 khi khối cuộn hết. Nhờ vậy toàn bộ hoạt
  // cảnh trùng khít với quãng mà sân khấu đang đứng yên.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 44,
    mass: 0.35,
  });

  // Chỉ dẫn tắt ngay khi nắp thư nhúc nhích, tức là ngay khi người dùng
  // đã hiểu. Để nó ở lại lâu hơn thì nó thành lời nhắc thừa.
  const cueOpacity = useTransform(p, [0, 0.05], [1, 0]);

  // Dòng "chưa mở" nán lại lâu hơn chỉ dẫn cuộn nửa nhịp — xem chỗ
  // khai báo nó ở cuối sân khấu.
  const noteOpacity = useTransform(p, [0, 0.08], [1, 0]);

  // Sáp phải đứt TRƯỚC khi nắp mở, không phải ngược lại.
  const sealScale = useTransform(p, [0.05, 0.2], [1, 0.52]);
  const sealOpacity = useTransform(p, [0.05, 0.2], [1, 0]);
  const sealRotate = useTransform(p, [0.05, 0.2], [0, -16]);

  // Nắp thư lật 174° chứ không phải 180°: dừng đúng 180° thì nó nằm
  // phẳng trùng mặt phẳng màn hình, mất hẳn chiều sâu và trông như bị xoá.
  const flapRotate = useTransform(p, [0.07, 0.44], [0, -174]);
  const flapZ = useTransform(p, (v) => (v > 0.38 ? 5 : 30));

  // Thân bì tụt xuống khỏi tấm thiệp, hơi nghiêng, rồi mờ hẳn. Nghiêng
  // 5° là đủ để nó rơi như một vật có trọng lượng chứ không như một lớp
  // ảnh bị kéo xuống.
  //
  // Nó phải tan HẾT ở mốc 0.72, tức là trước khi mặt giấy bắt đầu tan ở
  // 0.74. Cho hai quãng chồng lên nhau thì đúng vào nhịp tấm thiệp mở ra
  // thành ô cửa sổ nhìn ra thư viện — nhịp quan trọng nhất của cả cảnh —
  // vẫn còn một bóng phong bì mờ mờ nằm chắn phía sau.
  const shellY = useTransform(p, [0.44, 0.8], ["0%", "82%"]);
  const shellRotate = useTransform(p, [0.44, 0.8], [0, 5]);
  const shellOpacity = useTransform(p, [0.52, 0.72], [1, 0]);

  // Tấm thiệp nhô lên khi thân bì bắt đầu tụt, rồi hạ về đúng tâm sân
  // khấu trước lúc morph (xem chỗ dễ sai số 3 ở đầu tệp).
  const drift = useTransform(p, [0.4, 0.58, 0.74], [0, -0.07, 0]);
  const cardY = useTransform(drift, (d) => `${(d * 100).toFixed(3)}%`);

  // ── Morph ────────────────────────────────────────────────────
  // Mặt giấy tan TRƯỚC khi khung nở. Nhờ thứ tự ấy có một nhịp ngắn mà
  // tấm thiệp đã thành một ô cửa sổ nhìn ra thư viện nhưng vẫn còn nguyên
  // kích thước một tấm thiệp — chính nhịp ấy làm mắt hiểu rằng thứ sắp
  // nở ra là tấm thiệp, chứ không phải một màn hình khác thay chỗ nó.
  const paperOpacity = useTransform(p, [0.74, 0.85], [1, 0]);
  const open = useTransform(p, [0.78, 0.95], [0, 1]);
  const photoScale = useTransform(p, [0.74, 1], [1.16, 1]);
  const heroReveal = useTransform(p, [0.84, 0.99], [0, 1]);

  /**
   * Ô cắt của khung morph.
   *
   * Viết bằng calc() với --card-w/--card-h chứ không đo phần tử bằng
   * JavaScript. Đo thì phải nghe ResizeObserver, phải chạy lại sau mỗi
   * lần đổi cỡ màn hình, và luôn trễ đúng một khung hình so với bố cục
   * thật. Còn calc() thì trình duyệt tự tính lại, và ô cắt khớp với
   * khung tấm thiệp ở mọi bề ngang vì cả hai đọc chung một biến.
   *
   * `50%` trong inset() tự phân giải theo chiều tương ứng: hai giá trị
   * trên/dưới theo chiều cao, hai giá trị trái/phải theo chiều rộng.
   */
  const clipPath = useTransform([open, drift], (latest: number[]) => {
    const t = latest[0] ?? 0;
    const d = latest[1] ?? 0;
    const k = (1 - t).toFixed(4);
    const shift = `var(--card-h) * ${(d * (1 - t)).toFixed(4)}`;
    const vy = `${k} * (50% - var(--card-h) / 2)`;
    const vx = `${k} * (50% - var(--card-w) / 2)`;

    return `inset(calc(${vy} + ${shift}) calc(${vx}) calc(${vy} - ${shift}) calc(${vx}) round calc(${k} * 2px))`;
  });

  const weekday = formatWeekday(event.startISO);
  const date = formatShortDate(event.startISO);

  return (
    <div ref={ref} id="thiep" className="envelope-scene relative h-[320vh]">
      <div className="envelope-stage sticky top-0 h-[100svh] overflow-hidden">
        {/* Vệt sáng hắt từ dưới lên, để chiếc phong bì có chỗ đứng thay vì
            lơ lửng giữa một mảng đen phẳng. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 52% 40% at 50% 56%, rgba(182,42,48,0.16), transparent 72%)",
          }}
        />

        {/* ═══ z-0 · thân sau phong bì ═══════════════════════════ */}
        <div className="envelope-shell absolute inset-0 z-0 grid place-items-center">
          <motion.div
            style={{ y: shellY, rotate: shellRotate, opacity: shellOpacity }}
            className="env-box"
          >
            <div
              aria-hidden
              className="env-shadow absolute inset-x-[9%] -bottom-4 h-5"
            />
            <div className="paper absolute inset-0 rounded-xs border border-line" />
            <div
              aria-hidden
              className="env-fibre absolute inset-0 rounded-xs"
            />
          </motion.div>
        </div>

        {/* ═══ z-10 · KHUNG MORPH ════════════════════════════════
            Bên trong khung này là toàn bộ trang chính, dựng sẵn ở kích
            thước thật ngay từ khung hình đầu tiên. Ô cắt clip-path chỉ
            quyết định người xem được nhìn thấy bao nhiêu phần của nó. */}
        <motion.div
          style={{ clipPath }}
          className="envelope-window absolute inset-0 z-10"
        >
          {/* Thư viện Tạ Quang Bửu nhìn chếch. Nó lùi dần về tỉ lệ thật
              trong lúc khung nở ra, nên cú mở đồng thời là một cú đẩy máy
              quay ra sau.

              Neo ở 30% chứ không phải 38% như hồi còn ảnh toà C1: thứ
              đáng giữ lại của toà nhà này là cái mái cong, mà nó nằm cao
              hơn hẳn dòng chữ đỏ chạy dọc mái C1 trước kia. Xuống thấp
              hơn nữa thì màn dọc dài trên điện thoại xén mất đúng nó. */}
          <motion.div
            aria-hidden
            style={{ scale: photoScale }}
            className="absolute inset-0"
          >
            <Image
              src={heroPhoto.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_30%]"
            />
          </motion.div>

          {/* Hai lớp phủ chồng nhau, mỗi lớp một việc. Lớp dọc kéo chân
              ảnh tối hẳn để chữ có nền; lớp ngang chỉ hạ sáng nửa trái.
              Gộp thành một gradient chéo thì hoặc chữ chưa đủ tương phản,
              hoặc dòng chữ đỏ trên mái nhà bị dìm mất. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #07080c 4%, rgba(7,8,12,0.9) 26%, rgba(7,8,12,0.42) 58%, rgba(7,8,12,0.62) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(7,8,12,0.78), transparent 62%)",
            }}
          />

          {/* Mặt giấy tấm thiệp, đè kín ảnh nền cho tới lúc nó tan ra */}
          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              style={{ opacity: paperOpacity, y: cardY }}
              className="envelope-card paper-card rounded-xs border border-line"
            >
              <InviteCard weekday={weekday} date={date} />
            </motion.div>
          </div>

          <HeroPanel reveal={heroReveal} />
        </motion.div>

        {/* ═══ z-20 · thân trước phong bì ════════════════════════ */}
        <div className="envelope-shell pointer-events-none absolute inset-0 z-20 grid place-items-center">
          <motion.div
            style={{ y: shellY, rotate: shellRotate, opacity: shellOpacity }}
            className="env-box"
          >
            <div
              className="paper env-mouth absolute inset-0"
              style={{ clipPath: POCKET }}
            />
            <div
              aria-hidden
              className="env-fibre absolute inset-0"
              style={{ clipPath: POCKET }}
            />

            {/* Ba nếp gấp. Chúng nằm lồng trong một khối đã bị xén theo
                miệng bì, nên không cánh nào có thể tràn vào ô cửa sổ.

                Thứ tự trong DOM chính là thứ tự gấp: hai cánh hông
                trước, cánh đáy sau cùng nằm đè lên. Đảo lại thì mép
                sáng của cánh hông chạy vắt qua mặt cánh đáy, và tờ
                giấy trông như xuyên qua chính nó. */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ clipPath: POCKET }}
            >
              <div
                className="env-fold absolute inset-0"
                style={{
                  clipPath: FOLD_LEFT,
                  background:
                    "linear-gradient(to right, rgba(237,234,227,0.02), rgba(237,234,227,0.005))",
                }}
              />
              <div
                className="env-fold absolute inset-0"
                style={{
                  clipPath: FOLD_RIGHT,
                  background:
                    "linear-gradient(to left, rgba(237,234,227,0.015), rgba(237,234,227,0.004))",
                }}
              />
              <div
                className="env-fold absolute inset-0"
                style={{
                  clipPath: FOLD_BOTTOM,
                  background:
                    "linear-gradient(to top, rgba(237,234,227,0.024), rgba(237,234,227,0.006))",
                }}
              />
            </div>

            {/* Khung dập chìm chạy theo đúng hình chiếc phong bì */}
            <svg
              aria-hidden
              viewBox="0 0 150 100"
              preserveAspectRatio="none"
              className="env-frame absolute inset-0 h-full w-full"
            >
              <polygon points={FRAME} vectorEffect="non-scaling-stroke" />
            </svg>

            {/* Dòng nhà in, dập chìm không mực, đặt trên mặt cánh đáy.
                Hai vạch ngắn kẹp hai bên: một dòng chữ nhỏ đứng trơ
                giữa mặt giấy trông như bị bỏ quên, còn kẹp giữa hai
                vạch thì nó thành một dòng được BÀY ra ở đó — đúng cách
                một xưởng in khắc tên mình lên phong bì. */}
            <div className="absolute inset-x-0 top-[78%] flex items-center justify-center gap-2.5 sm:gap-3">
              <span aria-hidden className="env-rule w-4 sm:w-6" />
              <p className="env-deboss text-[0.44rem] tracking-[0.34em] whitespace-nowrap uppercase sm:text-[0.5rem]">
                {event.school}
              </p>
              <span aria-hidden className="env-rule w-4 sm:w-6" />
            </div>
          </motion.div>
        </div>

        {/* ═══ z-30 → z-5 · NẮP THƯ ═════════════════════════════ */}
        <motion.div
          style={{ zIndex: flapZ }}
          className="envelope-shell pointer-events-none absolute inset-0 grid place-items-center"
        >
          <motion.div
            style={{ y: shellY, rotate: shellRotate, opacity: shellOpacity }}
            className="env-box env-box--3d"
          >
            <motion.div
              style={{ rotateX: flapRotate, height: `${FLAP_APEX}%` }}
              className="flap absolute inset-x-0 top-0"
            >
              {/* Mặt ngoài. clip-path xén sạch mọi đường viền, nên hai
                  cạnh chéo được tách khỏi thân bì bằng drop-shadow —
                  bộ lọc duy nhất bám theo đúng hình đã xén. */}
              <div
                className="paper-flap flap-face absolute inset-0"
                style={{
                  clipPath: FLAP,
                  filter:
                    "drop-shadow(0 1px 0 rgba(237,234,227,0.12)) drop-shadow(0 4px 7px rgba(0,0,0,0.7))",
                }}
              />
              <div
                aria-hidden
                className="env-fibre flap-face absolute inset-0"
                style={{ clipPath: FLAP }}
              />

              {/* Mặt trong: lớp lót đỏ. rotateY chứ không rotateX — xem
                  chỗ dễ sai số 1 ở đầu tệp. */}
              <div
                className="paper-liner flap-face absolute inset-0"
                style={{ clipPath: FLAP, transform: "rotateY(180deg)" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ═══ z-40 · con dấu sáp ═══════════════════════════════ */}
        <div className="envelope-shell pointer-events-none absolute inset-0 z-40 grid place-items-center">
          <div className="env-box">
            <div
              className="absolute inset-x-0 flex justify-center"
              style={{ top: `${FLAP_APEX}%` }}
            >
              {/* y: "-50%" thay cho class -translate-y-1/2: Motion ghi
                  thẳng vào thuộc tính transform, nên một class translate
                  của Tailwind đặt cạnh nó sẽ bị xoá sạch. */}
              <motion.div
                style={{
                  scale: sealScale,
                  opacity: sealOpacity,
                  rotate: sealRotate,
                  y: "-50%",
                }}
              >
                <WaxSeal />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ═══ z-50 · dòng "chưa mở" ════════════════════════════
            Chiếc phong bì tự nó không nói được nó là thư GỬI CHO AI,
            và cũng không nói được nó chưa từng được mở. Con dấu sáp
            còn nguyên có nói, nhưng phải nhận ra đó là sáp đã.

            Dòng này nói thẳng cả hai điều bằng đúng cái giọng của
            một dòng hộp thư đến. Nó cố ý KHÔNG viết hoa và cố ý
            không giãn chữ như dòng chỉ dẫn cuộn ở dưới: dòng dưới
            là nhãn hướng dẫn sử dụng, còn dòng này là một câu người
            ta nói với mình.

            Nó tắt chậm hơn chỉ dẫn cuộn một chút (0.08 so với 0.05).
            Chỉ dẫn là việc phải làm nên xong việc thì đi ngay; còn
            đây là một câu chào, và một câu chào thì được phép nán
            lại nửa nhịp. */}
        <motion.div
          style={{ opacity: noteOpacity }}
          className="pointer-events-none absolute inset-x-0 top-7 z-50 flex justify-center px-8 sm:top-10"
        >
          <p className="max-w-[22rem] text-center text-[0.66rem] leading-relaxed text-balance text-ash/60 sm:text-[0.74rem]">
            <span aria-hidden className="cue-unread" />
            Bạn có một lá thư chưa mở từ {event.school}
          </p>
        </motion.div>

        {/* ═══ z-50 · chỉ dẫn cuộn ══════════════════════════════ */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="envelope-cue pointer-events-none absolute inset-x-0 bottom-7 z-50 flex justify-center sm:bottom-10"
        >
          <ScrollCue />
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Con dấu sáp, dập chữ HUST.
 *
 * Chữ không phải một tấm ảnh đặt lên mặt sáp mà là hình khoét từ chính mặt
 * sáp: tệp SVG được dùng làm mặt nạ cho hai lớp chồng nhau — một lớp tối
 * lệch xuống một pixel làm bóng chữ đổ trên mặt sáp, một lớp sáng nằm đúng
 * chỗ làm mặt trên của chữ. Đặt thẳng ảnh logo màu đỏ lên nền sáp đỏ thì
 * chữ chìm mất, mà đổi màu logo thì lại không còn là logo của trường.
 */
function WaxSeal() {
  const stamp = {
    WebkitMaskImage: `url(${marks.hustWordmark.src})`,
    maskImage: `url(${marks.hustWordmark.src})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  } as const;

  return (
    <div
      role="img"
      aria-label="Con dấu sáp dập chữ HUST, Đại học Bách khoa Hà Nội"
      className="wax breathe flex h-14 w-14 items-center justify-center sm:h-18 sm:w-18"
    >
      {/* Chữ NỔI lên khỏi mặt sáp, không chìm xuống: khuôn dấu có lòng
          khắc lõm nên sáp trào vào đó và đông lại thành chữ nổi. Bản
          tối lệch xuống một pixel là bóng chữ đổ trên mặt sáp, bản
          sáng nằm đúng chỗ là mặt trên của chữ. Đảo hai bản cho nhau
          thì chữ lún xuống, và con dấu hoá ra một khuôn ép nhựa.

          Hai con số ở đây đã phải kéo xuống sau khi soi ở bốn lần
          phóng: bề ngang từ w-9 còn w-7, và bản sáng từ #c47a7e còn một
          bậc trên màu sáp. Chữ chiếm quá nửa bề ngang con dấu, lại tương phản
          mạnh, thì nó đọc ra một cái logo IN LÊN mặt sáp. Vết dập
          thật nhỏ hơn thế nhiều, và nó chỉ khác màu sáp đúng chừng
          một bậc sáng — bằng đúng chênh lệch mà một mặt nghiêng nhận
          được so với mặt phẳng quanh nó. */}
      <span
        aria-hidden
        className="relative block h-[0.62rem] w-7 sm:h-[0.78rem] sm:w-9"
      >
        <span
          className="absolute inset-0 translate-y-px bg-[#3d0f13]"
          style={stamp}
        />
        <span className="absolute inset-0 bg-[#ae6d74]" style={stamp} />
      </span>
    </div>
  );
}

/**
 * Tấm thiệp bên trong phong bì.
 *
 * Cố tình chỉ nói ba điều: mời ai, mời gì, ngày nào. Nó là thứ trượt qua
 * mắt trong khoảng hai giây rồi tan ra thành trang chính, nên nhồi thêm
 * dòng nào cũng thành không đọc được dòng nào.
 *
 * Ba điều ấy CỐ Ý trùng với ba khối chữ đầu tiên của trang chính. Cú
 * chuyển giao là một phép nối hình: cùng một tên buổi lễ, cùng một cái
 * tên, cùng một ngày, chỉ đổi cách bày. Cho tấm thiệp nói những chữ khác
 * thì mắt đọc ra hai màn hình nối nhau chứ không phải một màn hình đang
 * biến hình.
 *
 * Huy hiệu Bách Khoa đặt ở đây chứ không trên con dấu: nó là hình đỏ trên
 * nền trắng có điểm vàng, chỉ đọc được khi đứng trên mặt giấy sáng. Dán
 * lên mặt sáp đỏ thì đỏ chồng đỏ, không còn nhìn ra hình gì.
 */
function InviteCard({ weekday, date }: { weekday: string; date: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-5 text-center">
      <Image
        src={marks.bkEmblem.src}
        alt={marks.bkEmblem.alt}
        width={marks.bkEmblem.width}
        height={marks.bkEmblem.height}
        priority
        className="h-8 w-auto sm:h-10"
      />

      <span aria-hidden className="mt-3.5 block h-px w-7 bg-seal sm:mt-4" />

      <p className="mt-3.5 max-w-[22ch] font-display text-[0.78rem] leading-snug text-balance text-ash italic sm:mt-4 sm:text-[0.92rem]">
        {event.invitationLine}
      </p>

      <p className="mt-1.5 font-display text-[1.35rem] leading-tight font-medium text-bone sm:mt-2 sm:text-[1.75rem]">
        {event.eventTitle}
      </p>

      <p className="font-display text-[0.95rem] text-flame sm:text-[1.15rem]">
        {event.hostName}
      </p>

      <p className="tabular mt-3.5 text-[0.55rem] tracking-[0.22em] text-faint uppercase sm:mt-5 sm:text-[0.62rem]">
        {weekday} · {date}
      </p>
    </div>
  );
}

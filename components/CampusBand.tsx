"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { campusBackdrop, campusLandmarks, marks } from "@/data/campus";
import { InView } from "./InView";
import { RiseText } from "./RiseText";

/**
 * ═══════════════════════════════════════════════════════════════
 *  NƠI CHỐN
 *
 *  Khối thị sai của những mốc quen thuộc trong khuôn viên Bách Khoa.
 *  Bảy lớp trôi ở bảy tốc độ khác nhau: ảnh bình minh trên thư viện
 *  làm nền chậm nhất, năm khung ảnh trôi nhanh dần, chữ trôi nhanh
 *  nhất. Chênh lệch tốc độ chính là thứ tạo ra chiều sâu; không có nó
 *  thì đây chỉ là một tấm ảnh ghép.
 *
 *  Tốc độ chia theo "khoảng cách": ảnh nền coi như ở xa nên trôi ít,
 *  khung ảnh nổi phía trước trôi nhiều. Đảo ngược quan hệ ấy là cách
 *  nhanh nhất khiến người xem thấy chóng mặt mà không hiểu vì sao.
 *
 *  ─── Vì sao là một hàng chứ không phải một lưới ─────────────
 *  Bản đầu dựng bằng lưới 12 cột với col-start đặt tay. Lưới tự xuống
 *  dòng khi các cột chồng nhau, mỗi dòng lại cao bằng ảnh cao nhất
 *  cộng thêm phần đẩy xuống, nên giữa các ảnh mở ra những khoảng trống
 *  cả trăm pixel và cụm ảnh trông như bị rơi vãi. Một hàng ngang với
 *  bề rộng và độ cao lệch nhau thì mọi khoảng hở đều do mình định chứ
 *  không do thuật toán xếp lưới quyết định hộ.
 *
 *  Ảnh đều là ảnh tư liệu thật, giấy phép Creative Commons, ghi nguồn
 *  ở cuối trang. Danh sách và phần ghi nguồn cùng đọc từ data/campus.ts
 *  nên không bao giờ lệch nhau.
 * ═══════════════════════════════════════════════════════════════
 */

/**
 * Nhịp của hàng ảnh, mỗi ảnh một dòng.
 *
 *   span   phần chia bề rộng của hàng, đọc như một tỉ lệ
 *   drop   đẩy xuống cố định, tính bằng phần trăm chiều cao chính nó
 *   drift  biên độ trôi khi cuộn, cũng tính theo chiều cao chính nó
 *   ratio  tỉ lệ khung ảnh
 *
 * Ba con số đầu cố ý không theo một cấp số nào. Cho chúng tăng đều thì
 * cả hàng trôi như một dải răng lược, tức là lại thành một khối phẳng.
 *
 * `span` là hệ số flex-grow chứ KHÔNG phải phần trăm bề rộng, dù năm số
 * cộng lại vẫn đúng bằng 100 cho dễ đọc. Bản trước đặt thẳng chúng vào
 * flex-basis: năm ô chiếm trọn 100% bề rộng, rồi bốn khoảng gap-6 cộng
 * thêm 96px nữa, nên cả hàng tràn ra khỏi lề phải và tấm cuối bị cắt.
 * Chia theo flex-grow thì phần gap bị trừ ra trước, tỉ lệ giữa các ô
 * giữ nguyên, và thêm bao nhiêu gap nữa cũng không tràn.
 */
const RHYTHM = [
  { span: "23", drop: "0%", drift: 13, ratio: "aspect-4/5" },
  { span: "17", drop: "34%", drift: 24, ratio: "aspect-3/4" },
  { span: "21", drop: "9%", drift: 7, ratio: "aspect-square" },
  { span: "16", drop: "44%", drift: 19, ratio: "aspect-3/4" },
  { span: "23", drop: "6%", drift: 11, ratio: "aspect-4/5" },
];

export function CampusBand() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 44,
    mass: 0.4,
  });

  // Nền: trôi ít nhất, và phóng nhẹ để mép ảnh không bao giờ lọt vào khung.
  const bgY = useTransform(p, [0, 1], ["-7%", "7%"]);
  const bgScale = useTransform(p, [0, 0.5, 1], [1.18, 1.1, 1.18]);
  // Chữ: trôi nhanh nhất, nên nó trông như nằm sát mặt người xem.
  const textY = useTransform(p, [0, 1], ["26%", "-26%"]);

  return (
    <section
      ref={ref}
      id="noi-chon"
      className="relative isolate overflow-hidden border-t border-line py-24 sm:py-32"
    >
      {/* ── Lớp xa nhất: bình minh trên thư viện ─────────────────
          Ảnh gốc chỉ rộng 640px nên không đủ nét để trải toàn màn. Nó được
          làm mờ và dìm tối hẳn, dùng như một mảng ánh sáng chứ không phải
          một tấm ảnh cần nhìn rõ. */}
      <motion.div
        aria-hidden
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-[-12%] -z-20"
      >
        <Image
          src={campusBackdrop.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-45 blur-[3px]"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, #07080c 0%, rgba(7,8,12,0.82) 22%, rgba(7,8,12,0.8) 78%, #07080c 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* ── Lớp gần nhất: chữ ─────────────────────────────────
            Chữ ở đây tránh hai thứ. Một là mở đầu bằng "Bốn năm" — khối
            Hành trình ngay dưới đã mở bằng đúng hai chữ ấy, hai tiêu đề
            liền nhau cùng một cách vào thì khối sau nghe như khối trước
            nói lại. Hai là gõ thẳng ngày "27 tháng 9" vào đoạn văn: ngày
            đã có ở bốn chỗ khác sinh ra từ startISO, riêng chỗ này gõ tay
            thì đổi ngày trong data là nó lệch mà không ai biết.
            InView ở đây là bắt buộc chứ không phải cho đẹp: RiseText giữ
            mỗi từ ở opacity 0 cho tới khi một khối cha nào đó nhận class
            `in-view`. Thiếu nó thì tiêu đề không bao giờ hiện ra. */}
        <motion.div style={{ y: textY }} className="relative z-10">
          <InView className="mx-auto max-w-xl text-center">
            <Image
              src={marks.hustWordmark.src}
              alt={marks.hustWordmark.alt}
              width={220}
              height={44}
              className="fade mx-auto h-5 w-auto sm:h-6"
            />

            <h2 className="mt-7 font-display text-3xl leading-tight font-normal text-balance text-bone sm:text-[2.6rem]">
              <RiseText baseDelay={120}>Bốn năm đi qua chừng đó lối</RiseText>
            </h2>

            <p
              className="fade mx-auto mt-5 max-w-lg text-[0.95rem] leading-relaxed text-pretty text-ash"
              style={{ "--d": "320ms" } as CSSProperties}
            >
              Có mấy chỗ trong trường mình đi qua nhiều đến mức không còn để ý.
              Hồi đó cái gì cũng tưởng còn dài. Giờ nghĩ lại, chính mấy chỗ bình
              thường nhất mới là thứ nhớ lâu nhất.
            </p>
          </InView>
        </motion.div>

        {/* ── Lớp giữa: năm khung ảnh ────────────────────────────
            Từ md trở lên là một hàng ngang năm ảnh, mỗi ảnh một bề rộng,
            một độ cao và một tốc độ trôi riêng. Dưới md thì xếp hai cột đều
            nhau: phần đẩy xuống cố định (--drop) tắt đi vì màn hẹp không có
            chỗ cho nó, nhưng thị sai thì VẪN chạy, chỉ là mỗi ảnh trôi trong
            ô lưới của nó. Vì hai ảnh cùng hàng trôi lệch nhau, khoảng cách
            dọc giữa các hàng phải rộng hơn bình thường, nếu không chú thích
            của hàng trên chạm vào ảnh của hàng dưới. */}
        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-5 md:mt-20 md:flex md:items-start md:gap-6">
          {campusLandmarks.map((photo, index) => (
            <LandmarkPlate
              key={photo.src}
              photo={photo}
              progress={p}
              beat={RHYTHM[index] ?? RHYTHM[0]}
            />
          ))}
        </ul>

        {/* Trước đây chỗ này là một nhãn chữ đặt trên logo SoICT. Bỏ logo
            thì cái nhãn mất luôn lý do tồn tại: một dòng chữ giãn rộng
            đứng một mình giữa trang là chú thích cho một vật KHÔNG CÒN Ở
            ĐÓ. Nên nó đổi hẳn vai — thành một liên kết đọc ra là liên
            kết, cùng đúng ngữ pháp mũi tên với nút "Chỉ đường" ở màn đầu
            và với các nguồn ảnh ở chân trang. */}
        <div className="mt-14 flex justify-center md:mt-16">
          <a
            href="https://soict.hust.edu.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex items-center gap-2 rounded-xs px-4 py-2 text-[0.88rem] text-ash underline decoration-line underline-offset-4 transition-colors hover:text-flame hover:decoration-flame/40"
          >
            Trường Công nghệ Thông tin và Truyền thông
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function LandmarkPlate({
  photo,
  progress,
  beat,
}: {
  photo: (typeof campusLandmarks)[number];
  progress: ReturnType<typeof useSpring>;
  beat: (typeof RHYTHM)[number];
}) {
  const y = useTransform(
    progress,
    [0, 1],
    [`${beat.drift}%`, `${-beat.drift}%`],
  );

  return (
    <li
      // min-w-0 là bắt buộc: mặc định min-width của một flex item là auto,
      // nên ô sẽ không chịu co xuống dưới bề rộng nội dung và hàng lại tràn
      // đúng như cũ, bất kể flex-grow chia thế nào.
      className="plate md:min-w-0 md:flex-[var(--span)_1_0%]"
      // Phần chia bề rộng và độ đẩy xuống chỉ có nghĩa ở bố cục một hàng, nên
      // chúng đi qua biến CSS và chỉ được đọc từ md trở lên. Viết thẳng vào
      // style thì màn hẹp cũng dính theo.
      style={{ "--span": beat.span, "--drop": beat.drop } as CSSProperties}
    >
      <motion.figure
        style={{ y }}
        className="md:[margin-top:var(--drop)] md:will-change-transform"
      >
        <div
          className={`relative ${beat.ratio} overflow-hidden rounded-xs border border-line bg-slate`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 22vw, 45vw"
            className="object-cover"
          />
          {/* Lớp phủ đỏ rất nhạt, kéo cả năm tấm ảnh về cùng một tông. Năm
              tấm này chụp cách nhau cả chục năm bằng năm cái máy khác nhau,
              để nguyên thì mỗi tấm một sắc trời và cả hàng trông như ảnh
              nhặt về chứ không phải một bộ. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(7,8,12,0.66), rgba(7,8,12,0.2) 55%), rgba(124,29,34,0.16)",
            }}
          />
        </div>

        <figcaption className="mt-3">
          <p className="text-[0.8rem] font-medium text-bone">{photo.place}</p>
          <p className="mt-0.5 text-[0.78rem] leading-snug text-faint">
            {photo.note}
          </p>
        </figcaption>
      </motion.figure>
    </li>
  );
}

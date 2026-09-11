"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { pad2, resolvePhase, splitDuration, type Phase } from "@/lib/datetime";

type CountdownProps = {
  startISO: string;
  endISO: string;
};

const UNITS = [
  { key: "days", label: "Ngày" },
  { key: "hours", label: "Giờ" },
  { key: "minutes", label: "Phút" },
  { key: "seconds", label: "Giây" },
] as const;

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Đồng hồ đếm ngược tới giờ khai mạc.
 *
 * Máy chủ không biết "bây giờ" của khách là mấy giờ, nên lần render đầu tiên
 * mọi bánh xe đều đứng ở số 0. Số thật chỉ xuất hiện sau khi component gắn vào
 * DOM — cách này tránh được lỗi hydration mismatch, thứ luôn xảy ra nếu đem
 * Date.now() ra dùng thẳng trong lúc render.
 *
 * Tiện thể, đúng cái ràng buộc kỹ thuật ấy lại tặng không một hiệu ứng: các
 * bánh xe quay từ 00 lên đúng số còn lại ngay khi trang mở, lệch pha nhau
 * theo từng ô.
 */
export function Countdown({ startISO, endISO }: CountdownProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const phase: Phase | null = now === null ? null : resolvePhase(now, startISO, endISO);

  if (phase === "during") {
    return <StatusBanner headline="Buổi lễ đang diễn ra" note="Hẹn gặp bạn ở toà C1." pulse />;
  }

  if (phase === "after") {
    return (
      <StatusBanner
        headline="Buổi lễ đã khép lại"
        note="Cảm ơn bạn đã dành thời gian ở đó cùng mình."
      />
    );
  }

  const remaining = now === null ? null : splitDuration(new Date(startISO).getTime() - now);

  return (
    <div>
      {/* Không có dấu hai chấm ngăn giữa các ô: bốn cái nhãn bên dưới đã tách
          các nhóm số rõ hơn hẳn, còn dấu hai chấm của font serif ở cỡ chữ này
          nhỏ tới mức trông như hai hạt bụi dính trên nền giấy. */}
      <div className="flex items-start gap-6 sm:gap-8">
        {UNITS.map((unit, index) => (
          <div key={unit.key} className="flex flex-col items-center">
            <span className="font-display text-[2.15rem] leading-none font-normal text-bone sm:text-[2.6rem]">
              {/* Bánh xe quay muộn dần từ trái sang phải, để bốn ô không
                  cùng dừng một lúc — mắt bắt được nhịp thì mới thấy nó chạy */}
              <Odometer value={remaining ? remaining[unit.key] : 0} delay={index * 90} />
            </span>
            <span className="mt-2.5 text-[0.6rem] tracking-[0.2em] text-faint uppercase">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Người dùng trình đọc màn hình không cần nghe từng giây trôi qua.
          Khối đếm ở trên bị ẩn khỏi cây trợ năng, thay bằng một câu tĩnh. */}
      <p className="sr-only" aria-live="off">
        {remaining === null
          ? "Đang tải bộ đếm ngược."
          : `Còn ${remaining.days} ngày ${remaining.hours} giờ nữa tới buổi lễ.`}
      </p>
    </div>
  );
}

/**
 * Một cụm chữ số dạng bánh xe.
 *
 * Mỗi bánh xe là một cột 0–9 cao mười dòng, trượt dọc trong khung cao đúng
 * một dòng. Chuyển số nghĩa là dịch cột đi `-số × 10%` — trình duyệt lo phần
 * nội suy, và vì chỉ đụng tới transform nên toàn bộ chuyển động chạy trên
 * compositor, không ép vẽ lại chữ mỗi giây.
 */
function Odometer({ value, delay }: { value: number; delay: number }) {
  const digits = pad2(value).split("");

  return (
    <span aria-hidden className="inline-flex">
      {digits.map((digit, index) => (
        <span key={index} className="reel">
          <span
            className="reel__track"
            style={
              {
                transform: `translateY(${Number(digit) * -10}%)`,
                transitionDelay: `${delay}ms`,
              } as CSSProperties
            }
          >
            {DIGITS.map((n) => (
              <span key={n} className="reel__cell">
                {n}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

function StatusBanner({
  headline,
  note,
  pulse = false,
}: {
  headline: string;
  note: string;
  pulse?: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-3">
      <span className="inline-flex items-center gap-2.5 rounded-xs border border-seal/45 bg-seal/12 px-4 py-2">
        {pulse && (
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-seal opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-seal" />
          </span>
        )}
        <span className="text-[0.68rem] tracking-[0.18em] text-flame uppercase">{headline}</span>
      </span>
      <p className="font-display text-xl leading-snug text-bone sm:text-2xl">{note}</p>
    </div>
  );
}

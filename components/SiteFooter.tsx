import Image from "next/image";
import type { CSSProperties } from "react";
import { marks } from "@/data/campus";
import { event } from "@/data/event";
import { formatFullDate, formatTime } from "@/lib/datetime";
import { InView } from "./InView";
import { RiseText } from "./RiseText";

/**
 * Lời khép lại và cách liên hệ.
 *
 * Chỉ giữ hai đường liên hệ trực tiếp — gọi và gửi mail. Không lặp lại
 * địa chỉ web: khách đang đứng trên chính trang đó rồi.
 *
 * Đệm đáy rộng hẳn ra để thanh dính ở cuối màn hình không che mất mấy dòng
 * liên hệ. Đây là chỗ duy nhất trên trang mà hai thứ đó chạm nhau.
 */
export function SiteFooter() {
  const links = [
    {
      label: event.contact.phone,
      href: `tel:${event.contact.phoneE164}`,
    },
    { label: event.contact.email, href: `mailto:${event.contact.email}` },
  ];

  return (
    <footer className="border-t border-line px-6 pt-24 pb-32 sm:px-10 sm:pt-28 sm:pb-36">
      <InView className="mx-auto max-w-2xl text-center">
        <span aria-hidden className="rule mx-auto w-14" />

        <p className="mt-9 pb-1 font-display text-2xl leading-[1.4] text-balance text-bone italic sm:text-[1.8rem]">
          <RiseText>{event.closingNote}</RiseText>
        </p>

        <div
          className="fade mt-14 flex flex-col items-center gap-2"
          style={{ "--d": "420ms" } as CSSProperties}
        >
          <p className="font-display text-xl text-flame">{event.hostName}</p>
          <p className="tabular text-[0.88rem] text-ash">
            {formatFullDate(event.startISO)} · {formatTime(event.startISO)}
          </p>
          <p className="text-[0.88rem] text-ash">{event.venue.name}</p>
        </div>

        <div
          className="fade mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-line pt-9"
          style={{ "--d": "520ms" } as CSSProperties}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.88rem] text-ash underline decoration-line underline-offset-4 transition-colors hover:text-flame hover:decoration-flame/40"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div
          className="fade mt-12 flex justify-center opacity-55"
          style={{ "--d": "600ms" } as CSSProperties}
        >
          <Image
            src={marks.hustWordmark.src}
            alt={marks.hustWordmark.alt}
            width={160}
            height={32}
            className="h-3.5 w-auto"
          />
        </div>
      </InView>
    </footer>
  );
}

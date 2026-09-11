/**
 * Sinh dữ liệu lịch — không dùng thư viện ngoài.
 *
 * File .ics tuân theo RFC 5545. Hai chi tiết dễ bị bỏ qua mà ở đây có xử lý:
 *   1. Kết thúc dòng phải là CRLF, và dòng dài hơn 75 octet phải được gấp
 *      (fold) — nếu không, một số ứng dụng lịch sẽ từ chối file.
 *   2. Ta ghi DTSTART/DTEND ở dạng UTC (hậu tố Z) để khỏi phải kèm khối
 *      VTIMEZONE. 09:30 giờ Việt Nam ⇒ 02:30Z.
 */

import { event, calendarDescription } from "@/data/event";

/** "20260927T023000Z" */
function toUTCStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Escape theo RFC 5545 §3.3.11 — thứ tự quan trọng, backslash phải đi trước. */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/**
 * Gấp dòng ở mốc 75 octet. Đếm theo octet UTF-8 chứ không theo ký tự,
 * vì tiếng Việt có dấu chiếm 2–3 byte mỗi ký tự — đếm nhầm sẽ tạo ra
 * dòng vượt giới hạn hoặc cắt đứt giữa một ký tự.
 */
function foldLine(line: string): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;

  const chunks: string[] = [];
  let current = "";
  let currentBytes = 0;
  let limit = 75;

  // Duyệt theo code point để không bao giờ cắt vào giữa một ký tự.
  for (const ch of line) {
    const size = encoder.encode(ch).length;
    if (currentBytes + size > limit) {
      chunks.push(current);
      current = ch;
      currentBytes = size;
      limit = 74; // dòng nối có thêm một dấu cách ở đầu
    } else {
      current += ch;
      currentBytes += size;
    }
  }
  chunks.push(current);
  return chunks.join("\r\n ");
}

const SUMMARY = `${event.eventTitle}, ${event.hostName}`;
const LOCATION = `${event.venue.name}, ${event.venue.address}`;

/**
 * @param dtstamp Thời điểm tạo file. Truyền vào để hàm giữ tính thuần khiết
 *                và cho kết quả ổn định khi build tĩnh.
 */
export function buildICS(dtstamp: Date): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//graduation.timezlab.org//Graduation Invite//VI",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:graduation-${toUTCStamp(event.startISO)}@graduation.timezlab.org`,
    `DTSTAMP:${toUTCStamp(dtstamp.toISOString())}`,
    `DTSTART:${toUTCStamp(event.startISO)}`,
    `DTEND:${toUTCStamp(event.endISO)}`,
    `SUMMARY:${escapeText(SUMMARY)}`,
    `DESCRIPTION:${escapeText(calendarDescription)}`,
    `LOCATION:${escapeText(LOCATION)}`,
    `GEO:${event.venue.lat};${event.venue.lng}`,
    `URL:${event.contact.website}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeText(`Ngày mai là ${SUMMARY}`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  // RFC 5545 yêu cầu CRLF, kể cả ở dòng cuối.
  return lines.map(foldLine).join("\r\n") + "\r\n";
}

/** Link "thêm nhanh" của Google Calendar. */
export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: SUMMARY,
    dates: `${toUTCStamp(event.startISO)}/${toUTCStamp(event.endISO)}`,
    details: calendarDescription,
    location: LOCATION,
    ctz: "Asia/Ho_Chi_Minh",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Outlook bản web (tài khoản cá nhân). Dùng giờ kèm offset thay vì UTC. */
export function outlookWebUrl(): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: SUMMARY,
    startdt: event.startISO,
    enddt: event.endISO,
    location: LOCATION,
    body: calendarDescription,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

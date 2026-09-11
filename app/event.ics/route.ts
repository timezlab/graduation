import { buildICS } from "@/lib/calendar";

/**
 * Phục vụ file lịch tại một địa chỉ thật: /event.ics
 *
 * Nội dung không bao giờ đổi nên trang được dựng sẵn lúc build; DTSTAMP vì
 * thế cũng cố định, mỗi lần tải về đều cho ra file giống hệt nhau.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(buildICS(new Date()), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="le-tot-nghiep-le-xuan-dai.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}

import { googleCalendarUrl, outlookWebUrl } from "@/lib/calendar";
import { ActionCards, type ActionCard } from "./ActionCards";

/**
 * Ba đường đưa sự kiện vào lịch của khách.
 *
 * File .ics được phục vụ từ một địa chỉ thật (/event.ics) thay vì tạo blob
 * ngay trong trình duyệt. Đây là điểm mấu chốt cho iPhone: Safari trên iOS
 * xử lý thuộc tính download trên blob rất chập chờn, nhưng mở một đường dẫn
 * .ics thật thì nó chuyển thẳng sang ứng dụng Lịch.
 *
 * Cũng vì thế mà thẻ Apple không đặt `external`: nó là đường dẫn nội bộ, và
 * `download` trên máy tính khiến trình duyệt tải file về, còn trên iOS thuộc
 * tính này được bỏ qua và hệ điều hành tự mở ứng dụng Lịch.
 */
export function AddToCalendar() {
  const options: ActionCard[] = [
    { href: googleCalendarUrl(), label: "Google Calendar", hint: "Android, Gmail", external: true },
    {
      href: "/event.ics",
      label: "Apple Calendar",
      hint: "iPhone, iPad, Mac",
      download: "le-tot-nghiep-le-xuan-dai.ics",
    },
    { href: outlookWebUrl(), label: "Outlook", hint: "Bản web", external: true },
  ];

  return <ActionCards title="Thêm vào lịch" items={options} />;
}

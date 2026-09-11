import { CampusBand } from "@/components/CampusBand";
import { Dock } from "@/components/Dock";
import { Envelope } from "@/components/Envelope";
import { EventDetails } from "@/components/EventDetails";
import { Journey } from "@/components/Journey";
import { SiteFooter } from "@/components/SiteFooter";
import { VenueMap } from "@/components/VenueMap";

/**
 * ═══════════════════════════════════════════════════════════════
 *  Thứ tự các khối đặt theo mức cấp thiết với khách.
 *
 *  Không có khối "màn thiệp" riêng ở đây, và đó là chủ ý. Màn thiệp
 *  chính là khung hình cuối của Envelope: tấm thiệp trong phong bì nở
 *  ra kín màn hình rồi cuộn tiếp đi như một khối bình thường. Dựng nó
 *  thành một khối thứ hai nằm ngay dưới thì hai bản của cùng một màn
 *  sẽ cùng có mặt trên màn hình một lúc, và mắt đọc ra nội dung lặp
 *  lại đúng chỗ nối.
 *
 *  Đổi lại, phong bì không được phép giữ thông tin nào của riêng nó:
 *  mọi thứ trên tấm thiệp đều có lại đầy đủ ở các khối bên dưới. Nhờ
 *  vậy ai vào bằng đường dẫn neo thẳng xuống giữa trang, hay ai không
 *  chạy được JavaScript, đều không lỡ mất gì.
 *
 *  Hai khối tiếp theo lo trọn phần việc của một tấm thiệp: biết giờ,
 *  lưu lịch, rồi tìm đường. Bản đồ đứng ngay sau giờ giấc chứ không
 *  ở cuối trang: khách mở thiệp ra để đi, và hai câu "bao giờ" với
 *  "ở đâu" phải trả lời liền nhau. Nơi chốn và Hành trình để sau cùng
 *  và cố ý giữ ngắn — ai muốn đọc thì đọc, không đọc cũng không thiếu gì.
 *
 *  Mỗi khối một lối dựng khác nhau, không khối nào lặp lại khối nào:
 *
 *    Envelope      cảnh 3D ghim tại chỗ, điều khiển bằng cuộn, khép
 *                  lại bằng màn thiệp tràn màn
 *    EventDetails  hai cột lệch, cột trái dính lại
 *    VenueMap      bản đồ trong khung, ảnh và dải địa chỉ đè chồng lên
 *    CampusBand    năm lớp ảnh trôi ở năm tốc độ
 *    Journey       trục dọc, rồi dải ảnh chạy vòng tràn hết bề ngang
 *    SiteFooter    một cột, căn giữa
 * ═══════════════════════════════════════════════════════════════
 */
export default function Page() {
  return (
    <main className="relative z-10">
      <Envelope />
      <Dock />
      <EventDetails />
      <VenueMap />
      <CampusBand />
      <Journey />
      <SiteFooter />
    </main>
  );
}

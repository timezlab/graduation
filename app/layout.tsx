import type { Metadata, Viewport } from "next";
import { Newsreader, Be_Vietnam_Pro } from "next/font/google";
import { event } from "@/data/event";
import { formatFullDate, formatTime } from "@/lib/datetime";
import { ogImage } from "@/lib/og";
import "./globals.css";

/* Newsreader thay cho Playfair. Lý do không phải là đổi cho khác: trên nền
   gần đen, serif tương phản cao kiểu Didone bị đứt nét ở phần thanh nhất và
   chữ trông rỗ. Newsreader có trục quang học và nét thanh dày dặn hơn, nên
   giữ được dáng thiệp in mà vẫn đọc được ở nền tối.

   Cả hai font đều nạp bộ ký tự "vietnamese". Thiếu nó thì dấu tiếng Việt rơi
   về font dự phòng của hệ thống và chữ trông vênh nhau ngay giữa một dòng. */
const newsreader = Newsreader({
  subsets: ["latin", "vietnamese"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

/**
 * Địa chỉ gốc, dùng để dựng URL tuyệt đối cho ảnh xem trước.
 *
 * Zalo, Messenger và Facebook chỉ chấp nhận URL tuyệt đối. Thiếu phần này thì
 * ảnh thiệp mời trỏ về localhost và mọi khách sẽ thấy một ô trống.
 *
 * Trang chạy trên GitHub Pages với tên miền ở `event.contact.website` (tệp
 * public/CNAME phải khớp đúng với nó). Bản build production lấy thẳng địa chỉ
 * ấy; muốn dựng thử lên một nơi khác thì đặt NEXT_PUBLIC_SITE_URL.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? event.contact.website
    : "http://localhost:3000");

const pageTitle = `${event.eventTitle} · ${event.hostName}`;
const pageDescription = `${event.invitationLine} ${event.eventTitle.toLowerCase()} của ${event.hostName}. Hẹn gặp ${formatFullDate(event.startISO)}, khoảng ${formatTime(event.startISO)} tại ${event.venue.name}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: pageTitle,
  description: pageDescription,
  applicationName: pageTitle,
  authors: [{ name: event.hostName, url: event.contact.website }],
  // Thiệp này chỉ để gửi cho người quen, không cần xuất hiện trên kết quả tìm kiếm.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: pageTitle,
    description: pageDescription,
    siteName: pageTitle,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#07080c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // `data-scroll-behavior="smooth"` là bắt buộc từ Next 16: framework không
    // còn tự ghi đè scroll-behavior khi chuyển trang nữa, phải khai báo thì nó
    // mới tạm tắt cuộn mượt trong lúc điều hướng.
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${beVietnam.variable}`}
    >
      <head>
        {/* Không có JavaScript thì không có gì gắn class `in-view`, và mọi
            khối chờ hiệu ứng sẽ nằm lại ở trạng thái ẩn. Khối này ép chúng
            hiện hết: nội dung thiệp mời không được phép phụ thuộc vào việc
            script chạy thành công.

            Cảnh mở phong bì cần nhiều hơn thế. KHÔNG ẨN ĐƯỢC nó như trước
            nữa, vì màn thiệp — ảnh thư viện, tên buổi lễ, hai nút — nay nằm
            bên trong chính khung tấm thiệp ấy; ẩn đi là mất luôn màn đầu
            của trang. Thay vào đó khối này tháo cảnh ra thành một màn tĩnh:
            bỏ đường chạy 320vh, gỡ sân khấu khỏi thế dính, mở ô cắt
            clip-path ra hết cỡ, rồi giấu phần chỉ còn nghĩa khi có chuyển
            động (thân bì, con dấu, chỉ dẫn cuộn).

            `!important` ở đây là bắt buộc chứ không phải cho chắc: Motion
            kết xuất sẵn giá trị khởi đầu (opacity 0, clip-path thu nhỏ) vào
            thuộc tính style ngay trong HTML từ máy chủ, và chỉ có
            `!important` mới thắng được style nội tuyến. */}
        <noscript>
          <style>{`
            .fade, .rise > span { opacity: 1 !important; transform: none !important; }
            .rule { transform: scaleX(1) !important; }
            .dock { display: none !important; }
            .envelope-scene { height: auto !important; }
            .envelope-stage { position: static !important; height: auto !important; }
            .envelope-window {
              position: relative !important;
              min-height: 100svh !important;
              clip-path: none !important;
            }
            .envelope-window * { transform: none !important; }
            .envelope-hero, .envelope-hero * { opacity: 1 !important; }
            .envelope-shell, .envelope-card, .envelope-cue { display: none !important; }
          `}</style>
        </noscript>
      </head>
      <body className="antialiased">
        {/* Ba lớp thuần trang trí, thuần CSS. Đặt ở layout thay vì trong trang
            để chúng nằm ngoài mọi ngữ cảnh xếp chồng của nội dung. */}
        <div aria-hidden className="aura" />
        {children}
        <div aria-hidden className="grain" />
        <div aria-hidden className="scroll-progress" />
      </body>
    </html>
  );
}

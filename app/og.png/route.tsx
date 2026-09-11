import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { heroPhoto } from "@/data/campus";
import { event } from "@/data/event";
import { formatFullDate, formatTime } from "@/lib/datetime";
import { ogImage } from "@/lib/og";

/**
 * Ảnh xem trước khi ai đó dán link vào Zalo, Messenger hay Facebook.
 *
 * Đây là thứ đầu tiên mọi khách mời nhìn thấy, thường là trước cả khi họ bấm
 * vào link, nên nó phải nói đủ ba điều: mời ai, ngày nào, ở đâu.
 *
 * Font và ảnh đều đọc từ đĩa chứ không tải qua mạng lúc dựng ảnh. Bản dựng
 * sẽ không hỏng chỉ vì Google Fonts chập chờn, và tiếng Việt có dấu chắc
 * chắn hiện đúng thay vì thành ô vuông.
 *
 * Ảnh nền phải nhúng thành data URI: bộ dựng ảnh của Satori không tự đi tải
 * một đường dẫn tương đối, vì lúc dựng chưa có máy chủ nào đứng sau nó.
 *
 * Tên tệp lấy thẳng từ heroPhoto chứ không viết tay lại. Thẻ này và màn
 * thiệp phải là CÙNG một tấm ảnh: người ta thấy ảnh xem trước ở Zalo rồi
 * mới bấm vào, hai ảnh khác nhau thì cú bấm ấy thành một cú chuyển cảnh.
 *
 * Vì sao là route handler ở /og.png chứ không phải tệp quy ước
 * opengraph-image.tsx: trang chạy trên GitHub Pages, một host tĩnh định
 * kiểu MIME theo ĐUÔI tệp. Tệp quy ước kia được xuất ra là "opengraph-image"
 * không đuôi, Pages sẽ trả về octet-stream và Zalo/Facebook có thể từ chối
 * nhận là ảnh. Đặt tên thư mục là og.png thì tệp xuất ra mang đúng đuôi .png.
 * Đổi lại, thẻ og:image phải khai tay trong app/layout.tsx (qua `ogImage`
 * ở lib/og.ts) — Next không tự nhận route này là ảnh xem trước.
 */

// Host tĩnh: ảnh phải được dựng sẵn lúc build thành một tệp PNG nằm trong
// out/, không có máy chủ nào dựng nó lúc khách mở link.
export const dynamic = "force-static";

// Cùng bảng màu với app/globals.css. Đổi ở đó thì đổi cả ở đây.
const VOID = "#07080c";
const BONE = "#edeae3";
const ASH = "#99a0ae";
const FLAME = "#e8676b";
const SEAL = "#b62a30";

export async function GET() {
  const root = process.cwd();
  const [newsreader, beVietnam, heroJpg] = await Promise.all([
    readFile(join(root, "assets", "fonts", "newsreader-500.ttf")),
    readFile(join(root, "assets", "fonts", "bevietnam-400.ttf")),
    readFile(join(root, "public", ...heroPhoto.src.split("/").filter(Boolean))),
  ]);

  const heroSrc = `data:image/jpeg;base64,${heroJpg.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: VOID,
        fontFamily: "BeVietnam",
      }}
    >
      {/* Thư viện Tạ Quang Bửu — cùng tấm ảnh với màn thiệp */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroSrc}
        alt=""
        width={1200}
        height={630}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 30%",
        }}
      />

      {/* Hai lớp phủ, giống hệt màn thiệp trên trang: một lớp dìm chân ảnh
          để chữ có nền, một lớp hạ sáng nửa trái.

          Bốn cạnh phải viết đủ, không được dùng thuộc tính rút gọn `inset`:
          Satori bỏ qua `inset`, nên hai khối này sẽ ra kích thước 0 và biến
          mất, để lại chữ trắng nằm thẳng trên một tấm ảnh ban ngày. Ảnh xem
          trước hỏng kiểu đó thì không ai phát hiện được cho tới lúc link đã
          gửi đi rồi. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          background: `linear-gradient(to top, ${VOID} 10%, rgba(7,8,12,0.92) 44%, rgba(7,8,12,0.5) 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(to right, rgba(7,8,12,0.9), rgba(7,8,12,0) 70%)",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 44,
              height: 2,
              backgroundColor: SEAL,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 21,
              letterSpacing: 6,
              color: BONE,
            }}
          >
            {formatFullDate(event.startISO).toUpperCase()}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontFamily: "Newsreader",
            fontSize: 88,
            color: BONE,
          }}
        >
          {event.eventTitle}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 6,
            fontFamily: "Newsreader",
            fontSize: 64,
            color: FLAME,
          }}
        >
          {event.hostName}
        </div>

        <div
          style={{ display: "flex", marginTop: 34, fontSize: 25, color: ASH }}
        >
          {formatTime(event.startISO)} - {formatTime(event.endISO)}
          <span style={{ color: SEAL, margin: "0 16px" }}>·</span>
          {event.venue.name}
        </div>
      </div>
    </div>,
    {
      width: ogImage.width,
      height: ogImage.height,
      fonts: [
        { name: "Newsreader", data: newsreader, weight: 500, style: "normal" },
        { name: "BeVietnam", data: beVietnam, weight: 400, style: "normal" },
      ],
    },
  );
}

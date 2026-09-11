import type { CSSProperties } from "react";

/**
 * Chỉ dẫn cuộn ở màn mở thư.
 *
 * Một chiếc phong bì đóng kín không tự nói ra rằng nó mở được, và càng
 * không nói ra rằng nó mở bằng cách cuộn. Nên khối này là hướng dẫn sử
 * dụng chứ không phải trang trí, và nó phải nói đủ ba lần bằng ba ngôn
 * ngữ khác nhau: một dòng chữ, một hình con chuột có chấm con lăn đang
 * chạy xuống, và hai mũi nhọn rơi theo.
 *
 * Ba lớp ấy nói cùng một điều nhưng không thừa: dòng chữ dành cho người
 * đọc, con chuột dành cho người lướt qua, mũi nhọn dành cho người chỉ
 * bắt được chuyển động ở đuôi mắt.
 *
 * Toàn bộ chuyển động nằm trong CSS (xem app/globals.css), nên đây vẫn
 * là component không gửi thêm JavaScript nào xuống trình duyệt.
 */
export function ScrollCue() {
  return (
    // Ba khoảng cách khác nhau chứ không phải một `gap` chung. Dòng chữ
    // là một câu đứng riêng nên nó cần chỗ thở; con chuột và hai mũi
    // nhọn thì phải chụm lại thành MỘT hình, vì chúng đang cùng nói một
    // hướng. Cho cả ba cách đều nhau thì chúng thành ba vật rời nhau
    // xếp chồng, và mũi nhọn mất hẳn liên hệ với con chuột ở trên.
    <div className="flex flex-col items-center">
      {/* Chữ mờ hơn hẳn: nó là chú thích cho chiếc phong bì, không phải
          một dòng ngang hàng với nó. Sáng bằng chữ thân bài thì mắt đọc
          nó trước cả con dấu sáp — tức là trang tự giới thiệu bằng phần
          hướng dẫn sử dụng. */}
      <p className="mb-3.5 text-[0.6rem] tracking-[0.3em] text-ash/55 uppercase">Cuộn để mở thư</p>

      <span aria-hidden className="cue-mouse">
        <span className="cue-wheel" />
      </span>

      {/* Mũi thứ hai chậm hơn mũi thứ nhất chưa tới một phần năm giây.
          Đủ để mắt đọc ra một hướng chảy; nhiều hơn thì thành hai vật
          thể rời nhau chớp tắt so le. */}
      <span aria-hidden className="mt-2 flex flex-col items-center gap-0.75">
        <span className="cue-chev" />
        <span className="cue-chev" style={{ "--cue-delay": "170ms" } as CSSProperties} />
      </span>
    </div>
  );
}

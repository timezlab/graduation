/**
 * ─────────────────────────────────────────────────────────────
 *  HÀNH TRÌNH — phần kể chuyện, cố ý giữ thật ngắn.
 *
 *  Đây là thiệp mời, không phải hồ sơ năng lực. Mọi thứ ở đây được
 *  cắt xuống mức đủ để khách hiểu bốn năm vừa rồi diễn ra thế nào,
 *  rồi dừng lại. Không xếp hạng giải, không cấp bậc cuộc thi, không
 *  tên đơn vị tổ chức — bản đầy đủ nằm ở docs/PROFILE.md nếu cần tra.
 *
 *  Giọng kể là của một người sắp ra trường ngồi nhớ lại, không phải
 *  của người đang thuyết trình về mình. Mỗi mốc nên có một chỗ hơi
 *  vụng, hơi lạc, hơi run — đó mới là phần khách nhận ra mình trong đó.
 *
 *  Cứ sửa thoải mái cho đúng giọng của bạn.
 * ─────────────────────────────────────────────────────────────
 */

/** Câu trích dẫn lớn mở đầu khối hành trình. */
export const pullQuote =
  "Đã có lúc ngỡ mình đứng trên đỉnh, đã có lúc lạc lối chẳng thấy đường ra. Bốn năm là chừng ấy lần lên xuống, và những khoảnh khắc ấy đã giúp mình trưởng thành như ngày hôm nay.";

/** Hai đoạn dẫn. Đoạn đầu được thả chữ hoa lớn kiểu trang tạp chí. */
export const intro = [
  "Mùa thu 2022 mình bước vào Bách khoa, không quen ai và chưa biết mình sẽ làm gì với bốn năm sắp tới. Bốn năm sau vẫn chưa dám nói là đã biết, chỉ là đã thử đủ nhiều để biết mình không hợp với cái gì.",
  "Ở giữa là mấy đêm ngồi lì trước màn hình, vài dự án dang dở nằm im trong thư mục cũ, và không ít lần tưởng mình đi đúng rồi mới biết là chưa. Nhìn lại thì chẳng có gì to tát, nhưng cũng chẳng có gì mình muốn bỏ đi.",
];

export type Moment = {
  /** Nhãn thời gian bên trục */
  when: string;
  title: string;
  detail: string;
};

export const moments: Moment[] = [
  {
    when: "2022",
    title: "Bỡ ngỡ",
    detail:
      "Ngày đầu vào Bách khoa, một mình giữa sân trường rộng, không quen ai và chưa biết gì. Đi tìm phòng học cũng lạc, ngồi nghe giảng cũng chưa hiểu mình đang nghe gì.",
  },
  {
    when: "2023",
    title: "Thử sức",
    detail:
      "Được tham gia vào một nhóm khởi nghiệp của các anh chị đi trước. Kế hoạch viết đi viết lại, thuyết trình vấp lên vấp xuống, nhưng lần đầu mình được thấy một ý tưởng thật sự thành hình, và mình là một phần trong đó.",
  },
  {
    when: "2024",
    title: "Chạm vào thực tế",
    detail:
      "Bắt đầu tham gia những dự án công nghệ thật, có người dùng thật. Sáng lên lớp, tối ngồi sửa lỗi, và nhận ra ngoài kia không có đáp án in sẵn ở cuối sách.",
  },
  {
    when: "2025",
    title: "Rẽ sang lối mới",
    detail:
      "Coin rớt giá, mình rớt luôn sang AI. Vẫn là ngồi trước màn hình cả đêm, chỉ khác là màu đỏ giờ là lỗi build chứ không phải giá.",
  },
  {
    when: "27 · 09 · 2026",
    title: "Kỳ cuối",
    detail:
      "Kỳ học cuối của đời sinh viên khép lại ở Bách khoa Hà Nội. Cuối cùng cũng hết môn nợ, hết deadline, và hết cả lý do để ngủ đến trưa.",
  },
];

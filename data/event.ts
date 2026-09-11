/**
 * ─────────────────────────────────────────────────────────────
 *  FILE CẤU HÌNH CHÍNH — sửa ở đây là đủ cho 90% trường hợp.
 * ─────────────────────────────────────────────────────────────
 *
 *  QUAN TRỌNG về thời gian:
 *  `startISO` / `endISO` phải luôn kèm offset "+07:00" ở cuối.
 *  Nhờ vậy countdown và file lịch neo tuyệt đối vào giờ Việt Nam —
 *  khách ở nước ngoài mở web vẫn thấy đúng thời điểm, không bị lệch
 *  theo múi giờ máy của họ.
 */

export const event = {
  /** Tên hiển thị trên thiệp */
  hostName: "Lê Xuân Đại",

  school: "Đại học Bách khoa Hà Nội",

  /**
   * Lời mời ngắn — CỐ Ý dừng ở động từ, chưa có tân ngữ. Mỗi chỗ dùng tự
   * nối lấy phần đuôi hợp với ngữ cảnh của mình: trên thiệp là dòng tên
   * buổi lễ ngay bên dưới, ở hero là "buổi lễ" (trỏ ngược lên tiêu đề),
   * trong thẻ share là tên buổi lễ viết thường. Nhờ vậy không chỗ nào
   * phải nhắc "lễ tốt nghiệp" hai lần trong tầm mắt.
   *
   * Xưng hô: khách có cả anh chị, bạn bè lẫn các em. "Quý vị" phủ được
   * hết nhưng dựng lên một khoảng cách không có thật — đây là thiệp của
   * một người, không phải giấy mời của một cơ quan. "Anh chị và các bạn"
   * vẫn đủ lễ với người trên mà không hoá xa lạ với người ngang tuổi.
   */
  invitationLine: "Trân trọng kính mời anh chị và các bạn đến dự",

  eventTitle: "Lễ tốt nghiệp",

  // ── Thời gian ────────────────────────────────────────────────
  // 09:30 là giờ ƯỚC TÍNH lễ trong hội trường tan, tức là lúc chủ nhân ra
  // tới điểm hẹn. Nó không phải một giờ ấn định, nên mọi chỗ hiển thị đều
  // nói "khoảng". Đồng hồ đếm ngược vẫn neo vào đúng mốc này — đếm tới một
  // ước lượng thì vẫn hơn là không đếm tới đâu cả.
  startISO: "2026-09-27T09:30:00+07:00",
  endISO: "2026-09-27T12:00:00+07:00",

  // ── Địa điểm ─────────────────────────────────────────────────
  // ĐÂY LÀ ĐIỂM HẸN, KHÔNG PHẢI CHỖ LÀM LỄ. Lễ diễn ra trong hội trường
  // toà C2; toà C1 là chỗ mọi người vẫn đứng chụp ảnh. Toạ độ, link maps
  // và cả khối bản đồ cuối trang đều trỏ về C1 — đó là chỗ khách cần tìm.
  // Đừng đổi sang C2: khách không có việc gì ở đó.
  venue: {
    name: "Toà C1, Đại học Bách khoa Hà Nội",
    address: "Số 1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội",
    lat: 21.006727,
    lng: 105.843109,
    /** Link gốc do chủ nhân cung cấp, dùng cho nút "Mở trong Google Maps" */
    shortLink: "https://maps.app.goo.gl/BBPmANSDSSRt4ey77",
  },

  /**
   * Chỗ gửi xe. Đứng riêng chứ không nằm trong `notes` vì nó không phải một
   * lời dặn để đọc — nó là một địa điểm thứ hai khách phải tìm, nên cần có
   * đường dẫn bản đồ riêng của nó. Một câu chữ nói "gửi xe ở bãi trong
   * trường" bắt người ta tự dò; một cái nút thì không.
   */
  parking: {
    name: "Bãi xe D3",
    hint: "Vào từ cổng Đại Cồ Việt",
    shortLink: "https://maps.app.goo.gl/pvktHmr4awPsHgB19",
  },

  /**
   * Ghi chú thêm hiện ở khối chi tiết. Để mảng rỗng nếu không có gì.
   *
   * Chỉ giữ những lời dặn KHÔNG bấm được. Chỗ gửi xe đã thành nút riêng ở
   * trên, để lại đây nữa thì cùng một việc hiện hai lần trong một tầm mắt.
   */
  notes: [],

  // ── Liên hệ ──────────────────────────────────────────────────
  contact: {
    /** Dạng hiển thị. Khách gần như toàn người trong nước, nên số nội địa
     *  đọc quen mắt hơn dạng +84. */
    phone: "0344 211 600",
    /**
     * Cùng số đó ở dạng quốc tế, chỉ dùng cho link `tel:`. Máy trong nước
     * quay số nào cũng được, còn máy đang ở nước ngoài thì chỉ dạng này mới
     * nối được — và trang này có nói trước là khách ở xa cũng mở.
     */
    phoneE164: "+84344211600",
    email: "lexuandaibn@gmail.com",
    website: "https://graduation.timezlab.org",
  },

  /**
   * Câu mời đứng cuối khối chi tiết, sau hai nhóm nút. Khối hành trình cố
   * ý không mời ai — nó là hồi tưởng — nên lời mời trang trọng phải nằm ở
   * đây, ngay chỗ khách vừa đọc xong giờ giấc và địa chỉ. Xưng hô giữ
   * cùng giọng với `invitationLine`.
   */
  inviteNote:
    "Rất mong anh chị và các bạn sắp xếp thời gian đến chung vui cùng mình trong ngày đặc biệt này.",

  /**
   * Lời khép lại ở cuối trang. Vế đầu ghi nhận người khác — bốn năm có
   * nhiều người góp vào — rồi vế sau mới mời. Giữ giọng "mình" của khối
   * hành trình và cách xưng hô của `invitationLine`.
   */
  closingNote:
    "Bốn năm thanh xuân thời đại học của mình không chỉ do chính mình viết nên, mà còn được tô điểm bởi rất nhiều người quan trọng, mới thành một thời sinh viên rực rỡ đến thế. Nên ngày cuối khép lại cuộc hành trình này, mình rất mong được thấy đủ mặt anh chị và các bạn ở đó, để cùng nhau nhìn lại quãng đường ấy và để mình được nói một lời cảm ơn thật chân thành tới mọi người.",
} as const;

/** Mô tả dùng cho file .ics và link Google Calendar. */
// Không nhắc lại `event.school` ở đây: `venue.name` đã chứa tên trường rồi,
// ghép cả hai sẽ thành "Đại học Bách khoa Hà Nội — Toà C1, Đại học Bách khoa Hà Nội".
export const calendarDescription = [
  `${event.eventTitle} của ${event.hostName}.`,
  `${event.venue.name}, ${event.venue.address}.`,
  "",
  `Chi tiết: ${event.contact.website}`,
].join("\n");

export type EventConfig = typeof event;

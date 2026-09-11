/**
 * ─────────────────────────────────────────────────────────────
 *  BÁCH KHOA — ẢNH THẬT CỦA NHỮNG NƠI CHỐN
 *
 *  Khác hẳn data/gallery.ts: chỗ kia là ảnh cá nhân bạn sẽ tự thay,
 *  còn đây là ảnh tư liệu khuôn viên trường, dùng làm lớp nền thị sai.
 *  MỌI ảnh ở đây đều bắt buộc ghi nguồn — phần ghi nguồn nằm ở cuối
 *  trang, do components/SiteFooter.tsx đọc thẳng từ mảng này.
 *
 *  Trừ hai ngoại lệ, tất cả tải từ Wikimedia Commons và mang giấy phép
 *  Creative Commons. Hai ngoại lệ là ảnh Cổng Parabol trong
 *  campusLandmarks và heroPhoto ở cuối file — cả hai đều có ghi chú cảnh
 *  báo ngay trên nó, và cả hai đều là ảnh nhỏ, chưa rõ giấy phép.
 *
 *  Xoá một ảnh khỏi đây thì dòng ghi nguồn tương ứng cũng biến mất
 *  theo, không bao giờ lệch nhau.
 *
 *  Vài tấm đã phải sửa trước khi đưa vào public/hust/: hai ảnh bị xén
 *  bỏ dấu chìm của người chụp ở góc phải dưới, còn ảnh Hồ Tiền thì xoá
 *  dòng ngày giờ máy ảnh in đỏ ở mép phải.
 * ─────────────────────────────────────────────────────────────
 */

export type CampusPhoto = {
  src: string;
  /** Tên nơi chốn, hiện dưới ảnh */
  place: string;
  /** Một câu ngắn, không phải chú thích bảo tàng */
  note: string;
  alt: string;
  width: number;
  height: number;
  credit: { author: string; license: string; source: string };
};

const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/File:${file}`;

/** Ảnh nền lớn của khối "Nơi chốn", trôi chậm nhất trong ba lớp thị sai. */
export const campusBackdrop: CampusPhoto = {
  src: "/hust/thu-vien-binh-minh.jpg",
  place: "Thư viện Tạ Quang Bửu",
  note: "Bình minh trên đường Trần Đại Nghĩa.",
  alt: "Thư viện Tạ Quang Bửu lúc bình minh, nắng vàng hắt ngang mặt tiền toà nhà.",
  width: 640,
  height: 480,
  credit: {
    author: "Malagi",
    license: "CC BY-SA 3.0",
    source: commons("Bkhn1.jpg"),
  },
};

/**
 * Quảng trường trước toà C1 — chính là điểm hẹn.
 *
 * Tách ra thành hằng riêng vì tấm này có hai chỗ đứng: khép lại hàng ảnh
 * "Nơi chốn", và đè lên góc bản đồ ở khối cuối trang để khách nhận ra chỗ
 * hẹn khi đã tới nơi. Vẫn nằm trong campusLandmarks nên phần ghi nguồn ở
 * chân trang không phải liệt kê thêm.
 */
export const c1Square: CampusPhoto = {
  src: "/hust/c1-front.jpg",
  place: "Quảng trường C1",
  note: "Giữa sân là trái tim Bách Khoa, mấy năm không đổi chỗ.",
  alt: "Quảng trường trước toà C1 lúc hoàng hôn, biểu tượng chữ BK và trái tim đỏ đặt giữa lối đi lát gạch.",
  width: 1920,
  height: 1021,
  credit: {
    author: "Dungnhincainay",
    license: "CC BY-SA 4.0",
    source: commons("Tr%C6%B0%E1%BB%9Bc_C1.png"),
  },
};

/** Năm nơi chốn, xếp theo đúng thứ tự đi từ cổng Giải Phóng vào trong. */
export const campusLandmarks: CampusPhoto[] = [
  {
    // ⚠ Tấm duy nhất trong mảng này không lấy từ Wikimedia Commons, và cũng
    // là tấm nhỏ nhất — 515×388, tức chỉ vừa đủ cho ô rộng nhất của hàng ảnh,
    // không còn dư cho màn 2x. Nó nằm đây vì đây mới đúng là cổng Parabol mà
    // người ta nhớ: nhìn thẳng từ Giải Phóng, không phải nhìn từ sân sau.
    src: "/hust/cong-parabol-giai-phong.jpg",
    place: "Cổng Parabol",
    note: "Nghe nói sắp dỡ. Mà nhắc Bách Khoa thì vẫn là cái vòm này.",
    alt: "Cổng Parabol nhìn thẳng từ đường Giải Phóng, vòm cong trắng bắc qua lối vào và hàng rào xếp đóng kín phía dưới.",
    width: 515,
    height: 388,
    credit: {
      author: "chưa rõ tác giả",
      license: "chưa rõ giấy phép",
      source:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmKwEgoh91uTPdGgY6tEVEQnb9utFW2zwqjCcgiyQsbQ&s=10",
    },
  },
  {
    src: "/hust/thu-vien.jpg",
    place: "Thư viện Tạ Quang Bửu",
    note: "Ôn thi ở đây, chạy deadline cũng ở đây.",
    alt: "Mặt tiền Thư viện Tạ Quang Bửu nhìn chính diện, hàng cọ hai bên và chữ HUST màu đỏ trước cửa.",
    width: 1920,
    height: 967,
    credit: {
      author: "Dungnhincainay",
      license: "CC BY-SA 4.0",
      source: commons(
        "Th%C6%B0_vi%E1%BB%87n_T%E1%BA%A1_Quang_B%E1%BB%ADu_.jpg",
      ),
    },
  },
  {
    src: "/hust/duong-tinh-yeu.jpg",
    place: "Con đường tình yêu",
    note: "Ra trường rồi mới biết: tên đường không tự khắc thành sự thật.",
    alt: "Lối đi hai hàng cây trong khuôn viên Bách Khoa, hai bên là những băng ghế dài đặt dưới bóng cây.",
    width: 1400,
    height: 1050,
    credit: {
      author: "Phan Minh Tuấn",
      license: "CC BY-SA 4.0",
      source: commons(
        "%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_khoa_H%C3%A0_N%E1%BB%99i_03.JPG",
      ),
    },
  },
  {
    src: "/hust/ho-tien.jpg",
    place: "Hồ Tiền",
    note: "Đi qua bốn năm mà vẫn chưa hỏi được ai vì sao hồ lại tên là Tiền.",
    alt: "Hồ Tiền nhìn sang toà thư viện, mặt nước phẳng ở tiền cảnh và một cành liễu rủ bên phải khung hình.",
    width: 480,
    height: 640,
    credit: {
      author: "Lê Anh Tuấn",
      license: "CC BY-SA 3.0",
      source: commons("Thuvien_taquangbuu.jpg"),
    },
  },
  c1Square,
];

/**
 * Ảnh nền của màn thiệp — tấm ảnh đầu tiên người ta nhìn thấy.
 *
 * Trước đây là toà C1, tức đúng nơi buổi lễ diễn ra. Giờ là Thư viện Tạ
 * Quang Bửu: không phải nơi tổ chức, mà là thứ ai học Bách khoa cũng
 * nhận ra ngay từ cái mái cong. Nên biến này tên là `heroPhoto` chứ
 * không còn là `venuePhoto` — nó không hứa hẹn đây là địa điểm nữa,
 * địa điểm đã có nguyên một dòng chữ nói rõ ở ngay bên dưới.
 *
 * Chọn góc chếch chứ không chọn ảnh chính diện có sẵn trong
 * campusLandmarks: khối chữ ở màn thiệp dồn hết về trái, mà một mặt
 * tiền đối xứng tuyệt đối thì kéo mắt về đúng giữa khung. Góc chếch có
 * đường mái chạy xuống trái, nó dẫn mắt về phía khối chữ thay vì cãi lại.
 *
 * ⚠ Hai chỗ chưa ổn, xem README:
 *   1. Ảnh chỉ 822×542. Mọi ảnh khác ở đây đều ≥1400px, và màn thiệp
 *      còn phóng to ảnh này lên lúc mở ra, nên nó là ảnh mềm nhất trang.
 *   2. Nguồn là một trang doanh nghiệp, không ghi giấy phép. Khác hẳn
 *      phần còn lại của file này vốn toàn Wikimedia Creative Commons.
 */
export const heroPhoto: CampusPhoto = {
  src: "/hust/thu-vien-goc-cheo.jpg",
  place: "Thư viện Tạ Quang Bửu",
  note: "Cái mái cong ai học Bách khoa cũng nhận ra.",
  alt: "Thư viện Tạ Quang Bửu nhìn chếch từ dưới lên, mái cong màu xanh và hàng cau vua trước cửa.",
  width: 822,
  height: 542,
  credit: {
    author: "cdcjsc.vn",
    license: "chưa rõ giấy phép",
    source: "https://cdcjsc.vn/FileUpload/Images/untitled135.png",
  },
};

/** Mọi ảnh tư liệu, gộp lại để phần ghi nguồn không phải liệt kê tay. */
export const allCampusPhotos: CampusPhoto[] = [
  heroPhoto,
  campusBackdrop,
  ...campusLandmarks,
];

/**
 * Dấu hiệu nhận diện chính thức của trường.
 *
 * Chỉ còn hai, và cố ý dừng ở hai. Con dấu "Đại học Bách Khoa" là thứ
 * đóng lên nắp phong bì ở màn mở đầu, đúng vai một con dấu sáp; chữ HUST
 * là thứ đứng cạnh tên người ở chân màn. Mỗi cái có đúng một chỗ đứng và
 * một việc để làm.
 *
 * Trang này từng mang thêm logo SoICT ở ba chỗ. Bỏ hẳn: hai dấu hiệu xếp
 * cạnh nhau thì thành một hàng logo tài trợ, và một tấm thiệp mời không
 * có nhà tài trợ.
 */
export const marks = {
  hustWordmark: { src: "/hust/hust-wordmark.svg", alt: "Logo chữ HUST" },
  bkEmblem: {
    src: "/hust/bk-emblem.png",
    alt: "Con dấu Đại học Bách Khoa Hà Nội",
    width: 420,
    height: 634,
  },
} as const;

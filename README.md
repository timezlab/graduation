# Thiệp mời lễ tốt nghiệp, Lê Xuân Đại

Trang web mời dự lễ tốt nghiệp, ngày **27.09.2026** tại **toà C1, Đại học Bách khoa Hà Nội**.

```bash
npm run dev     # http://localhost:3000
npm run build   # dựng bản production
```

Trang mở ra bằng một chiếc phong bì đóng kín có con dấu sáp dập chữ HUST. Cuộn
xuống thì sáp vỡ, nắp thư lật ngược lên, thân bì tụt xuống khỏi tấm thiệp, rồi
mặt giấy của tấm thiệp tan ra và chính khung tấm thiệp ấy nở kín màn hình thành
màn thiệp chính. Không có cú cắt cảnh nào ở giữa. Phần còn lại của trang là
thông tin buổi lễ, những nơi chốn quen thuộc trong khuôn viên Bách Khoa, và bốn
năm kể rất vắn tắt.

---

## Sửa nội dung ở đâu

Toàn bộ chữ nghĩa nằm trong bốn file. Không cần đụng tới component.

| File                                 | Chứa gì                                        | Sửa khi nào                                                |
| ------------------------------------ | ---------------------------------------------- | ---------------------------------------------------------- |
| [`data/event.ts`](data/event.ts)     | Ngày giờ, địa điểm, toạ độ, liên hệ, ghi chú   | **Đây là file chính.** Đổi giờ hay đổi phòng thì sửa ở đây |
| [`data/gallery.ts`](data/gallery.ts) | Dải ảnh chạy vòng, **tám ô đang là ảnh tạm**   | Ngay khi có ảnh cá nhân. Xem mục dưới                      |
| [`data/journey.ts`](data/journey.ts) | Câu trích dẫn, hai đoạn dẫn, năm mốc thời gian | Bản nháp, nên viết lại cho đúng giọng của bạn              |
| [`data/campus.ts`](data/campus.ts)   | Ảnh tư liệu khuôn viên + phần ghi nguồn        | Hiếm khi. Đọc kỹ mục "Ảnh khuôn viên" trước khi đụng       |

Đổi giờ lễ chỉ cần sửa đúng hai dòng:

```ts
startISO: "2026-09-27T09:30:00+07:00",
endISO:   "2026-09-27T12:00:00+07:00",
```

Đuôi `+07:00` **bắt buộc phải giữ**. Nhờ nó mà đồng hồ đếm ngược và file lịch
neo tuyệt đối vào giờ Việt Nam: khách đang ở Nhật hay Đức mở trang vẫn thấy đúng
thời điểm, thay vì bị lệch theo múi giờ máy họ.

### Thay tám ảnh tạm

Đây là việc cần làm trước khi gửi link cho ai. Tám ảnh trong
[`data/gallery.ts`](data/gallery.ts) hiện là ảnh mẫu lấy từ picsum.photos, chỉ
để dải chạy ngang có đúng hình dạng và nhịp cuối cùng của nó.

Với mỗi ảnh:

1. Bỏ ảnh vào `public/anh/` (đặt tên không dấu)
2. Sửa `src` thành `"/anh/ten-file.jpg"`
3. Sửa `width` / `height` cho khớp kích thước **thật** của ảnh. Sai số này làm
   nhảy khung lúc ảnh đang tải
4. Viết lại `caption`, `year`, `alt`
5. Xoá dòng `mock: true`

Thay được bao nhiêu thì thay bấy nhiêu, không cần đủ tám. Mảng còn dưới bốn ảnh
thì dải vẫn chạy nhưng mối nối bắt đầu lộ, nên sáu tới tám là khoảng đẹp nhất.
Mảng rỗng thì cả khối tự biến mất khỏi trang, không để lại khoảng hở.

Thay xong hết thì gỡ luôn dòng `picsum.photos` trong
[`next.config.ts`](next.config.ts): mỗi tên miền để lại ở đó là một chỗ mà trình
tối ưu ảnh chấp nhận tải về hộ.

### Ảnh khuôn viên

Năm tấm ảnh ở khối "Nơi chốn", ảnh nền toà C1 ở màn thiệp và ảnh bình minh trên
thư viện đều là **ảnh tư liệu thật lấy từ Wikimedia Commons**, giấy phép
Creative Commons BY hoặc BY-SA. Cả hai giấy phép đó **buộc phải ghi tên tác
giả**.

Phần ghi nguồn ở cuối trang đọc thẳng từ mảng trong
[`data/campus.ts`](data/campus.ts), nên thêm hay bớt một tấm thì dòng ghi nguồn
tự đổi theo. Đừng bao giờ xoá trường `credit` mà vẫn giữ ảnh.

Hai tấm có đóng dấu chìm của người chụp ở góc phải dưới đã được xén bỏ phần đó
trước khi đưa vào `public/hust/`.

Huy hiệu Bách Khoa và logo chữ HUST là dấu hiệu nhận diện chính thức của trường.
Chỉ còn hai, và cố ý dừng ở hai: huy hiệu đứng trên tấm thiệp trong phong bì,
chữ HUST đứng cạnh tên người ở chân màn đầu và ở chân trang. Mỗi cái có đúng
một chỗ đứng và một việc để làm. Logo SoICT từng nằm ở ba chỗ và đã bỏ hẳn —
hai dấu hiệu xếp cạnh nhau thì thành một hàng logo tài trợ, mà một tấm thiệp
mời thì không có nhà tài trợ. Bỏ nó cũng kéo theo hai vạch ngăn dọc: một vạch
ngăn chỉ có nghĩa khi nó ngăn hai thứ.

---

## Cấu trúc

```
app/
  layout.tsx            font, thẻ meta, lớp hạt phim, thanh tiến độ cuộn
  page.tsx              ghép sáu khối theo thứ tự
  og.png/route.tsx      ảnh 1200×630 hiện khi dán link vào Zalo/Messenger
  event.ics/route.ts    file lịch tải về, dựng sẵn lúc build
  icon.tsx              favicon mũ cử nhân, dựng bằng mã (hình ở lib/icon.tsx)
  apple-icon.tsx        cùng hình, cỡ 180 cho màn hình chính iOS
  globals.css           bảng màu + toàn bộ hệ chuyển động
components/
  Envelope.tsx          màn mở thư, cảnh 3D điều khiển bằng cuộn
  HeroPanel.tsx         chữ của màn thiệp, nằm bên trong khung phong bì
  ScrollCue.tsx         chỉ dẫn cuộn: chữ, hình chuột, hai mũi nhọn
  Countdown.tsx         đồng hồ đếm ngược kiểu bánh xe chữ số
  EventDetails.tsx      khi nào, ở đâu, thêm vào lịch
  CampusBand.tsx        năm mốc khuôn viên, bảy lớp thị sai
  Journey.tsx           bốn năm, kể vắn tắt
  PhotoMarquee.tsx      dải ảnh hai hàng chạy ngược chiều, thuần CSS
  VenueMap.tsx          bản đồ nhúng + nút chỉ đường
  DistanceFromYou.tsx   đo khoảng cách từ vị trí khách
  SiteFooter.tsx        lời khép lại, liên hệ, ghi nguồn ảnh
  Dock.tsx              thanh dính hiện sau khi cuộn qua màn thiệp
  Parallax.tsx          lớp trôi theo nhịp cuộn, dùng lại được
  Parabol.tsx           cung parabol, mô típ riêng của trang
  SectionHeading.tsx    cụm tiêu đề dùng chung
  InView.tsx            bật cờ `in-view` khi khối vào khung nhìn
  RiseText.tsx          cắt câu thành từng từ để chữ dựng lên
  Magnetic.tsx          nút bị con trỏ hút nhẹ
lib/
  datetime.ts           định dạng ngày giờ theo múi giờ Việt Nam
  calendar.ts           sinh file .ics và link Google/Outlook
  geo.ts                Haversine, ước lượng thời gian đi, link bản đồ
public/hust/            ảnh khuôn viên + huy hiệu và logo chữ HUST
assets/fonts/           TTF nhúng vào ảnh xem trước (không gửi xuống trình duyệt)
docs/PROFILE.md         hồ sơ gốc rút từ CV, dùng làm nguồn tra cứu
```

---

## Ngôn ngữ thiết kế: "Đêm Bách Khoa"

**Màu.** Nền gần như đen ngả lạnh, chữ màu xương, và đúng **một** sắc nhấn: đỏ
Bách Khoa lấy thẳng từ con dấu trường. Không có màu thứ hai. Vàng chỉ tồn tại
bên trong ảnh huy hiệu chính thức, không bao giờ thành màu giao diện.

Đỏ có hai sắc độ và ranh giới giữa chúng là bắt buộc chứ không phải thẩm mỹ:

| Biến                      | Dùng để                    | Vì sao                                                                                    |
| ------------------------- | -------------------------- | ----------------------------------------------------------------------------------------- |
| `--color-seal` `#b62a30`  | Tô nền: nút, con dấu, vạch | Chữ nhỏ đặt trên nó phải là `--color-onseal`                                              |
| `--color-flame` `#e8676b` | Viết chữ trên nền tối      | Sắc `seal` làm chữ nhỏ trên nền đen chỉ đạt 3.1:1, trượt chuẩn WCAG AA. `flame` đạt 6.1:1 |

**Chữ.** Newsreader cho tiêu đề, Be Vietnam Pro cho thân bài. Newsreader thay
cho Playfair không phải để đổi cho khác: trên nền gần đen, serif tương phản cao
kiểu Didone bị đứt nét ở phần thanh nhất và chữ trông rỗ. Newsreader có trục
quang học và nét thanh dày dặn hơn nên giữ được dáng thiệp in mà vẫn đọc được.
Cả hai font đều nạp bộ ký tự `vietnamese`.

**Hình.** Một giá trị bo góc cho cả trang: `2px`, đúng bằng độ sắc của một mép
giấy xén máy. Ngoại lệ duy nhất là con dấu sáp, và nó tròn vì sáp nhỏ xuống giấy
thì loang thành hình tròn, không phải vì trang cần thêm một hình dạng nữa.

**Mô típ.** Cổng Parabol ở phía Đại Cồ Việt là hình bóng ai học Bách Khoa cũng
nhận ra ngay, nhưng không có tấm ảnh nào của nó được phát hành theo giấy phép tự
do. Nên thay vì mượn ảnh không rõ nguồn, trang lấy đúng cái hình học của nó: một
cung parabol ([`Parabol.tsx`](components/Parabol.tsx)), dùng ở ba chỗ và chỉ ba
chỗ đó. Rải thêm nữa thì nó thành hoa văn nền, mà hoa văn nền thì chẳng còn
nghĩa gì.

**Bố cục.** Sáu khối, sáu lối dựng, không khối nào lặp lại khối nào:

| Khối         | Lối dựng                                                                     |
| ------------ | ---------------------------------------------------------------------------- |
| Envelope     | cảnh 3D ghim tại chỗ, điều khiển bằng cuộn, khép lại bằng màn thiệp tràn màn |
| EventDetails | hai cột lệch, cột trái dính lại                                              |
| CampusBand   | năm lớp ảnh trôi ở năm tốc độ                                                |
| Journey      | trục dọc, rồi dải ảnh chạy vòng tràn hết bề ngang                            |
| VenueMap     | bản đồ tràn màn, thẻ địa chỉ đè chồng lên                                    |
| SiteFooter   | một cột, căn giữa                                                            |

---

## Hệ chuyển động

Bốn cơ chế, chia theo việc chúng làm được.

**Chạy một lần lúc mở trang.** `@keyframes` thuần CSS, độ trễ từng dòng đặt qua
biến `--d`. Dùng `animation` chứ không phải `transition` vì transition cần một
lần đổi class mới nổ, mà đổi class thì phải chờ JavaScript.

**Chạy khi cuộn tới.** Một `IntersectionObserver` đặt ở khối cha
([`InView.tsx`](components/InView.tsx)) gắn class `in-view`, các class `.fade` /
`.rise` / `.rule` bên trong tự lo phần còn lại. Cả một bảng mười mấy dòng chỉ tốn
đúng một observer.

> Bẫy đã sập một lần: [`RiseText`](components/RiseText.tsx) giữ mỗi từ ở
> `opacity: 0` cho tới khi có một khối cha nhận `in-view`. Đặt nó ngoài `InView`
> thì tiêu đề **không bao giờ hiện ra**, và vì trang vẫn dựng thành công nên lỗi
> chỉ lộ khi mở mắt ra nhìn.

**Bám theo vị trí cuộn, thuần CSS.** Thanh tiến độ và trục hành trình dùng
`animation-timeline: scroll()` / `view()`. Trình duyệt tự nội suy, không có hàm
nào của mình chạy trên mỗi khung hình. Tất cả nằm trong `@supports` và đều có
trạng thái mặc định tử tế: trình duyệt chưa hỗ trợ thì mất hiệu ứng chứ không
thấy trang vỡ.

**Bám theo vị trí cuộn, dùng Motion.** Cảnh mở thư và các lớp thị sai dùng
`useScroll` + `useTransform` của [`motion`](https://motion.dev). Giá trị chảy
qua motion value chứ không qua `useState`, nên cuộn một trăm khung hình cũng
không sinh một lần render React nào. Một lớp `useSpring` rất căng đặt sau cùng
để nuốt mấy bước nhảy thô của bánh xe chuột.

Dải ảnh ở khối Hành trình là **thuần CSS**, không một byte JavaScript nào:
danh sách in ra hai lần rồi trượt đi đúng `-50%` chiều rộng của chính nó, nên
điểm nối rơi vào đúng chỗ bản sao bắt đầu và mắt không bắt được mối.

### Về `prefers-reduced-motion`

Trang **cố ý không đọc** cài đặt này. Mọi hoạt cảnh chạy như nhau với mọi giá
trị của nó, kể cả `reduce`. Đây là quyết định của chủ trang chứ không phải sơ
suất: cảnh mở thư và các lớp thị sai là nội dung chính của tấm thiệp này chứ
không phải lớp trang trí thêm vào.

Đánh đổi cần biết: người bật cài đặt này thường bật vì lý do sức khoẻ (say
chuyển động, rối loạn tiền đình), và họ sẽ nhận đủ cả thị sai lẫn cảnh mở thư.

Đổi ý thì thêm lại một khối `@media (prefers-reduced-motion: reduce)` ở cuối
[`globals.css`](app/globals.css). Ghi chú tại đúng chỗ đó liệt kê hai cái bẫy
phải xử lý cùng lúc, đọc trước khi viết.

---

## Vài quyết định kỹ thuật, và lý do

**Không có khối "màn thiệp" riêng.** Màn thiệp chính là khung hình cuối của
[`Envelope.tsx`](components/Envelope.tsx): toàn bộ trang chính được dựng sẵn ở
kích thước thật ngay từ khung hình đầu tiên, và một ô cắt `clip-path` giữ nó lại
trong đúng kích thước một tấm thiệp cho tới lúc morph. Cuộn tới thì ô cắt mở ra
hết cỡ.

Cách khác — dựng màn thiệp thành một khối thứ hai nằm ngay dưới — thì lúc sân
khấu dính hết hạn và bắt đầu cuộn đi, hai bản của cùng một màn cùng có mặt trên
màn hình một lúc và mắt đọc ra nội dung lặp lại đúng chỗ nối. Đây là lý do
`components/Hero.tsx` không còn tồn tại.

Ô cắt viết bằng `calc()` đọc `--card-w/--card-h` từ
[`globals.css`](app/globals.css) chứ không đo phần tử bằng JavaScript. Đo thì
phải nghe `ResizeObserver`, phải chạy lại sau mỗi lần đổi cỡ màn hình, và luôn
trễ đúng một khung hình so với bố cục thật.

**Phong bì dựng bằng transform 3D thật.** Nắp thư có hai mặt riêng với
`backface-visibility: hidden`; thiếu mặt thứ hai thì lật quá 90° sẽ thấy mặt
ngoài in ngược. Ba chỗ dễ sai:

1. Mặt trong nắp thư phải lật bằng `rotateY(180deg)`, **không phải** `rotateX`.
   Cả hai đều cho ra một mặt sau đúng nghĩa, nhưng `rotateX` lật quanh tâm chính
   nó nên nó lộn ngược hình tam giác đã cắt trong hệ toạ độ cục bộ; bản lề ở mép
   trên lật thêm một lần nữa, và kết quả là mở xong thì mũi nhọn vẫn **chúc
   xuống** thay vì **chổng lên**. `rotateY` chỉ soi gương trái–phải, mà tam giác
   thì đối xứng trái–phải nên không ai thấy.
2. Khi nắp đã lật quá 90° nó chiếm chỗ ở phía **trên** mép phong bì, đúng vào
   vùng mà khung thiệp sắp nở ra. Nên `z-index` của nắp bị hạ xuống dưới khung ở
   mốc 0.38, lúc chưa có vật thể nào chồng lên nó.
3. Miệng bì khoét đỉnh ở 44% chiều cao, còn đỉnh nắp thư ở 48%: chênh bốn điểm
   phần trăm ấy là thứ duy nhất bảo đảm nắp che kín miệng bì lúc đóng. Cho hai
   số bằng nhau thì răng cưa của trình duyệt để lọt một sợi sáng chạy dọc đúng
   chỗ đó.

Ba nếp gấp tĩnh ở mặt sau (hai cánh hông, một cánh đáy) là **lớp phủ** đặt trên
một thân bì liền khối, không phải ba mảnh giấy rời. Cắt thành ba mảnh thật thì
ba đường biên gặp nhau đúng giữa mặt bì và khử răng cưa để lọt một chấm sáng nằm
chính chỗ ấy.

**Chất liệu phong bì.** Bốn thứ đã phải làm lại sau khi soi ảnh chụp, và cả bốn
đều hỏng vì cùng một kiểu sai — vẽ đúng cấu tạo nhưng sai liều lượng:

- _Thớ giấy_ từng là hai dải kẻ chồng nhau. Hai dải kẻ thì bao giờ cũng giao
  thoa: chu kỳ 4px cho ra sợi carbon, giãn lên 9/11 vẫn còn đọc ra một tấm lưới.
  Giờ chỉ còn **một** dải cộng ba đám mây mềm — thứ không có chu kỳ thì không có
  hoa văn nào để dựng lên.
- _Màu thân bì_ từng là xanh navy. Giấy không có sắc màu riêng, nó chỉ trả lại
  màu của ánh sáng chiếu vào nó; đổi sang xám trung tính là đủ để nó thôi trông
  như nhựa, không phải kéo sáng thêm bậc nào.
- _Cánh đáy_ là **tam giác**, nhưng mũi của nó nằm ở 50% chứ không ở 55% — tức
  là cao hơn chỗ hai cánh hông gặp nhau 5%. Đây là điều kiện để thứ tự gấp còn
  đúng chứ không phải chuyện bố cục: hai mép cùng xuất phát từ góc dưới, cái
  nào dốc hơn thì cái ấy nằm trên, và cánh đáy dốc -1%/% so với -0.9%/% của
  cánh hông. Cho hai mũi trùng nhau thì bốn nếp gấp quy về đúng **một** điểm
  giữa mặt bì — hình chiếc phong bì trong bộ emoji ✉, thứ mắt đọc ra biểu
  tượng trước khi kịp đọc ra vật thể. Lệch 5% là đủ để bốn đường ấy có ba chỗ
  gặp nhau thay vì một. (Từng thử cắt bằng mép trên thành hình thang: phá được
  chữ X triệt để hơn, nhưng cái đuôi vuông thì không còn ra chiếc phong bì.)
- _Độ tương phản nếp gấp_ phải kéo xuống một phần ba. Mặt sau một chiếc phong bì
  thật gần như phẳng một màu: ba cánh cùng cắt từ một tờ, chênh nhau đúng một bề
  dày giấy. Vẽ chúng thành ba mảng sáng khác nhau thì cánh đáy thành một cái
  nhãn dán.

**Con dấu sáp** ba lần ra cái nút bấm. Hai lần đầu đi sửa bề mặt — bỏ điểm
chói, thêm hạt, đổi màu. Lần thứ ba thêm hẳn một vành vàng kim, và nó **vẫn**
là cái nút.

Thứ sai không phải cái vành mà là **hướng ánh sáng**. Cả ba bản đều sáng ở
trên–trái và tối dần xuống dưới–phải trên toàn bộ mặt đỏ — đó là cách một khối
_lồi_ bắt sáng, và một khối tròn lồi có viền kim loại quanh mép thì không còn
cách đọc nào khác ngoài cái nút. Mà con dấu sáp thì **lõm**: khuôn ép xuống,
sáp bị đẩy ra rìa và dồn thành gờ nổi quanh mép, lòng dấu tụt xuống thấp hơn.
Nên ánh sáng phải tách làm hai phần ngược nhau — gờ ngoài sáng ở trên vì nó
lồi, lòng dấu tối ở trên và sáng nhạt ở dưới vì nó lõm. Cùng một màu sáp, cùng
một cái vành, chỉ đảo chiều sáng ở phần lòng, và cái nút thành vết dập.

Chỗ đặt vàng thì thử hai lần và bỏ cả hai. Một **dải liền quanh mép ngoài** là
cái nẹp của tấm huy hiệu, không phải chi tiết của con dấu: dải liền ôm trọn chu
vi thì nó _đóng khung_ cái hình bên trong, và mắt đọc ra một vật được viền lại
— tấm mề đay. Một **vòng vạch đứt quãng lùi vào trong lòng dấu**, kiểu vòng hạt
nổi mà khuôn dấu thật hay khắc, thì đúng hơn hẳn về cấu tạo — nhưng ở cỡ 56–72px
mỗi mũi chỉ chỉ còn vài pixel, và vài pixel vàng cạnh nhau trên nền đỏ sẫm
không đọc ra sợi chỉ, nó đọc ra răng cưa.

Nên con dấu này **không có kim loại nào**. Chỉ có sáp, và toàn bộ việc phân
biệt nó với cái nút nằm ở chiều sáng. Ít chi tiết hơn, nhưng không có chi tiết
nào phải thu nhỏ tới mức mất nghĩa — đó là ràng buộc thật của một vật 56px, và
nó thắng mọi lập luận về cấu tạo.

Mép ngoài để bán kính lệch nhau vài phần trăm, còn lòng dấu tròn đúng 50%. Mép
sáp là chỗ sáp tự trào ra nên nó méo; lòng dấu là hình của cái khuôn nên nó
tròn tuyệt đối. Hai đường tròn không đồng dạng chính là thứ nói ra rằng có hai
vật đã gặp nhau ở đây.

**Dòng "chưa mở"** ở đỉnh sân khấu là thứ chiếc phong bì không tự nói được: nó
là thư gửi _cho ai_ và nó _chưa từng được mở_. Con dấu sáp còn nguyên có nói
điều thứ hai, nhưng phải nhận ra đó là sáp đã. Dòng này nói thẳng cả hai bằng
đúng giọng của một dòng hộp thư đến — cố ý **không** viết hoa và **không** giãn
chữ như dòng chỉ dẫn cuộn ở dưới, vì dòng dưới là nhãn hướng dẫn sử dụng còn
dòng này là một câu người ta nói với mình. Nó cũng tắt chậm hơn chỉ dẫn nửa
nhịp (0.08 so với 0.05): chỉ dẫn là việc phải làm nên xong việc thì đi ngay,
còn một câu chào thì được phép nán lại.

Chấm đỏ đứng trước nó để **inline** trong mạch chữ chứ không dựng flex với một
`gap` — trên màn hình hẹp dòng này xuống hai dòng, mà `flex` + `items-center`
thì căn chấm vào giữa _cả khối_ hai dòng và nó trôi lửng lơ giữa hai dòng chữ.
Nhịp thở của chấm là 4.2s, trùng khít với `.breathe` của con dấu sáp: hai vật
đang nói cùng một điều nên chúng phải thở cùng nhau, chứ không phải nhấp nháy
độc lập bắt mắt chia đôi chú ý.

Con chuột trong chỉ dẫn cuộn thu từ `2.3rem` xuống `1.9rem`, và **cả năm con số
của chấm con lăn** — vị trí đầu, chiều cao, ba chặng rơi — đều nhân đúng 82.6%
theo. Thu nhỏ cái vỏ mà giữ nguyên quãng rơi thì chấm chạy chạm đáy.

Có lúc đường biên đã bị đổi hẳn sang `clip-path` 64 đỉnh cho ra một giọt sáp
méo có thuỳ. Hình ấy đúng với một giọt sáp **tự do** nhỏ xuống giấy rồi tự
đông — nhưng con dấu này không tự do, nó bị khuôn ép ngay lúc sáp còn chảy, và
cái ép sau cùng mới quyết định đường biên. Đổi lại, `box-shadow` về được ngay
trên phần tử con dấu: nó đi theo `border-radius` nhưng **không** đi theo
`clip-path` — bản đa giác trước đã phải mượn thêm một lớp cha mang
`drop-shadow` chỉ để có bóng.

**Hoạ tiết duy nhất trên mặt bì** là một khung dập chìm chạy đúng theo hình
chiếc phong bì, thụt vào đều một khoảng. Nó vẽ bằng SVG chứ không bằng CSS vì
thứ cần vẽ là _đường viền_ của một ngũ giác lõm: `clip-path` tô được cả hình,
`border` vẽ được viền chữ nhật, không thứ nào vẽ được biên của một đa giác bất
kỳ. Hai thuộc tính bắt buộc: `preserveAspectRatio="none"` để khung kéo theo tỉ
lệ thân bì, và `vector-effect="non-scaling-stroke"` để nét thì **không** kéo
theo — thiếu nó thì phép giãn dọc/ngang khác nhau làm viền dày mỏng lệch nhau
giữa các cạnh.

Đường viền, dòng chữ nhà in và hai vạch kẹp hai bên nó đều dùng chung một ngữ
pháp dập chìm: một nét tối là lòng rãnh, một sợi sáng lệch xuống một pixel là gờ
giấy bị đẩy trồi lên. Ba chỗ ấy phải nói cùng một thứ tiếng, không thì chúng
thành ba lần in khác nhau.

**Thanh cuộn bị giấu** bằng `scrollbar-width: none` cộng `::-webkit-scrollbar`
(phải khai cả hai, không thay nhau được). Giấu được là vì trang **đã có** chỉ
báo tiến độ riêng — vạch đỏ `.scroll-progress` bám đỉnh màn hình; không có nó
thì đây là lấy đi thông tin của người dùng chứ không phải dọn giao diện. Tuyệt
đối không giấu bằng `overflow: hidden`: làm vậy là khoá luôn việc cuộn, mà cả
cảnh mở thư chạy bằng vị trí cuộn.

**Bản đồ không dùng API key.** Iframe trỏ tới
`google.com/maps?q=<lat>,<lng>&output=embed`. Không có hạn mức để hết, không có
hoá đơn phát sinh sau ngày lễ, không có khoá nào hết hạn vào lúc bạn đã quên mất
trang này tồn tại. Bản đồ được đảo màu bằng bộ lọc CSS để hợp với trang tối; lớp
phủ bên trên bắt buộc phải `pointer-events-none`, thiếu nó thì nó nuốt hết thao
tác kéo và phóng to.

**File `.ics` phục vụ từ một địa chỉ thật, không phải blob.** Safari trên iOS xử
lý thuộc tính `download` trên blob URL rất chập chờn; mở một đường dẫn `.ics`
thật thì hệ điều hành chuyển thẳng sang ứng dụng Lịch. File tuân theo RFC 5545:
xuống dòng CRLF, gấp dòng ở mốc 75 **octet** (đếm theo byte UTF-8, vì chữ Việt
có dấu chiếm 2 tới 3 byte), escape đúng dấu phẩy và chấm phẩy.

**Đếm ngược không hiện số thật ở lần render đầu.** Máy chủ không biết "bây giờ"
của khách là mấy giờ. Render số ngay sẽ gây hydration mismatch, nên mọi bánh xe
đứng ở 0 cho tới khi component gắn vào DOM. Đúng cái ràng buộc ấy lại tặng không
một hiệu ứng: các bánh xe quay từ 00 lên đúng số còn lại ngay khi trang mở.

**Định vị chỉ chạy khi khách bấm nút.** Hộp thoại xin quyền bật lên ngay lúc mở
thiệp vừa khó chịu vừa dễ bị bấm "Chặn" theo phản xạ, mà đã chặn một lần thì lần
sau khó xin lại. Mọi nhánh lỗi (từ chối, hết giờ, không có HTTPS) đều dẫn tới
một câu giải thích kèm nút chỉ đường thủ công, không để khách mắc kẹt.

**Ảnh xem trước phải viết đủ bốn cạnh, không dùng `inset`.** Satori (bộ dựng ảnh
của `next/og`) bỏ qua thuộc tính rút gọn `inset`, nên hai lớp phủ gradient sẽ ra
kích thước 0 và biến mất, để lại chữ trắng nằm thẳng trên một tấm ảnh ban ngày.
Ảnh xem trước hỏng kiểu đó thì không ai phát hiện được cho tới lúc link đã gửi
đi rồi.

**Nội dung không phụ thuộc JavaScript.** Khối `<noscript>` trong
[`app/layout.tsx`](app/layout.tsx) ép mọi khối đang chờ hiệu ứng hiện hết, ẩn
hẳn thanh dính, và **tháo** cảnh mở thư ra thành một màn tĩnh: bỏ đường chạy
320vh, gỡ sân khấu khỏi thế dính, mở ô cắt `clip-path` hết cỡ, rồi giấu phần chỉ
còn nghĩa khi có chuyển động (thân bì, con dấu, chỉ dẫn cuộn). Ẩn hẳn cả cảnh
như trước là không được nữa: màn thiệp nay nằm bên trong chính khung tấm thiệp
ấy. `!important` ở đó là bắt buộc, vì Motion kết xuất sẵn giá trị khởi đầu vào
thuộc tính `style` ngay trong HTML từ máy chủ.

---

## Triển khai

Trang chạy trên **GitHub Pages** tại `https://graduation.timezlab.org`, dựng
tĩnh bằng `output: "export"` (xem [`next.config.ts`](next.config.ts)). Đẩy
lên nhánh `main` là workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
tự build rồi đưa thư mục `out/` lên Pages.

Thiết lập một lần trong repo:

1. **Settings → Pages → Source**: chọn *GitHub Actions*.
2. **Settings → Pages → Custom domain**: điền `graduation.timezlab.org`
   (phải khớp với [`public/CNAME`](public/CNAME)), bật *Enforce HTTPS*.
3. DNS của `timezlab.org`: bản ghi `CNAME graduation → timezlab.github.io`.

Vài thứ đi kèm host tĩnh, đừng bỏ:

- `public/.nojekyll` — thiếu nó Pages bỏ qua thư mục `_next/` và trang trắng.
- `images.unoptimized` — không có máy chủ tối ưu ảnh, ảnh trong `public/` phải
  nén sẵn.
- Ảnh xem trước nằm ở `app/og.png/route.tsx` chứ không phải `opengraph-image.tsx`:
  Pages định kiểu MIME theo đuôi tệp, và tệp quy ước kia xuất ra không có đuôi.

URL tuyệt đối của ảnh xem trước lấy từ `event.contact.website`. Dựng thử lên
một nơi khác thì đặt `NEXT_PUBLIC_SITE_URL`; thiếu nó thì Zalo/Messenger hiện
ô trống thay cho ảnh thiệp.

Chạy thử bản tĩnh tại máy:

```bash
npm run build && npx serve out
```

Trang đặt `robots: noindex`, thiệp mời không cần nằm trên kết quả tìm kiếm. Muốn
cho Google lập chỉ mục thì sửa trong [`app/layout.tsx`](app/layout.tsx).

---

## Còn có thể thêm

Đã cân nhắc nhưng chưa làm, vì nằm ngoài phạm vi ban đầu:

- **RSVP**: form xác nhận tham dự, ghi vào Google Sheet qua Apps Script
- **Lời mời riêng**: `/?ten=Minh` để dòng mời gọi đúng tên từng khách

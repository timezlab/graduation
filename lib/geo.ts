/**
 * Tính khoảng cách giữa khách và địa điểm tổ chức.
 *
 * Dùng công thức Haversine — khoảng cách theo đường chim bay. Với quãng
 * đường thực tế trong nội thành, đường đi luôn dài hơn đường chim bay,
 * nên phần ước lượng bên dưới có nhân thêm hệ số bù.
 */

const EARTH_RADIUS_KM = 6371;

export type Coords = { lat: number; lng: number };

const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Khoảng cách đường chim bay, đơn vị km. */
export function haversineKm(a: Coords, b: Coords): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

/**
 * Hệ số bù đường vòng cho đô thị Việt Nam: đường thực tế thường dài hơn
 * đường chim bay khoảng 30%.
 */
const DETOUR_FACTOR = 1.3;

/** Vận tốc trung bình khi đi xe trong nội thành Hà Nội, km/h. */
const CITY_SPEED_KMH = 22;

/**
 * "1,2 km" hoặc "850 m" — dùng dấu phẩy thập phân theo chuẩn tiếng Việt.
 *
 * `scale` quyết định chọn đơn vị nào và giữ mấy chữ số thập phân, mặc định
 * là chính con số đem hiển thị. Tách nó ra thành tham số riêng là để phục vụ
 * hiệu ứng đếm tăng dần: truyền giá trị đích vào đây thì đơn vị được chốt từ
 * đầu, thay vì nhảy từ "m" sang "km" giữa lúc con số đang chạy.
 */
export function formatDistance(km: number, scale: number = km): string {
  if (scale < 1) return `${Math.round(km * 1000)} m`;
  const rounded = scale < 10 ? km.toFixed(1) : Math.round(km).toString();
  return `${rounded.replace(".", ",")} km`;
}

/** Ước lượng thời gian di chuyển, làm tròn lên 5 phút cho khỏi giả vờ chính xác. */
export function estimateTravelMinutes(km: number): number {
  const minutes = ((km * DETOUR_FACTOR) / CITY_SPEED_KMH) * 60;
  return Math.max(5, Math.ceil(minutes / 5) * 5);
}

/** "khoảng 25 phút" / "khoảng 1 giờ 15 phút" */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `khoảng ${minutes} phút`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `khoảng ${h} giờ` : `khoảng ${h} giờ ${m} phút`;
}

// ── Liên kết bản đồ ────────────────────────────────────────────

/**
 * Bản đồ nhúng. Dạng URL này không cần API key và không có hạn mức —
 * lý do chọn bản đồ 2D thay vì 3D có tính phí.
 */
export function embedMapUrl(venue: Coords, zoom = 17): string {
  return `https://www.google.com/maps?q=${venue.lat},${venue.lng}&z=${zoom}&hl=vi&output=embed`;
}

/**
 * Mở chỉ đường. Trên điện thoại, link này bật thẳng ứng dụng Google Maps
 * và để nó lo phần dẫn đường từng chặng — việc mà bản đồ nhúng làm không tốt.
 */
export function directionsUrl(venue: Coords, origin?: Coords): string {
  const params = new URLSearchParams({
    api: "1",
    destination: `${venue.lat},${venue.lng}`,
  });
  if (origin) params.set("origin", `${origin.lat},${origin.lng}`);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

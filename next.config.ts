import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trang được đưa lên GitHub Pages — một máy chủ tĩnh, không chạy Node.
  // `export` bảo Next dựng sẵn toàn bộ thành HTML/CSS/JS trong thư mục
  // out/. Mọi thứ cần máy chủ (tối ưu ảnh, route động, header) đều không
  // dùng được ở đây, nên đừng thêm gì trong số đó vào.
  output: "export",

  images: {
    // Không có máy chủ thì không có ai tối ưu ảnh hộ: <Image> phải phát
    // thẳng tệp gốc trong public/. Vì thế ảnh trong public/hust/ cần được
    // nén sẵn trước khi đưa vào, đừng trông vào Next nữa.
    unoptimized: true,
  },
};

export default nextConfig;

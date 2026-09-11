import type { CSSProperties } from "react";
import { intro, moments, pullQuote } from "@/data/journey";
import { InView } from "./InView";
import { PhotoMarquee } from "./PhotoMarquee";
import { SectionHeading } from "./SectionHeading";

/**
 * Khối hành trình. Ngắn, và cố ý ngắn.
 *
 * Cột trái dính lại khi cột phải cuộn qua: câu trích dẫn nằm yên trong tầm
 * mắt suốt lúc đọc năm cái mốc, nên hai phần đọc như một chứ không phải hai
 * khối rời nhau. Xuống màn hẹp thì hai cột xếp chồng và tính dính tự tắt,
 * vì trên điện thoại chẳng có chỗ nào để mà dính.
 *
 * Dải ảnh chạy vòng đặt ngay sau phần chữ, tràn hết chiều ngang màn hình.
 * Nó cố tình phá khung: cả khối trên bị bó trong lưới 80rem, nên một dải
 * trôi qua sát hai mép màn hình là chỗ ngắt nhịp trước khi sang chân trang.
 */
export function Journey() {
  return (
    <section
      id="hanh-trinh"
      className="scroll-mt-20 border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-24">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading title="Bốn năm, gói cho gọn lại" />

            <InView>
              <figure className="mt-10 border-l border-seal/50 pl-6">
                {/* leading-[1.25] chứ không phải leading-tight: câu này in
                    nghiêng và có chữ "đứng" với đuôi g thò xuống, để dòng
                    sát quá thì cái đuôi ấy bị cắt cụt. */}
                <blockquote className="fade pb-1 font-display text-xl leading-[1.25] text-balance text-bone italic sm:text-[1.6rem]">
                  “{pullQuote}”
                </blockquote>
              </figure>
            </InView>
          </div>

          <div>
            <InView>
              {intro.map((paragraph, index) => (
                <p
                  key={index}
                  className={`fade text-[0.975rem] leading-[1.9] text-pretty text-ash sm:text-base ${
                    index === 0 ? "dropcap" : "mt-6"
                  }`}
                  style={{ "--d": `${index * 120}ms` } as CSSProperties}
                >
                  {paragraph}
                </p>
              ))}
            </InView>

            <ol className="relative mt-16">
              {/* Đường nền luôn hiện; vệt đỏ bên trên mới vạch theo nhịp cuộn.
                  Phần căn giữa và phần vạch bắt buộc nằm ở hai thẻ khác nhau:
                  cả hai đều ghi vào transform, gộp một chỗ thì cái này xoá
                  mất cái kia. */}
              <span
                aria-hidden
                className="spine-wrap absolute top-2 bottom-2 left-[3px] w-px -translate-x-1/2 bg-line"
              >
                <span className="spine block h-full w-full bg-seal" />
              </span>

              {moments.map((moment, index) => (
                <li key={moment.when}>
                  <InView
                    className={`grid grid-cols-[0.75rem_1fr] gap-x-7 ${
                      index === moments.length - 1 ? "" : "pb-14"
                    }`}
                  >
                    {/* Chấm dịch lên nửa thân và sang trái nửa thân bằng
                        `translate` chứ không phải `transform`: .fade đã
                        chiếm transform để trượt vào, ghi đè là mất hiệu
                        ứng. Hai thuộc tính này cộng dồn, không đè nhau. */}
                    <div className="flex justify-center pt-[0.55rem]">
                      <span
                        aria-hidden
                        className="fade h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-seal ring-4 ring-void"
                      />
                    </div>

                    <div>
                      <span
                        className="fade tabular block text-[0.7rem] tracking-[0.18em] text-faint uppercase"
                        style={{ "--d": "60ms" } as CSSProperties}
                      >
                        {moment.when}
                      </span>

                      <h3
                        className="fade mt-2 font-display text-xl leading-snug font-normal text-bone sm:text-2xl"
                        style={{ "--d": "120ms" } as CSSProperties}
                      >
                        {moment.title}
                      </h3>

                      <p
                        className="fade mt-2.5 max-w-xl text-[0.9rem] leading-relaxed text-pretty text-ash sm:text-[0.95rem]"
                        style={{ "--d": "190ms" } as CSSProperties}
                      >
                        {moment.detail}
                      </p>
                    </div>
                  </InView>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-24 sm:mt-32">
        <PhotoMarquee />
      </div>
    </section>
  );
}

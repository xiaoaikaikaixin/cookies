"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "@/lib/cart-context";
import type { ProductDetailContent } from "@/lib/product-detail-content";

type ProductPurchasePanelProps = {
  product: {
    id: number;
    name: string;
    nameCn: string;
    category: string;
    unit: string;
    image: string;
    price: number;
  };
  detailContent: ProductDetailContent;
};

export default function ProductPurchasePanel({ product, detailContent }: ProductPurchasePanelProps) {
  const { addItem } = useCart();
  const sizeOptions = detailContent.sizeOptions?.length ? detailContent.sizeOptions : [product.unit];
  const defaultSize = detailContent.defaultSize ?? sizeOptions[0];
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [quantity, setQuantity] = useState(1);

  const displayPrice = detailContent.displayPrice ?? product.price;
  const priceSuffix = detailContent.displayPriceSuffix ?? "";
  const displayTitle = detailContent.productTitle ?? `${product.nameCn} ${product.name}`.trim();
  const displaySubtitle = detailContent.productSubtitle ?? product.category;

  const addToCartProduct = useMemo(
    () => ({
      id: product.id,
      name: `${product.name} (${selectedSize})`,
      nameCn: product.nameCn,
      price: displayPrice,
      image: product.image,
    }),
    [displayPrice, product.id, product.image, product.name, product.nameCn, selectedSize]
  );

  const handleAddToCart = () => {
    addItem(addToCartProduct, quantity);
    toast.success(`已加入 ${product.nameCn} x ${quantity}`);
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="space-y-3">
        <p className="inline-flex rounded-full bg-[#FFF7ED] px-3 py-1 text-xs font-semibold tracking-[0.16em] text-[#B97933]">
          {product.category}
        </p>
        <div className="space-y-2">
          <h1 className="font-[family-name:var(--font-serif)] text-3xl font-bold leading-tight text-brown md:text-4xl">
            {displayTitle}
          </h1>
          <p className="text-lg font-medium text-[#8B6440]">{displaySubtitle}</p>
        </div>
      </div>

      <div className="rounded-[1.8rem] border border-[#EAD8C7] bg-[linear-gradient(180deg,#FFFDF9_0%,#FBF2E8_100%)] p-5 shadow-[0_18px_40px_rgba(120,80,40,0.05)] sm:p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="product-size" className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8C6A4E]">
              Size
            </label>
            <select
              id="product-size"
              value={selectedSize}
              onChange={(event) => setSelectedSize(event.target.value)}
              className="h-12 w-full rounded-xl border border-[#DCC4A9] bg-white px-4 text-base font-medium text-[#5C3008] outline-none transition focus:border-[#C0823A] focus:ring-2 focus:ring-[#F0D2A8]"
            >
              {sizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 border-t border-[#EAD8C7] pt-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8C6A4E]">Price</p>
            <p className="text-3xl font-bold text-[#5C3008]">
              ${displayPrice.toFixed(2)}{" "}
              {priceSuffix ? <span className="text-lg font-semibold text-[#7A5535]">{priceSuffix}</span> : null}
            </p>
          </div>

          <div className="space-y-3 border-t border-[#EAD8C7] pt-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8C6A4E]">Quantity</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="inline-flex h-12 items-stretch overflow-hidden rounded-xl border border-[#D8B98F] bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="flex h-full w-12 items-center justify-center bg-[#7A1638] text-xl font-bold text-white transition hover:bg-[#64112D]"
                  aria-label="减少数量"
                >
                  -
                </button>
                <div className="flex h-full min-w-14 items-center justify-center px-4 text-base font-semibold text-[#5C3008]">
                  {quantity}
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="flex h-full w-12 items-center justify-center bg-[#7A1638] text-xl font-bold text-white transition hover:bg-[#64112D]"
                  aria-label="增加数量"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-[#7A1638] px-6 text-base font-extrabold uppercase tracking-[0.06em] text-white shadow-[0_12px_24px_rgba(122,22,56,0.2)] transition hover:-translate-y-0.5 hover:bg-[#64112D] hover:shadow-[0_16px_28px_rgba(122,22,56,0.26)]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="overflow-hidden rounded-[1.8rem] border border-[#E4D5C7] bg-white shadow-[0_16px_36px_rgba(120,80,40,0.05)]">
        <div className="bg-[#7A1638] px-5 py-4 text-lg font-bold text-white">
          {detailContent.descriptionTitle ?? "Product Description"}
        </div>
        <div className="space-y-8 px-5 py-6 sm:px-6 sm:py-7">
          {detailContent.sections.map((section, index) => {
            if (section.type === "paragraph") {
              return (
                <div key={`paragraph-${index}`} className="space-y-4">
                  {section.content.map((paragraph, paragraphIndex) => {
                    const isBrandLine = paragraph === "Lisa Handmade Cookies";
                    const isTagline = paragraph === "纯手工制作 · 真材实料 · 满口幸福";

                    return (
                      <p
                        key={`${index}-${paragraphIndex}`}
                        className={`leading-8 ${
                          isBrandLine
                            ? "font-[family-name:var(--font-serif)] text-xl font-bold text-[#5C3008]"
                            : isTagline
                              ? "text-base font-semibold text-[#8C5E2D]"
                              : "text-[15px] text-[#5A4637]"
                        }`}
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              );
            }

            if (section.type === "feature-list") {
              return (
                <div key={`feature-${index}`} className="space-y-5 border-t border-[#EFE4D8] pt-8">
                  <h2 className="font-[family-name:var(--font-serif)] text-2xl font-bold text-[#5C3008]">产品特色</h2>
                  <div className="rounded-2xl border border-[#F2E6D9] bg-[#FFFCF8] px-4 py-5 sm:px-5">
                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={item.title}
                          className={itemIndex === 0 ? "" : "border-t border-[#F3E7DA] pt-4"}
                        >
                          <h3 className="text-lg font-bold text-[#7A1638]">{item.title}</h3>
                          <p className="mt-1.5 text-[15px] leading-7 text-[#5A4637]">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={`ingredients-${index}`} className="space-y-4 border-t border-[#EFE4D8] pt-8">
                <div className="space-y-2">
                  <h2 className="font-[family-name:var(--font-serif)] text-2xl font-bold text-[#5C3008]">{section.title}</h2>
                  {section.subtitle ? <p className="text-sm font-semibold tracking-[0.12em] text-[#8C6A4E]">{section.subtitle}</p> : null}
                </div>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-7 text-[#5A4637]">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#C0823A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

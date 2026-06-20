"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/lib/cart-context";
import { getProductImage } from "@/lib/product-images";

type RelatedProduct = {
  id: number;
  slug: string;
  name: string;
  nameCn: string;
  image: string;
  price: number;
  unit: string;
};

type RelatedProductsGridProps = {
  products: RelatedProduct[];
};

export default function RelatedProductsGrid({ products }: RelatedProductsGridProps) {
  const { addItem } = useCart();

  if (!products.length) return null;

  return (
    <section className="mt-16 space-y-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B97933]">You May Also Like</p>
        <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl font-bold text-[#5C3008] md:text-4xl">
          其他精选年饼
        </h2>
        <p className="mt-3 text-sm text-[#8B6F52] md:text-base">继续浏览其他人气口味，也可以直接加入购物车。</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => {
          const productImage = getProductImage(product.slug, product.image);

          return (
            <article
              key={product.id}
              className="overflow-hidden rounded-[1.6rem] border border-[#E9DDCF] bg-white shadow-[0_14px_34px_rgba(120,80,40,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(120,80,40,0.10)]"
            >
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="overflow-hidden bg-[#F7EFE5]">
                  <div className="relative aspect-[4/4.2]">
                    <img
                      src={productImage}
                      alt={`${product.nameCn} ${product.name}`}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </Link>

              <div className="space-y-2 px-4 pb-4 pt-5 text-center">
                <Link href={`/products/${product.slug}`} className="block">
                  <h3 className="text-lg font-bold text-[#5C3008] transition hover:text-[#B97933]">
                    {product.nameCn}
                  </h3>
                  <p className="mt-1 text-sm text-[#8B6F52]">{product.name}</p>
                </Link>

                <div className="pt-1">
                  <p className="text-3xl font-bold text-[#C0823A]">RM {product.price.toFixed(2)}</p>
                  <p className="mt-1 text-xs font-medium text-[#8B6F52]">每{product.unit}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addItem({
                      id: product.id,
                      name: product.name,
                      nameCn: product.nameCn,
                      price: product.price,
                      image: productImage,
                    });
                    toast.success(`已加入 ${product.nameCn}`);
                  }}
                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#C88A3C] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(200,138,60,0.18)] transition hover:bg-[#A96B2C] hover:shadow-[0_14px_26px_rgba(200,138,60,0.24)]"
                >
                  <ShoppingCart size={15} />
                  加入购物车
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

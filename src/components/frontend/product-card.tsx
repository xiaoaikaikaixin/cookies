"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import toast from "react-hot-toast";
import { getProductImage } from "@/lib/product-images";

interface Props {
  id: number;
  name: string;
  nameCn: string;
  slug: string;
  price: number;
  image: string;
  unit: string;
}

export default function ProductCard({ id, name, nameCn, slug, price, image, unit }: Props) {
  const { addItem } = useCart();
  const productImage = getProductImage(slug, image);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, nameCn, price, image: productImage });
    toast.success(`已加入 ${nameCn}`);
  };

  return (
    <Link
      href={`/products/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-[#EFE5D8] bg-white shadow-[0_8px_24px_rgba(120,80,30,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(120,80,30,0.10)]"
    >
      <div className="aspect-square overflow-hidden bg-[#F7EFE5]">
        <img
          src={productImage}
          alt={`${nameCn} ${name}`}
          className="h-full w-full object-cover transition duration-400 group-hover:scale-[1.04]"
        />
      </div>
      <div className="space-y-1.5 p-4 text-center">
        <h3 className="line-clamp-1 text-[15px] font-semibold text-[#5C3008]">{nameCn}</h3>
        <p className="line-clamp-1 text-xs text-[#8B6F52]">{name}</p>
        <div className="text-lg font-bold text-[#C0823A]">
          RM {price.toFixed(2)}
        </div>
        <p className="text-[11px] text-[#8B6F52]">每{unit}</p>
        <button
          onClick={handleAdd}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#C0823A] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9E5F2A]"
          title="Add to cart"
        >
          <ShoppingCart size={14} />
          加入购物车
        </button>
      </div>
    </Link>
  );
}

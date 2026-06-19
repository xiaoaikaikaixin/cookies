"use client";

import { useCart } from "@/lib/cart-context";
import toast from "react-hot-toast";

interface Props {
  product: { id: number; name: string; nameCn: string; price: number; image: string };
}

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product);
    toast.success(`已加入 ${product.nameCn}`);
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full cursor-pointer rounded-xl bg-primary px-8 py-3.5 text-lg font-bold text-white hover:bg-primary-dark"
    >
      加入购物车 - RM {product.price.toFixed(2)}
    </button>
  );
}

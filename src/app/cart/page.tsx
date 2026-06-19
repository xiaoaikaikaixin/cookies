"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/products" className="inline-flex items-center gap-1 text-brown hover:text-primary mb-6 text-sm"><ArrowLeft size={16} /> 继续选购</Link>
      <h1 className="text-3xl font-bold mb-8 font-[family-name:var(--font-serif)] text-brown">购物车 ({totalItems})</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-[#EFE5D8]">
          <span className="text-6xl block mb-4">🛒</span>
          <p className="text-gray-500 mb-4">购物车还是空的</p>
          <Link href="/products" className="inline-block bg-primary text-white font-bold px-6 py-2 rounded-full hover:bg-primary-dark transition-colors">浏览年饼</Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-8">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-[#EFE5D8]">
                <div className="h-20 w-20 overflow-hidden rounded-xl bg-[#F7EFE5]">
                  <img src={item.image} alt={item.nameCn} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-brown">{item.nameCn}</p>
                  <p className="text-sm text-gray-500">{item.name}</p>
                  <p className="text-primary font-bold">RM {(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 border rounded hover:bg-gray-100 cursor-pointer"><Minus size={14} /></button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 border rounded hover:bg-gray-100 cursor-pointer"><Plus size={14} /></button>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 cursor-pointer"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#EFE5D8]">
            <div className="flex justify-between text-2xl font-bold mb-6">
              <span>总计</span>
              <span className="text-primary">RM {totalPrice.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="block w-full bg-primary text-white text-center py-3 rounded-full font-bold text-lg hover:bg-primary-dark transition-colors">前往结账</Link>
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose}></div>}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-[#EFE5D8]">
            <h2 className="text-lg font-bold flex items-center gap-2"><ShoppingBag size={20} /> 购物车 ({totalItems})</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded cursor-pointer"><X size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <ShoppingBag size={48} className="mx-auto mb-3 opacity-30" />
                <p>购物车还是空的</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-[#FFFDFA] rounded-lg">
                    <div className="h-14 w-14 overflow-hidden rounded-lg bg-[#F7EFE5]">
                      <img src={item.image} alt={item.nameCn} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.nameCn}</p>
                      <p className="text-primary font-bold">RM {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-200 rounded cursor-pointer"><Minus size={14} /></button>
                      <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-200 rounded cursor-pointer"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-1 text-gray-400 hover:text-red-500 cursor-pointer"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-[#EFE5D8] p-4">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>总计</span>
                <span className="text-primary">RM {totalPrice.toFixed(2)}</span>
              </div>
              <Link href="/checkout" className="block w-full bg-primary text-white text-center py-3 rounded-full font-bold hover:bg-primary-dark transition-colors" onClick={onClose}>前往结账</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

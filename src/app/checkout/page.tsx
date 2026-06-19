"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    notes: "",
    paymentMethod: "paynow" as "paynow" | "whatsapp",
  });

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty. Add some cookies first!</p>
        <Link href="/products" className="text-primary font-bold hover:underline">Browse Products →</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ productId: i.id, quantity: i.quantity, price: i.price })),
          totalAmount: totalPrice,
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      const data = await res.json();
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/order-confirmation/${data.orderId}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/cart" className="inline-flex items-center gap-1 text-brown hover:text-primary mb-6 text-sm"><ArrowLeft size={16} /> Back to Cart</Link>
      <h1 className="text-3xl font-bold mb-8 font-[family-name:var(--font-serif)] text-brown">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-3 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-brown">Contact Information</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} placeholder="Your full name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input required type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} placeholder="+65 9123 4567" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" value={form.customerEmail} onChange={(e) => setForm({ ...form, customerEmail: e.target.value })} placeholder="your@email.com" />
          </div>

          <h2 className="text-lg font-bold text-brown mt-4">Payment Method</h2>
          <div className="flex gap-4">
            <label className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-colors ${form.paymentMethod === "paynow" ? "border-primary bg-[#FFFBF5]" : "border-gray-200"}`}>
              <input type="radio" name="paymentMethod" value="paynow" checked={form.paymentMethod === "paynow"} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value as any })} className="sr-only" />
              <div className="text-center">
                <span className="text-2xl block mb-1">📱</span>
                <p className="font-semibold text-sm">PayNow</p>
              </div>
            </label>
            <label className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-colors ${form.paymentMethod === "whatsapp" ? "border-primary bg-[#FFFBF5]" : "border-gray-200"}`}>
              <input type="radio" name="paymentMethod" value="whatsapp" checked={form.paymentMethod === "whatsapp"} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value as any })} className="sr-only" />
              <div className="text-center">
                <span className="text-2xl block mb-1">💬</span>
                <p className="font-semibold text-sm">WhatsApp</p>
              </div>
            </label>
          </div>

          {form.paymentMethod === "paynow" && (
            <div className="p-4 bg-[#FFFDFA] rounded-xl text-center border border-[#EFE5D8]">
              <p className="font-semibold mb-2">PayNow to UEN: 202412345C</p>
              <p className="text-sm text-gray-500">After payment, upload the screenshot below or WhatsApp us the proof.</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (optional)</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any special requests..." />
          </div>

          <button type="submit" disabled={submitting} className="w-full bg-primary text-white font-bold py-3 rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50 cursor-pointer mt-4">
            {submitting ? "Placing Order..." : `Place Order — $${totalPrice.toFixed(2)}`}
          </button>
        </form>

        {/* Order summary */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#EFE5D8] sticky top-24">
            <h2 className="text-lg font-bold text-brown mb-4">Order Summary</h2>
            <div className="flex flex-col gap-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.nameCn} × {item.quantity}</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#EFE5D8] pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

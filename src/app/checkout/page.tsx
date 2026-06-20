"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft, MessageCircleMore, Smartphone } from "lucide-react";

const CHECKOUT_FORM_STORAGE_KEY = "cookie-checkout-form";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const [submitting, setSubmitting] = useState(false);
  const [formReady, setFormReady] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    address: "",
    deliveryDate: new Date().toISOString().split("T")[0],
    notes: "",
    paymentMethod: "paynow" as "paynow" | "whatsapp",
  });

  useEffect(() => {
    const savedForm = window.sessionStorage.getItem(CHECKOUT_FORM_STORAGE_KEY);
    if (!savedForm) {
      setFormReady(true);
      return;
    }

    try {
      const parsedForm = JSON.parse(savedForm) as Partial<typeof form>;
      setForm((current) => ({ ...current, ...parsedForm }));
    } catch {
      window.sessionStorage.removeItem(CHECKOUT_FORM_STORAGE_KEY);
    } finally {
      setFormReady(true);
    }
  }, []);

  useEffect(() => {
    if (!formReady) return;
    window.sessionStorage.setItem(CHECKOUT_FORM_STORAGE_KEY, JSON.stringify(form));
  }, [form, formReady]);

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
          notes: [
            `Address: ${form.address}`,
            `Delivery Date: ${form.deliveryDate}`,
            form.notes.trim(),
          ]
            .filter(Boolean)
            .join("\n\n"),
          items: items.map((i) => ({ productId: i.id, quantity: i.quantity, price: i.price })),
          totalAmount: totalPrice,
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      const data = await res.json();
      toast.success("Order placed successfully!");

      if (form.paymentMethod === "whatsapp") {
        clearCart();
        window.sessionStorage.removeItem(CHECKOUT_FORM_STORAGE_KEY);
      }

      router.push(
        form.paymentMethod === "paynow"
          ? `/order-payment/${data.orderId}`
          : `/order-confirmation/${data.orderId}`
      );
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
        <form id="checkout-form" onSubmit={handleSubmit} className="md:col-span-3 flex flex-col gap-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
            <textarea
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Your delivery address"
            />
          </div>

          <h2 className="text-lg font-bold text-brown mt-4">Payment Method</h2>
          <div className="flex gap-4">
            <label className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-colors ${form.paymentMethod === "paynow" ? "border-primary bg-[#FFFBF5]" : "border-gray-200"}`}>
              <input type="radio" name="paymentMethod" value="paynow" checked={form.paymentMethod === "paynow"} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value as any })} className="sr-only" />
              <div className="text-center">
                <Smartphone size={24} className="mx-auto mb-2 text-primary" />
                <p className="font-semibold text-sm">PayNow</p>
              </div>
            </label>
            <label className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-colors ${form.paymentMethod === "whatsapp" ? "border-primary bg-[#FFFBF5]" : "border-gray-200"}`}>
              <input type="radio" name="paymentMethod" value="whatsapp" checked={form.paymentMethod === "whatsapp"} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value as any })} className="sr-only" />
              <div className="text-center">
                <MessageCircleMore size={24} className="mx-auto mb-2 text-primary" />
                <p className="font-semibold text-sm">WhatsApp</p>
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (optional)</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any special requests..." />
          </div>

        </form>

        {/* Order summary */}
        <div className="md:col-span-2">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-xl border border-[#EFE5D8] bg-white p-6 shadow-sm">
              <h2 className="text-3xl font-bold font-[family-name:var(--font-serif)] text-brown">
                When should we deliver
              </h2>
              <div className="mt-5 rounded-lg bg-[#FAF7F2] px-4 py-3 text-base font-semibold text-brown">
                Delivery Details
              </div>
              <div className="mt-5">
                <label className="mb-3 block text-lg font-semibold text-brown">
                  Delivery Date <span className="text-[#C63B3B]">*</span>
                </label>
                <input
                  required
                  type="date"
                  min={today}
                  className="w-full rounded-none border border-[#A6D74F] bg-white px-4 py-4 text-lg text-[#5B4A3A] outline-none transition focus:border-[#86C020] focus:ring-2 focus:ring-[#D9EEAF]"
                  value={form.deliveryDate}
                  onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                />
                <p className="mt-4 text-base leading-8 text-[#5B4A3A]">
                  Deliveries will be made between 11am to 6pm and the exact time will depend on
                  the driver&apos;s route that day.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#EFE5D8]">
            <h2 className="text-lg font-bold text-brown mb-4">Order Summary Information</h2>
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
              <button
                type="submit"
                form="checkout-form"
                disabled={submitting}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Placing Order..." : `Place Order - $${totalPrice.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

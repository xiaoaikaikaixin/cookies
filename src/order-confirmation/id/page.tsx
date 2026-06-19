import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function OrderConfirmation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id: parseInt(id) },
    include: { items: { include: { product: true } } },
  });

  if (!order) return <div className="max-w-3xl mx-auto px-4 py-12 text-center"><p className="text-gray-500">Order not found</p></div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      <span className="text-6xl block mb-4">🎉</span>
      <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-serif)] text-brown">Order Confirmed!</h1>
      <p className="text-gray-500 mb-2">Order #{order.id}</p>
      <p className="text-gray-500 mb-6">We'll contact you at <strong>{order.customerPhone}</strong> to confirm your order.</p>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#EFE5D8] max-w-md mx-auto text-left mb-6">
        <h2 className="font-bold mb-3 text-brown">Order Details</h2>
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm py-1">
            <span>{item.product.nameCn} × {item.quantity}</span>
            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t border-[#EFE5D8] mt-3 pt-3 flex justify-between font-bold">
          <span>Total</span>
          <span className="text-primary">${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {order.paymentMethod === "paynow" && (
        <div className="bg-[#FFFBF5] rounded-xl p-6 max-w-md mx-auto mb-6 border border-[#EFE5D8]">
          <p className="font-bold mb-2">📱 PayNow to UEN: 202412345C</p>
          <p className="text-sm text-gray-600">Please WhatsApp us your payment screenshot for confirmation.</p>
        </div>
      )}

      <Link href="/products" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Continue Shopping</Link>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PaymentStep from "./payment-step";

type OrderItem = {
  productId: number;
  quantity: number;
  price: number;
  product?: {
    id: number;
    name: string;
    nameCn: string;
    slug: string;
    image?: string;
  };
};

type PendingOrder = {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: string;
  deliveryDate: string;
  notes: string;
  paymentMethod: string;
  items: OrderItem[];
  totalAmount: number;
};

function extractOrderNotes(notes: string) {
  const sections = notes
    .split(/\n\s*\n/)
    .map((section) => section.trim())
    .filter(Boolean);

  const addressSection = sections.find((section) => section.startsWith("Address:"));
  const deliveryDateSection = sections.find((section) => section.startsWith("Delivery Date:"));

  return {
    address: addressSection ? addressSection.replace(/^Address:\s*/, "") : "",
    deliveryDate: deliveryDateSection ? deliveryDateSection.replace(/^Delivery Date:\s*/, "") : "",
  };
}

export default function OrderPaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [orderId, setOrderId] = useState<number | null>(null);
  const [order, setOrder] = useState<PendingOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function resolveParams() {
      const { id } = await params;
      const numericOrderId = Number(id);

      if (Number.isNaN(numericOrderId)) {
        router.push("/");
        return;
      }

      setOrderId(numericOrderId);

      // 从 sessionStorage 获取待处理的订单数据
      const pendingOrderData = window.sessionStorage.getItem(`pending-order-${numericOrderId}`);
      if (!pendingOrderData) {
        router.push("/checkout");
        return;
      }

      const orderData = JSON.parse(pendingOrderData);

      setOrder(orderData);
      setLoading(false);
    }

    resolveParams();
  }, [params, router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 text-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!order || !orderId) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 text-center">
        <p className="text-lg text-red-500">订单信息未找到</p>
        <Link href="/checkout" className="mt-4 inline-block text-primary hover:underline">
          返回结账页面
        </Link>
      </div>
    );
  }

  const { address, deliveryDate } = extractOrderNotes(order.notes);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <div className="overflow-hidden rounded-[2rem] border border-[#EFE5D8] bg-white shadow-[0_20px_50px_rgba(83,47,24,0.08)]">
        <div className="border-b border-[#F2E7DA] bg-[#FFF9F1] px-6 py-10 text-center sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#C0823A]">Payment</p>
          <h1 className="mt-3 font-[family-name:var(--font-serif)] text-3xl font-bold text-brown sm:text-4xl">
            请完成付款
          </h1>
          <p className="mt-3 text-sm text-[#7A5535] sm:text-base">
            订单编号 #{orderId} 已保存，请完成 PayNow 付款后上传截图，再点击确认付款完成。
          </p>
        </div>

        <div className="grid gap-6 px-6 py-8 sm:px-10 lg:grid-cols-[1.05fr_0.95fr]">
          <section>
            <PaymentStep orderId={orderId} />
          </section>

          <section className="space-y-4">
            <div className="rounded-[1.5rem] border border-[#EFE5D8] bg-[#FFFDFC] p-5 sm:p-6">
              <h2 className="text-xl font-bold text-brown">Order Summary Information</h2>
              <div className="mt-5 space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-start justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                    <div>
                      <p className="font-semibold text-brown">{item.product?.nameCn || "产品"}</p>
                      <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#7A1638]">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-[#EFE5D8] pt-4">
                <div className="flex items-center justify-between text-lg font-bold text-brown">
                  <span>Total</span>
                  <span className="text-primary">${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#EFE5D8] bg-white p-5 sm:p-6">
              <h2 className="text-xl font-bold text-brown">Delivery Information</h2>
              <div className="mt-4 space-y-3 text-sm text-[#6B5A4A]">
                <p>
                  <span className="font-semibold text-brown">姓名：</span>
                  {order.customerName}
                </p>
                <p>
                  <span className="font-semibold text-brown">电话：</span>
                  {order.customerPhone}
                </p>
                {order.customerEmail ? (
                  <p>
                    <span className="font-semibold text-brown">邮箱：</span>
                    {order.customerEmail}
                  </p>
                ) : null}
                {address ? (
                  <p>
                    <span className="font-semibold text-brown">地址：</span>
                    {address}
                  </p>
                ) : null}
                {deliveryDate ? (
                  <p>
                    <span className="font-semibold text-brown">Delivery Date：</span>
                    {deliveryDate}
                  </p>
                ) : null}
              </div>
              <Link
                href="/checkout"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-[#D7B892] bg-[#FFF8EF] px-6 py-3 text-sm font-semibold text-[#7A5535] transition hover:border-[#C0823A] hover:bg-[#FFF2DE]"
              >
                返回到Checkout
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

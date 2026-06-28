"use client";

import { useState } from "react";
import Link from "next/link";

function formatPaymentMethod(paymentMethod: string) {
  if (paymentMethod === "paynow") return "PayNow";
  if (paymentMethod === "whatsapp") return "WhatsApp";
  return paymentMethod;
}

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
    extraNotes: sections
      .filter((section) => !section.startsWith("Address:") && !section.startsWith("Delivery Date:"))
      .join("\n\n"),
  };
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrders([]);

    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderId.trim(), phone: phone.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "查询失败");
        return;
      }

      setOrders(data.orders);
    } catch (err) {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-[#F8F4EE]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#EADBC8] bg-white p-6 shadow-[0_20px_60px_rgba(92,48,8,0.08)] sm:p-8">
          <div className="flex flex-col gap-4 border-b border-[#F0E4D5] pb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C0823A]">Order Tracking</p>
              <h1 className="mt-3 font-[family-name:var(--font-serif)] text-3xl font-bold text-brown sm:text-4xl">
                订单查询
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7A6047] sm:text-base">
                请输入订单号码或电话号码查询您的订单详情。
              </p>
            </div>
          </div>

          <section className="mt-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#7A5535]">
                    订单号码
                  </label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="例如：123"
                    className="w-full rounded-xl border border-[#EFE5D8] bg-[#FFFCF7] px-4 py-3 text-[#7A5535] focus:border-[#C0823A] focus:outline-none focus:ring-2 focus:ring-[#C0823A]/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#7A5535]">
                    电话号码
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="例如：86538893"
                    className="w-full rounded-xl border border-[#EFE5D8] bg-[#FFFCF7] px-4 py-3 text-[#7A5535] focus:border-[#C0823A] focus:outline-none focus:ring-2 focus:ring-[#C0823A]/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || (!orderId && !phone)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C0823A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9E5F2A] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "查询中..." : "查询订单"}
              </button>
            </form>

            {error && (
              <div className="mt-4 rounded-xl border border-[#E8B4B4] bg-[#FFF5F5] px-4 py-3 text-sm text-[#9E3535]">
                {error}
              </div>
            )}

            {orders.length > 0 && (
              <div className="mt-8 space-y-6">
                <h2 className="text-xl font-bold text-brown">
                  找到 {orders.length} 笔订单
                </h2>
                {orders.map((order) => {
                  const { address, deliveryDate, extraNotes } = extractOrderNotes(order.notes);

                  return (
                    <details
                      key={order.id}
                      className="group overflow-hidden rounded-[1.75rem] border border-[#EFE5D8] bg-[#FFFDFC] shadow-[0_10px_30px_rgba(120,80,30,0.05)]"
                      open
                    >
                      <summary className="cursor-pointer list-none bg-[#FFF9F1] px-5 py-5 sm:px-6 [&::-webkit-details-marker]:hidden">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-2xl font-bold text-brown">订单 #{order.id}</h3>
                              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#7A5535] ring-1 ring-[#E7D8C5]">
                                {formatPaymentMethod(order.paymentMethod)}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-[#8B6F52]">
                              下单时间：{formatDate(order.createdAt)}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 self-start lg:self-auto">
                            <div className="rounded-2xl bg-white px-4 py-3 text-right ring-1 ring-[#E7D8C5]">
                              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#C0823A]">
                                Total
                              </p>
                              <p className="mt-1 text-2xl font-bold text-brown">
                                ${order.totalAmount.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl text-[#9E5F2A] ring-1 ring-[#E7D8C5] transition-transform duration-200 group-open:rotate-180">
                              ˅
                            </div>
                          </div>
                        </div>
                      </summary>

                      <div className="border-t border-[#F1E7DA] px-5 py-5 sm:px-6">
                        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                          <section className="rounded-[1.5rem] border border-[#EFE5D8] bg-white p-5">
                            <h4 className="text-lg font-bold text-brown">客户信息</h4>
                            <div className="mt-4 space-y-3 text-sm leading-6 text-[#6B5A4A]">
                              <p>
                                <span className="font-semibold text-brown">姓名：</span>
                                {order.customerName}
                              </p>
                              <p>
                                <span className="font-semibold text-brown">电话：</span>
                                {order.customerPhone}
                              </p>
                              <p>
                                <span className="font-semibold text-brown">邮箱：</span>
                                {order.customerEmail || "未填写"}
                              </p>
                              <p>
                                <span className="font-semibold text-brown">付款方式：</span>
                                {formatPaymentMethod(order.paymentMethod)}
                              </p>
                              <p>
                                <span className="font-semibold text-brown">配送地址：</span>
                                {address || "未填写"}
                              </p>
                              <p>
                                <span className="font-semibold text-brown">配送日期：</span>
                                {deliveryDate || "未填写"}
                              </p>
                              {extraNotes && (
                                <div className="rounded-2xl bg-[#FFF8EF] px-4 py-3">
                                  <p className="font-semibold text-brown">备注</p>
                                  <p className="mt-2 whitespace-pre-line text-[#7A5535]">
                                    {extraNotes}
                                  </p>
                                </div>
                              )}
                            </div>
                          </section>

                          <section className="rounded-[1.5rem] border border-[#EFE5D8] bg-white p-5">
                            <div className="flex items-center justify-between gap-3">
                              <h4 className="text-lg font-bold text-brown">商品明细</h4>
                              <span className="text-sm text-[#8B6F52]">
                                共 {order.items.reduce((sum: number, item: any) => sum + item.quantity, 0)} 件商品
                              </span>
                            </div>

                            <div className="mt-4 overflow-hidden rounded-2xl border border-[#F3EADF]">
                              <div className="hidden grid-cols-[1.7fr_0.8fr_0.8fr_0.8fr] gap-3 bg-[#FFFAF4] px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#A06F41] sm:grid">
                                <span>商品</span>
                                <span className="text-center">数量</span>
                                <span className="text-center">单价</span>
                                <span className="text-right">小计</span>
                              </div>

                              <div className="divide-y divide-[#F3EADF]">
                                {order.items.map((item: any) => (
                                  <div
                                    key={item.id}
                                    className="grid gap-3 px-4 py-4 sm:grid-cols-[1.7fr_0.8fr_0.8fr_0.8fr] sm:items-center"
                                  >
                                    <div>
                                      <p className="font-semibold text-brown">{item.product.nameCn}</p>
                                      <p className="text-sm text-[#8B6F52]">{item.product.name}</p>
                                    </div>
                                    <p className="text-sm text-[#6B5A4A] sm:text-center">x{item.quantity}</p>
                                    <p className="text-sm text-[#6B5A4A] sm:text-center">${item.price.toFixed(2)}</p>
                                    <p className="text-sm font-semibold text-[#7A1638] sm:text-right">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            )}

            {orders.length === 0 && !loading && !error && (orderId || phone) && (
              <div className="mt-8 rounded-[1.75rem] border border-dashed border-[#DCCBB6] bg-[#FFFCF7] px-6 py-12 text-center">
                <h3 className="text-xl font-bold text-brown">未找到订单</h3>
                <p className="mt-2 text-sm text-[#8B6F52]">
                  请检查您输入的订单号码或电话号码是否正确。
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

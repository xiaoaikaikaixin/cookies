"use client";

import { useState, useEffect } from "react";

type OrderItem = {
  id: number;
  productId: number;
  orderId: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    nameCn: string;
    slug: string;
    image?: string;
    description?: string;
    price: number;
    categoryId: number;
    isFeatured: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

type Order = {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes: string;
  paymentMethod: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
};

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

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    setStartDate(todayStr);
    setEndDate(todayStr);
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
      const today = new Date();
      const todayStr = today.toISOString().split("T")[0];
      filterOrders(data, todayStr, todayStr);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = (ordersToFilter: Order[], start: string, end: string) => {
    const startDateObj = new Date(start);
    startDateObj.setHours(0, 0, 0, 0);
    const endDateObj = new Date(end);
    endDateObj.setHours(23, 59, 59, 999);

    const filtered = ordersToFilter.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDateObj && orderDate <= endDateObj;
    });

    setFilteredOrders(filtered);
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      filterOrders(orders, startDate, endDate);
    }
  };

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const payNowOrders = filteredOrders.filter((order) => order.paymentMethod === "paynow").length;
  const whatsappOrders = filteredOrders.filter((order) => order.paymentMethod === "whatsapp").length;

  if (loading) {
    return (
      <div className="min-h-full bg-[#F8F4EE] flex items-center justify-center py-20">
        <p className="text-lg text-[#7A6047]">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F8F4EE]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#EADBC8] bg-white p-6 shadow-[0_20px_60px_rgba(92,48,8,0.08)] sm:p-8">
          <div className="flex flex-col gap-4 border-b border-[#F0E4D5] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C0823A]">Admin Panel</p>
              <h1 className="mt-3 font-[family-name:var(--font-serif)] text-3xl font-bold text-brown sm:text-4xl">
                订单后台
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7A6047] sm:text-base">
                在这里查看用户下单记录、联系方式、配送信息与商品明细。页面按最新下单时间倒序排列。
              </p>
            </div>
            <div className="rounded-2xl border border-[#EFE5D8] bg-[#FFF9F1] px-4 py-3 text-sm text-[#7A5535]">
              当前共有 <span className="font-semibold text-brown">{filteredOrders.length}</span> 笔订单
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-[#EFE5D8] bg-[#FFFDFC] p-5">
            <h3 className="text-lg font-bold text-brown mb-4">时间范围选择</h3>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#7A6047]">开始日期</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="rounded-lg border border-[#EFE5D8] px-4 py-2 text-[#7A6047] focus:border-[#C0823A] focus:outline-none focus:ring-2 focus:ring-[#C0823A]/20"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#7A6047]">结束日期</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="rounded-lg border border-[#EFE5D8] px-4 py-2 text-[#7A6047] focus:border-[#C0823A] focus:outline-none focus:ring-2 focus:ring-[#C0823A]/20"
                />
              </div>
              <button
                onClick={handleSearch}
                className="mt-auto inline-flex items-center justify-center rounded-lg bg-[#C0823A] px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9E5F2A]"
              >
                搜索
              </button>
            </div>
          </div>

          <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.5rem] border border-[#EFE5D8] bg-[#FFFDFC] p-5">
              <p className="text-sm text-[#8B6F52]">订单总数</p>
              <p className="mt-2 text-3xl font-bold text-brown">{filteredOrders.length}</p>
            </div>
            <div className="rounded-[1.5rem] border border-[#EFE5D8] bg-[#FFFDFC] p-5">
              <p className="text-sm text-[#8B6F52]">累计销售额</p>
              <p className="mt-2 text-3xl font-bold text-brown">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="rounded-[1.5rem] border border-[#EFE5D8] bg-[#FFFDFC] p-5">
              <p className="text-sm text-[#8B6F52]">PayNow 订单</p>
              <p className="mt-2 text-3xl font-bold text-brown">{payNowOrders}</p>
            </div>
            <div className="rounded-[1.5rem] border border-[#EFE5D8] bg-[#FFFDFC] p-5">
              <p className="text-sm text-[#8B6F52]">WhatsApp 订单</p>
              <p className="mt-2 text-3xl font-bold text-brown">{whatsappOrders}</p>
            </div>
          </section>

          <section className="mt-8">
            {filteredOrders.length === 0 ? (
              <div className="rounded-[1.75rem] border border-dashed border-[#DCCBB6] bg-[#FFFCF7] px-6 py-12 text-center">
                <h2 className="text-xl font-bold text-brown">暂无订单</h2>
                <p className="mt-2 text-sm text-[#8B6F52]">在所选时间范围内没有订单记录。</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => {
                  const { address, deliveryDate, extraNotes } = extractOrderNotes(order.notes);

                  return (
                    <details
                      key={order.id}
                      className="group overflow-hidden rounded-[1.75rem] border border-[#EFE5D8] bg-[#FFFDFC] shadow-[0_10px_30px_rgba(120,80,30,0.05)]"
                    >
                      <summary className="cursor-pointer list-none bg-[#FFF9F1] px-5 py-5 sm:px-6 [&::-webkit-details-marker]:hidden">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <h2 className="text-2xl font-bold text-brown">订单 #{order.id}</h2>
                              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#7A5535] ring-1 ring-[#E7D8C5]">
                                {formatPaymentMethod(order.paymentMethod)}
                              </span>
                              <span className="rounded-full bg-[#F7EBDD] px-3 py-1 text-xs font-medium text-[#9E5F2A]">
                                点击展开/收起详情
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-[#8B6F52]">下单时间：{formatDate(order.createdAt)}</p>
                          </div>
                          <div className="flex items-center gap-3 self-start lg:self-auto">
                            <div className="rounded-2xl bg-white px-4 py-3 text-right ring-1 ring-[#E7D8C5]">
                              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#C0823A]">Total</p>
                              <p className="mt-1 text-2xl font-bold text-brown">${order.totalAmount.toFixed(2)}</p>
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
                            <h3 className="text-lg font-bold text-brown">客户信息</h3>
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
                              <div className="rounded-2xl bg-[#FFF8EF] px-4 py-3">
                                <p className="font-semibold text-brown">备注</p>
                                <p className="mt-2 whitespace-pre-line text-[#7A5535]">
                                  {extraNotes || "无额外备注"}
                                </p>
                              </div>
                            </div>
                          </section>

                          <section className="rounded-[1.5rem] border border-[#EFE5D8] bg-white p-5">
                            <div className="flex items-center justify-between gap-3">
                              <h3 className="text-lg font-bold text-brown">商品明细</h3>
                              <span className="text-sm text-[#8B6F52]">
                                共 {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件商品
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
                                {order.items.map((item) => (
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
          </section>
        </div>
      </div>
    </div>
  );
}

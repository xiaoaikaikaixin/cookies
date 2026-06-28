import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

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
  const address = addressSection ? addressSection.replace(/^Address:\s*/, "") : "";
  const deliveryDate = deliveryDateSection
    ? deliveryDateSection.replace(/^Delivery Date:\s*/, "")
    : "";
  const extraNotes = sections
    .filter((section) => !section.startsWith("Address:") && !section.startsWith("Delivery Date:"))
    .join("\n\n");

  return { address, deliveryDate, extraNotes };
}

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderId = Number(id);

  if (Number.isNaN(orderId)) {
    notFound();
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } } },
  });

  if (!order) {
    notFound();
  }

  const { address, deliveryDate, extraNotes } = extractOrderNotes(order.notes);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <div className="overflow-hidden rounded-[2rem] border border-[#EFE5D8] bg-white shadow-[0_20px_50px_rgba(83,47,24,0.08)]">
        <div className="border-b border-[#F2E7DA] bg-[#FFF9F1] px-6 py-10 text-center sm:px-10">
          <span className="mb-4 block text-5xl">🎉</span>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#C0823A]">Order Confirmation</p>
          <h1 className="mt-3 font-[family-name:var(--font-serif)] text-3xl font-bold text-brown sm:text-4xl">
            恭喜你，下单成功！
          </h1>
          <p className="mt-3 text-sm text-[#7A5535] sm:text-base">
            订单编号 #{order.id}，我们会尽快通过电话或 WhatsApp 与你确认配送安排。
          </p>
        </div>

        <div className="grid gap-6 px-6 py-8 sm:px-10 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[1.5rem] border border-[#EFE5D8] bg-[#FFFDFC] p-5 sm:p-6">
            <h2 className="text-xl font-bold text-brown">Order Summary Information</h2>
            <div className="mt-5 space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                  <div>
                    <p className="font-semibold text-brown">{item.product.nameCn}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
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
          </section>

          <section className="space-y-4">
            <div className="rounded-[1.5rem] border border-[#EFE5D8] bg-white p-5 sm:p-6">
              <h2 className="text-xl font-bold text-brown">Contact Information</h2>
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
                <p>
                  <span className="font-semibold text-brown">付款方式：</span>
                  {formatPaymentMethod(order.paymentMethod)}
                </p>
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
                {extraNotes ? (
                  <div className="rounded-2xl bg-[#FFF8EF] px-4 py-3">
                    <p className="font-semibold text-brown">备注</p>
                    <p className="mt-2 whitespace-pre-line leading-6 text-[#7A5535]">{extraNotes}</p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#EFE5D8] bg-[#FFF9F1] p-5 sm:p-6">
              <p className="text-sm leading-6 text-[#7A5535]">
                感谢你的支持，手工年饼会在确认订单后尽快安排出货，让新年的甜蜜准时送到你手中。
              </p>
              <Link
                href="/products"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                继续购买
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

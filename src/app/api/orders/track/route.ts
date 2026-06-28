import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, phone } = body;

    if (!orderId && !phone) {
      return NextResponse.json({ error: "请输入订单号码或电话号码" }, { status: 400 });
    }

    let orders;

    if (orderId) {
      orders = await prisma.order.findMany({
        where: { id: parseInt(orderId) },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    } else if (phone) {
      orders = await prisma.order.findMany({
        where: { customerPhone: phone },
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Order tracking failed:", error);
    return NextResponse.json({ error: "查询订单失败" }, { status: 500 });
  }
}

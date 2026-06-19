import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "react-hot-toast";
import Header from "@/components/frontend/header";
import Footer from "@/components/frontend/footer";
import WhatsAppButton from "@/components/frontend/whatsapp-button";

export const metadata: Metadata = {
  title: "Lisa Handmade Delights | 精选年饼礼盒",
  description:
    "Lisa Handmade Delights 精选手工年饼与节庆礼盒，适合家庭团圆与企业送礼，支持线上下单与 WhatsApp 咨询。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-MY" className="h-full">
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster position="bottom-center" />
        </CartProvider>
      </body>
    </html>
  );
}

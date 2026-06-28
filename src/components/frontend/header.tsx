"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, Search, ShoppingCart, Truck, X } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import dynamic from 'next/dynamic';

// Dynamically import CartDrawer to fix module resolution and ensure client-side only rendering
const CartDrawer = dynamic(() => import('./cart-drawer'), {
  ssr: false,
  loading: () => null,
});
import logoImage from "../../../data/Logo1.png";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/products", label: "所有年饼" },
  { href: "/products?category=gift-box", label: "礼盒系列" },
  { href: "/products?category=premium", label: "新品推荐" },
  { href: "/about", label: "关于我们" },
];

export default function Header() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Top announcement bar */}
        <div className="bg-[#F7E6C9] text-[16px] text-[#7B4509]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
            <div className="flex items-center gap-2">
              <Truck size={18} />
              <span>满$100免运费（新加坡）</span>
            </div>
            <div className="hidden items-center gap-5 md:flex">
              <Link href="/admin/orders" className="text-sm font-semibold text-[#7B4509] hover:text-[#C0823A]">
                Admin
              </Link>
              <span className="flex items-center gap-2">
                <Phone size={14} />
                065 - 86538893
              </span>
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-[#5C3008]">
                <FaFacebookF className="text-[13px]" />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-[#5C3008]">
                <FaInstagram className="text-[14px]" />
              </a>
              <a
                href="https://wa.me/6586538893"
                aria-label="WhatsApp"
                className="text-sm font-semibold hover:text-[#5C3008]"
              >
                WA
              </a>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="border-b border-[#EFE5D8] bg-[#FEFCF9]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(120,80,30,0.04)]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:py-4">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <div className="relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-full border-[3px] border-[#E8D5B8] bg-white p-1 shadow-sm md:h-20 md:w-20">
                <Image
                  src={logoImage}
                  alt="Lisa Handmade Delights"
                  fill
                  className="object-contain p-1"
                  sizes="80px"
                  priority
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-[26px] font-semibold transition-colors ${
                    link.href === "/"
                      ? "text-[#C0823A]"
                      : "text-[#7B4509] hover:text-[#C0823A]"
                  }`}
                >
                  {link.label}
                  {link.href === "/" && (
                    <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-7 rounded-full bg-[#D4A54A]" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right: search + cart */}
            <div className="flex items-center gap-2 md:gap-3">
              <Link
                href="/order-tracking"
                className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#7B4509] transition hover:bg-[#F7EFE5] md:inline-flex"
              >
                <Search size={18} />
                订单查询
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#C0823A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9E5F2A]"
                aria-label="Open cart"
              >
                <ShoppingCart size={18} />
                <span>购物车 ({totalItems})</span>
              </button>
              <button
                className="rounded-full p-2 text-[#7B4509] lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <div className="border-t border-[#EFE5D8] bg-white lg:hidden">
              <nav className="flex flex-col px-4 py-4 text-sm font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-3 py-3 text-[#7B4509] transition hover:bg-[#FFFBF5] hover:text-[#C0823A]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

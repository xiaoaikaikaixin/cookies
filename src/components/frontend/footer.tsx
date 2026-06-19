import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import logoImage from "../../../data/Logo1.png";

export default function Footer() {
  return (
    <footer className="bg-[#FBEFDF] text-[#5C3008]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-5">
          <div className="mb-5 flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[#D4A54A] bg-white shadow-sm">
              <Image
                src={logoImage}
                alt="Lisa Handmade Delights"
                fill
                className="object-contain p-2"
                sizes="64px"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C0823A]">
                Handmade Festive Delights
              </p>
              <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold">
                Lisa Handmade Delights
              </h3>
              <p className="text-sm text-[#8B6F52]">吉祥如意，满口幸福</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#8B6F52]">
            每一罐年饼、每一份礼盒，不仅是一份美味，更是一份传递祝福的心意。
            用心做好每一块年饼，让团圆、喜悦与幸福，从第一口开始慢慢展开。
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C0823A]">
            Explore
          </p>
          <h4 className="mb-4 font-[family-name:var(--font-serif)] text-lg font-bold">
            快速入口
          </h4>
          <nav className="flex flex-col gap-2 text-sm">
            {[
              { href: "/", label: "首页" },
              { href: "/products", label: "所有年饼" },
              { href: "/products?category=gift-box", label: "礼盒系列" },
              { href: "/cart", label: "购物车" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-[#8B6F52] transition hover:bg-white/60 hover:text-[#C0823A]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div className="md:col-span-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C0823A]">
            Contact
          </p>
          <h4 className="mb-4 font-[family-name:var(--font-serif)] text-lg font-bold">
            联系我们
          </h4>
          <div className="space-y-3 text-sm text-[#8B6F52]">
            <p className="flex items-center gap-3 rounded-lg bg-white/60 px-3 py-2.5">
              <Phone size={16} className="text-[#C0823A]" />
              065 - 86538893
            </p>
            <p className="flex items-center gap-3 rounded-lg bg-white/60 px-3 py-2.5">
              <MapPin size={16} className="text-[#C0823A]" />
              Beauty World, Singapore
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" aria-label="Facebook" className="rounded-full border border-[#E8D5B8] p-2 transition hover:border-[#C0823A] hover:text-[#C0823A]">
                <FaFacebookF className="text-[14px]" />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="rounded-full border border-[#E8D5B8] p-2 transition hover:border-[#C0823A] hover:text-[#C0823A]">
                <FaInstagram className="text-[15px]" />
              </a>
              <a href="https://wa.me/60123456789" className="rounded-full border border-[#E8D5B8] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-[#C0823A] hover:text-[#C0823A]">
                WA
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[#ECD8BD] px-4 py-5 text-center text-xs text-[#8B6F52]">
        © {new Date().getFullYear()} Lisa Handmade Delights. All rights reserved.
      </div>
    </footer>
  );
}

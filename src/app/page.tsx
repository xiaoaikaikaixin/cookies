import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import ProductCard from "@/components/frontend/product-card";
import { categoryImages } from "@/lib/product-images";
import bannerImage from "../../data/banner.png";

// Force dynamic rendering to avoid build-time database queries
export const dynamic = 'force-dynamic';

const categoryShowcase = [
  { label: "凤梨酥", en: "Pineapple Tart", href: "/products/pineapple-tart", img: categoryImages.pineapple },
  { label: "牛油曲奇", en: "Butter Cookies", href: "/products?category=premium", img: categoryImages.butter },
  { label: "香脆饼干", en: "Crunchy Cookies", href: "/products?category=traditional", img: categoryImages.fragrant },
  { label: "传统糕点", en: "Traditional", href: "/products?category=traditional", img: categoryImages.traditional },
  { label: "特色年饼", en: "Egg Rolls", href: "/products/egg-rolls", img: categoryImages.eggroll },
  { label: "礼盒系列", en: "Gift Box", href: "/products?category=gift-box", img: categoryImages.giftbox },
];

const testimonials = [
  {
    quote: "每年过年必买，花生饼的味道跟小时候外婆做的一模一样，越吃越停不下来。",
    author: "陈美玲",
    city: "Kuala Lumpur",
  },
  {
    quote: "The almond cookies are incredibly fragrant. Bought 5 tins, everyone at the reunion loved them.",
    author: "Lim Wei Jie",
    city: "Penang",
  },
  {
    quote: "礼盒包装精致大方，送给长辈非常有面子。轻柔讲入口即化，赞不绝口。",
    author: "黄志豪",
    city: "Johor Bahru",
  },
  {
    quote: "凤梨酥酸甜刚刚好，不会太腻，孩子和长辈都很喜欢，一开罐很快就吃完了。",
    author: "王丽珊",
    city: "Singapore",
  },
  {
    quote: "Fast delivery and the cookies arrived in perfect condition. The festive packaging feels premium and thoughtful.",
    author: "Alicia Tan",
    city: "Singapore",
  },
  {
    quote: "牛油曲奇很香，口感酥松，配茶特别合适。拜年带去亲戚家，大家都问在哪里买的。",
    author: "林俊杰",
    city: "Serangoon",
  },
  {
    quote: "Bought several gift boxes for clients and the presentation was elegant. It felt festive without looking overly flashy.",
    author: "Grace Lee",
    city: "Tampines",
  },
];

const reasons = [
  { icon: "👍", title: "口碑保证", desc: "多年好评，品质如一" },
  { icon: "🌾", title: "不含防腐剂", desc: "健康美味，吃得安心" },
  { icon: "🎁", title: "精美包装", desc: "送礼体面，心意满满" },
  { icon: "☎", title: "贴心服务", desc: "快速响应，售后无忧" },
];

export default async function Home() {
  let featured: any[] = [];
  try {
    featured = await prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
      include: { category: true },
      take: 5,
    });
  } catch (error) {
    console.error('Failed to load featured products:', error);
    // If database fails, just show empty featured section
  }

  return (
    <div>
      {/* ==================== HERO SECTION ==================== */}
      <section className="bg-[linear-gradient(180deg,#F8F0E3_0%,#F4E8D8_46%,#F9F2E6_100%)] pb-6 pt-4 md:pb-8 md:pt-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#EBDCC8] bg-[#F8EFE2] shadow-[0_26px_60px_rgba(124,84,43,0.14)]">
            <Image
              src={bannerImage}
              alt="Lisa 首页主视觉"
              priority
              className="h-auto w-full object-cover"
              sizes="(min-width: 1280px) 1280px, 100vw"
            />
            <Link
              href="/products"
              className="absolute left-[15.5%] top-[50.5%] inline-flex min-h-12 items-center rounded-xl border border-[#E6C88E] bg-[linear-gradient(180deg,#FAE9C6_0%,#F2D59A_52%,#E8BC72_100%)] px-5 py-3 text-base font-extrabold text-[#7B4509] shadow-[0_4px_0_#C79A55,0_14px_26px_rgba(192,130,58,0.22)] transition hover:-translate-y-0.5 hover:border-[#D9B16B] hover:shadow-[0_5px_0_#C79A55,0_18px_30px_rgba(192,130,58,0.28)] sm:left-[16%] sm:top-[51%] sm:px-6 sm:text-lg md:px-7 md:py-3.5 md:text-xl"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== CATEGORY SHOWCASE ==================== */}
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-16 md:pb-12 md:pt-20">
        <div className="mb-10 text-center">
          <div className="section-divider mb-3">
            <span>✦</span>
          </div>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl font-bold text-[#5C3008]">
            人气年饼分类
          </h2>
          <p className="mt-3 text-[#8B6F52]">Popular Cookie Categories</p>
        </div>

        <div className="grid grid-cols-3 gap-x-4 gap-y-10 md:grid-cols-6">
          {categoryShowcase.map((item) => (
            <Link key={item.label} href={item.href} className="group text-center">
              <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-[3px] border-[#F0E4D2] bg-white shadow-[0_12px_28px_rgba(120,80,30,0.08)] transition group-hover:border-[#D4A54A] group-hover:shadow-[0_16px_36px_rgba(120,80,30,0.14)] md:h-32 md:w-32">
                <img
                  src={item.img}
                  alt={item.label}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-[15px] font-semibold text-[#5C3008]">{item.label}</h3>
              <p className="mt-1 text-xs text-[#8B6F52]">{item.en}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="bg-[#F7F7F5] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative mb-10 text-center">
            <div className="section-divider mb-3">
              <span>✦</span>
            </div>
            <h2 className="font-[family-name:var(--font-serif)] text-4xl font-bold text-[#5C3008]">
              热销推荐
            </h2>
            <p className="mt-3 text-[#8B6F52]">Best Sellers</p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#C0823A] hover:text-[#9E5F2A] md:absolute md:right-0 md:bottom-1 md:mt-0"
            >
              查看全部 <span className="text-lg leading-none">›</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {featured.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                nameCn={p.nameCn}
                slug={p.slug}
                price={p.price}
                image={p.image}
                unit={p.unit}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 md:pb-20 md:pt-10">
        <div className="mb-10 text-center">
          <div className="section-divider mb-3">
            <span>✦</span>
          </div>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl font-bold text-[#5C3008]">
            顾客心声
          </h2>
          <p className="mt-3 text-[#8B6F52]">What Our Customers Say</p>
        </div>

        <div className="relative">
          <div className="testimonials-fade-left" aria-hidden="true" />
          <div className="testimonials-fade-right" aria-hidden="true" />
          <div className="testimonials-marquee">
            <div className="testimonials-track">
              {[...testimonials, ...testimonials].map((item, index) => (
                <article
                  key={`${item.author}-${index}`}
                  className="w-[290px] shrink-0 rounded-2xl border border-[#EFE5D8] bg-white p-6 shadow-[0_10px_30px_rgba(120,80,30,0.05)] md:w-[360px] md:p-7"
                >
                  <div className="mb-4 text-xl tracking-[0.2em] text-[#D4A54A]">
                    ★★★★★
                  </div>
                  <p className="min-h-[8.5rem] text-[15px] leading-7 text-[#5C3D2E]">
                    "{item.quote}"
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-[#F0E4D2] pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDF2E2] font-[family-name:var(--font-serif)] text-base font-bold text-[#C0823A]">
                      {item.author.slice(0, 1)}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#5C3008]">
                        {item.author}
                      </h3>
                      <p className="text-xs text-[#8B6F52]">{item.city}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-5 text-center text-xs tracking-[0.16em] text-[#B38A5E]">
            更多真实评价持续更新中
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE LISA ==================== */}
      <section id="about" className="pb-16 pt-4 md:pb-20 md:pt-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-[2rem] border border-[#EFE5D8] bg-[linear-gradient(180deg,#FFFEFC_0%,#FDF8F1_100%)] px-5 py-8 shadow-[0_18px_44px_rgba(120,80,40,0.05)] md:px-8 md:py-10">
            <div className="mb-8 text-center">
              <div className="section-divider mb-3">
                <span>✦</span>
              </div>
              <h2 className="font-[family-name:var(--font-serif)] text-4xl font-bold text-[#5C3008]">
                选择 Lisa 的理由
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[#8B6F52]">
                从自家团圆到节庆送礼，每一份年饼都兼顾体面、温度与安心，
                让传统年味变成真正值得分享的好心意。
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#EFE5D8] bg-white p-6 text-center shadow-[0_8px_24px_rgba(120,80,30,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(120,80,30,0.08)]"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF8EE] text-2xl">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-semibold text-[#5C3008]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#8B6F52]">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/products"
                className="inline-flex rounded-xl bg-[#C0823A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9E5F2A]"
              >
                浏览所有年饼
              </Link>
              <Link
                href="/products?category=gift-box"
                className="inline-flex rounded-xl border border-[#D4A54A] bg-white px-6 py-3 text-sm font-semibold text-[#7B4509] transition hover:border-[#C0823A]"
              >
                查看礼盒系列
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

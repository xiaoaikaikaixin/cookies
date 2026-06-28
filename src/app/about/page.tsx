import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, ScrollText, Gift, Sprout, MapPin, Sparkles } from "lucide-react";
import { FadeUp, ZoomIn } from "@/components/frontend/scroll-reveal";

/* ===================================================================
   REFERENCE IMAGE: 1024 × 1426  —  5 sections reproduced exactly
   ┌──────────┬──────────┬──────────────────────────────────────────┐
   │ Section  │  Y-range │  Layout                                  │
   ├──────────┼──────────┼──────────────────────────────────────────┤
   │ 1. Hero  │ 120–390  │  2-col: L-text / R-image (L≈243 R≈158)  │
   │ 2. Cards │ 390–540  │  4 equal cards on white (≈248)           │
   │ 3. Phil  │ 540–750  │  2-col: L-text / R-images (L≈185 R≈194) │
   │ 4. Values│ 750–1050 │  5 centered icons on white (≈244)        │
   │ 5. Footer│1050–1426 │  full image + overlay text (R darker)    │
   └──────────┴──────────┴──────────────────────────────────────────┘
   =================================================================== */

const whyChooseCards = [
  { image: "/1.png", icon: Heart, title: "Handcrafted Daily", subtitle: "Freshly made in small batches every day" },
  { image: "/2.png", icon: Leaf, title: "Premium Ingredients", subtitle: "Carefully selected for quality and flavour" },
  { image: "/3.png", icon: ScrollText, title: "Traditional Recipes", subtitle: "Generations of festive baking heritage" },
  { image: "/4.png", icon: Gift, title: "Beautiful Gift Presentation", subtitle: "Elegant packaging for every celebration" },
];

const brandValues = [
  { icon: Heart, label: "100% Handmade" },
  { icon: Sprout, label: "Premium Ingredients" },
  { icon: Gift, label: "Elegant Packaging" },
  { icon: MapPin, label: "Made with Love" },
  { icon: Sparkles, label: "Singapore Brand" },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* ================================================================
          SECTION 1 — HERO  (y: 120–390, ~19%)
          Two columns. Left = text. Right = large image in warm card.
          Background: cream gradient with ambient glows.
          ================================================================ */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F8F0E3_0%,#F4E8D8_40%,#F8F4EF_100%)]">
        <div className="pointer-events-none absolute -left-24 -top-24 h-[450px] w-[450px] rounded-full bg-[#E8C580]/12 blur-[120px]" aria-hidden="true" />
        <div className="pointer-events-none absolute right-0 top-32 h-[350px] w-[350px] rounded-full bg-[#D4A54A]/8 blur-[100px]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[1fr_1.15fr] lg:min-h-[560px]">
            {/* LEFT — text */}
            <div className="flex flex-col justify-center py-14 md:py-20 lg:py-24">
              <FadeUp>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C0823A]">Our Story</p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="mt-5 max-w-[420px] font-[family-name:var(--font-serif)] text-4xl font-bold leading-[1.12] text-[#5C3008] md:text-5xl lg:text-[3.4rem]">
                  Crafted with Love,<br />Shared with Joy
                </h1>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="mt-6 max-w-[440px] text-[15px] leading-[1.75] text-[#7A6047] md:text-base">
                  At Lisa Handmade Cookie, we believe the best memories are made around good food
                  and meaningful moments. What started as a passion for baking for family has grown
                  into a brand dedicated to creating handcrafted festive treats.
                </p>
                <p className="mt-4 max-w-[440px] text-[15px] leading-[1.75] text-[#7A6047] md:text-base">
                  Every cookie is made in small batches, using selected ingredients and traditional
                  recipes — ensuring every bite delivers warmth, freshness, and happiness.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-5 font-[family-name:var(--font-serif)] text-lg italic text-[#C0823A]">
                  For us, baking is more than a business — it is a way of sharing love.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <Link href="/products" className="mt-8 inline-flex min-h-[48px] items-center rounded-xl bg-[#C0823A] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#9E5F2A] hover:shadow-lg hover:-translate-y-0.5">
                  Shop Collection
                </Link>
              </FadeUp>
            </div>

            {/* RIGHT — large lifestyle image */}
            <ZoomIn delay={0.1}>
              <div className="relative flex items-center py-6 lg:py-8">
                <div className="absolute -inset-2 rounded-[2.25rem] border border-[#EBDCC8]/40 bg-gradient-to-br from-[#FDF9F2]/30 to-transparent" aria-hidden="true" />
                <div className="relative w-full overflow-hidden rounded-[2rem] border border-[#EADBC8] bg-[#F8EFE2] shadow-[0_24px_56px_rgba(124,84,43,0.10)]">
                  <img src="/7.png" alt="Lisa Handmade Cookie — artisan bakery with cookie jar, gift box, and warm sunlight"
                    className="h-auto w-full object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#F8EFE2]/50 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#F4E8D8]/90 to-transparent lg:w-16" />
                </div>
              </div>
            </ZoomIn>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — WHY CHOOSE LISA  (y: 390–540, ~11%)
          Four equal cards on pure white. Each card: image + icon + text.
          Card #4 has gold background (matches reference highlight).
          ================================================================ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <div className="mb-12 text-center md:mb-16">
              <div className="section-divider mb-4"><span>✦</span></div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C0823A]">Why Choose Lisa</p>
              <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl font-bold leading-[1.15] text-[#5C3008] md:text-4xl lg:text-5xl">
                Our Commitment to Quality
              </h2>
            </div>
          </FadeUp>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseCards.map((card, i) => {
              const Icon = card.icon;
              const isLast = i === whyChooseCards.length - 1;
              return (
                <FadeUp key={card.title} delay={i * 0.1}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#EFE5D8] bg-white shadow-[0_6px_24px_rgba(120,80,30,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(120,80,30,0.10)]">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <img src={card.image} alt={card.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                    </div>
                    <div className={isLast ? "flex flex-1 flex-col gap-3 bg-[#C0823A] p-5 md:p-6" : "flex flex-1 flex-col gap-3 p-5 md:p-6"}>
                      <div className="flex items-center gap-3">
                        <div className={isLast ? "flex h-10 w-10 items-center justify-center rounded-full bg-white/20" : "flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF8EE]"}>
                          <Icon className={isLast ? "h-5 w-5 text-white" : "h-5 w-5 text-[#C0823A]"} strokeWidth={1.5} aria-hidden="true" />
                        </div>
                        <h3 className={isLast ? "text-[15px] font-bold leading-tight text-white" : "text-[15px] font-bold leading-tight text-[#5C3008]"}>{card.title}</h3>
                      </div>
                      <p className={isLast ? "text-sm leading-relaxed text-white/85" : "text-sm leading-relaxed text-[#7A6047]"}>{card.subtitle}</p>
                    </div>
                  </article>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — BRAND PHILOSOPHY  (y: 540–750, ~15%)
          Two columns. Left = Mission + Vision cards. Right = image grid.
          Cream background #F8F4EF.
          ================================================================ */}
      <section className="bg-[#F8F4EF] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
            {/* LEFT — Mission & Vision */}
            <div>
              <FadeUp>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C0823A]">Brand Philosophy</p>
                <h2 className="mt-5 max-w-[440px] font-[family-name:var(--font-serif)] text-3xl font-bold leading-[1.15] text-[#5C3008] md:text-4xl lg:text-5xl">
                  To Create Handcrafted Treats That Bring Happiness to Every Celebration.
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="mt-6 max-w-[440px] text-[15px] leading-[1.75] text-[#7A6047] md:text-base">
                  Whether it&apos;s Chinese New Year, Hari Raya, Deepavali, Christmas, or a loved
                  one&apos;s birthday — we hope our cookies become part of your most cherished moments.
                </p>
                <p className="mt-4 max-w-[440px] text-[15px] leading-[1.75] text-[#7A6047] md:text-base">
                  Every jar, every box, and every cookie is made with care, because we believe
                  happiness is best shared.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-4 rounded-2xl border border-[#EFE5D8] bg-[#FFFCF8] p-5 shadow-[0_4px_14px_rgba(120,80,30,0.02)]">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF8EE]">
                      <Heart className="h-[18px] w-[18px] text-[#C0823A]" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#5C3008]">Our Mission</h4>
                      <p className="mt-1 text-sm leading-relaxed text-[#7A6047]">
                        To craft the finest handmade festive cookies that bring warmth, joy,
                        and tradition to every celebration.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-2xl border border-[#EFE5D8] bg-[#FFFCF8] p-5 shadow-[0_4px_14px_rgba(120,80,30,0.02)]">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF8EE]">
                      <Sparkles className="h-[18px] w-[18px] text-[#C0823A]" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#5C3008]">Our Vision</h4>
                      <p className="mt-1 text-sm leading-relaxed text-[#7A6047]">
                        To be Singapore&apos;s most loved artisanal festive cookie brand — where
                        every gift tells a story of care.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* RIGHT — images */}
            <div className="grid grid-cols-2 gap-4">
              <ZoomIn delay={0.15}>
                <div className="overflow-hidden rounded-[1.75rem] shadow-[0_14px_36px_rgba(120,80,30,0.07)]">
                  <img src="/5.png" alt="Lisa premium gift set"
                    className="aspect-[3/4] w-full object-cover transition duration-500 hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, 50vw" />
                </div>
              </ZoomIn>
              <div className="flex flex-col gap-4">
                <ZoomIn delay={0.25}>
                  <div className="overflow-hidden rounded-[1.75rem] shadow-[0_14px_36px_rgba(120,80,30,0.07)]">
                    <img src="/3.png" alt="Lisa handcrafted cookies"
                      className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
                      sizes="(min-width: 1024px) 25vw, 50vw" />
                  </div>
                </ZoomIn>
                <ZoomIn delay={0.35}>
                  <div className="flex items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-[#FFF9F0] to-[#FDF3E3] p-6 shadow-[0_8px_24px_rgba(120,80,30,0.04)]">
                    <div className="text-center">
                      <p className="font-[family-name:var(--font-serif)] text-xl italic leading-relaxed text-[#C0823A] md:text-2xl">
                        &ldquo;Handcrafted<br />with Love, Made<br />to Share<br />Happiness.&rdquo;
                      </p>
                      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B6F52]">
                        — Lisa Handmade Cookie
                      </p>
                    </div>
                  </div>
                </ZoomIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — BRAND VALUES  (y: 750–1050, ~21%)
          Five centered icon+label items in a row. Pure white background.
          ================================================================ */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <div className="mb-12 text-center">
              <div className="section-divider mb-4"><span>✦</span></div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C0823A]">Our Values</p>
              <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl font-bold leading-[1.15] text-[#5C3008] md:text-4xl lg:text-5xl">
                What We Stand For
              </h2>
            </div>
          </FadeUp>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8 md:gap-x-14 lg:gap-x-20">
            {brandValues.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeUp key={item.label} delay={i * 0.08}>
                  <div className="group flex flex-col items-center gap-3 transition duration-300">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF8EE] transition duration-300 group-hover:bg-[#C0823A] group-hover:shadow-[0_8px_24px_rgba(192,130,58,0.18)]">
                      <Icon className="h-6 w-6 text-[#C0823A] transition duration-300 group-hover:text-white" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <p className="text-sm font-semibold text-[#5C3008]">{item.label}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}

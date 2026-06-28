import Link from "next/link";
import { Heart, Leaf, ScrollText, Gift, Sprout, MapPin, Sparkles, ArrowRight } from "lucide-react";
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
          SECTION 1 — HERO  —  ARTISANAL ELEGANCE, NO IMAGES
          Typography-first with abstract geometric composition on right.
          Design language: warm restraint, generous negative space,
          subtle golden accents, architectural geometry.

          UI/UX Pro Max refinements applied:
          ✓ AA contrast on all text surfaces (body #6B4F37, eyebrow solid)
          ✓ 8px spacing rhythm throughout
          ✓ Simplified geometric composition — fewer, more intentional elements
          ✓ SVGs use fixed viewBox (no preserveAspectRatio="none")
          ✓ aria-hidden on all decorative elements
          ✓ Motion respects prefers-reduced-motion (framer-motion handles this)
          ✓ Touch targets ≥ 48px, 16px gap between CTAs
          ✓ Single primary CTA with clear visual hierarchy
          ================================================================ */}
      <section
        className="relative overflow-hidden bg-[#F8F4EF] min-h-[600px] lg:min-h-[700px] flex items-center"
        aria-labelledby="about-hero-heading"
      >
        {/* ── Ambient light washes ── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Primary glow: warm amber, top-right */}
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(232,197,128,0.10)_0%,_transparent_70%)]" />
          {/* Secondary glow: deeper gold, bottom-left */}
          <div className="absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,_rgba(212,165,74,0.07)_0%,_transparent_70%)]" />
          {/* Dot-matrix texture on right third — barely perceptible, purely atmospheric */}
          <div
            className="absolute right-0 top-0 h-full w-[45%] opacity-[0.020]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #5C3008 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative w-full mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <FadeUp>
              <div className="flex items-center gap-5">
                <span
                  className="h-px w-16 md:w-24 bg-gradient-to-r from-[#C0823A]/45 to-transparent"
                  aria-hidden="true"
                />
                <span className="text-[11px] font-semibold tracking-[0.38em] text-[#7A6047] uppercase select-none">
                  Our Story
                </span>
              </div>
            </FadeUp>

            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.82fr)] lg:gap-16">
              <div>
                <FadeUp delay={0.08}>
                  <h1
                    id="about-hero-heading"
                    className="max-w-[11ch] font-[family-name:var(--font-serif)] text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-[#5C3008] md:text-5xl lg:text-[4.35rem]"
                  >
                    Crafted with{" "}
                    <span className="relative inline-block">
                      Love
                      <svg
                        className="absolute -bottom-1.5 left-0 w-full text-[#D4A54A]/55"
                        viewBox="0 0 100 6"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 5 Q50 0 98 5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    ,<br />
                    Shared with Joy
                  </h1>
                </FadeUp>

                <FadeUp delay={0.2}>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href="/products"
                      className="group inline-flex items-center gap-2.5 rounded-full bg-[#C0823A] px-8 py-4 text-[15px] font-bold text-white shadow-[0_4px_18px_rgba(192,130,58,0.16)] transition-all duration-300 hover:bg-[#9E5F2A] hover:shadow-[0_10px_32px_rgba(192,130,58,0.26)] hover:-translate-y-0.5"
                    >
                      Shop Collection
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                    <Link
                      href="/#contact"
                      className="inline-flex items-center rounded-full border-2 border-[#E4D5C3] px-8 py-4 text-[15px] font-bold text-[#5C3008] transition-all duration-300 hover:border-[#C0823A] hover:text-[#C0823A] hover:shadow-[0_4px_16px_rgba(192,130,58,0.06)]"
                    >
                      Contact Us
                    </Link>
                  </div>
                </FadeUp>
              </div>

              <div className="lg:pt-3">
                <FadeUp delay={0.14}>
                  <p className="max-w-[34rem] text-[15px] leading-[1.82] text-brown-light md:text-[17px] md:leading-[1.85]">
                    At Lisa Handmade Cookie, we believe the best memories are created around
                    good food and meaningful moments. What started as a passion for baking for
                    family and friends has grown into a brand dedicated to creating handcrafted
                    cookies and festive treats that bring people together. Every cookie is
                    carefully made in small batches, using selected ingredients and traditional
                    recipes, ensuring every bite delivers warmth, freshness, and happiness.
                  </p>
                </FadeUp>

                <FadeUp delay={0.24}>
                  <div className="mt-8 rounded-[1.75rem] border border-[#EADBC8] bg-[linear-gradient(135deg,#FFFDF9_0%,#FFF7ED_100%)] px-6 py-6 shadow-[0_10px_24px_rgba(120,80,30,0.04)]">
                    <div className="flex items-start gap-4 md:gap-5">
                      <span
                        className="shrink-0 select-none font-[family-name:var(--font-serif)] text-6xl leading-none text-[#D4A54A]/16 md:text-7xl"
                        aria-hidden="true"
                      >
                        &ldquo;
                      </span>
                      <div>
                        <blockquote className="font-[family-name:var(--font-serif)] text-lg italic leading-[1.55] text-[#9E5F2A] md:text-[1.35rem]">
                          <p>For us, baking is more than a business, it is a way of sharing love.</p>
                        </blockquote>
                        <div className="mt-4 flex items-center gap-3">
                          <span
                            className="h-px w-8 bg-[#D4A54A]/30"
                            aria-hidden="true"
                          />
                          <cite className="not-italic text-[11px] font-semibold tracking-[0.22em] text-[#8B6F52] uppercase">
                            Lisa Handmade Cookie
                          </cite>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              </div>
            </div>
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
          <div className="grid gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-start lg:gap-20">
            {/* LEFT — Mission & Vision */}
            <div className="relative">
              <FadeUp>
                <div className="inline-flex items-center gap-3">
                  <span className="h-px w-12 bg-gradient-to-r from-[#C0823A] to-transparent" />
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C0823A]">Brand Philosophy</p>
                </div>
                <h2 className="mt-5 max-w-[480px] font-[family-name:var(--font-serif)] text-3xl font-bold leading-[1.1] text-[#5C3008] md:text-4xl lg:text-[3.3rem]">
                  To Create Handcrafted Treats That Bring Happiness to Every Celebration.
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="mt-6 max-w-[470px] text-[15px] leading-[1.85] text-[#7A6047] md:text-base">
                  Whether it&apos;s Chinese New Year, Hari Raya, Deepavali, Christmas, or a loved
                  one&apos;s birthday — we hope our cookies become part of your most cherished moments.
                </p>
                <p className="mt-4 max-w-[470px] text-[15px] leading-[1.85] text-[#7A6047] md:text-base">
                  Every jar, every box, and every cookie is made with care, because we believe
                  happiness is best shared.
                </p>
                <blockquote className="mt-7 max-w-[470px] border-l-2 border-[#D9B986] pl-5 font-[family-name:var(--font-serif)] text-[1.3rem] italic leading-[1.7] text-[#B88343] md:text-[1.45rem]">
                  &ldquo;Handcrafted with love, made to share happiness.&rdquo;
                </blockquote>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B6F52]">
                  — Lisa Handmade Cookie
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="rounded-full border border-[#E8D9C8] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B6F52]">
                    Handmade in Small Batches
                  </span>
                  <span className="rounded-full border border-[#E8D9C8] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B6F52]">
                    Festive Gifting
                  </span>
                  <span className="rounded-full border border-[#E8D9C8] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B6F52]">
                    Crafted with Care
                  </span>
                </div>
              </FadeUp>
            </div>

            {/* RIGHT — principles */}
            <div className="relative lg:pt-5">
              <FadeUp delay={0.16}>
                <div className="rounded-[2rem] border border-[#EADBC8] bg-white p-7 shadow-[0_16px_40px_rgba(120,80,30,0.05)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B88343]">
                    What Guides Us
                  </p>
                  <div className="mt-6 grid gap-4">
                    <div className="rounded-[1.75rem] border border-[#EADBC8] bg-[linear-gradient(135deg,#FFFDF9_0%,#FFF7ED_100%)] p-6 shadow-[0_10px_26px_rgba(120,80,30,0.04)]">
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF1DB]">
                          <Heart className="h-[18px] w-[18px] text-[#C0823A]" strokeWidth={1.5} aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B88343]">Our Mission</p>
                          <h4 className="mt-2 font-[family-name:var(--font-serif)] text-[1.35rem] leading-tight text-[#5C3008]">
                            Warmth, joy, and tradition in every festive bite.
                          </h4>
                          <p className="mt-3 text-sm leading-relaxed text-[#7A6047]">
                            To craft the finest handmade festive cookies that bring warmth, joy,
                            and tradition to every celebration.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[1.75rem] border border-[#EADBC8] bg-white p-6 shadow-[0_10px_26px_rgba(120,80,30,0.035)]">
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF8EE]">
                          <Sparkles className="h-[18px] w-[18px] text-[#C0823A]" strokeWidth={1.5} aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B88343]">Our Vision</p>
                          <h4 className="mt-2 font-[family-name:var(--font-serif)] text-[1.35rem] leading-tight text-[#5C3008]">
                            A signature Singapore gifting brand loved across celebrations.
                          </h4>
                          <p className="mt-3 text-sm leading-relaxed text-[#7A6047]">
                            To be Singapore&apos;s most loved artisanal festive cookie brand — where
                            every gift tells a story of care.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 rounded-[1.5rem] border border-[#EFE5D8] bg-[#FFFBF5] px-5 py-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B88343]">
                      Brand Principles
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <span className="rounded-full border border-[#E8D9C8] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B6F52]">
                        Small Batch
                      </span>
                      <span className="rounded-full border border-[#E8D9C8] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B6F52]">
                        Gift Ready
                      </span>
                      <span className="rounded-full border border-[#E8D9C8] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B6F52]">
                        Shared Joy
                      </span>
                    </div>
                  </div>
                </div>
              </FadeUp>
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

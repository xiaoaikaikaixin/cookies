import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-white to-[#F7EFE5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <p className="text-primary font-bold text-lg mb-2">🧧 年年饼家</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-serif)] text-brown leading-tight">
              Handmade CNY Cookies<br />
              <span className="text-primary">Straight from Singapore</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md">
              Traditional Chinese New Year cookies baked with love using recipes passed down through three generations.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link href="/products" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">
                Shop Now
              </Link>
              <Link href="/#about" className="inline-block bg-white text-brown font-bold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors border border-[#EFE5D8]">
                Learn More
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-[12rem] md:text-[16rem]">🍪</span>
          </div>
        </div>
      </div>
    </section>
  );
}

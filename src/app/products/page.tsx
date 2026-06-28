import { prisma } from "@/lib/db";
import ProductCard from "@/components/frontend/product-card";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-serif)] text-brown text-center">All Products</h1>
      <p className="text-center text-gray-500 mb-10">Browse our full collection of handmade CNY cookies</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {products.map((p) => (
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
  );
}

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import AddToCartButton from "./add-to-cart-button";
import { getProductImage } from "@/lib/product-images";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) notFound();

  const productImage = getProductImage(product.slug, product.image);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <div className="aspect-square overflow-hidden rounded-[1.8rem] border border-[#EFE5D8] bg-[#F7EFE5] shadow-[0_18px_40px_rgba(120,80,40,0.06)]">
            <img
              src={productImage}
              alt={`${product.nameCn} ${product.name}`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm text-primary font-medium mb-1">{product.category.name}</p>
          <h1 className="text-3xl font-bold mb-1 font-[family-name:var(--font-serif)] text-brown">{product.name}</h1>
          <p className="text-xl text-gray-500 mb-4">{product.nameCn}</p>
          <p className="text-3xl font-bold text-primary mb-4">RM {product.price.toFixed(2)} <span className="text-sm text-gray-400 font-normal">/ {product.unit}</span></p>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          <AddToCartButton product={{ id: product.id, name: product.name, nameCn: product.nameCn, price: product.price, image: productImage }} />
          <div className="mt-6 p-4 bg-[#FFFDFA] rounded-lg text-sm text-gray-500 border border-[#EFE5D8]">
            <p>✅ 满 RM150 免运费</p>
            <p>✅ Freshly baked upon order</p>
            <p>✅ Halal-certified ingredients</p>
          </div>
        </div>
      </div>
    </div>
  );
}

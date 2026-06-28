import { prisma } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "./product-gallery";
import { getProductGallery, getProductImage } from "@/lib/product-images";
import { getProductDetailContent } from "@/lib/product-detail-content";
import ProductPurchasePanel from "./product-purchase-panel";
import RelatedProductsGrid from "./related-products-grid";

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product: any = null;
  let relatedProducts: any[] = [];
  
  try {
    product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!product) notFound();

    const relatedProductsData = await prisma.product.findMany({
      where: {
        isActive: true,
        slug: { not: product.slug },
      },
      orderBy: [{ isFeatured: "desc" }, { id: "asc" }],
      take: 4,
    });
    relatedProducts = relatedProductsData;
  } catch (error) {
    console.error('Failed to load product:', error);
    notFound();
  }

  const productImage = getProductImage(product.slug, product.image);
  const productGallery = getProductGallery(product.slug, product.image);
  const detailContent = getProductDetailContent(product.slug, product.description);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="flex-1">
          <ProductGallery images={productGallery} alt={`${product.nameCn} ${product.name}`} />
          <Link
            href="/products"
            className="mt-6 flex min-h-14 items-center justify-between border-y border-dashed border-[#D8C9C0] px-4 py-4 text-[#6D0E33] transition hover:bg-[#FFF8FB]"
          >
            <span className="text-3xl leading-none" aria-hidden="true">
              ←
            </span>
            <span className="text-xl font-medium tracking-[0.01em]">Back to Shop</span>
          </Link>
        </div>
        <ProductPurchasePanel
          product={{
            id: product.id,
            name: product.name,
            nameCn: product.nameCn,
            category: product.category.name,
            unit: product.unit,
            price: product.price,
            image: productImage,
          }}
          detailContent={detailContent}
        />
      </div>
      <RelatedProductsGrid
        products={relatedProducts.map((item) => ({
          id: item.id,
          slug: item.slug,
          name: item.name,
          nameCn: item.nameCn,
          image: item.image,
          price: item.price,
          unit: item.unit,
        }))}
      />
    </div>
  );
}

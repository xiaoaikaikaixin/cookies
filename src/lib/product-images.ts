const defaultProductImage = "/images/products/default.png";

const productImageMap: Record<string, string> = {
  "pineapple-tart": "/images/products/pineapple-tart.png",
  "premium-kueh-bangkit": "/images/products/premium-kueh-bangkit.png",
  "almond-cookies": "/images/products/almond-cookies.png",
  "green-pea-cookies": "/images/products/green-pea-cookies.png",
  "egg-rolls": "/images/products/egg-rolls.png",
  "honeycomb-cookies": "/images/products/honeycomb-cookies.png",
  "bitter-cookies": "/images/products/bitter-cookies.png",
  "shaped-cookies": "/images/products/shaped-cookies.png",
  "egg-slices": "/images/products/egg-slices.png",
  "peanut-cookies": "/images/products/peanut-cookies.png",
  "cashew-nut-cookies": "/images/products/cashew-nut-cookies.png",
  "chocolate-chip-cookies": "/images/products/chocolate-chip-cookies.png",
  "cornflake-cookies": "/images/products/cornflake-cookies.png",
  "sugee-cookies": "/images/products/sugee-cookies.png",
  "oatmeal-cookies": "/images/products/oatmeal-cookies.png",
  "butter-cookies": "/images/products/butter-cookies.png",
  "coconut-cookies": "/images/products/coconut-cookies.png",
  "sesame-cookies": "/images/products/sesame-cookies.png",
  "pineapple-tart-gift-box": "/images/products/pineapple-tart-gift-box.png",
  "assorted-cookie-gift-box": "/images/products/assorted-cookie-gift-box.png",
  "premium-trio-gift-set": "/images/products/premium-trio-gift-set.png",
};

const productGalleryMap: Record<string, string[]> = {
  "pineapple-tart": [
    "/images/products/pineapple-tart.png",
    "/images/products/pineapple-tart-detail-1.png",
    "/images/products/pineapple-tart-detail-2.png",
  ],
};

export function getProductImage(slug: string, storedImage?: string) {
  if (storedImage?.startsWith("/images/products/")) {
    return storedImage;
  }

  return productImageMap[slug] ?? defaultProductImage;
}

export function getProductGallery(slug: string, storedImage?: string) {
  const primaryImage = getProductImage(slug, storedImage);
  const mappedGallery = productGalleryMap[slug] ?? [];

  return [primaryImage, ...mappedGallery.filter((image) => image !== primaryImage)];
}

export const categoryImages = {
  pineapple: "/images/home/category-pineapple.png",
  butter: "/images/home/category-butter.png",
  fragrant: "/images/home/category-fragrant.png",
  traditional: "/images/home/category-traditional.png",
  eggroll: "/images/home/category-eggroll.png",
  giftbox: "/images/home/category-giftbox.png",
};

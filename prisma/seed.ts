import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Categories
  const traditional = await prisma.category.create({
    data: { name: "传统饼干 Traditional", slug: "traditional" },
  });
  const premium = await prisma.category.create({
    data: { name: "精品饼干 Premium", slug: "premium" },
  });
  const giftBox = await prisma.category.create({
    data: { name: "礼盒套装 Gift Box", slug: "gift-box" },
  });

  const products = [
    { name: "Pineapple Tart", nameCn: "黄梨塔", slug: "pineapple-tart", desc: "Buttery pastry filled with sweet pineapple jam. A must-have for Chinese New Year.", price: 22.80, unit: "罐", catId: traditional.id, featured: true, image: "/images/pineapple-tart.jpg" },
    { name: "Premium Kueh Bangkit", nameCn: "优质番婆饼", slug: "premium-kueh-bangkit", desc: "Delicate coconut-flavored cookies that melt in your mouth. Made with premium coconut milk.", price: 18.80, unit: "罐", catId: premium.id, featured: true, image: "/images/kueh-bangkit.jpg" },
    { name: "Almond Cookies", nameCn: "杏仁饼", slug: "almond-cookies", desc: "Crunchy almond cookies with a rich buttery taste. Baked to golden perfection.", price: 16.80, unit: "罐", catId: traditional.id, featured: true, image: "/images/almond-cookies.jpg" },
    { name: "Green Pea Cookies", nameCn: "青豆饼", slug: "green-pea-cookies", desc: "Savory-sweet cookies made from finely ground green peas. A uniquely Singaporean favorite.", price: 15.80, unit: "罐", catId: traditional.id, featured: true, image: "/images/green-pea-cookies.jpg" },
    { name: "Egg Rolls", nameCn: "蛋卷", slug: "egg-rolls", desc: "Crispy, flaky egg rolls with a hint of sweetness. Hand-rolled for the perfect crunch.", price: 14.80, unit: "罐", catId: traditional.id, featured: false, image: "/images/egg-rolls.jpg" },
    { name: "Honeycomb Cookies", nameCn: "蜜蜂窝", slug: "honeycomb-cookies", desc: "Crispy honeycomb-patterned cookies. Light, airy, and addictive.", price: 16.80, unit: "罐", catId: traditional.id, featured: false, image: "/images/honeycomb-cookies.jpg" },
    { name: "Bitter Cookies", nameCn: "苦饼", slug: "bitter-cookies", desc: "Traditional crispy cookies with a slightly bitter-sweet caramel flavor. Old-school favorite.", price: 13.80, unit: "罐", catId: traditional.id, featured: false, image: "/images/bitter-cookies.jpg" },
    { name: "Shaped Cookies", nameCn: "造型饼", slug: "shaped-cookies", desc: "Beautifully shaped butter cookies in various festive designs. Perfect for gifting.", price: 18.80, unit: "盒", catId: premium.id, featured: false, image: "/images/shaped-cookies.jpg" },
    { name: "Egg Slices", nameCn: "蛋片", slug: "egg-slices", desc: "Thin crispy egg-flavored slices. Light and perfect with tea.", price: 12.80, unit: "罐", catId: traditional.id, featured: false, image: "/images/egg-slices.jpg" },
    { name: "Peanut Cookies", nameCn: "花生饼", slug: "peanut-cookies", desc: "Crumbly peanut cookies made from freshly ground peanuts. Classic CNY treat.", price: 15.80, unit: "罐", catId: traditional.id, featured: false, image: "/images/peanut-cookies.jpg" },
    { name: "Cashew Nut Cookies", nameCn: "腰果饼", slug: "cashew-nut-cookies", desc: "Premium cashew cookies with whole cashew on top. Rich and buttery.", price: 20.80, unit: "罐", catId: premium.id, featured: false, image: "/images/cashew-cookies.jpg" },
    { name: "Chocolate Chip Cookies", nameCn: "巧克力豆饼", slug: "chocolate-chip-cookies", desc: "Classic chocolate chip cookies with a CNY twist. Kid-friendly favorite.", price: 16.80, unit: "罐", catId: premium.id, featured: false, image: "/images/chocolate-chip-cookies.jpg" },
    { name: "Cornflake Cookies", nameCn: "玉米片饼", slug: "cornflake-cookies", desc: "Crunchy cornflake cookies with honey glaze. Sweet and crispy.", price: 14.80, unit: "罐", catId: traditional.id, featured: false, image: "/images/cornflake-cookies.jpg" },
    { name: "Sugee Cookies", nameCn: "苏芝饼", slug: "sugee-cookies", desc: "Melt-in-your-mouth semolina cookies. A Peranakan CNY classic.", price: 19.80, unit: "罐", catId: premium.id, featured: true, image: "/images/sugee-cookies.jpg" },
    { name: "Oatmeal Cookies", nameCn: "燕麦饼", slug: "oatmeal-cookies", desc: "Wholesome oatmeal cookies with raisins. A healthier CNY option.", price: 15.80, unit: "罐", catId: traditional.id, featured: false, image: "/images/oatmeal-cookies.jpg" },
    { name: "Butter Cookies", nameCn: "牛油饼", slug: "butter-cookies", desc: "Classic butter cookies that crumble beautifully. Simple and satisfying.", price: 13.80, unit: "罐", catId: traditional.id, featured: false, image: "/images/butter-cookies.jpg" },
    { name: "Coconut Cookies", nameCn: "椰丝饼", slug: "coconut-cookies", desc: "Toasted coconut cookies with a hint of gula melaka. Tropical CNY flavor.", price: 16.80, unit: "罐", catId: premium.id, featured: false, image: "/images/coconut-cookies.jpg" },
    { name: "Sesame Cookies", nameCn: "芝麻饼", slug: "sesame-cookies", desc: "Fragrant sesame cookies with black and white sesame seeds. Nutty and aromatic.", price: 14.80, unit: "罐", catId: traditional.id, featured: false, image: "/images/sesame-cookies.jpg" },
    { name: "Pineapple Tart Gift Box", nameCn: "黄梨塔礼盒", slug: "pineapple-tart-gift-box", desc: "Premium pineapple tarts in an elegant gift box. 2 cans included.", price: 48.80, unit: "盒", catId: giftBox.id, featured: true, image: "/images/pineapple-tart-gift.jpg" },
    { name: "Assorted Cookie Gift Box", nameCn: "综合年饼礼盒", slug: "assorted-cookie-gift-box", desc: "A beautiful selection of 6 popular CNY cookies in one gift box. Perfect for visiting.", price: 58.80, unit: "盒", catId: giftBox.id, featured: true, image: "/images/assorted-gift.jpg" },
    { name: "Premium Trio Gift Set", nameCn: "精选三件套", slug: "premium-trio-gift-set", desc: "Pineapple tart, Kueh Bangkit, and Sugee cookies in a premium hamper.", price: 68.80, unit: "套", catId: giftBox.id, featured: false, image: "/images/premium-trio.jpg" },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        nameCn: p.nameCn,
        slug: p.slug,
        description: p.desc,
        price: p.price,
        unit: p.unit,
        categoryId: p.catId,
        isFeatured: p.featured,
        image: p.image,
      },
    });
  }

  console.log(`Seeded 3 categories and ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

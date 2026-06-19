import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const productDir = path.join(root, "public", "images", "products");
const homeDir = path.join(root, "public", "images", "home");

const assets = [
  {
    file: path.join(productDir, "pineapple-tart.png"),
    prompt:
      "premium pineapple tart pastry cookies, glossy golden filling visible in cross section, elegant Chinese New Year dessert product photography, warm cream background, soft studio lighting, luxurious festive styling",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "premium-kueh-bangkit.png"),
    prompt:
      "delicate kueh bangkit cookies, buttery floral swirls, premium festive cookie product photography, warm ivory background, soft natural light, refined Southeast Asian bakery styling",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "almond-cookies.png"),
    prompt:
      "almond Chinese New Year cookies piled neatly on ceramic plate, rich golden brown texture, elegant festive bakery product photo, cream background, premium dessert styling",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "green-pea-cookies.png"),
    prompt:
      "green pea cookies in rustic festive arrangement, golden crumbly texture, handmade Chinese New Year bakery photo, warm cream background, natural soft light",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "egg-rolls.png"),
    prompt:
      "crispy egg rolls stacked in neat bundle, luxury festive pastry product photography, warm cream background, golden tones, handcrafted bakery styling",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "honeycomb-cookies.png"),
    prompt:
      "crispy honeycomb cookies in festive arrangement, golden airy texture, premium Chinese New Year bakery product photography, warm cream background, refined lighting",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "bitter-cookies.png"),
    prompt:
      "traditional caramel brown cookies in elegant festive arrangement, Chinese New Year bakery product photography, warm cream background, premium handcrafted styling",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "shaped-cookies.png"),
    prompt:
      "beautiful shaped butter cookies in festive forms, premium Chinese New Year product photography, cream background, elegant handcrafted bakery styling",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "egg-slices.png"),
    prompt:
      "thin crispy egg slices cookies, light golden Chinese New Year bakery product photo, clean cream background, premium festive styling",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "peanut-cookies.png"),
    prompt:
      "crumbly peanut cookies arranged neatly on plate, premium Chinese New Year bakery product photography, warm cream background, soft studio light",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "cashew-nut-cookies.png"),
    prompt:
      "premium cashew nut cookies with whole cashew topping, elegant festive bakery product photo, warm cream background, soft natural light",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "chocolate-chip-cookies.png"),
    prompt:
      "festive chocolate chip cookies in premium bakery product photography, warm cream background, refined dessert styling, soft light",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "cornflake-cookies.png"),
    prompt:
      "crunchy honey glazed cornflake cookies, elegant Chinese New Year bakery product photo, cream background, premium festive styling",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "sugee-cookies.png"),
    prompt:
      "sugee cookies close-up, buttery crumbly semolina cookies arranged neatly, premium Chinese New Year product photography, ivory background, soft warm light",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "oatmeal-cookies.png"),
    prompt:
      "wholesome oatmeal cookies with raisins, premium festive bakery product photography, warm cream background, soft natural light",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "butter-cookies.png"),
    prompt:
      "classic butter cookies in elegant Chinese New Year bakery product photography, cream background, golden tones, premium styling",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "coconut-cookies.png"),
    prompt:
      "toasted coconut cookies in refined festive arrangement, Chinese New Year bakery product photo, warm cream background, premium tropical dessert styling",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "sesame-cookies.png"),
    prompt:
      "fragrant sesame cookies with black and white sesame, premium festive bakery product photography, warm cream background, elegant styling",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "pineapple-tart-gift-box.png"),
    prompt:
      "luxury festive gift box with assorted pineapple tarts, elegant cream and gold packaging, premium Chinese New Year gift set photography, warm studio lighting",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "assorted-cookie-gift-box.png"),
    prompt:
      "assorted Chinese New Year cookie gift box, open box with multiple golden cookies, premium festive packaging photo, cream background, refined celebratory styling",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "premium-trio-gift-set.png"),
    prompt:
      "premium Chinese New Year hamper with three cookie tins and elegant festive packaging, upscale gift set photography, warm neutral background",
    size: "square_hd",
  },
  {
    file: path.join(productDir, "default.png"),
    prompt:
      "premium handmade Chinese New Year cookies assortment, elegant bakery product photography, warm cream background, refined festive styling",
    size: "square_hd",
  },
  {
    file: path.join(homeDir, "category-pineapple.png"),
    prompt:
      "close-up bowl of glossy pineapple tart pastries, golden festive dessert photo, warm ivory background, premium food styling",
    size: "square_hd",
  },
  {
    file: path.join(homeDir, "category-butter.png"),
    prompt:
      "butter swirl cookies in circular arrangement, luxury bakery product photo, warm cream background, soft light",
    size: "square_hd",
  },
  {
    file: path.join(homeDir, "category-fragrant.png"),
    prompt:
      "golden butter cookies assortment, handcrafted Chinese New Year pastries, elegant product photography",
    size: "square_hd",
  },
  {
    file: path.join(homeDir, "category-traditional.png"),
    prompt:
      "traditional Chinese New Year cookies in warm festive arrangement, golden baked assortment, refined bakery styling",
    size: "square_hd",
  },
  {
    file: path.join(homeDir, "category-eggroll.png"),
    prompt:
      "crispy egg rolls tied in neat stack, warm bakery product photography, ivory background, festive elegance",
    size: "square_hd",
  },
  {
    file: path.join(homeDir, "category-giftbox.png"),
    prompt:
      "premium assorted cookie gift box with elegant festive packaging, warm cream background, refined Chinese New Year presentation",
    size: "square_hd",
  },
];

function buildUrl(prompt, size) {
  const base = "https://coresg-normal.trae.ai/api/ide/v1/text_to_image";
  return `${base}?prompt=${encodeURIComponent(prompt)}&image_size=${size}`;
}

async function downloadAsset(asset) {
  const url = buildUrl(asset.prompt, asset.size);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${asset.file}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await mkdir(path.dirname(asset.file), { recursive: true });
  await writeFile(asset.file, buffer);
  console.log(`Saved ${path.relative(root, asset.file)}`);
}

async function main() {
  for (const asset of assets) {
    await downloadAsset(asset);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

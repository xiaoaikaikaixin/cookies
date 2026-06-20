export type ProductDetailSection =
  | {
      type: "paragraph";
      content: string[];
    }
  | {
      type: "feature-list";
      items: { title: string; content: string }[];
    }
  | {
      type: "ingredients";
      title: string;
      subtitle?: string;
      items: string[];
    };

export type ProductDetailContent = {
  productTitle?: string;
  productSubtitle?: string;
  sizeOptions?: string[];
  defaultSize?: string;
  displayPrice?: number;
  displayPriceSuffix?: string;
  descriptionTitle?: string;
  sections: ProductDetailSection[];
};

const productDetailMap: Record<string, ProductDetailContent> = {
  "pineapple-tart": {
    productTitle: "Premium Pineapple Balls 黄梨球",
    productSubtitle: "传承经典南洋风味",
    sizeOptions: ["400g"],
    defaultSize: "400g",
    displayPrice: 20.8,
    displayPriceSuffix: "w/GST",
    descriptionTitle: "Product Description",
    sections: [
      {
        type: "paragraph",
        content: [
          "黄梨球（Pineapple Tart Balls）是新加坡、马来西亚及东南亚华人家庭在农历新年期间最受欢迎的传统年饼之一。其历史可追溯至娘惹（Peranakan）文化，融合了中式与马来风味，经过数代传承，成为象征吉祥、团圆与财富的经典美食。",
          "“黄梨”在福建话中发音接近“旺来”（Ong Lai），寓意好运、财富与兴旺，因此黄梨球常被视为新春佳节必备的幸运糕点。",
        ],
      },
      {
        type: "feature-list",
        items: [
          {
            title: "100% 纯手工制作",
            content:
              "每一颗黄梨球均由经验丰富的师傅精心手工制作，从熬煮黄梨馅到塑形烘焙，坚持传统工艺，保留最纯正的风味。",
          },
          {
            title: "严选优质黄梨",
            content:
              "采用新鲜成熟黄梨熬制成果香浓郁的黄梨馅，酸甜平衡，入口自然清香，不添加人工香精。",
          },
          {
            title: "酥松入口即化",
            content:
              "精选优质奶油与面粉制作酥皮，经过精准比例调配，口感酥松细腻，入口即化。",
          },
          {
            title: "甜而不腻",
            content:
              "特别调整甜度，保留黄梨天然果香，让每一口都层次丰富，老少皆宜。",
          },
          {
            title: "节庆送礼首选",
            content:
              "精美包装设计，适合作为新春拜年礼盒、企业赠礼及亲友分享佳品。",
          },
        ],
      },
      {
        type: "ingredients",
        title: "产品原料表",
        subtitle: "主要成分",
        items: [
          "黄梨果肉（Pineapple）",
          "小麦面粉（Wheat Flour）",
          "奶油（Butter）",
          "鸡蛋（Egg）",
          "砂糖（Sugar）",
          "奶粉（Milk Powder）",
          "玉米粉（Corn Flour）",
          "食盐（Salt）",
        ],
      },
      {
        type: "ingredients",
        title: "过敏原信息",
        items: [
          "麸质（Gluten）",
          "鸡蛋（Egg）",
          "牛奶制品（Milk）",
          "对上述成分过敏者请谨慎食用。",
        ],
      },
      {
        type: "paragraph",
        content: [
          "外层金黄酥香，入口即化；内馅果香浓郁，酸甜适中。每一颗黄梨球都带来浓厚的新春气息与满满幸福感。",
          "Lisa Handmade Cookies",
          "纯手工制作 · 真材实料 · 满口幸福",
        ],
      },
    ],
  },
};

export function getProductDetailContent(slug: string, fallbackDescription: string): ProductDetailContent {
  return (
    productDetailMap[slug] ?? {
      sizeOptions: ["400g"],
      defaultSize: "400g",
      displayPriceSuffix: "w/GST",
      descriptionTitle: "Product Description",
      sections: [{ type: "paragraph", content: [fallbackDescription] }],
    }
  );
}

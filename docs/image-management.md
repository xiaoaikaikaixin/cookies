# 图片管理说明

当前站点图片已统一改为本地文件管理，主要目录如下：

- `public/images/products`
  - 商品卡、商品详情、购物车缩略图使用这里的文件
  - 建议按商品 `slug` 直接替换同名文件，例如：
    - `pineapple-tart.png`
    - `almond-cookies.png`
    - `assorted-cookie-gift-box.png`

- `public/images/home`
  - 首页分类圆图使用这里的文件
  - 当前文件包括：
    - `category-pineapple.png`
    - `category-butter.png`
    - `category-fragrant.png`
    - `category-traditional.png`
    - `category-eggroll.png`
    - `category-giftbox.png`

## 更新方式

1. 准备新图片
2. 直接覆盖同名文件
3. 刷新页面即可看到新图

如果要新增商品图，请同时补这两个位置：

1. `public/images/products/<slug>.png`
2. `src/lib/product-images.ts` 中的 `productImageMap`

如果只是替换现有图片，不需要改代码。

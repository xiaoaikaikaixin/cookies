"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-[1.8rem] border border-[#EFE5D8] bg-[#F7EFE5] shadow-[0_18px_40px_rgba(120,80,40,0.06)]">
        <div className="relative aspect-square">
          <Image
            src={activeImage}
            alt={alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {images.map((image, index) => {
            const isActive = image === activeImage;

            return (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                className={`group overflow-hidden rounded-2xl border bg-white text-left transition ${
                  isActive
                    ? "border-[#C0823A] ring-2 ring-[#E7C38D] shadow-[0_10px_24px_rgba(120,80,40,0.12)]"
                    : "border-[#EFE5D8] hover:border-[#D9B16B] hover:shadow-[0_8px_20px_rgba(120,80,40,0.08)]"
                }`}
                aria-label={`查看第 ${index + 1} 张产品图片`}
                aria-pressed={isActive}
              >
                <div className="relative aspect-square overflow-hidden bg-[#FBF6F0]">
                  <Image
                    src={image}
                    alt={`${alt} 缩略图 ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 160px, 30vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

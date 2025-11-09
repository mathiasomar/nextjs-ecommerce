"use client";

import { ProductType } from "@/app/types";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import useCartStore from "@/store/cart-store";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productType, setProductType] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const { addToCart } = useCartStore();

  const handleproductTypeChange = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductType((prev) => ({ ...prev, [type]: value }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productType.size,
      selectedColor: productType.color,
    });

    toast.success("Product Added to Cart", { position: "bottom-right" });
  };
  return (
    <Card className="w-full border-0 p-0">
      <CardContent className="overflow-hidden">
        {/* IMAGE */}
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-2/3">
            <Image
              src={product.images[productType.color]}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-all duration-300"
            />
          </div>
        </Link>
        {/* PRODUCT INFO */}
        <div className="flex flex-col gap-4 p-4 bg-backgr">
          <h1 className="font-semibold text-sm">{product.name}</h1>
          <p className="text-sm text-gray-500">{product.shortDescription}</p>

          {/* PRODUCT TYPES */}
          <div className="flex items-center justify-between gap-4 text-xs">
            {/* SIZES */}
            <div className="flex flex-col gap-1">
              <span className="">Sizes</span>
              <select
                name="size"
                id="size"
                className="outline-none ring ring-secondary px-2 py-1 rounded-md"
                onChange={(e) =>
                  handleproductTypeChange({
                    type: "size",
                    value: e.target.value,
                  })
                }
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            {/* COLORS */}
            <div className="flex flex-col gap-1">
              <span className="">Colors</span>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className={cn(
                      "cursor-pointer border-2 rounded-full p-[1.5px]",
                      productType.color === color
                        ? "border-primary"
                        : "border-transparent"
                    )}
                    onClick={() =>
                      handleproductTypeChange({ type: "color", value: color })
                    }
                  >
                    <div
                      className="size-3.5 rounded-full border border-gray-500"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PRICE TAG */}
          <div className="flex items-center justify-between">
            <p className="font-medium">Ksh.{product.price.toFixed(2)}</p>
          </div>

          {/* CART BUTTO */}
          <Button
            variant="outline"
            size="sm"
            className="text-sm cursor-pointer w-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
            ADD TO CART
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

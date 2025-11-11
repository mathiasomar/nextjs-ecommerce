"use client";

import { ProductType } from "@/app/types";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import { useState } from "react";
import useCartStore from "@/store/cart-store";
import { toast } from "sonner";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "descrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success("Product Added to Cart", { position: "bottom-right" });
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* SIZE */}
      <div className="flex flex-col gap-2 text-xs">
        <span className="text-muted-foreground">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              key={size}
              className={cn(
                "cursor-pointer border p-0.5",
                selectedSize === size ? "border-primary" : "border-secondary"
              )}
              onClick={() => handleTypeChange("size", size)}
            >
              <div
                className={cn(
                  "w-6 h-6 text-center flex items-center justify-center",
                  selectedSize === size
                    ? "bg-primary text-background"
                    : "bg-secondary"
                )}
              >
                {size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* COLOR */}
      <div className="flex flex-col gap-2 text-xs">
        <span className="text-muted-foreground">Colors</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              key={color}
              className={cn(
                "cursor-pointer border p-0.5",
                selectedColor === color ? "border-primary" : "border-secondary"
              )}
              onClick={() => handleTypeChange("color", color)}
            >
              <div className={"w-6 h-6"} style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      </div>
      {/* QUUANTITY */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-muted-foreground">Quantity</span>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={() => handleQuantityChange("descrement")}
          >
            <MinusIcon className="w-4 h-4" />
          </Button>
          <span>{quantity}</span>
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={() => handleQuantityChange("increment")}
          >
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {/* BUTTONS */}
      <Button onClick={handleAddToCart}>
        <PlusIcon className="w-4 h-4" /> Add to Cart
      </Button>
      <Button variant={"outline"}>
        <ShoppingCart className="w-4 h-4" /> Buy Now
      </Button>
    </div>
  );
};

export default ProductInteraction;

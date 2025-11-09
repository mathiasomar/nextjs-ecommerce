"use client";

import { cn } from "@/lib/utils";
import {
  Footprints,
  Glasses,
  Briefcase,
  Shirt,
  ShoppingBasket,
  Hand,
  Venus,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all",
  },
  {
    name: "T-shirts",
    icon: <Shirt className="w-4 h-4" />,
    slug: "t-shirts",
  },
  {
    name: "Shoes",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: <Glasses className="w-4 h-4" />,
    slug: "accessories",
  },
  {
    name: "Bags",
    icon: <Briefcase className="w-4 h-4" />,
    slug: "bags",
  },
  {
    name: "Dresses",
    icon: <Venus className="w-4 h-4" />,
    slug: "dresses",
  },
  {
    name: "Jackets",
    icon: <Shirt className="w-4 h-4" />,
    slug: "jackets",
  },
  {
    name: "Gloves",
    icon: <Hand className="w-4 h-4" />,
    slug: "gloves",
  },
];

const CategoryMenu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");

  const handleCategoryClick = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value || "all");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="grid grid-cols-2 gap-2 place-items-center place-content-center bg-secondary p-2 rounded-lg mb-4 text-sm sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8">
      {categories.map((category) => (
        <div
          key={category.name}
          className={cn(
            "rounded-full text-sm border border-secondary px-4 py-1 transition-color duration-500 ease-in-out cursor-pointer hover:bg-primary hover:text-primary-foreground w-fit flex items-center gap-2",
            selectedCategory === category.slug
              ? "bg-primary text-primary-foreground"
              : selectedCategory === null && category.slug === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          )}
          onClick={() => handleCategoryClick(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryMenu;

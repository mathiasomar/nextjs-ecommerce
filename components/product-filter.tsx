"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const ProductFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex items-center gap-2 justify-end text-sm my-6">
      <span>Sort By:</span>
      <select
        name="sort"
        id="sort"
        className="outline-none ring-1 ring-secondary rounded-lg px-2 py-1 shadow-md"
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default ProductFilter;

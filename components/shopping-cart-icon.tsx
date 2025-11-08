"use client";

import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";

const ShoppingCartIcon = () => {
  return (
    <Link href="/cart" className="relative">
      <ShoppingCart />
      <Badge
        variant="destructive"
        className="h-5 min-w-5 rounded-full px-1 absolute -top-2 -right-2 text-xs"
      >
        0
      </Badge>
    </Link>
  );
};

export default ShoppingCartIcon;

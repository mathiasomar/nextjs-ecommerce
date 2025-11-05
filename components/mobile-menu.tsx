"use client";

import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="relative md:hidden transition-all duration-500 ease-in-out">
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer trannsition-all ease-in-out"
        onClick={handleClick}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>
      {isOpen && (
        <div className="absolute z-2 right-0 -bottom-30 bg-white shadow-sm space-y-1 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <Link
            href="/"
            className="block px-2 py-1 text-center hover:bg-gray-100 rounded-md min-w-[100px] dark:hover:bg-gray-700 text-sm"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-2 py-1 text-center hover:bg-gray-100 rounded-md min-w-[100px] dark:hover:bg-gray-700 text-sm"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="block px-2 py-1 text-center hover:bg-gray-100 rounded-md min-w-[100px] dark:hover:bg-gray-700 text-sm"
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;

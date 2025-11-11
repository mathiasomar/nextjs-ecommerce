import Link from "next/link";
import Container from "./container";
import Image from "next/image";
import { SearchBar } from "./search-bar";
import MobileMenu from "./mobile-menu";
import { ShoppingBasket, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserLogout from "./user-logout";
import ShoppingCartIcon from "./shopping-cart-icon";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-2 w-screen py-5 bg-white dark:bg-gray-800">
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/logo.png" alt="logo" width={25} height={25} />
          <span className="hidden md:inline font-bold text-lg text-gray-800 dark:text-white">
            Naj<span className="text-primary">Trends</span>
          </span>
        </Link>

        <SearchBar />

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-sm">
              Home
            </Link>
            <Link href="/products" className="text-sm">
              Products
            </Link>
            <Link href="/about" className="text-sm">
              About Us
            </Link>
            <Link href="/contact" className="text-sm">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ShoppingCartIcon />

            {/* Profile */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link
                      href="/profile"
                      className="w-full p-2 rounded-md hover:text-foreground flex items-center gap-2"
                    >
                      <User />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/orders"
                      className="w-full p-2 rounded-md hover:text-foreground flex items-center gap-2"
                    >
                      <ShoppingBasket />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <UserLogout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <Button asChild size="sm">
              <Link href="/auth/login" className="capitalize">
                login
              </Link>
            </Button>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Container from "../container";

const imageURL =
  "https://jevelin.shufflehound.com/fashion-shop/wp-content/uploads/sites/27/2018/03/Rectangle-331-copy-woman.jpg";

export default function HeroSection() {
  return (
    <>
      <section
        className="w-full overflow-x h-auto md:h-[calc(100vh-4rem)]"
        style={{
          backgroundImage: `url(${imageURL})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Container className="h-full">
          <div className="w-full h-full flex flex-col md:flex-row items-center lg:items-stretch gap-6">
            <div className="w-full md:w-1/2 h-full text-center md:text-left flex flex-col justify-center items-center md:items-start">
              <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                New, Amazing Stuff is Here
              </h1>
              <p className="mt-8 max-w-2xl text-pretty text-lg">
                Refresh your wardrobe with our latest collection — from timeless
                essentials to bold, trend-forward pieces. Crafted for comfort
                and designed to turn heads, shop premium fabrics and sustainable
                styles with free shipping and easy returns.
              </p>

              <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                <Button asChild size="lg" className="px-5 text-base">
                  <Link href="#link">
                    <span className="text-nowrap">Shop Now</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right side image - visible on large screens */}
            <div className="hidden md:flex lg:w-1/2 h-full items-center justify-center">
              <div className="w-full max-w-lg">
                <Image
                  src="https://jevelin.shufflehound.com/fashion-shop/wp-content/uploads/sites/27/2018/03/1.jpg"
                  alt="Featured product"
                  width={800}
                  height={800}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

import { ProductType } from "@/app/types";
import Container from "@/components/container";
import ProductInteraction from "@/components/product-interaction";
import Image from "next/image";

// TEMPORARY DATA
const product: ProductType = {
  id: 1,
  name: "Adidas CoreFit T-Shirt",
  shortDescription:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  description:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  price: 39.9,
  sizes: ["s", "m", "l", "xl", "xxl"],
  colors: ["gray", "purple", "green"],
  images: {
    gray: "/products/1g.png",
    purple: "/products/1p.png",
    green: "/products/1gr.png",
  },
};

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color: string; size: string }>;
}) => {
  const { size, color } = await searchParams;

  const selectedSize = size || (product.sizes[0] as string);
  const selectedColor = color || (product.colors[0] as string);
  return (
    <Container className="flex flex-col gap-4 lg:flex-row md:gap-12 my-12">
      {/* IMAGE */}
      <div className="w-full lg:w-5/12 relative bg-white aspect-2/3">
        <Image
          src={product.images[selectedColor]}
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      {/* DETAILS */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="2xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-semibold">
          Ksh.{product.price.toFixed(2)}
        </h2>
        {/* ITERACTIONS */}
        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
        {/* CARD INFO */}
        <div className="flex items-center gap-2 mt-4">
          <Image
            src="/klarna.png"
            alt="klarna"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/cards.png"
            alt="cards"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/stripe.png"
            alt="stripe"
            width={50}
            height={25}
            className="rounded-md"
          />
        </div>
        <p className="text-gray-500 text-xs">
          By clicking Pay Now, you agree to our{" "}
          <span className="underline hover:text-black">Terms & Conditions</span>{" "}
          and <span className="underline hover:text-black">Privacy Policy</span>
          . You authorize us to charge your selected payment method for the
          total amount shown. All sales are subject to our return and{" "}
          <span className="underline hover:text-black">Refund Policies</span>.
        </p>
      </div>
    </Container>
  );
};

export default ProductPage;

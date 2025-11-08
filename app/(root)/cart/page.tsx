"use client";

import { CartItemsType } from "@/app/types";
import Container from "@/components/container";
import PaymentForm from "@/components/payment-form";
import SectionHeader from "@/components/sections/section-header";
import ShippingForm from "@/components/shipping-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AlertCircleIcon, ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const steps = [
  {
    id: 1,
    title: "Shoppig Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Paymet Method",
  },
];

// TEMPORARY
const cartItems: CartItemsType = [
  {
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
    quantity: 1,
    selectedSize: "m",
    selectedColor: "gray",
  },
  {
    id: 2,
    name: "Puma Ultra Warm Zip",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/2g.png", green: "/products/2gr.png" },
    quantity: 1,
    selectedSize: "l",
    selectedColor: "gray",
  },
  {
    id: 3,
    name: "Nike Air Essentials Pullover",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 69.9,
    sizes: ["s", "m", "l"],
    colors: ["green", "blue", "black"],
    images: {
      green: "/products/3gr.png",
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
    quantity: 1,
    selectedSize: "l",
    selectedColor: "black",
  },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState(null);

  const activeStep = parseInt(searchParams.get("step") || "1");
  return (
    <Container className="flex flex-col gap-8 items-center justify-center my-12">
      {/* TITLE */}
      <SectionHeader title="Your Shopping Cart" />
      {/* STEPS */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            className={cn(
              "flex items-center gap-2 border-b-2 pb-4 cursor-pointer transition-colors duration-300 ease-in-out",
              step.id === activeStep ? "border-primary" : "border-secondary"
            )}
            key={step.id}
          >
            <div
              className={cn(
                "w-6 h-6 rounded-full text-primary-foreground p-4 flex items-center justify-center",
                step.id === activeStep ? "bg-primary" : "bg-secondary"
              )}
            >
              {step.id}
            </div>
            <p
              className={cn(
                "text-sm font-medium",
                step.id === activeStep ? "text-primary" : "text-secondary"
              )}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/* STEPS AND DETAILS */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* STEPS */}
        <div className="w-full lg:w-7/12 shadow-lg border p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            cartItems.map((item) => (
              // SIGLE CART ITEM
              <div className="flex items-center justify-between" key={item.id}>
                {/* IMAGE AND DETAILS */}
                <div className="flex gap-8">
                  {/* IMAGE */}
                  <div className="relative w-32 h-32 bg-white rounded-lg overflow-hidden">
                    <Image
                      src={item.images[item.selectedColor]}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* ITEM DETAILS */}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Size: {item.selectedSize}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Color: {item.selectedColor}
                      </p>
                    </div>
                    <p className="font-medium">Ksh.{item.price.toFixed(2)}</p>
                  </div>
                </div>
                {/* DELETE BUTTON */}
                <Button variant="icon" className="cursor-pointer rounded-full">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertDescription>
                Please fill in the shipping form
              </AlertDescription>
            </Alert>
          )}
        </div>
        {/* DETAILS */}
        <div className="w-full lg:w-5/12 shadow-lg border p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">Subtotal</p>
              <p className="font-medium">
                Ksh.
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">Discount(10%)</p>
              <p className="font-medium text-destructive">Ksh.10</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">Shipping Fee</p>
              <p className="font-medium">Ksh.10</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Total</p>
              <p className="font-bold">
                Ksh.
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <Button
              className="cursor-pointer hover:scale-x-105 transition-all duration-300"
              onClick={() => router.push("/cart?step=2", { scroll: false })}
            >
              Continue <ArrowRight className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CartPage;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const paymentFormShema = z.object({
  cardHolder: z.string().min(1, "Card Holder is required!"),
  cardNumber: z
    .email()
    .min(16, "Card number must be 16 digits")
    .max(16, "Card number must be 16 digits"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expirationn date must be in MM/YY format!"
    ),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV must be 3 digits!"),
});

type PaymentFormInputs = z.infer<typeof paymentFormShema>;

const PaymentForm = () => {
  const form = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormShema),
    defaultValues: {
      cardHolder: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<PaymentFormInputs> = (data) => {};
  return (
    <div>
      <h2 className="font-semibold mb-6">Payment Method</h2>

      {/* Form */}
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="cardHolder"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">
                  Name on Card
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the names"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="cardNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">
                  Card Number
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="123456789123"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="expirationDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">
                  Expiration Date
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="MM/YY"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="cvv"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">CVV</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="123"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

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

        <Button type="submit" className="mt-10 w-full cursor-pointer">
          Checkout <ShoppingCart className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;

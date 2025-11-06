"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { success, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { forgetPassword, signIn, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ResetForm = z.infer<typeof loginSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: ResetForm) => {
    setLoading(true);
    setSuccess(false);

    try {
      const result = await forgetPassword({
        email: data.email,
        redirectTo: "/auth/reset-password",
      });

      if (result.error) {
        toast.error(result.error.message || "Request failed");
      } else {
        toast.success("Password reset link sent! Please check your email");
        setSuccess(true);
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <section className="flex min-h-auto bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      {success ? (
        <Alert variant="default" className="m-auto max-w-md">
          <AlertDescription>
            Password reset link has been sent to your email. Check the console
            for the reset URL
          </AlertDescription>
        </Alert>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
        >
          <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
            <div className="text-center">
              <Link
                href="/"
                aria-label="go home"
                className="mx-auto block w-fit"
              >
                <Image src="/logo.png" alt="logo" width={60} height={60} />
              </Link>
              <h1 className="mb-1 mt-4 text-xl font-semibold">
                Forgot Password
              </h1>
              <p className="text-sm">
                Enter your email to receive the password reset link
              </p>
            </div>

            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="block text-sm">
                  Email Address
                </Label>
                <Input type="email" id="email" {...register("email")} />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <Button
                disabled={loading}
                type="submit"
                className="w-full cursor-pointer"
              >
                {loading ? (
                  <>
                    <Spinner /> Loading...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </div>

          <div className="p-3">
            <p className="text-accent-foreground text-center text-sm">
              <Button asChild variant="link" className="px-2">
                <Link href="/auth/login">Back to login</Link>
              </Button>
            </p>
          </div>
        </form>
      )}
    </section>
  );
}

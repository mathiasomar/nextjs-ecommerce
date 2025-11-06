"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { resetPassword, signIn, useSession } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confpassword: z.string(),
  })
  .superRefine(({ password, confpassword }, ctx) => {
    if (password !== confpassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confpassword"],
        message: "Passwords do not match",
      });
    }
  });

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      setError("Invalid or missing token");
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  console.log(token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await resetPassword({
        newPassword: data.password,
        token: token as string,
      });

      if (result.error) {
        toast.error(result.error.message || "Reset Password failed");
      } else {
        toast.success("Reset Password successful! Redirecting to login...");
        setSuccess(true);
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
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

  if (!token && !error) {
    return (
      <section className="flex min-h-auto bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
        <p className="m-auto text-center text-lg">Loading...</p>
      </section>
    );
  }

  return (
    <section className="flex min-h-auto bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="text-center">
            <Link href="/" aria-label="go home" className="mx-auto block w-fit">
              <Image src="/logo.png" alt="logo" width={60} height={60} />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Reset your Password
            </h1>
            <p className="text-sm">Create a new password</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pwd" className="text-sm">
                  New Password
                </Label>
              </div>
              <Input
                type="password"
                id="pwd"
                disabled={!token}
                {...register("password")}
                className="input sz-md variant-mixed"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="confpwd" className="text-sm">
                  Confirm Password
                </Label>
              </div>
              <Input
                type="password"
                id="confpwd"
                disabled={!token}
                {...register("confpassword")}
                className="input sz-md variant-mixed"
              />
              {errors.confpassword && (
                <p className="text-red-500 text-sm">
                  {errors.confpassword.message}
                </p>
              )}
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="w-full cursor-pointer"
            >
              {loading ? (
                <>
                  <Spinner /> Reseting...
                </>
              ) : (
                "Reset Password"
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
    </section>
  );
}

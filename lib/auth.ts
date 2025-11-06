import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "./generated/prisma/client";
import { getResetPasswordEmailHtml } from "@/components/email-template";
import { FROM_EMAIL, resend } from "./resend";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      try {
        const emailHtml = getResetPasswordEmailHtml(user.email, url);

        // Send the email using Resend
        const { data, error } = await resend.emails.send({
          to: user.email,
          from: FROM_EMAIL,
          subject: "Reset your password",
          html: emailHtml,
        });

        if (error) {
          console.error("Error sending reset password email:", error);
          throw new Error("Failed to send reset password email");
        }

        console.log("Reset password email sent successfully to:", user.email);
        console.log("Email ID:", data?.id);

        // For development purposes, log the reset URL to the console
        if (process.env.NODE_ENV === "development") {
          console.log(`Password reset URL for ${user.email}: ${url}`);
        }
      } catch (error) {
        console.log(
          "Error in sendResetPassword:",
          error instanceof Error ? error : ""
        );
      }
    },
  },
});

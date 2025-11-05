import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import ThemeInit from "@/components/theme-init";
import ThemeHandler from "@/components/theme-handler";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NajTrends Fashion Store",
  description: "Your one-stop shop for the latest fashion trends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Don't read cookies here to avoid blocking the route.
  // Theme will be initialized by the ThemeInit script in <head>.
  const initialTheme: string | undefined = undefined;

  return (
    <html lang="en" style={{ overflowX: "hidden" }} suppressHydrationWarning>
      <head>
        <Suspense>
          <ThemeInit />
        </Suspense>
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeHandler theme={initialTheme}>{children}</ThemeHandler>
      </body>
    </html>
  );
}

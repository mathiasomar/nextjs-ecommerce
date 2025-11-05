import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read theme cookie on the server to render consistent html attributes
  const cookieStore = await cookies();
  const themeCookie =
    cookieStore.get("theme")?.value ||
    cookieStore.get("next-theme")?.value ||
    cookieStore.get("next-themes")?.value ||
    "light";

  const initialTheme = themeCookie === "system" ? "light" : themeCookie;

  return (
    <html
      lang="en"
      className={initialTheme}
      style={{ colorScheme: initialTheme }}
    >
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

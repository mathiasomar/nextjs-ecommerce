import { cookies } from "next/headers";

export async function getTheme() {
  const cookieStore = await cookies();
  const themeCookie =
    cookieStore.get("theme")?.value ||
    cookieStore.get("next-theme")?.value ||
    cookieStore.get("next-themes")?.value ||
    "light";

  return themeCookie === "system" ? "light" : themeCookie;
}

export default async function ThemeInit() {
  const theme = await getTheme();

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          try {
            document.documentElement.className = "${theme}";
            document.documentElement.style.colorScheme = "${theme}";
          } catch (e) {}
        `,
      }}
    />
  );
}

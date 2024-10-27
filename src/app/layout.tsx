import { createTheme, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import "./globals.css";
import theme from "@/theme";

export const metadata: Metadata = {
  title: "FlashcardsAi",
  description:
    "FlashcardsAi is a flashcard app that uses AI to help you learn faster."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

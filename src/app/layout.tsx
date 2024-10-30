import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import TrpcProvider from "./_trpc/Provider";
import "./globals.css";

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
          <TrpcProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </TrpcProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import TrpcProvider from "./_trpc/Provider";
import "./globals.css";
import NextAuthProvider from "@/context/nextAuthContext";

export const metadata: Metadata = {
  title: "FlashcardsAi",
  description:
    "FlashcardsAi is a flashcard app that uses AI to help you learn faster."
};

export default function RootLayout({
  children,
  params: { session, ...params }
}: Readonly<{
  children: React.ReactNode;
  params: Record<string, any>;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <NextAuthProvider>
            <TrpcProvider>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </TrpcProvider>
          </NextAuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

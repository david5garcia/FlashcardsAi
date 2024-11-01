import Navbar from "@/components/layout/navbar";
import NextAuthProvider from "@/context/nextAuthContext";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import "react-toastify/dist/ReactToastify.css";
import TrpcProvider from "./_trpc/Provider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlashcardsAi",
  description:
    "FlashcardsAi is a flashcard app that uses AI to help you learn faster."
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <NextAuthProvider>
            <TrpcProvider>
              <ThemeProvider theme={theme}>
                <Navbar />
                {children}
              </ThemeProvider>
            </TrpcProvider>
          </NextAuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

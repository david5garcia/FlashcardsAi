import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}

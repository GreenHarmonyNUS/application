"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/Navbar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <AppRouterCacheProvider>
            <SessionProvider>
              <Navbar />
              {children}
            </SessionProvider>
          </AppRouterCacheProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

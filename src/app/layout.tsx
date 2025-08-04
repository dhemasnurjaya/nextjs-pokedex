import { nunito } from "@/ui/fonts";
import "@/ui/globals.css";
import Navbar from "@/ui/navbar";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pokédex",
  description: "NextJS-powered Pokédex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased pt-14`}>
        <Navbar className="fixed top-0 left-0 right-0 h-14 flex items-center px-4 bg-navbar-background z-10" />
        <div className="flex flex-col grow p-4 md:w-full">{children}</div>
      </body>
    </html>
  );
}

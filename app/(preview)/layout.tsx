"use client";
import type { Metadata } from "next";
import { Kbd } from "@nextui-org/react";

import "./globals.css";
import { Providers } from "../providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          {children}
          <div className="flex items-center align-center">
            <Kbd>Made with ❤️ by Roshan and Cs Friends</Kbd>
          </div>
        </Providers>
      </body>
    </html>
  );
}

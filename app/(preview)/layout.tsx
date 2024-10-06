import type { Metadata } from "next";

import "./globals.css";
import {Providers} from "../providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-sdk-preview-rag.vercel.app"),
  title: "Astro-Bot",
  description:
    "Augmented language model generations with vector based retrieval for space and planetary data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
    <body>
      <Providers>
        {children}
      </Providers>
    </body>
  </html>
  );
}

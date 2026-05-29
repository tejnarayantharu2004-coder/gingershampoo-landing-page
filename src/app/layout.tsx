import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { product } from "@/lib/product";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: `${product.name} | ${product.brandName}`,
  description: product.description,
  openGraph: {
    title: `${product.name} | ${product.brandName}`,
    description: product.description,
    images: [product.images[0]]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

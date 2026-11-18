import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Maison Cacao | Luxury Dubai Artisan Chocolate Shop",
  description:
    "Handcrafted luxury chocolates in Dubai — Pistachio Kunafa Bars, 24K Gold Saffron Truffles, and Single-Origin Pralines priced in AED.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-cream-100 text-cocoa-900 antialiased selection:bg-gold-400 selection:text-cocoa-950">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

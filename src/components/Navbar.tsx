"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Sparkles, CreditCard, UtensilsCrossed, Home } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, subtotalAED } = useCart();

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/menu", label: "Menu", icon: UtensilsCrossed },
    { href: "/cart", label: "Cart", icon: ShoppingBag },
    { href: "/checkout", label: "Checkout", icon: CreditCard },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gold-400/30 bg-cocoa-950/95 text-cream-100 backdrop-blur-md">
      {/* Top luxury announcement bar */}
      <div className="bg-gradient-to-r from-cocoa-900 via-gold-600/30 to-cocoa-900 border-b border-gold-500/20 px-4 py-1.5 text-center text-xs tracking-widest uppercase text-gold-300">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-gold-400" />
          Chilled Same-Day Delivery Across Dubai &amp; UAE • Complimentary Gold Gift Wrapping on Orders Over 250 AED
        </span>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold-400 bg-gradient-to-br from-cocoa-800 to-cocoa-950 shadow-md shadow-gold-500/10 transition-transform duration-300 group-hover:scale-105">
            <span className="font-serif text-xl font-bold tracking-tighter text-gold-400">
              MC
            </span>
          </div>
          <div>
            <span className="block font-serif text-xl font-bold tracking-wider text-cream-50 sm:text-2xl">
              MAISON <span className="text-gold-400">CACAO</span>
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-gold-300/80">
              Dubai Artisan Chocolatier
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-full ${
                  isActive
                    ? "bg-gold-500 text-cocoa-950 font-semibold shadow-sm shadow-gold-400/30"
                    : "text-cream-200 hover:text-gold-300 hover:bg-cocoa-800/70"
                }`}
              >
                {link.label}
                {link.href === "/cart" && totalItems > 0 && (
                  <span
                    className={`ml-1.5 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-bold ${
                      isActive
                        ? "bg-cocoa-950 text-gold-300"
                        : "bg-gold-500 text-cocoa-950"
                    }`}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Quick Cart Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="flex items-center gap-2.5 rounded-full border border-gold-400/60 bg-gradient-to-r from-cocoa-800 to-cocoa-900 px-4 py-2 text-sm font-medium text-cream-50 shadow-sm transition hover:border-gold-300 hover:from-cocoa-700 hover:to-cocoa-800"
          >
            <div className="relative">
              <ShoppingBag className="h-4 w-4 text-gold-400" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-cocoa-950">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-cream-200">Bag</span>
            <span className="border-l border-gold-500/30 pl-2 font-semibold text-gold-300">
              {subtotalAED} AED
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile bottom bar for all 4 pages */}
      <div className="flex md:hidden border-t border-gold-500/20 bg-cocoa-900/95 px-2 py-1.5 justify-around">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                isActive
                  ? "bg-gold-500 text-cocoa-950 font-semibold"
                  : "text-cream-200 hover:text-gold-300"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{link.label}</span>
              {link.href === "/cart" && totalItems > 0 && (
                <span className="rounded-full bg-cocoa-950 px-1.5 text-[10px] font-bold text-gold-300">
                  {totalItems}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </header>
  );
}

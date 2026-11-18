import React from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-2 border-gold-500/40 bg-cocoa-950 text-cream-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400 bg-cocoa-900">
                <span className="font-serif text-lg font-bold text-gold-400">
                  MC
                </span>
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-cream-50">
                MAISON <span className="text-gold-400">CACAO</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-300/80">
              Handcrafted luxury chocolates made daily in Dubai using single-origin
              cacao, Iranian pistachios, Khorasan saffron, and 24-karat edible
              gold leaf.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gold-300">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-cocoa-900 px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
                100% Artisan Couverture
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-cocoa-900 px-3 py-1">
                Chilled Van UAE Delivery
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-gold-400">
              Explore Boutique
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-gold-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-gold-300 transition">
                  Chocolate Menu (8 Creations)
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-gold-300 transition">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-gold-300 transition">
                  Express Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Flagship */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-gold-400">
              Dubai Flagship
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream-300/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" />
                <span>Fashion Avenue, The Dubai Mall, Downtown Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold-400" />
                <span>+971 4 555 0199</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-gold-400" />
                <span>Daily: 10:00 AM – 11:30 PM GST</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gold-500/20 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-300/60">
          <p>© {new Date().getFullYear()} Maison Cacao (chocolate-shop). All rights reserved.</p>
          <p className="mt-2 sm:mt-0 text-gold-400/80">
            All prices listed in UAE Dirhams (AED) inclusive of VAT.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CHOCOLATES } from "@/data/chocolates";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    addToCart,
    subtotalAED,
    totalItems,
  } = useCart();

  const deliveryFeeAED = subtotalAED === 0 ? 0 : subtotalAED >= 250 ? 0 : 25;
  const totalAED = subtotalAED + deliveryFeeAED;
  const remainingForFreeDelivery = Math.max(0, 250 - subtotalAED);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-gold-500/40 pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
            Maison Cacao Boutique
          </span>
          <h1 className="mt-1 font-serif text-3xl font-bold text-cocoa-900 sm:text-4xl">
            Your Shopping Bag
          </h1>
        </div>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cocoa-800 hover:text-gold-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping Menu
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-gold-500/40 bg-cream-50 p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold-400 bg-cocoa-900 text-gold-400">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h2 className="mt-4 font-serif text-2xl font-bold text-cocoa-900">
            Your chocolate bag is currently empty
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-cocoa-700">
            Explore our 8 handcrafted Dubai chocolates or quickly add one of our
            bestsellers below.
          </p>
          <div className="mt-6">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-cocoa-900 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-gold-300 shadow hover:bg-gold-500 hover:text-cocoa-950 transition"
            >
              Browse Full Chocolate Menu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Quick-add sample chocolates right from empty cart */}
          <div className="mt-10 border-t border-gold-500/30 pt-8 text-left">
            <h3 className="text-center font-serif text-lg font-bold text-cocoa-900">
              Quick Add Popular Chocolates
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {CHOCOLATES.slice(0, 3).map((choc) => (
                <div
                  key={choc.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-gold-500/40 bg-cream-100 p-3.5"
                >
                  <div>
                    <p className="font-serif text-sm font-bold text-cocoa-900">
                      {choc.name}
                    </p>
                    <p className="text-xs font-semibold text-gold-600">
                      {choc.priceAED} AED
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(choc, 1)}
                    className="shrink-0 rounded-full bg-cocoa-900 px-3.5 py-2 text-xs font-bold text-gold-300 hover:bg-gold-500 hover:text-cocoa-950 transition"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free delivery progress banner */}
            <div className="rounded-2xl border border-gold-500/40 bg-gradient-to-r from-cocoa-900 to-cocoa-800 p-4 text-cream-50">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-medium text-gold-300">
                  <Sparkles className="h-4 w-4 text-gold-400" />
                  {remainingForFreeDelivery === 0
                    ? "You've unlocked Complimentary Chilled UAE Delivery & 24K Gold Gift Wrapping!"
                    : `Add ${remainingForFreeDelivery} AED more for FREE Chilled UAE Delivery (orders over 250 AED)`}
                </span>
                <span className="font-bold text-gold-400">
                  {Math.min(100, Math.round((subtotalAED / 250) * 100))}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-cocoa-950">
                <div
                  className="h-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (subtotalAED / 250) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {items.map(({ chocolate, quantity }) => (
              <div
                key={chocolate.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-gold-500/40 bg-cream-50 p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={chocolate.image}
                    alt={chocolate.name}
                    className="h-20 w-20 rounded-xl object-cover border border-gold-400/40"
                  />
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-600">
                      {chocolate.category} • {chocolate.weight}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-cocoa-900">
                      {chocolate.name}
                    </h3>
                    <p className="text-xs text-cocoa-700">
                      Unit Price:{" "}
                      <span className="font-semibold">
                        {chocolate.priceAED} AED
                      </span>
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Line Subtotal */}
                <div className="flex items-center justify-between gap-6 sm:justify-end">
                  <div className="flex items-center rounded-full border border-gold-500/50 bg-cream-100 p-1">
                    <button
                      onClick={() => updateQuantity(chocolate.id, quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-cocoa-900 hover:bg-gold-400/40 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-cocoa-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(chocolate.id, quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-cocoa-900 hover:bg-gold-400/40 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[90px]">
                    <span className="block font-serif text-lg font-bold text-cocoa-900">
                      {chocolate.priceAED * quantity} AED
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(chocolate.id)}
                    className="rounded-full p-2 text-cocoa-600 hover:bg-red-100 hover:text-red-700 transition"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-2">
              <button
                onClick={clearCart}
                className="text-xs font-semibold uppercase tracking-wider text-cocoa-600 hover:text-red-700"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-3xl border-2 border-gold-400/70 bg-cocoa-950 p-6 text-cream-50 shadow-xl">
              <h2 className="font-serif text-xl font-bold text-gold-400">
                Order Summary
              </h2>
              <p className="mt-1 text-xs text-cream-300/80">
                {totalItems} {totalItems === 1 ? "item" : "items"} selected
              </p>

              <div className="mt-6 space-y-3 border-t border-gold-500/25 pt-4 text-sm">
                <div className="flex justify-between text-cream-200">
                  <span>Subtotal</span>
                  <span className="font-semibold">{subtotalAED} AED</span>
                </div>
                <div className="flex justify-between text-cream-200">
                  <span>Chilled Courier Delivery (UAE)</span>
                  <span className="font-semibold text-gold-300">
                    {deliveryFeeAED === 0 ? "FREE" : `${deliveryFeeAED} AED`}
                  </span>
                </div>
                <div className="flex justify-between text-cream-200">
                  <span>Gold-Foil Gift Packaging</span>
                  <span className="font-semibold text-gold-300">
                    Complimentary
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-baseline justify-between border-t border-gold-500/40 pt-4">
                <span className="font-serif text-lg font-bold text-cream-50">
                  Total (incl. VAT)
                </span>
                <span className="font-serif text-2xl font-bold text-gold-400">
                  {totalAED} AED
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 px-6 py-4 text-xs font-bold uppercase tracking-wider text-cocoa-950 shadow-lg transition hover:brightness-110"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

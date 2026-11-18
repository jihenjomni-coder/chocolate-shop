"use client";

import React, { useState } from "react";
import { Chocolate } from "@/data/chocolates";
import { useCart } from "@/context/CartContext";
import { Plus, Check, Sparkles, ShoppingBag } from "lucide-react";

export function ChocolateCard({ chocolate }: { chocolate: Chocolate }) {
  const { addToCart, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const inCartItem = items.find((i) => i.chocolate.id === chocolate.id);

  const handleAdd = () => {
    addToCart(chocolate, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gold-500/40 bg-cream-50 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-xl hover:shadow-cocoa-900/10">
      {/* Image Header */}
      <div className="relative h-60 w-full overflow-hidden bg-cocoa-900">
        <img
          src={chocolate.image}
          alt={chocolate.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950/80 via-cocoa-950/20 to-transparent" />

        {/* Category & Badge */}
        <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-cocoa-950/85 border border-gold-400/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-gold-300 backdrop-blur-sm">
            {chocolate.category}
          </span>
          {chocolate.badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cocoa-950 shadow">
              <Sparkles className="h-3 w-3" />
              {chocolate.badge}
            </span>
          )}
        </div>

        {/* Cocoa % & Weight pill on bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-cream-100">
          <span className="rounded-md bg-cocoa-950/80 px-2.5 py-1 font-medium text-gold-300 backdrop-blur-sm">
            {chocolate.cocoaPercent}
          </span>
          <span className="rounded-md bg-cocoa-950/80 px-2.5 py-1 text-cream-200 backdrop-blur-sm">
            {chocolate.weight}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-cocoa-900 group-hover:text-cocoa-700 transition">
              {chocolate.name}
            </h3>
          </div>
          <p className="mt-1 text-xs font-medium italic text-gold-600">
            {chocolate.subtitle}
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-cocoa-700/90 line-clamp-3">
            {chocolate.description}
          </p>

          {/* Tasting Notes */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {chocolate.notes.map((note) => (
              <span
                key={note}
                className="rounded-full border border-gold-400/50 bg-cream-200/70 px-2.5 py-0.5 text-[11px] font-medium text-cocoa-800"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Price in AED & Add to Cart */}
        <div className="mt-5 flex items-center justify-between border-t border-gold-400/30 pt-4">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-cocoa-600">
              Price
            </span>
            <span className="font-serif text-2xl font-bold text-cocoa-900">
              {chocolate.priceAED}{" "}
              <span className="text-sm font-semibold text-gold-600">AED</span>
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm ${
              justAdded
                ? "bg-emerald-800 text-cream-50"
                : "bg-gradient-to-r from-cocoa-900 to-cocoa-800 text-gold-300 border border-gold-400/60 hover:from-gold-500 hover:to-gold-400 hover:text-cocoa-950"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add to Cart
                {inCartItem && (
                  <span className="ml-0.5 rounded-full bg-gold-500/20 px-1.5 py-0.5 text-[10px]">
                    ({inCartItem.quantity})
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

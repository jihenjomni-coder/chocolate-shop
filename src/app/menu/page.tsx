"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CHOCOLATES, Chocolate } from "@/data/chocolates";
import { ChocolateCard } from "@/components/ChocolateCard";
import { useCart } from "@/context/CartContext";
import { fetchChocolatesFromSupabase } from "@/lib/supabase";
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Search,
  Database,
  Loader2,
} from "lucide-react";

const CATEGORIES: ("All" | Chocolate["category"])[] = [
  "All",
  "Signature",
  "Truffles",
  "Pralines",
  "Artisan Bars",
];

export default function MenuPage() {
  const [chocolates, setChocolates] = useState<Chocolate[]>(CHOCOLATES);
  const [loading, setLoading] = useState(true);
  const [fromSupabase, setFromSupabase] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | Chocolate["category"]
  >("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, subtotalAED } = useCart();

  useEffect(() => {
    let active = true;
    async function loadMenu() {
      setLoading(true);
      const result = await fetchChocolatesFromSupabase();
      if (active) {
        setChocolates(result.chocolates);
        setFromSupabase(result.fromSupabase);
        setLoading(false);
      }
    }
    loadMenu();
    return () => {
      active = false;
    };
  }, []);

  const filteredChocolates = chocolates.filter((choc) => {
    const matchesCategory =
      selectedCategory === "All" || choc.category === selectedCategory;
    const matchesSearch =
      choc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      choc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      choc.notes.some((n) =>
        n.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-20">
      {/* Menu Page Banner */}
      <div className="bg-gradient-to-r from-cocoa-950 via-cocoa-900 to-cocoa-950 border-b border-gold-500/40 py-14 text-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-cocoa-800/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              <Sparkles className="h-3.5 w-3.5 text-gold-400" />
              Maison Cacao • Boutique Menu
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                fromSupabase
                  ? "border-emerald-400/50 bg-emerald-950/80 text-emerald-300"
                  : "border-gold-400/40 bg-cocoa-900/80 text-gold-300"
              }`}
            >
              <Database className="h-3.5 w-3.5" />
              {loading
                ? "Connecting to Supabase..."
                : fromSupabase
                ? `Loaded Live from Supabase (${chocolates.length} items)`
                : "Local Preview (Add .env.local keys for Supabase)"}
            </span>
          </div>

          <h1 className="mt-4 font-serif text-4xl font-bold text-cream-50 sm:text-5xl">
            Our Artisan <span className="text-gold-400">Chocolates</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-cream-200/85 sm:text-base">
            Every creation is handcrafted in Dubai with single-origin cacao and
            Middle Eastern botanicals. All prices are in{" "}
            <span className="font-semibold text-gold-300">UAE Dirhams (AED)</span>.
          </p>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-gold-500/40 bg-cream-50 p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                    active
                      ? "bg-cocoa-900 text-gold-300 border border-gold-400 shadow-sm"
                      : "bg-cream-200/80 text-cocoa-800 hover:bg-gold-400/30"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pistachio, saffron, gold..."
              className="w-full rounded-full border border-gold-500/50 bg-cream-100 py-2 pl-10 pr-4 text-sm text-cocoa-900 placeholder:text-cocoa-600/60 focus:border-cocoa-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-cocoa-700">
            <Loader2 className="h-4 w-4 animate-spin text-gold-600" />
            Fetching menu from Supabase...
          </div>
        )}

        {/* Grid of Chocolates */}
        <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {filteredChocolates.map((chocolate) => (
            <ChocolateCard key={chocolate.id} chocolate={chocolate} />
          ))}
        </div>

        {filteredChocolates.length === 0 && (
          <div className="mt-12 rounded-2xl border border-gold-500/40 bg-cream-50 p-12 text-center">
            <p className="font-serif text-xl font-bold text-cocoa-900">
              No chocolates matched your filter
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 rounded-full bg-cocoa-900 px-5 py-2 text-xs font-bold uppercase tracking-wider text-gold-300"
            >
              Show All Chocolates
            </button>
          </div>
        )}

        {/* Bottom Floating / Inline Summary Bar */}
        {totalItems > 0 && (
          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border-2 border-gold-400 bg-gradient-to-r from-cocoa-950 via-cocoa-900 to-cocoa-950 p-6 text-cream-50 shadow-xl sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-cocoa-950">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gold-300">
                  Your Luxury Selection
                </p>
                <p className="font-serif text-xl font-bold">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in bag •{" "}
                  <span className="text-gold-400">{subtotalAED} AED</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/cart"
                className="rounded-full border border-gold-400 px-5 py-3 text-xs font-bold uppercase tracking-wider text-gold-300 hover:bg-cocoa-800 transition"
              >
                Review Cart
              </Link>
              <Link
                href="/checkout"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-cocoa-950 hover:bg-gold-400 transition"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

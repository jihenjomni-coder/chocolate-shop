"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CHOCOLATES, Chocolate } from "@/data/chocolates";
import { ChocolateCard } from "@/components/ChocolateCard";
import { fetchChocolatesFromSupabase } from "@/lib/supabase";
import {
  Sparkles,
  ArrowRight,
  Award,
  Truck,
  Gift,
  Star,
  ShoppingBag,
} from "lucide-react";

export default function HomePage() {
  const [chocolates, setChocolates] = useState<Chocolate[]>(CHOCOLATES);

  useEffect(() => {
    let active = true;
    fetchChocolatesFromSupabase().then((res) => {
      if (active && res.chocolates.length > 0) {
        setChocolates(res.chocolates);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const featuredChocolates = chocolates.slice(0, 4);

  return (
    <div>
      {/* Luxury Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cocoa-950 via-cocoa-900 to-cocoa-800 text-cream-50">
        {/* Decorative gold radial glow */}
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Hero Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-cocoa-900/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                Haute Chocolaterie • Handcrafted in Dubai
              </div>

              <h1 className="mt-6 font-serif text-4xl font-bold leading-tight tracking-tight text-cream-50 sm:text-5xl lg:text-6xl">
                Where Rich <span className="text-gold-400">Cacao</span> Meets{" "}
                <span className="underline decoration-gold-500/60 decoration-2 underline-offset-8">
                  Arabian Gold
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-200/90 sm:text-lg">
                Indulge in our signature collection of 8 artisanal creations — from
                our viral{" "}
                <span className="font-semibold text-gold-300">
                  Royal Dubai Pistachio &amp; Kunafa Bar
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gold-300">
                  24K Gold &amp; Khorasan Saffron Truffles
                </span>
                . Tempered daily in small batches and delivered chilled to your door.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 px-7 py-4 text-sm font-bold uppercase tracking-wider text-cocoa-950 shadow-lg shadow-gold-500/20 transition hover:brightness-110"
                >
                  Explore Full Menu ({chocolates.length} Chocolates)
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/cart"
                  className="inline-flex items-center gap-2 rounded-full border border-gold-400/60 bg-cocoa-900/70 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gold-300 transition hover:bg-cocoa-800"
                >
                  <ShoppingBag className="h-4 w-4" />
                  View Shopping Bag
                </Link>
              </div>

              {/* Trust Highlights */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-gold-500/25 pt-8">
                <div>
                  <p className="font-serif text-2xl font-bold text-gold-400">
                    {chocolates.length}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-cream-300/80">
                    Signature Creations
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-gold-400">
                    24K
                  </p>
                  <p className="text-xs uppercase tracking-wider text-cream-300/80">
                    Edible Gold Leaf
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-gold-400">
                    65–165 AED
                  </p>
                  <p className="text-xs uppercase tracking-wider text-cream-300/80">
                    Artisan Collection
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border-2 border-gold-400/60 bg-cocoa-900 p-3 shadow-2xl shadow-black/50">
                <div className="relative h-80 overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1000&q=85"
                    alt="Royal Dubai Pistachio & Kunafa Bar"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cocoa-950">
                    #1 Dubai Bestseller
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs uppercase tracking-widest text-gold-300">
                      Signature Edition • 200g
                    </p>
                    <h2 className="mt-1 font-serif text-2xl font-bold text-cream-50">
                      Royal Dubai Pistachio &amp; Kunafa Bar
                    </h2>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-serif text-2xl font-bold text-gold-400">
                        85 AED
                      </span>
                      <Link
                        href="/menu"
                        className="rounded-full bg-cream-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cocoa-950 hover:bg-gold-400 transition"
                      >
                        Order Now →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Pillars Bar */}
      <section className="border-b border-gold-500/30 bg-cream-200/70 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-start gap-4 rounded-2xl border border-gold-500/30 bg-cream-50 p-5 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cocoa-900 text-gold-400">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-cocoa-900">
                  Single-Origin &amp; 24K Gold
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-cocoa-700">
                  Crafted from ethically sourced Madagascar &amp; Belgian couverture
                  with authentic Iranian pistachio and Persian saffron.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-gold-500/30 bg-cream-50 p-5 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cocoa-900 text-gold-400">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-cocoa-900">
                  2-Hour Chilled Dubai Delivery
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-cocoa-700">
                  Temperature-controlled luxury courier fleet across Dubai, Abu
                  Dhabi, and Sharjah so every praline arrives in peak temper.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-gold-500/30 bg-cream-50 p-5 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cocoa-900 text-gold-400">
                <Gift className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-cocoa-900">
                  Royal Gold-Foil Gift Boxes
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-cocoa-700">
                  Every order is sealed in our embossed brown, cream, and gold
                  ribbon box with a complimentary personalized gift card.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured 4 Chocolates Preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-600">
              Curated Selection
            </span>
            <h2 className="mt-1 font-serif text-3xl font-bold text-cocoa-900 sm:text-4xl">
              Signature Chocolate Highlights
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-cocoa-900 bg-cocoa-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-300 transition hover:bg-gold-500 hover:text-cocoa-950 hover:border-gold-500"
          >
            See All {chocolates.length} Chocolates in Menu
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredChocolates.map((choc) => (
            <ChocolateCard key={choc.id} chocolate={choc} />
          ))}
        </div>
      </section>

      {/* Complete 8-Chocolate Quick Price Table & CTA Banner */}
      <section className="bg-cocoa-900 py-16 text-cream-100 border-t-2 border-gold-500/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
              <Star className="h-3.5 w-3.5 fill-gold-400" />
              Complete Boutique Menu • Prices in AED
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-cream-50">
              Our {chocolates.length} Artisan Chocolates at a Glance
            </h2>
            <p className="mt-2 text-sm text-cream-200/80">
              Browse all handcrafted chocolates below or visit the interactive Menu page to filter and add directly to your shopping bag.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {chocolates.map((item, idx) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-gold-500/30 bg-cocoa-950/70 p-4 transition hover:border-gold-400"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gold-400">
                    <span>
                      #{idx + 1} • {item.category}
                    </span>
                    <span>{item.weight}</span>
                  </div>
                  <h3 className="mt-1.5 font-serif text-base font-bold text-cream-50">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-cream-300/75 line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-gold-500/20 pt-3">
                  <span className="font-serif text-lg font-bold text-gold-400">
                    {item.priceAED} AED
                  </span>
                  <Link
                    href="/menu"
                    className="text-xs font-semibold uppercase tracking-wider text-cream-200 hover:text-gold-300"
                  >
                    View in Menu →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-cocoa-950 shadow-lg transition hover:bg-gold-400"
            >
              Go to Full Interactive Menu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

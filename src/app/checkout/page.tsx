"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  Gift,
  ArrowLeft,
  Sparkles,
  Database,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotalAED, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [emirate, setEmirate] = useState("Dubai");
  const [address, setAddress] = useState("");
  const [giftNote, setGiftNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "applepay" | "cod">(
    "card"
  );
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [finalTotal, setFinalTotal] = useState(0);
  const [savedToSupabase, setSavedToSupabase] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  const deliveryFeeAED = subtotalAED === 0 ? 0 : subtotalAED >= 250 ? 0 : 25;
  const totalAED = subtotalAED + deliveryFeeAED;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSupabaseError(null);

    const generatedOrderNumber = `MC-DXB-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    const orderPayload = {
      order_number: generatedOrderNumber,
      customer_name: fullName,
      phone,
      emirate,
      address,
      gift_note: giftNote || "",
      payment_method: paymentMethod,
      items: items.map((item) => ({
        id: item.chocolate.id,
        name: item.chocolate.name,
        price_aed: item.chocolate.priceAED,
        quantity: item.quantity,
        line_total_aed: item.chocolate.priceAED * item.quantity,
      })),
      subtotal_aed: subtotalAED,
      delivery_fee_aed: deliveryFeeAED,
      total_aed: totalAED,
      status: "confirmed",
    };

    if (supabase) {
      const { error } = await supabase.from("orders").insert([orderPayload]);
      if (error) {
        setSupabaseError(error.message);
        setSubmitting(false);
        return;
      }
      setSavedToSupabase(true);
    } else {
      setSavedToSupabase(false);
    }

    setOrderNumber(generatedOrderNumber);
    setFinalTotal(totalAED);
    setOrderPlaced(true);
    setSubmitting(false);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-gold-400 bg-cocoa-950 p-8 text-center text-cream-50 shadow-2xl sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold-400 bg-gold-500/20 text-gold-400">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
            <Sparkles className="h-3.5 w-3.5" />
            Order Confirmed
          </span>
          <h1 className="mt-2 font-serif text-3xl font-bold text-cream-50 sm:text-4xl">
            Shukran, {fullName || "Valued Guest"}!
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-cream-200/85">
            Your artisan chocolate order{" "}
            <span className="font-bold text-gold-300">{orderNumber}</span> is
            now being hand-packed in our chilled gold-foil gift box for delivery
            in <span className="font-semibold text-gold-300">{emirate}</span>.
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/70 px-4 py-1.5 text-xs font-medium text-emerald-300">
            <Database className="h-3.5 w-3.5" />
            {savedToSupabase
              ? "Saved directly to Supabase `orders` table"
              : "Order recorded locally (Add Supabase keys in .env.local to sync)"}
          </div>

          <div className="mt-8 rounded-2xl border border-gold-500/30 bg-cocoa-900/90 p-5 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-cream-300/75">Order Reference:</span>
              <span className="font-mono font-bold text-gold-300">
                {orderNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-cream-300/75">Delivery Emirate:</span>
              <span className="font-semibold text-cream-50">{emirate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cream-300/75">Amount Charged:</span>
              <span className="font-serif text-lg font-bold text-gold-400">
                {finalTotal} AED
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/menu"
              className="rounded-full bg-gold-500 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-cocoa-950 hover:bg-gold-400 transition"
            >
              Order More Chocolates
            </Link>
            <Link
              href="/"
              className="rounded-full border border-gold-400/60 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-gold-300 hover:bg-cocoa-800 transition"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="border-b border-gold-500/40 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
            Secure UAE Checkout
          </span>
          <h1 className="mt-1 font-serif text-3xl font-bold text-cocoa-900 sm:text-4xl">
            Complete Your Order
          </h1>
        </div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cocoa-800 hover:text-gold-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shopping Bag
        </Link>
      </div>

      <form
        onSubmit={handlePlaceOrder}
        className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12"
      >
        {/* Left Delivery & Payment Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Delivery Card */}
          <div className="rounded-2xl border border-gold-500/40 bg-cream-50 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 border-b border-gold-500/30 pb-4">
              <Truck className="h-5 w-5 text-gold-600" />
              <h2 className="font-serif text-xl font-bold text-cocoa-900">
                1. Chilled UAE Delivery Address
              </h2>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cocoa-800">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Layla Al Maktoum"
                  className="mt-1.5 w-full rounded-xl border border-gold-500/50 bg-cream-100 px-3.5 py-2.5 text-sm text-cocoa-900 focus:border-cocoa-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cocoa-800">
                  UAE Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+971 50 123 4567"
                  className="mt-1.5 w-full rounded-xl border border-gold-500/50 bg-cream-100 px-3.5 py-2.5 text-sm text-cocoa-900 focus:border-cocoa-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cocoa-800">
                  Emirate *
                </label>
                <select
                  value={emirate}
                  onChange={(e) => setEmirate(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-gold-500/50 bg-cream-100 px-3.5 py-2.5 text-sm text-cocoa-900 focus:border-cocoa-900 focus:outline-none"
                >
                  <option value="Dubai">Dubai (2-Hour Chilled Express)</option>
                  <option value="Abu Dhabi">Abu Dhabi (Same-Day Chilled)</option>
                  <option value="Sharjah">Sharjah (Same-Day Chilled)</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Fujairah">Fujairah</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cocoa-800">
                  Delivery Window
                </label>
                <select className="mt-1.5 w-full rounded-xl border border-gold-500/50 bg-cream-100 px-3.5 py-2.5 text-sm text-cocoa-900 focus:border-cocoa-900 focus:outline-none">
                  <option>Express Chilled (Within 2 Hours)</option>
                  <option>Evening Slot (6:00 PM – 10:00 PM)</option>
                  <option>Tomorrow Morning (10:00 AM – 2:00 PM)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-cocoa-800">
                  Villa / Apartment &amp; Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Downtown Boulevard Tower 2, Apt 3402, Downtown Dubai"
                  className="mt-1.5 w-full rounded-xl border border-gold-500/50 bg-cream-100 px-3.5 py-2.5 text-sm text-cocoa-900 focus:border-cocoa-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Gift Card Message */}
          <div className="rounded-2xl border border-gold-500/40 bg-cream-50 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 border-b border-gold-500/30 pb-4">
              <Gift className="h-5 w-5 text-gold-600" />
              <h2 className="font-serif text-xl font-bold text-cocoa-900">
                2. Complimentary Gold-Foil Gift Note
              </h2>
            </div>
            <div className="mt-4">
              <textarea
                rows={2}
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="Optional: Write a message to be printed in gold calligraphy on a cream card..."
                className="w-full rounded-xl border border-gold-500/50 bg-cream-100 p-3.5 text-sm text-cocoa-900 focus:border-cocoa-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-2xl border border-gold-500/40 bg-cream-50 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 border-b border-gold-500/30 pb-4">
              <CreditCard className="h-5 w-5 text-gold-600" />
              <h2 className="font-serif text-xl font-bold text-cocoa-900">
                3. Payment Method (AED)
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { id: "card", title: "Credit / Debit Card", sub: "Visa, Mastercard, Amex" },
                { id: "applepay", title: "Apple Pay / Tabby", sub: "Instant UAE Checkout" },
                { id: "cod", title: "Cash on Delivery", sub: "Pay in AED at door" },
              ].map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={() =>
                    setPaymentMethod(option.id as "card" | "applepay" | "cod")
                  }
                  className={`rounded-xl border p-3.5 text-left transition ${
                    paymentMethod === option.id
                      ? "border-cocoa-900 bg-cocoa-900 text-cream-50 shadow-sm"
                      : "border-gold-500/40 bg-cream-100 text-cocoa-900 hover:border-gold-500"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
                    {option.title}
                  </p>
                  <p
                    className={`mt-1 text-xs ${
                      paymentMethod === option.id
                        ? "text-cream-200"
                        : "text-cocoa-700"
                    }`}
                  >
                    {option.sub}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 rounded-3xl border-2 border-gold-400/70 bg-cocoa-950 p-6 text-cream-50 shadow-xl">
            <h2 className="font-serif text-xl font-bold text-gold-400">
              Checkout Summary
            </h2>

            {items.length === 0 ? (
              <p className="mt-4 text-sm text-cream-200/80">
                No items in your bag yet — you can still test placing a sample
                order or{" "}
                <Link href="/menu" className="text-gold-400 underline">
                  add chocolates from the Menu
                </Link>
                .
              </p>
            ) : (
              <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
                {items.map(({ chocolate, quantity }) => (
                  <div
                    key={chocolate.id}
                    className="flex items-center justify-between gap-3 border-b border-gold-500/20 pb-3 text-sm"
                  >
                    <div>
                      <p className="font-serif font-semibold text-cream-50">
                        {chocolate.name}
                      </p>
                      <p className="text-xs text-gold-300">
                        Qty: {quantity} × {chocolate.priceAED} AED
                      </p>
                    </div>
                    <span className="font-serif font-bold text-gold-400">
                      {chocolate.priceAED * quantity} AED
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 space-y-2.5 border-t border-gold-500/30 pt-4 text-sm">
              <div className="flex justify-between text-cream-200">
                <span>Chocolates Subtotal</span>
                <span>{subtotalAED} AED</span>
              </div>
              <div className="flex justify-between text-cream-200">
                <span>Chilled UAE Courier</span>
                <span className="text-gold-300">
                  {deliveryFeeAED === 0 ? "FREE" : `${deliveryFeeAED} AED`}
                </span>
              </div>
              <div className="flex justify-between border-t border-gold-500/30 pt-3 font-serif text-xl font-bold">
                <span>Total to Pay</span>
                <span className="text-gold-400">{totalAED} AED</span>
              </div>
            </div>

            {supabaseError && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-400/50 bg-red-950/60 p-3 text-xs text-red-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                <span>Supabase Error: {supabaseError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 px-6 py-4 text-xs font-bold uppercase tracking-wider text-cocoa-950 shadow-lg transition hover:brightness-110 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving Order to Supabase...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Place Order ({totalAED} AED)
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Chocolate, CHOCOLATES } from "@/data/chocolates";

export interface CartItem {
  chocolate: Chocolate;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (chocolate: Chocolate, quantity?: number) => void;
  removeFromCart: (chocolateId: string) => void;
  updateQuantity: (chocolateId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalAED: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "maison_cocoa_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: { id: string; quantity: number }[] = JSON.parse(saved);
        const restored: CartItem[] = [];
        for (const entry of parsed) {
          const found = CHOCOLATES.find((c) => c.id === entry.id);
          if (found && entry.quantity > 0) {
            restored.push({ chocolate: found, quantity: entry.quantity });
          }
        }
        setItems(restored);
      }
    } catch {
      // ignore storage errors
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const serialized = items.map((item) => ({
        id: item.chocolate.id,
        quantity: item.quantity,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
    } catch {
      // ignore storage errors
    }
  }, [items, hydrated]);

  const addToCart = (chocolate: Chocolate, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.chocolate.id === chocolate.id);
      if (existing) {
        return prev.map((i) =>
          i.chocolate.id === chocolate.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { chocolate, quantity }];
    });
  };

  const removeFromCart = (chocolateId: string) => {
    setItems((prev) => prev.filter((i) => i.chocolate.id !== chocolateId));
  };

  const updateQuantity = (chocolateId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(chocolateId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.chocolate.id === chocolateId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalAED = items.reduce(
    (sum, item) => sum + item.chocolate.priceAED * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotalAED,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

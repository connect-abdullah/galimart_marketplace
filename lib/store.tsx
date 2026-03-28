"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "./data";

export interface CartItem {
  product: Product;
  qty: number;
  size?: string;
  color?: string;
}

interface CartState {
  items: CartItem[];
  promoApplied: boolean;
}

function normSize(s?: string) {
  const t = s?.trim();
  return t ? t : undefined;
}

function normColor(s?: string) {
  const t = s?.trim();
  return t ? t : undefined;
}

function lineMatch(
  i: CartItem,
  productId: number,
  size?: string,
  color?: string
) {
  return (
    i.product.id === productId &&
    i.size === size &&
    i.color === color
  );
}

type CartAction =
  | { type: "ADD"; product: Product; qty: number; size?: string; color?: string }
  | { type: "REMOVE_LINE"; productId: number; size?: string; color?: string }
  | {
      type: "UPDATE_QTY_LINE";
      productId: number;
      size?: string;
      color?: string;
      qty: number;
    }
  | { type: "SET_PROMO"; applied: boolean }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const size = normSize(action.size);
      const color = normColor(action.color);
      const existing = state.items.findIndex((i) =>
        lineMatch(i, action.product.id, size, color)
      );
      if (existing >= 0) {
        const updated = [...state.items];
        const row = updated[existing];
        const cap = row.product.inStock;
        const nextQty = Math.min(cap, row.qty + action.qty);
        updated[existing] = { ...row, qty: nextQty };
        return { ...state, items: updated };
      }
      const qty = Math.min(action.product.inStock, action.qty);
      if (qty < 1) return state;
      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.product,
            qty,
            size,
            color,
          },
        ],
      };
    }
    case "REMOVE_LINE": {
      const size = normSize(action.size);
      const color = normColor(action.color);
      return {
        ...state,
        items: state.items.filter(
          (i) => !lineMatch(i, action.productId, size, color)
        ),
      };
    }
    case "UPDATE_QTY_LINE": {
      const size = normSize(action.size);
      const color = normColor(action.color);
      return {
        ...state,
        items: state.items.map((i) => {
          if (!lineMatch(i, action.productId, size, color)) return i;
          const cap = i.product.inStock;
          const qty = Math.min(cap, Math.max(1, action.qty));
          return { ...i, qty };
        }),
      };
    }
    case "SET_PROMO":
      return { ...state, promoApplied: action.applied };
    case "CLEAR":
      return { items: [], promoApplied: false };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  total: number;
  count: number;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    promoApplied: false,
  });
  const total = state.items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const count = state.items.reduce((s, i) => s + i.qty, 0);
  return (
    <CartContext.Provider value={{ state, dispatch, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

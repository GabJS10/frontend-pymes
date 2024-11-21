"use client";
import React, { createContext, useState, useEffect } from "react";
import {
  Cart,
  getCart,
  setCart as setTheCart,
  addToCart,
  Item,
  removeFromCart as removeTheCart,
  removeOneElementFromTheCart as clearOneElementFromTheCart,
} from "./action";
import { usePathname } from "next/navigation";
export const CartContext = createContext({
  cart: {} as Cart | null,
  addCart: (idStore: number, item: Item) => {},
  removeCart: (idStore: number, item: Item) => {},
  removeOneElementFromTheCart: (idStore: number, item: Item) => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>({ idStore: 0, items: [] });
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/marketplace") {
      localStorage.removeItem("cart");
    }

    const loadCart = async () => {
      const cart = getCart();

      setCart(cart);
    };
    loadCart();
  }, []);

  const addCart = (idStore: number, item: Item) => {
    const cart = addToCart(idStore, item);
    setCart(cart);
  };

  const removeCart = (idStore: number, item: Item) => {
    const cart = removeTheCart(idStore, item);
    setCart(cart);
  };

  const removeOneElementFromTheCart = (idStore: number, item: Item) => {
    const cart = clearOneElementFromTheCart(idStore, item);
    setCart(cart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addCart, removeCart, removeOneElementFromTheCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

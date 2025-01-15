"use client";
import { CartContext } from "@/app/cart/CartProvider";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "@/constants/constants";
import { getImageUrl } from "@/helpers/helpers";

const fetchShippingCost = async (id: number): Promise<number | null> => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/user-bussiness/shippingCost/${id}`
    );

    const data = await response.json();

    return Number(data.shipping_cost);
  } catch (error) {
    console.error("Error fetching shipping cost:", error);
    return null;
  }
};

export const OrderSummary = () => {
  const { cart } = useContext(CartContext);
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const totalPrice = cart?.items.reduce(
    (acc, item) => acc + item.priceTotal!,
    0
  );

  useEffect(() => {
    const fetchShippingCostAsync = async () => {
      if (cart) {
        const shippingCost = await fetchShippingCost(cart.idStore);
        console.log(shippingCost);

        setShippingCost(shippingCost);
      }
    };
    fetchShippingCostAsync();
  }, [cart]);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Resumen del pedido</h2>

      {cart &&
        cart.items?.length > 0 &&
        cart.items.map((item) => (
          <div
            className="relative flex items-center space-x-4 p-4 rounded-lg border border-gray-200 shadow-sm"
            key={item.id}
          >
            {/* Imagen del producto */}
            <div className="relative">
              <img
                src={getImageUrl(item.image)}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                {item.quantity}
              </span>
            </div>

            {/* Detalles del producto */}
            <div className="flex-1">
              <span className="block font-medium text-gray-800">
                {item.name}
              </span>
              <span className="block text-sm text-gray-500">
                Cantidad: {item.quantity}
              </span>
            </div>

            {/* Precio */}
            <span className="font-semibold text-gray-900">
              ${item.priceUnit.toLocaleString()}
            </span>
          </div>
        ))}

      <div className="flex items-center justify-between mt-4">
        <span className="text-gray-600">
          Subtotal • {cart?.items?.length} artículos
        </span>
        <span>${totalPrice?.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-gray-600">Envío</span>
        <span>${shippingCost?.toLocaleString()}</span>
      </div>

      <hr className="my-4" />

      <div className="flex items-center justify-between text-lg font-semibold">
        <span>Total</span>
        <span>COP ${(totalPrice! + shippingCost!).toLocaleString()}</span>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tarjeta de regalo
        </label>
        <div className="flex">
          <input
            type="text"
            placeholder="Código de la tarjeta"
            className="flex-grow px-3 py-2 border rounded-l-md focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-r-md">
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

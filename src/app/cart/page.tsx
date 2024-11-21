"use client";
import { CartItem } from "@/components/CartItem";
import { Footer } from "@/components/Footer";
import { useContext } from "react";
import { CartContext } from "./CartProvider";
export default function CartPage() {
  const { cart } = useContext(CartContext);
  console.log(cart);

  const totalPrice = cart?.items.reduce(
    (acc, item) => acc + item.priceTotal!,
    0
  );

  return (
    <>
      <div className="max-w-5xl mx-auto p-16">
        <h2 className="text-2xl font-semibold mb-6">Tu carrito</h2>

        {/* Lista de productos en el carrito */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {cart !== null && cart.items?.length > 0 ? (
            cart.items.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <p className="p-4">No hay productos en el carrito</p>
          )}
        </div>

        {/* Resumen del pedido */}
        {cart !== null && cart.items?.length > 0 ? (
          <div className="mt-8 bg-none p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Resumen del pedido</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalPrice?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Gastos de envío</span>
              <span>Se calcularán en la pantalla de pago</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${totalPrice?.toLocaleString()}</span>
            </div>
            <a href="/checkout">
              <button className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
                Pagar pedido
              </button>
            </a>
          </div>
        ) : (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-lg font-semibold">El carrito está vacío.</p>
          </div>
        )}

        {/* Link para continuar comprando */}
        <div className="mt-4 text-center">
          <a href="/marketplace" className="text-blue-500 hover:underline">
            Seguir comprando
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}

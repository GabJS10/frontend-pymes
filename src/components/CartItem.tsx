import React, { useState, useContext,useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Item } from "@/app/cart/action";
import { CartContext } from "@/app/cart/CartProvider";

export const CartItem = ({ item }: { item: Item }) => {
  const { removeCart, addCart, removeOneElementFromTheCart } =
    useContext(CartContext);
  const [idStore, setIdStore] = useState(0);


  useEffect(() => {
    setIdStore(JSON.parse(localStorage.getItem("cart") as string)["idStore"]);
  }, []);

  const handleDecrement = () => {
    
    if (item.quantity > 1) {
      removeCart(idStore,item);
    }
  };

  const handleIncrement = () => {
    addCart(idStore,item);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      {/* Información del producto */}
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt="Producto"
          width={80}
          height={80}
          className="rounded-md"
        />
        <div>
          <h3 className="text-lg font-medium">{item.name}</h3>
          <p className="text-gray-500">${item.priceUnit.toLocaleString()}</p>
        </div>
      </div>

      {/* Controles de cantidad */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrement}
          className="px-2 py-1 border rounded text-gray-600"
        >
          -
        </button>
        <span className="px-3">{item.quantity}</span>
        <button
          onClick={handleIncrement}
          className="px-2 py-1 border rounded text-gray-600"
        >
          +
        </button>
      </div>

      {/* Borrar y Total */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => removeOneElementFromTheCart(idStore,item)}
          className="text-gray-400 hover:text-red-500"
        >
          <FiTrash2 size={20} />
        </button>
        <p className="font-semibold">${item.priceTotal?.toLocaleString()}</p>
      </div>
    </div>
  );
};

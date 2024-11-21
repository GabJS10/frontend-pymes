"use client";
import React, { useContext, useEffect } from "react";
import { Modal } from "./Modal";
import { IoMdAddCircle } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { Item, addToCart } from "@/app/cart/action";
import { CartContext } from "@/app/cart/CartProvider";
import { useParams } from "next/navigation";
interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}
export const ProductCard = ({
  id,
  name,
  price,
  description,
  image,
}: ProductCardProps) => {
  const params = useParams();
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const { addCart } = useContext(CartContext);
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    const item: Item = {
      id: id.toString(),
      quantity: quantity,
      priceUnit: price,
      name: name,
      description: description,
      priceTotal: null,
      image: image,
    };

    addCart(Number(params.id), item);
    setOpen(false);
    setQuantity(1);
  };

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        <div className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-4">
          <img src={image} alt={name} className="w-16 h-16 rounded-md" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
            <p className="text-gray-900 font-bold mt-2">
              ${price.toLocaleString()}
            </p>
          </div>
        </div>
      </span>

      <Modal
        open={open}
        onClose={() => {
          setQuantity(1);
          setOpen(false);
        }}
      >
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="flex justify-between">
            <p className="text-lg">{description}</p>
            <p className="text-lg">${price.toLocaleString()}</p>
          </div>
        </div>

        <div>
          <img src={image} alt={name} className="mt-4 w-96 h-96" />
        </div>

        <div className="flex space-x-4 mt-4">
          {/* Botón con borde y dos iconos */}
          <div className="flex items-center w-full h-14 border border-gray-300 rounded-md p-2 space-x-2 flex-1">
            <button onClick={handleDecrement}>
              <CiCircleRemove className="text-2xl text-gray-500" />
            </button>
            <p className="text-lg font-medium flex-grow text-center">
              {quantity}
            </p>
            <button onClick={handleIncrement}>
              <IoMdAddCircle className="text-2xl text-gray-500" />
            </button>
          </div>

          {/* Botón azul sólido */}
          <button
            onClick={handleAddToCart}
            className="w-full h-14 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg flex items-center justify-center flex-1"
          >
            Agregar al carrito
          </button>
        </div>
      </Modal>
    </>
  );
};

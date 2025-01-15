"use client";
import React, { useContext } from "react";
import { Modal } from "./Modal";
import { IoMdAddCircle } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { Item } from "@/app/cart/action";
import { CartContext } from "@/app/cart/CartProvider";
import { useParams } from "next/navigation";
import { ProductType } from "@/types/products.types";

export const ProductCard = ({
  id,
  name,
  price,
  description,
  image,
}: ProductType) => {
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
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
          <img
            src={image}
            alt={name}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <p className="text-gray-900 font-bold mt-2">
            ${price.toLocaleString()}
          </p>
        </div>
      </span>

      <Modal
        open={open}
        onClose={() => {
          setQuantity(1);
          setOpen(false);
        }}
        style="bg-white p-6 rounded-lg shadow-2xl transition-transform transform scale-100"
      >
        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
        <div className="mt-4 flex items-center space-x-4">
          <img
            src={image}
            alt={name}
            className="w-32 h-32 object-cover rounded-md"
          />
          <div>
            <p className="text-sm text-gray-600">{description}</p>
            <p className="text-lg font-semibold text-gray-900 mt-2">
              ${price.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <button
            onClick={handleDecrement}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600"
          >
            <CiCircleRemove className="text-2xl" />
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600"
          >
            <IoMdAddCircle className="text-2xl" />
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-lg"
          >
            Agregar al carrito
          </button>
        </div>
      </Modal>
    </>
  );
};

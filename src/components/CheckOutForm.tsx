"use client";
import React, { useContext, useEffect, useState } from "react";
import { sendWhatsapp } from "@/helpers/helpers";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormDataBuy } from "@/types/form.register.types";
import { CartContext } from "@/app/cart/CartProvider";
import { BACKEND_URL } from "@/constants/constants";
import toast from "react-hot-toast";
const fetchWhatsappNumber = async (id: number): Promise<string | null> => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/user-bussiness/whatsapp/${id}`
    );
    const data = await response.json();

    return data.whatsapp_contact;
  } catch (error) {
    console.error("Error fetching shipping cost:", error);
    return null;
  }
};

export const CheckOutForm = () => {
  const { register, handleSubmit } = useForm<FormDataBuy>();
  const [whatsapp, setWhatsapp] = useState<string | null>(null);
  const { cart } = useContext(CartContext);
  const onSubmit: SubmitHandler<FormDataBuy> = async (data) => {
    try {
      if (whatsapp) {
        sendWhatsapp(whatsapp, cart, data);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchNumber = async () => {
      if (cart) {
        console.log("telerofno", cart.idStore);

        const number = await fetchWhatsappNumber(cart.idStore);
        setWhatsapp(number);
      }
    };
    fetchNumber();
  }, [cart]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg ">
      <h2 className="text-2xl font-semibold mb-6">Entrega</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apellidos
            </label>
            <input
              {...register("lastName", { required: true })}
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            # Documento
          </label>
          <input
            {...register("document", { required: true })}
            type="text"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dirección
          </label>
          <input
            {...register("direction", { required: true })}
            type="text"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Casa, apartamento, etc. (opcional)
          </label>
          <input
            {...register("op1", { required: false })}
            type="text"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones
          </label>
          <textarea
            {...register("op2", { required: false })}
            placeholder="Observaciones para la entrega (algun comentario especial o informacion adicional)"
            className="resize-none mt-1 block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
          />
        </div>

        <div className="mt-6">
          <input
            value="Comprar"
            type="submit"
            className="w-full bg-blue-500 text-white text-xl font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
          />
        </div>
      </form>
    </div>
  );
};

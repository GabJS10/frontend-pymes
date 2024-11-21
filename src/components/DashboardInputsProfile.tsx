"use client";

import { BACKEND_URL } from "@/constants/constants";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
type Props = {
  data: {
    name: string;
    email: string;
    name_url: string;
    holder: string;
    whatsapp_contact: string;
    locality: string;
    shipping_cost: number;
    contact_name: string;
    number_contact: string;
    social_media_contact: string;
  };
  id: number | undefined;
};

const renameLabel = (key: string) => {
  switch (key) {
    case "name":
      return "Nombre de la tienda";
    case "email":
      return "Email";
    case "name_url":
      return "Url de la tienda";
    case "holder":
      return "Titular de la cuenta";
    case "whatsapp_contact":
      return "Whatsapp";
    case "locality":
      return "Direccion";
    case "shipping_cost":
      return "Costo de envío";
    case "contact_name":
      return "Contacto";
    case "number_contact":
      return "Numero de contacto";
    case "social_media_contact":
      return "Redes sociales";
    default:
      return key;
  }
};

export const DashboardInputsProfile = ({ data, id }: Props) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: data.name,
      email: data.email,
      name_url: data.name_url,
      holder: data.holder,
      whatsapp_contact: data.whatsapp_contact,
      locality: data.locality,
      shipping_cost: data.shipping_cost,
      contact_name: data.contact_name,
      number_contact: data.number_contact,
      social_media_contact: data.social_media_contact,
    },
  });
  const { data: session } = useSession();

  const onSubmit = async (values: Props["data"]) => {
    values.shipping_cost = Number(values.shipping_cost);

    const res = await fetch(`${BACKEND_URL}/user-bussiness/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session?.backendTokens.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      {
        if (res.status === 401) {
          toast.error("Credenciales expiradas");
        }

        if (res.status === 500) {
          toast.error("Ha ocurrido un error en el servidor");
        }
      }
      return;
    }

    toast.success("Información actualizada");
  };

  return (
    <>
      <form className=" bg-white p-8" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-bold mb-4">Información de la cuenta</h2>

        <div className="grid grid-cols-2 gap-6">
          {Object.entries(data).map(([key]) => (
            <div key={key}>
              <label htmlFor={key} className="text-gray-500 block mb-2">
                {renameLabel(key)}
              </label>
              <input
                type={key === "shipping_cost" ? "number" : "text"}
                id={key}
                {...register(key as keyof Props["data"])}
                className="border-b border-gray-300 p-2 w-full focus:outline-none focus:border-green-500 focus:ring-0 "
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <input
            type="submit"
            value="Guardar"
            className="bg-green-500 text-white px-6 py-2 rounded-lg mr-4 hover:bg-green-600 focus:ring-2 focus:ring-green-500"
          />
        </div>
      </form>
    </>
  );
};

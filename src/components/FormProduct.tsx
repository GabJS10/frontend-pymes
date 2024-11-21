import { BACKEND_URL } from "@/constants/constants";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
type Inputs = {
  name: string;
  description: string;
  price: number;
  image: string;
};

type Props = {
  onClose: () => void;
};

export const FormProduct = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { data: session, update } = useSession();
  const [imagePreview, setImagePreview] = useState<string>("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (session) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("image", data.image[0]);
      formData.append("user_bussiness_id", session.user.id.toString());

      const res = await fetch(`${BACKEND_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.backendTokens.token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Credenciales expiradas");
        }

        if (res.status === 500) {
          toast.error("Ha ocurrido un error en el servidor");
        }

        return;
      }

      const json = await res.json();

      console.log(json);

      toast.success("El proyecto se ha creado correctamente");

      onClose();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h2 className="text-lg">Añadir producto</h2>
      </div>

      <form
        className="space-y-4 mt-10 w-[600px] mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            {...register("name", { required: true })}
            type="text"
            className="w-full border-b border-gray-400 p-2  bg-transparent text-black focus:outline-none focus:border-gray-500 focus:ring-0"
            placeholder="Nombre del producto"
          />
        </div>

        <div>
          <textarea
            {...register("description", { required: true })}
            rows={3}
            className="resize-none w-full border-b border-gray-400 p-2  bg-transparent text-black focus:outline-none focus:border-gray-500 focus:ring-0"
            placeholder="Descripción del producto"
          />
        </div>

        <div>
          <input
            {...register("price", { required: true })}
            type="number"
            className="w-full border-b border-gray-400 p-2  bg-transparent text-black focus:outline-none focus:border-gray-500 focus:ring-0"
            placeholder="Precio del producto"
          />
        </div>

        <div>
          <label className="block mb-1">Imagen</label>
          <div className="flex justify-between items-center space-x-4">
            <input
              {...register("image", { required: true })}
              onChange={handleImageUpload}
              type="file"
              className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-slate-600 file:text-white hover:file:bg-gray-800"
            />
            <button
              type="submit"
              className="border px-3 py-2 rounded-full bg-slate-600 text-white "
            >
              Crear
            </button>
          </div>
        </div>

        {imagePreview && (
          <div className="mt-4">
            <p className="text-center mb-2">Preview de la Imagen</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-contain rounded-md border border-gray-500"
            />
          </div>
        )}
      </form>
    </>
  );
};

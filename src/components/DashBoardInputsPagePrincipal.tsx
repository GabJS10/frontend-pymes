import { BACKEND_URL } from "@/constants/constants";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  data: {
    image_profile: string | undefined;
    image_cover: string | undefined;
    category: string | undefined;
    description: string | undefined;
    close_hours: string | undefined;
    open_hours: string | undefined;
    rating: number | undefined;
    delivery_time: string | number;
  };
  id: number | undefined;
};

const renameLabel = (key: string) => {
  switch (key) {
    case "image_profile":
      return "Imagen de perfil";
    case "image_cover":
      return "Imagen de fondo";
    case "category":
      return "Categoría";
    case "description":
      return "Descripción";
    case "close_hours":
      return "Horario de cierre";
    case "open_hours":
      return "Horario de apertura";
    case "rating":
      return "Rating";
    case "delivery_time":
      return "Tiempo de entrega";
    default:
      return key;
  }
};

export const DashBoardInputsPagePrincipal = ({ data, id }: Props) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      image_profile: data.image_profile,
      image_cover: data.image_cover,
      category: data.category,
      description: data.description,
      close_hours: data.close_hours,
      open_hours: data.open_hours,
      rating: data.rating,
      delivery_time: data.delivery_time,
    },
  });

  const { data: session, update } = useSession();

  const onSubmit = async (values: Props["data"]) => {
    const formData = new FormData();

    console.log(values);

    if (typeof values.image_profile === "object") {
      formData.append("images", values.image_profile[0]);
      formData.append("image_profile", "");
    } else {
      formData.append("image_profile", data.image_profile || "");
    }

    if (typeof values.image_cover === "object") {
      formData.append("images", values.image_cover[0]);
      formData.append("image_cover", "");
    } else {
      formData.append("image_cover", data.image_cover || "");
    }

    formData.append("category", values.category || "");
    formData.append("description", values.description || "");
    formData.append("close_hours", values.close_hours || "");
    formData.append("open_hours", values.open_hours || "");
    formData.append("delivery_time", values.delivery_time.toString());

    const res = await fetch(`${BACKEND_URL}/user-bussiness/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session?.backendTokens.token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      {
        if (res.status === 400) {
          toast.error("Revisa que todos los campos sean validos");
        }

        if (res.status === 401) {
          toast.error("Credenciales expiradas");
        }

        if (res.status === 500) {
          toast.error("Ha ocurrido un error en el servidor");
        }
      }
      return;
    }

    await update();

    toast.success("Información actualizada");
  };

  return (
    <>
      <>
        <form className=" bg-white p-8" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-bold mb-4">Principal</h2>

          <div className="grid grid-cols-2 gap-6">
            {Object.entries(data).map(([key]) => (
              <div key={key}>
                <label htmlFor={key} className="text-gray-500 block mb-2">
                  {renameLabel(key)}
                </label>
                {key === "image_profile" || key === "image_cover" ? (
                  <input
                    type="file"
                    id={key}
                    {...register(key)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                ) : (
                  <input
                    disabled={key === "rating" ? true : false}
                    type={key}
                    id={key}
                    {...register(key as keyof Props["data"])}
                    className="border-b border-gray-300 p-2 w-full focus:outline-none focus:border-green-500 focus:ring-0 "
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <input
              type="submit"
              value="Guardar"
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold py-2 px-5 rounded-md shadow-md transition duration-300 transform hover:scale-105 cursor-pointer"
            />
          </div>
        </form>
      </>
    </>
  );
};

import { BACKEND_URL } from "@/constants/constants";
import React, { useState, useRef, useEffect, use } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Section, Sections } from "@/types/products.types";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import TomSelect from "tom-select";

type Inputs = {
  name: string;
  description: string;
  price: number;
  image: string;
  section: number[];
};

type Props = {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  price: number | undefined;
  image: string | undefined;
  action: string;
  sections_p: Sections[] | undefined;
  onClose: () => void;
};

enum Action {
  CREATE = "create",
  UPDATE = "update",
}

const getSections = async (token: string) => {
  const response = await fetch(`${BACKEND_URL}/sections/`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data as Section[];
};

export const FormProduct = ({
  onClose,
  name,
  description,
  price,
  image,
  action,
  sections_p,
  id,
}: Props) => {
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
  const { data: session } = useSession();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([]);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const ThisGetSections = async () => {
      if (session) {
        const sections = await getSections(session.backendTokens.token);
        setSections(sections);
      }
    };

    ThisGetSections();
  }, []);

  useEffect(() => {
    if (action === Action.UPDATE) {
      setValue("name", name || "");
      setValue("description", description || "");
      setValue("price", price || 0);
      setValue("image", image || "");
      setValue(
        "section",
        sections_p?.map((section) => section.section.id) || []
      );
    }
  }, [action]);

  useEffect(() => {
    let tomSelect: TomSelect | null = null;

    if (selectRef.current && sections.length > 0) {
      tomSelect = new TomSelect(selectRef.current, {
        plugins: ["remove_button"],
        maxItems: 20,
        placeholder: "Secciones",
        items:
          sections_p?.map((section) => section.section.id.toString()) || [],
        onChange: (values: string[]) => {
          setValue(
            "section",
            values.map((value) => parseInt(value))
          );
        },
      });
    }

    return () => {
      if (tomSelect) {
        tomSelect.destroy();
      }
    };
  }, [sections, sections_p]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (session) {
      console.log(typeof data.image[0]);
      console.log("data.section", sections_p);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append(
        "image",
        typeof data.image[0] === "object" ? data.image[0] : data.image
      );
      formData.append("sections_id", data.section?.toString() ?? "");
      const url = `${BACKEND_URL}/products/`;

      const res = await fetch(`${url}${action === Action.CREATE ? "" : id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.backendTokens.token}`,
        },
        body: formData,
      });

      reset();

      setImagePreview("");

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Credenciales expiradas");
        }

        if (res.status === 500) {
          toast.error("Ha ocurrido un error en el servidor");
        }

        return;
      }

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
        <h2 className="text-2xl font-semibold text-gray-700">
          Añadir Producto
        </h2>
      </div>

      <form
        className="space-y-6 mt-8 w-[600px] mx-auto bg-white shadow-lg rounded-lg p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            {...register("name", { required: action === Action.CREATE })}
            type="text"
            defaultValue={name}
            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:border-slate-600 focus:ring focus:ring-slate-200"
            placeholder="Nombre del producto"
          />
        </div>

        <div>
          <textarea
            {...register("description", { required: action === Action.CREATE })}
            rows={4}
            defaultValue={description}
            className="resize-none w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:border-slate-600 focus:ring focus:ring-slate-200"
            placeholder="Descripción del producto"
          />
        </div>

        <div>
          <select
            multiple
            id="section"
            {...register("section")}
            ref={selectRef}
            name="section"
            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:border-slate-600 focus:ring focus:ring-slate-200"
          >
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            {...register("price", { required: action === Action.CREATE })}
            type="number"
            defaultValue={price}
            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:border-slate-600 focus:ring focus:ring-slate-200"
            placeholder="Precio del producto"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen
          </label>
          <div className="flex items-center space-x-4">
            <input
              {...register("image", { required: action === Action.CREATE })}
              onChange={handleImageUpload}
              defaultValue={image}
              type="file"
              className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-slate-600 file:text-white hover:file:bg-gray-800"
            />
            <button
              type="submit"
              className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              {action === Action.CREATE ? "Crear" : "Actualizar"}
            </button>
          </div>
        </div>

        {imagePreview || image ? (
          <div className="mt-6">
            <p className="text-center text-gray-500 mb-2">Vista previa</p>
            <img
              src={imagePreview || image}
              alt="Preview"
              className="w-full max-h-60 object-contain rounded-lg border border-gray-300"
            />
          </div>
        ) : null}
      </form>
    </>
  );
};

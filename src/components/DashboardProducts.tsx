import React, { useEffect, useState, useRef } from "react";
import { ProductType } from "@/types/products.types";
import { BACKEND_URL } from "@/constants/constants";
import { useSession } from "next-auth/react";
import { Modal } from "./Modal";
import { FormProduct } from "./FormProduct";
import { useForm } from "react-hook-form";
import TomSelect from "tom-select";
import toast from "react-hot-toast";
import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { getImageUrl } from "@/helpers/helpers";
type Inputs = {
  name: string;
  productsID: number[];
};

const getProducts = async (id: number, token: string) => {
  const response = await fetch(`${BACKEND_URL}/products/all/${id}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data.products as ProductType[];
};

const getProduct = async (id: number, token: string) => {
  const response = await fetch(`${BACKEND_URL}/products/${id}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (response.status === 401) {
    toast.error("Se caduco tu sesion");
  }

  return data as ProductType;
};

const createSections = async (
  token: string,
  { name, products_id }: { name: string; products_id: number[] }
) => {
  const response = await fetch(`${BACKEND_URL}/sections/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, products_id }),
  });

  if (!response.ok) {
    toast.error("Ha ocurrido un error en el servidor");
  }

  if (response.ok) {
    toast.success("Seccion creada con exito");
  }

  return await response.json();
};

export const DashboardProducts = () => {
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const [defaultValue, setDefaultValue] = useState<ProductType | null>();
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const { data: session } = useSession();
  const { register, handleSubmit, setValue } = useForm<Inputs>();

  const handleUpdateClick = async (productId: number) => {
    if (session && session.user) {
      const productData = await getProduct(
        productId,
        session.backendTokens.token
      );

      setDefaultValue(productData);
      setOpen(true);
    }
  };

  const handleDeleteClick = async (productId: number) => {
    if (session && session.user) {
      const response = await fetch(`${BACKEND_URL}/products/${productId}`, {
        method: "DELETE",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${session.backendTokens.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Producto eliminado");
        setProducts(products.filter((product) => product.id !== productId));
      }

      if (!response.ok) {
        toast.error("Ha ocurrido un error en el servidor");
      }
    }
  };

  useEffect(() => {
    let tomSelect: TomSelect | null = null;
    if (selectRef.current && products.length > 0) {
      tomSelect = new TomSelect(selectRef.current, {
        plugins: ["remove_button"],
        maxItems: 20,
        placeholder: "Productos",
        onChange: (values: string[]) => {
          setValue(
            "productsID",
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
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (session && session.user) {
        const id = session.user.id;
        const productsData = await getProducts(id, session.backendTokens.token);
        setProducts(productsData);
      }
    };
    fetchProducts();
  }, [open]);

  const handleSubmitForm = async (data: Inputs) => {
    try {
      if (session && session.user) {
        await createSections(session.backendTokens.token, {
          name: data.name,
          products_id: data.productsID,
        });

        setOpenSection(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 via-gray-50 to-white shadow-xl rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 transform hover:scale-105"
          >
            Añadir
          </button>
          <button
            onClick={() => setOpenSection(true)}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 transform hover:scale-105"
          >
            Añadir Sección
          </button>
        </div>
      </div>
      <div className="h-[600px] overflow-y-auto space-y-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center border border-gray-200 bg-white p-5 rounded-xl shadow-lg transition duration-300 transform hover:scale-102 hover:shadow-2xl"
          >
            <img
              src={getImageUrl(product.image)}
              alt="Product"
              className="w-20 h-20 object-cover rounded-lg mr-6 transition duration-300 transform hover:scale-105"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-base font-semibold text-gray-600 mx-7">
                  ${product.price}
                </p>
              </div>
              <p className="text-gray-700 text-base mb-2">
                {product.description}
              </p>
              <p className="text-sm text-gray-500">
                {product.sections
                  ?.map((section) => section.section.name)
                  .join(", ")}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleUpdateClick(product.id)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold py-2 px-5 rounded-md shadow-md transition duration-300 transform hover:scale-105"
              >
                <RxUpdate />
              </button>
              <button
                onClick={() => handleDeleteClick(product.id)}
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-2 px-5 rounded-md shadow-md transition duration-300 transform hover:scale-105"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setDefaultValue(null);
        }}
      >
        <FormProduct
          onClose={() => {
            setOpen(false);
            setDefaultValue(null);
          }}
          id={defaultValue?.id}
          name={defaultValue?.name}
          description={defaultValue?.description}
          price={defaultValue?.price}
          image={defaultValue?.image}
          sections_p={defaultValue?.sections?.map((section) => section)}
          action={defaultValue ? "update" : "create"}
        />
      </Modal>

      <Modal open={openSection} onClose={() => setOpenSection(false)}>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="space-y-6 p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto"
        >
          <h2 className="text-xl font-semibold text-gray-700 text-center">
            Añadir Categoría
          </h2>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre de la categoría
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Escribe el nombre"
            />
          </div>
          <div>
            <label
              htmlFor="productsID"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Seleccionar productos
            </label>
            <select
              multiple
              id="productsID"
              {...(register("productsID"), { ref: selectRef })}
              name="productsID"
              ref={selectRef}
              className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-gray-500">
              Mantén presionada la tecla{" "}
              <kbd className="px-1 py-0.5 bg-gray-200 rounded">Ctrl</kbd> (o{" "}
              <kbd className="px-1 py-0.5 bg-gray-200 rounded">Cmd</kbd> en Mac)
              para seleccionar múltiples productos.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Enviar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

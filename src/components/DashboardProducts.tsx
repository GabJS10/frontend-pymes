import React, { useEffect, useState } from "react";
import { ProductType } from "@/types/products.types";
import { BACKEND_URL } from "@/constants/constants";
import { useSession } from "next-auth/react";
import { Modal } from "./Modal";
import { FormProduct } from "./FormProduct";
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

export const DashboardProducts = () => {
  const [open, setOpen] = useState(false);

  const [products, setProducts] = React.useState<ProductType[]>([]);
  const { data: session } = useSession();

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

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Productos</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Añadir
        </button>
      </div>
      <div className="h-[600px] overflow-y-auto space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center border border-gray-200 p-4 rounded-lg"
          >
            <img
              src={product.image}
              alt="Product"
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <div className="flex justify-start space-x-4">
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-gray-500">${product.price}</p>
              </div>
              <p className="text-gray-800">{product.description}</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                Up
              </button>

              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Del
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}

      <Modal open={open} onClose={() => setOpen(false)}>
        <FormProduct onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

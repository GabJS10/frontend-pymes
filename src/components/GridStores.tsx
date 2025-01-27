"use client";
import { CardStore } from "./CardStore";
import { StoresContext } from "@/app/providers/StoresProvider";
import { useContext } from "react";

export const GridStores = () => {
  const { stores } = useContext(StoresContext);

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-center text-gray-800 text-3xl font-bold mb-6">
        Nuestras Tiendas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stores.length > 0 &&
          stores.map((store) => (
            <CardStore
              key={store.id}
              store={{
                id: store.id,
                nameStore: store.name,
                time: store.delivery_time,
                deliveryCost: store.shipping_cost,
                qualification: store.qualification,
                image: store.image_cover,
              }}
            />
          ))}
      </div>
    </div>
  );
};

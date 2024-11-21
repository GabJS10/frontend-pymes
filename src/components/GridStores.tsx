import React from "react";
import { CardStore } from "./CardStore";
import { BACKEND_URL } from "@/constants/constants";
import { UserBussines } from "@/types/user_bussines.types";
async function getData(): Promise<UserBussines[]> {
  const res = await fetch(`${BACKEND_URL}/user-bussiness`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    console.log(res);
  }

  return await res.json();
}

export const GridStores = async () => {
  const data = await getData();
  console.log(data);

  const stores = data.map((store) => {
    return {
      id: store.id,
      nameStore: store.name,
      image: store.image_profile || "",
      time: store.delivery_time,
      deliveryCost: store.shipping_cost,
      rating: store.rating || 0,
    };
  });
  return (
    <div className="bg-gray-300p-8 rounded-lg">
      <h2 className="text-center text-black text-xl mb-6">TIENDAS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stores.map((store) => (
          <CardStore key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

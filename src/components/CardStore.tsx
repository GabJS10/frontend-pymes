import { getImageUrl } from "@/helpers/helpers";
import React from "react";

type Props = {
  store: {
    id: number;
    nameStore: string;
    time: string | null;
    deliveryCost: number;
    qualification: number | null;
    image: string | null;
  };
  key: number;
};

export const CardStore = ({ store }: Props) => {
  return (
    <a
      href={`/marketplace/${store.id}`}
      className="transition-transform transform hover:scale-105"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={getImageUrl(store.image) || "https://placehold.co/300"}
          alt={store.nameStore}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {store.nameStore}
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <span>{store.time}</span>
            <span className="mx-2">•</span>
            <span>${store.deliveryCost.toLocaleString()}</span>
          </div>
          <div className="mt-3 flex items-center">
            <span className="text-yellow-400 text-lg">
              {"★".repeat(store.qualification || 0)}
            </span>
            <span className="ml-2 text-gray-500 text-sm">
              {store.qualification || "Sin calificación"}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

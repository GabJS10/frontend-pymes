import React from "react";

type Props = {
  store: {
    id: number;
    nameStore: string;
    time: string | null;
    deliveryCost: number;
    rating: number | null;
    image: string;
  };
  key: number;
};

export const CardStore = ({ store, key }: Props) => {
  return (
    <a href={`/marketplace/${store.id}`}>
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
        <img
          src={store.image || "https://via.placeholder.com/150"}
          alt={store.nameStore}
          className="rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold">{store.nameStore}</h3>
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <span>{store.time}</span>
          <span className="mx-2">•</span>
          <span>${store.deliveryCost.toLocaleString()}</span>
        </div>
        <div className="mt-2 flex items-center">
          <span className="text-yellow-400 mr-1">★</span>
          <span>{store.rating}</span>
        </div>
      </div>
    </a>
  );
};

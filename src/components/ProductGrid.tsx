import React from "react";
import { ProductCard } from "./ProductCard";
import { ProductType } from "@/types/products.types";

interface ProductGridProps {
  products: ProductType[];
}
export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">PRODUCTOS</h2>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

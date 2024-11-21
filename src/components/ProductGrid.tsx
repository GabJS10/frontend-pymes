import React from "react";
import { ProductCard } from "./ProductCard";
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductGridProps {
  products: Product[];
}
export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">PRODUCTOS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

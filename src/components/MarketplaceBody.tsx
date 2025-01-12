"use client";
import { ProductType, Sections } from "@/types/products.types";
import { StoreInfo } from "./StoreInfo";
import { ProductGrid } from "./ProductGrid";
import { Footer } from "./Footer";
import { filterProductsBySection } from "@/helpers/helpers";
import { useEffect, useState } from "react";
type ProductCardProps = {
  store: {
    name: string;
    description: string | null;
    delivery_time: string | null;
    shipping_cost: number;
    image_cover: string | null;
    image_profile: string | null;
    qualification: number | null;
    sections: Sections[];
  };

  products: ProductType[];
};
export const MarketplaceBody = ({ store, products }: ProductCardProps) => {
  const [selectedSection, setSelectedSection] = useState<string[]>([]);
  const [productsFiltered, setProductsFiltered] =
    useState<ProductType[]>(products);

  useEffect(() => {
    const productsFiltered = filterProductsBySection(products, selectedSection);

    if (productsFiltered !== undefined) {
      setProductsFiltered(productsFiltered);
    }
  }, [selectedSection]);

  return (
    <>
      <div className="flex bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen mt-2">
        <div className="w-1/4 bg-white p-6 shadow-lg rounded-lg">
          <StoreInfo
            name={store.name}
            description={store.description || "Sin descripción"}
            deliveryTime={store.delivery_time || "30 min"}
            deliveryCost={store.shipping_cost}
            qualification={store.qualification || 0}
            categories={store.sections.map((section) => section.section.name)}
            backgroundImage={
              store.image_cover || "https://placehold.co/600x400"
            } // Imagen grande
            logoImage={store.image_profile || "https://placehold.co/300x300"} // Imagen redondeada
            setSelectedSection={setSelectedSection}
            sections={selectedSection}
          />
        </div>
        <div className="flex-1 p-6">
          <ProductGrid products={productsFiltered} />
        </div>
      </div>
      <Footer />
    </>
  );
};

import { ProductType } from "@/types/products.types";
import { StoreInfo } from "./StoreInfo";
import { ProductGrid } from "./ProductGrid";
import { Footer } from "./Footer";
type ProductCardProps = {
  store: {
    name: string;
    description: string | null;
    delivery_time: string | null;
    shipping_cost: number;
    rating: number | null;
    image_cover: string | null;
    image_profile: string | null;
  };

  products: ProductType[];
};
export const MarketplaceBody = async ({
  store,
  products,
}: ProductCardProps) => {
  return (
    <>
      <div className="flex bg-gray-100 min-h-screen mt-2">
        <div className="w-1/4 bg-white p-6">
          <StoreInfo
            name={store.name}
            description={store.description || "Sin descripción"}
            deliveryTime={store.delivery_time || "30 min"}
            deliveryCost={store.shipping_cost}
            rating={store.rating || 0}
            categories={["Hamburguesas", "Comida Rápida", "Mexicana"]}
            backgroundImage={
              store.image_cover || "https://placehold.co/600x400"
            } // Imagen grande
            logoImage={store.image_profile || "https://placehold.co/300x300"} // Imagen redondeada
          />
        </div>
        <div className="flex-1 p-6">
          <ProductGrid products={products} />
        </div>
      </div>
      <Footer />
    </>
  );
};

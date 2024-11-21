import { BACKEND_URL } from "@/constants/constants";
import { UserBussines } from "@/types/user_bussines.types";
import { ProductType } from "@/types/products.types";
import { MarketplaceBody } from "@/components/MarketplaceBody";
const fetchStore = async (id: number): Promise<UserBussines> => {
  const response = await fetch(`${BACKEND_URL}/user-bussiness/${id}`);
  const store = await response.json();
  return store;
};

const fetchProducts = async (id: number): Promise<ProductType[]> => {
  const response = await fetch(`${BACKEND_URL}/products/all/${id}`);
  const products = await response.json();
  return products.products;
};

export default async function DetailMarketplace({
  params,
}: {
  params: { id: string };
}) {
  const store = await fetchStore(Number(params.id));
  const products = await fetchProducts(Number(params.id));
  return (
    <>
      <MarketplaceBody store={store} products={products} />
    </>
  );
}

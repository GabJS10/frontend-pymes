interface StoreInfoProps {
  name: string;
  description: string;
  deliveryTime: string;
  deliveryCost: number;
  rating: number;
  categories: string[];
  backgroundImage: string; // Imagen de fondo grande
  logoImage: string; // Imagen pequeña redondeada
}
export const StoreInfo = ({
  name,
  description,
  deliveryTime,
  deliveryCost,
  rating,
  categories,
  backgroundImage,
  logoImage,
}: StoreInfoProps) => {
  return (
    <div className="relative">
      {/* Imagen de fondo */}
      <div className="h-40 w-full rounded-lg overflow-hidden">
        <img
          src={backgroundImage}
          alt="Store background"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Imagen redondeada encima de la imagen de fondo */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 rounded-full border-4 border-white">
        <img
          src={logoImage}
          alt="Store logo"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      {/* Información de la tienda */}
      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-sm text-gray-700 mb-4">
          <p>Entrega: {deliveryTime}</p>
          <p>Envío: ${deliveryCost.toLocaleString()}</p>
          <p>
            Calificación: <span className="text-yellow-400">★</span> {rating}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Categorías</h3>
          <ul className="grid grid-cols-2 gap-2">
            {categories.map((category, index) => (
              <li
                key={index}
                className="bg-gray-200 rounded-full px-3 py-1 text-xs"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

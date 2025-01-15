"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "./Modal";
import StarRating from "./StarsQualification";
import { BACKEND_URL } from "@/constants/constants";
import { useParams } from "next/navigation";
import { getImageUrl } from "@/helpers/helpers";
interface StoreInfoProps {
  name: string;
  description: string;
  deliveryTime: string;
  deliveryCost: number;
  categories: string[];
  qualification: number | null;
  backgroundImage: string; // Imagen de fondo grande
  logoImage: string; // Imagen pequeña redondeada
  setSelectedSection: Dispatch<SetStateAction<string[]>>;
  sections: string[];
}

async function getQualification(
  id: number
): Promise<{ qualification: number }> {
  const res = await fetch(`${BACKEND_URL}/user-bussiness/rating/${id}`, {
    cache: "no-cache",
    credentials: "include",
  });

  if (!res.ok) {
    console.log(res);
  }

  return await res.json();
}

export const StoreInfo = ({
  name,
  description,
  deliveryTime,
  deliveryCost,
  categories,
  qualification,
  backgroundImage,
  logoImage,
  setSelectedSection,
  sections,
}: StoreInfoProps) => {
  const [openStarsQualification, setOpenStarsQualification] = useState(false);
  const [userQualification, setUserQualification] = useState<number>(1);
  const params = useParams();
  //con la funcion handleclick, cambiaremos el valor del estado de seccion
  const handleClick = (section: string) => {
    //if the section wal already selected, remove it from the array
    setSelectedSection((prevSelectedSection) =>
      prevSelectedSection.includes(section)
        ? prevSelectedSection.filter((s) => s !== section)
        : [...prevSelectedSection, section]
    );
  };

  useEffect(() => {
    const fetchQualifications = async () => {
      const qualification = await getQualification(Number(params.id));
      setUserQualification(qualification.qualification);
    };

    if (document.cookie.includes("user_id")) {
      fetchQualifications();
    }
  }, []);

  useEffect(() => {
    console.log(document.cookie);

    console.log(userQualification);
  }, [userQualification]);

  return (
    <>
      <div className="relative">
        {/* Imagen de fondo */}
        <div className="h-40 w-full rounded-lg overflow-hidden">
          <img
            src={getImageUrl(backgroundImage)}
            alt="Store background"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Imagen redondeada encima de la imagen de fondo */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 rounded-full border-4 border-white">
          <img
            src={getImageUrl(logoImage)}
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
              Calificación:{" "}
              <span
                className="text-yellow-400 focus: outline-none focus:underline cursor-pointer"
                onClick={() => setOpenStarsQualification(true)}
              >
                {"★".repeat(qualification || 0)}
              </span>
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Categorías</h3>
            <ul className="grid grid-cols-2 gap-2 mt-4">
              {categories.map((category, index) => (
                <li
                  onClick={() => handleClick(category)}
                  key={index}
                  className={`rounded-full px-3 py-2 text-sm font-medium cursor-pointer transition-all ${
                    sections.includes(category)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal para calificar la tienda */}
      {openStarsQualification && (
        <Modal
          open={openStarsQualification}
          onClose={() => setOpenStarsQualification(false)}
          children={
            <StarRating
              qualification={userQualification}
              setQualification={setUserQualification}
            />
          }
          style="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg rounded-lg shadow-lg p-6 transition-all transform"
        />
      )}
    </>
  );
};

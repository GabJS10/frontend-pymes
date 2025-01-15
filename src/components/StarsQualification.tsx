"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { BACKEND_URL } from "@/constants/constants";
type Props = {
  qualification: number | null;
  setQualification: (value: number) => void;
};

const fetchQualification = async ({
  id,
  rating,
}: {
  id: string;
  rating: number;
}) => {
  console.log("probando", id, rating);

  const response = await fetch(
    `${BACKEND_URL}/user-bussiness/updateRating/${id}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ rating }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch qualification");
  }

  return await response.json();
};

const StarRating = ({ qualification, setQualification }: Props) => {
  const [hovered, setHovered] = useState(qualification || 0);
  const [selected, setSelected] = useState(qualification || 0);
  const params = useParams();
  const handleMouseEnter = (index: number) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(0);
  };

  const handleClick = (index: number) => {
    setSelected(index);
  };

  useEffect(() => {
    if (selected !== qualification) {
      const user_id = crypto.randomUUID();

      if (typeof params.id === "string") {
        if (!document.cookie.includes("user_id")) {
          document.cookie = `user_id=${user_id}; path=/; max-age=31536000; secure; samesite=lax`;
        }
        fetchQualification({
          id: params.id,
          rating: selected,
        }).then((_data) => {
          setQualification(selected);
        });
      } else {
        console.error("Invalid id format");
      }
    }
  }, [selected]);

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-transparent">
      <h2 className="text-white font-semibold text-xl mb-4 tracking-wide">
        CALIFICA ESTA TIENDA
      </h2>
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(star)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={star <= (hovered || selected) ? "#FFD700" : "none"}
            stroke={star <= (hovered || selected) ? "#FFD700" : "#6B7280"}
            strokeWidth={2}
            className="w-10 h-10 cursor-pointer transition-all transform hover:scale-110 hover:shadow-lg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        ))}
      </div>
      <p className="text-sm text-gray-400 mt-4">
        Tu calificación:{" "}
        <span className="text-yellow-400 font-bold">
          {selected > 0 ? selected : "Ninguna"}
        </span>
      </p>
    </div>
  );
};

export default StarRating;

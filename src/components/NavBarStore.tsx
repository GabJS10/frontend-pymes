"use client";

import React, { useEffect, useState, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { TbLogout2 } from "react-icons/tb";
import { useSession } from "next-auth/react";
import { IoCart } from "react-icons/io5";
import { BACKEND_URL } from "@/constants/constants";
import { CartContext } from "@/app/cart/CartProvider";
import { StoresContext } from "@/app/providers/StoresProvider";
import { getImageUrl } from "@/helpers/helpers";

async function getImageProfile(id: number, token: string): Promise<string> {
  const res = await fetch(`${BACKEND_URL}/user-bussiness/imageProfile/${id}`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data.image_profile;
}

export const NavBarStore = () => {
  const { handleQuery } = useContext(StoresContext);
  const currentPath = usePathname();
  const [profile, setProfile] = useState<string>(
    "/static/images/profile_base_image.png"
  );
  const { cart } = useContext(CartContext);
  const { data: session } = useSession();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleQuery(e.target.value);
  };

  useEffect(() => {
    if (session && session.user && new Date().getTime() < session.expiresIn) {
      const getImage = async () => {
        const data = await getImageProfile(
          session.user.id,
          session.backendTokens.token
        );
        setProfile(data);
      };

      getImage();
    }
  }, [session]);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 shadow-md">
      <h1 className="text-2xl text-white font-semibold">
        {currentPath === "/store" ? "Tu cuenta" : "Tiendas"}
      </h1>

      {currentPath !== "/store" && (
        <div className="flex items-center bg-gray-700 px-4 py-2 rounded-lg shadow-inner">
          <input
            type="text"
            onChange={handleChangeInput}
            placeholder="Buscar"
            className="w-80 bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
          <CiSearch className="text-2xl text-teal-400 ml-2" />
        </div>
      )}

      <div className="flex items-center space-x-6">
        {currentPath === "/store" && (
          <TbLogout2
            className="text-3xl text-red-400 cursor-pointer hover:text-red-300 transition-colors duration-200"
            onClick={() => signOut()}
          />
        )}
        {currentPath !== "/store" && currentPath !== "/marketplace" && (
          <a href="/cart" className="relative">
            <IoCart className="text-3xl text-white cursor-pointer hover:text-teal-400 transition-transform duration-200 transform hover:scale-110" />
            {(cart?.items?.length ?? 0) > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cart?.items.length}
              </span>
            )}
          </a>
        )}
        <div className="relative w-14 h-14 rounded-full border-2 border-teal-400 overflow-hidden shadow-lg">
          <img
            src={
              getImageUrl(profile).includes("static")
                ? "/static/images/profile_base_image.png"
                : `${getImageUrl(profile)}`
            }
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};

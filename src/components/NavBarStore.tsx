"use client";

import React from "react";
import { CiSearch } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { TbLogout2 } from "react-icons/tb";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoCart } from "react-icons/io5";
import { BACKEND_URL } from "@/constants/constants";
import { Cart } from "@/app/cart/action";
import { CartContext } from "@/app/cart/CartProvider";
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
  const currentPath = usePathname();
  const [profile, setProfile] = useState<string>(
    "/static/images/profile_base_image.png"
  );
  const { cart } = React.useContext(CartContext);

  const { data: session } = useSession();

  console.log(currentPath);

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
      console.log(profile);
    }
  }, [session]);

  return (
    <nav className="flex justify-between px-10 py-2 items-center bg-white">
      <h1 className="text-xl text-gray-800 font-bold">
        {currentPath === "/store" ? "Tu cuenta" : "Tiendas"}
      </h1>
      {currentPath !== "/store" && (
        <div className="flex items-center bg-gray-100">
          <input
            type="text"
            placeholder="Buscar"
            className=" w-96 px-4 py-2 bg-gray-100 text-gray-500 border-none rounded-lg
        focus:outline-none focus:ring-0 
        "
          />
          <CiSearch className="text-2xl text-gray-500" />
        </div>
      )}
      <div className="flex items-center">
        {currentPath === "/store" && (
          <TbLogout2
            className="text-2xl text-gray-500 mx-4 cursor-pointer"
            onClick={() => signOut()}
          />
        )}
        <div className="flex items-center space-x-6">
          {currentPath !== "/store" && currentPath !== "/marketplace" && (
            <a href="/cart" className="relative">
              <IoCart className="text-3xl text-black cursor-pointer" />

              {typeof cart !== "undefined" && (
                <span
                  key={cart?.items.length}
                  className="animate-bounce-scale absolute top-0 -right-1/4
               bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                >
                  {cart?.items.length || 0}
                </span>
              )}
            </a>
          )}

          <div className="w-14 h-14 rounded-full bg-gray-300">
            <img
              src={profile || "/static/images/profile_base_image.png"}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

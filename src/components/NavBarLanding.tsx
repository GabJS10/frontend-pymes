import React from "react";
//Import image
import Image from "next/image";
export const NavBar = () => {
  return (
    <>
      <nav
        className="px-3 py-3 flex justify-between items-center bg-violet-950
         text-white w-[90%] mx-auto overflow-hidden max-w-screen-xl rounded-b-lg shadow-md  "
      >
        <a href="/" className="max-w-[140px]">
          <Image src="/logo.svg" alt="logo" width={50} height={50} priority />
        </a>

        <input type="checkbox" name="menu" id="menu" className="peer hidden" />
        <label
          htmlFor="menu"
          className="bg-open-menu w-6 h-5 bg-cover bg-center cursor-pointer z-50
              peer-checked:bg-close-menu  transition-all 
              md:hidden
              "
        ></label>

        <div
          className="fixed inset-0 bg-gradient-to-b from-white/70 to-violet-950/50 translate-x-[100%] peer-checked:translate-x-0 transition-transform

              md:static
              md:translate-x-0
              md:bg-none

              "
        >
          <ul
            className="absolute inset-x-0 top-24 p-12 bg-white text-black w-[90%] mx-auto rounded-md h-max
                text-center grid gap-6 shadow-2xl md:w-max md:static md:bg-transparent md:p-0 md:text-white md:grid-flow-col md:gap-7 lg:gap-12"
          >
            <li>
              <a href="/">Pricing</a>
            </li>
            <li>
              <a href="/register">Crea tu cuenta de negocio</a>
            </li>
            <li>
              <a href="#">Crea tu cuenta de cliente</a>
            </li>
          </ul>
        </div>

        <a
          href="/marketplace"
          className="bg-orange-500 px-4 py-4 rounded-lg w-max 
                shadow-2xl hidden md:block
              "
        >
          Nuestra Tienda
        </a>
      </nav>
    </>
  );
};

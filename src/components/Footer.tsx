import React from "react";

export const Footer = () => {
  return (
    <>
      <footer className="bg-blue-950 py-24 mt-2">
        <section
          className="w-[90%] mx-auto overflow-hidden max-w-screen-xl grid gap-12 justify-items-center
        footer-area md:footer-area-md md:grid-cols-3 md:justify-items-stretch
        "
        >
          <form
            action="#"
            className="w-min-[100px] flex gap-4 w-full [grid-area:form]"
          >
            <input
              type="email"
              placeholder="Ingresa tu correo y contactanos"
              className="min-w-[50px] text-black flex-1 rounded-full shadow-2xl px-4"
            />
            <input
              type="submit"
              value="Enviar"
              className=" bg-orange-500 px-4 py-4 rounded-full text-white"
            />
          </form>

          <nav
            className="grid grid-cols-[max-content_max-content] text-white gap-y-4 justify-between w-4/5 [grid-area:navigation]
            md:w-full
          "
          >
            <a href="#">Home</a>
            <a href="#">Pricing</a>
            <a href="#">Products</a>
            <a href="#">About Us</a>
            <a href="#">Privacy Policy</a>
          </nav>

          <div className="flex flex-wrap gap-4 justify-between  [grid-area:social]">
            <a href="/facebook.com">
              <img
                src="/static/images/icon-facebook.svg"
                alt="facebook"
                className="w-8"
              />
            </a>
            <a href="/twitter.com">
              <img
                src="/static/images/icon-twitter.svg"
                alt="twitter"
                className="w-8"
              />
            </a>
            <a href="/instagram.com">
              <img
                src="/static/images/icon-instagram.svg"
                alt="instagram"
                className="w-8"
              />
            </a>
          </div>

          <a href="/" className="[grid-area:logo]">
            <img src="/logo.svg" alt="logo" />
          </a>

          <p className="text-gray-500 text-center [grid-area:copyright] md:text-right">
            © 2022. All rights reserved
          </p>
        </section>
      </footer>
    </>
  );
};

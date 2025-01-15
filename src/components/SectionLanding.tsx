import React from "react";
export const SectionLanding = () => {
  return (
    <>
      <section
        className="w-[90%] mx-auto overflow-hidden max-w-screen-xl
        grid gap-8 justify-items-center items-center
        md:grid-cols-2 md:py-24 md:order-1
      "
      >
        <img
          src="/static/images/celular-landing.png"
          alt="logo"
          className="w-full max-w-lg"
        />

        <article className="text-center space-y-6 md:text-left ">
          <h1 className="text-4xl font-bold md:text-5xl">
            Por qué tener su tienda en PymeStore
          </h1>
          <p className="text-lg text-gray-500">
            Creemos que sus clientes tienen que amar buscar y pedir por su
            tienda.
          </p>
          <p className="text-lg text-gray-500">
            Creemos que tiene que tener su tienda de forma sencilla de la noche
            a la mañana.
          </p>
          <p className="text-lg text-gray-500">
            Creemos que no tiene que pagar altas comisiones de entre el 20% y
            30% para vender por una app.
          </p>
          <p className="text-lg text-gray-500">
            Creemos que con nuestra plataforma, junto a Instagram y WhatsApp,
            logrará clientes más felices y más ventas
          </p>
          <a
            href="/contact"
            className="inline-block bg-orange-500 px-4 py-4 rounded-full w-max 
                shadow-2xl text-white shadow-orange-500 md:hidden"
          >
            Contactanos
          </a>
        </article>
      </section>

      <figure className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/static/images/bg-tablet-pattern.svg"
          className="absolute w-full -z-10 -top-24 -right-1/4 max-w-2xl"
        />
      </figure>
    </>
  );
};

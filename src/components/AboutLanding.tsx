import React from "react";

export const AboutLanding = () => {
  return (
    <>
      <section className="w-[90%] mx-auto overflow-hidden max-w-screen-xl text-center py-24 grid gap-12
      md:grid-cols-2
      md:text-left
      ">
        <article>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            ¡Su tienda online para recibir pedidos por WhatsApp!
          </h2>
          <p className="text-lg text-gray-500">
            ¡Cada vez que un cliente solicite por WhatsApp, lo contactamos para
            que la puedas realizar de forma rápida y segura.!
          </p>
        </article>
        <div className="grid gap-12 ">
          <article className="space-y-4 md:space-y-6">
            <p className="bg-orange-100 text-slate-950 rounded-lg font-bold flex items-center bg-transparent">
              <span className="text-white bg-orange-500 rounded-full py-4 px-6 md:mr-4">
                01
              </span>
              <span>Crea una cuenta, agrega tus productos y tus datos.</span>
            </p>
          </article>
          <article className="space-y-4">
            <p className="bg-orange-100 text-slate-950 rounded-lg font-bold flex items-center bg-transparent">
              <span className="text-white bg-orange-500 rounded-full py-4 px-6 md:mr-4 ">
                02
              </span>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                ipsa!
              </span>
            </p>
          </article>
          <article className="space-y-4">
            <p className="bg-orange-100 text-slate-950 rounded-lg font-bold flex items-center bg-transparent">
              <span className="text-white bg-orange-500 rounded-full py-4 px-6 md:mr-4">
                03
              </span>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                ipsa!
              </span>
            </p>
          </article>
        </div>
      </section>
    </>
  );
};

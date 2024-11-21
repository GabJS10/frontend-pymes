import React from "react";

export const RatioLanding = () => {
  return (
    <>
      <section className="w-[90%] mx-auto overflow-hidden text-center
      py-14 max-w-lg md:maxw-xl">
        <h2 className="text-3xl font-bold text-black md:text-4xl">Ya estos negocios han probado nuestro sistema</h2>
        <div className="mt-24 mb-14 ">
          <article className="pt-16 pb-12 relative px-4">
          <img src="/static/images/ratiologopng.jpeg" alt="ratio"
          className="absolute w-24 aspect-square -top-12 mx-auto inset-x-0"
           />
          <h3 className="text-xl mb-4 pt-2 font-bold">La burguesada</h3>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            velit laborum nesciunt nihil, nam dolores provident molestiae ipsam
            vitae explicabo soluta molestias omnis ipsa delectus accusantium,
            recusandae eum iure corporis!
          </p>
          </article>
        </div>
        <a href="/register" className="bg-orange-500 text-white px-4 py-4 rounded-full w-max 
                shadow-2xl mx-auto ">Crea tu cuenta de negocio</a>
      </section>
    </>
  );
};

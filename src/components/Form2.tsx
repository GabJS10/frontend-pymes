"use client";
import React from "react";
import { FormStepsProps } from "@/types/form.register.types";

export const Form2 = ({ register, handleNext, handleBack, errors, errorsReactHookForm }: FormStepsProps) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Url
        </label>
        <input
          id="url"
          {...register("name_url", { required: { value: true, message: "La url es requerida"} })}
          placeholder="Lo que aparece aqui sera tu url"
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errorsReactHookForm?.name_url && <p className="text-red-500">{errorsReactHookForm.name_url.message}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="holder"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Nombre del titular de la cuenta
        </label>
        <input
          id="holder"
          {...register("holder", { required: { value: true, message: "El nombre del titular es requerido"} })}
          placeholder="Titular de la cuenta"
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errorsReactHookForm?.holder && <p className="text-red-500">{errorsReactHookForm.holder.message}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="whatsapp"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Whatsapp de contacto
        </label>
        <input
          id="whatsapp"
          {...register("whatsapp_contact", {
            required: {value: true, message: "El whatsapp es requerido"},
            //pattern: string of 10 numbers
            pattern: {value:/^\d{10}$/, message: "El whatsapp debe ser de 10 digitos"},
          })}
          placeholder="3334444555"
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errorsReactHookForm?.whatsapp_contact && <p className="text-red-500">{errorsReactHookForm.whatsapp_contact.message}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="locality"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Localidad
        </label>
        <input
          id="locality"
          {...register("locality", { required: {value: true, message: "La localidad es requerida"} })}
          placeholder="Barrio/Ciudad"
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errorsReactHookForm?.locality && <p className="text-red-500">{errorsReactHookForm.locality.message}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="shipping"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Precio de envio
        </label>
        <input
          type="number"
          id="shipping"
          {...register("shipping_cost", { required: {value: true, message: "El precio de envio sera gratis"} })}
          placeholder="0$"
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errorsReactHookForm?.shipping_cost && <p className="text-red-500">{errorsReactHookForm.shipping_cost.message}</p>}
      </div>
      <div className="mt-4 mb-4 flex justify-between ">
        <button
          onClick={handleBack}
          className="bg-orange-500 px-4 py-4 rounded-full text-white"
        >
          Atras
        </button>
        {!errors.emptyForm2 ? (
          <button
            onClick={handleNext}
            className="bg-orange-500 px-4 py-4 rounded-full text-white hover:cursor-pointer"
          >
            Siguiente
          </button>
        ) : (
          <button
            disabled
            onClick={handleNext}
            className="bg-orange-400 px-4 py-4 rounded-full text-white"
          >
            Siguiente
          </button>
        )}
      </div>
    </>
  );
};

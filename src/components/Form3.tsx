"use client";
import { FormStepsProps } from "@/types/form.register.types";
import React from "react";

export const Form3 = ({ register, handleBack,errors,errorsReactHookForm }: FormStepsProps) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="contact_name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Nombre de contacto
        </label>
        <input
          type="text"
          id="contact_name"
          {...register("contact_name", { required: { value: true, message: "El nombre es requerido" } })}
          placeholder="Nombre persona de contacto"
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errorsReactHookForm?.contact_name && <p className="text-red-500">{errorsReactHookForm.contact_name.message}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="number_contact"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Numero de contacto
        </label>
        <input
          id="number_contact"
          {...register("number_contact", { required: { value: true, message: "El numero de contacto es requerido" }, minLength: { value: 10, message: "El numero debe ser de 10 digitos"}, maxLength: { value: 10, message: "El numero debe ser de 10 digitos"} })}
          placeholder="333 - 4444 - 333"
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errorsReactHookForm?.number_contact && <p className="text-red-500">{errorsReactHookForm.number_contact.message}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="social_media_contact"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Red de contacto
        </label>
        <input
          id="social_media_contact"
          {...register("social_media_contact", { required: false })}
          placeholder="Instagram,Facebook,etc."
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mt-4 mb-4 flex justify-between ">
        <button
          onClick={handleBack}
          className="bg-orange-500 px-4 py-4 rounded-full text-white"
        >
          Atras
        </button>
        {!errors.emptyForm3 ? (
          <input
          type="submit"
          //hover mouse hand 
          className="bg-orange-500 px-4 py-4 rounded-full text-white hover:cursor-pointer"
          value="Crear Cuenta"
        />
        ): (
          <input
          disabled
          type="submit"
          className="bg-orange-400 px-4 py-4 rounded-full text-white "
          value="Crear Cuenta"
        />
        )}
        
      </div>
    </>
  );
};

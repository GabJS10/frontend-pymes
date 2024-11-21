"use client";
import React from "react";
import { FormStepsProps } from "@/types/form.register.types";

export const Form1 = ({ register, handleNext,errors,errorsReactHookForm }: FormStepsProps) => {
    console.log(errorsReactHookForm);
    
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: {value: true, message: "El nombre es requerido"},  })}
          placeholder="El nombre de tu tienda"
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errorsReactHookForm?.name && <p className="text-red-500">{errorsReactHookForm.name.message}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: {value: true, message: "El email es requerido"}, pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "El email no es valido"} })}
          placeholder="you@example.com"
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      {errorsReactHookForm?.email && <p className="text-red-500">{errorsReactHookForm.email.message}</p>}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: {value: true, message: "La contraseña es requerida"}, minLength: {value: 8, message: "Minimo 8 caracteres"} })}
          placeholder="********"
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errorsReactHookForm?.password && <p className="text-red-500">{errorsReactHookForm.password.message}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="password_confirmation"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Password Confirmation
        </label>
        <input
          type="password"
          id="password_confirmation"
          {...register("password_confirmation", { required: {value: true, message: "Asegurate de confirmar la contraseña"}, minLength: {value: 8, message: "Las contraseñas no coinciden"} })}
          placeholder="********"
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errorsReactHookForm?.password_confirmation && <p className="text-red-500">{errorsReactHookForm.password_confirmation.message}</p>}
      </div>

      <div className="mb-4 flex justify-center items-center">
        {(!errors.emptyForm1) 
        ? (
            <button
          onClick={handleNext}
          className="bg-orange-500 px-4 py-4 rounded-full text-white hover:cursor-pointer"
        >
          Siguiente
        </button>
        
            
        ): (
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

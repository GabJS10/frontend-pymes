"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
type Inputs = {
  email: string;
  password: string;
};

export const SingInForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      toast.error("Email o contraseña incorrectos");
    }

    if (res?.ok) {
      router.push("/store");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full bg-orange-500">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
            Iniciar Sesion
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
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
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-violet-600 px-4 py-4 rounded-full text-white hover:cursor-pointer">
                Iniciar Sesion
              </button>
              <a
                href="/forgot-password"
                className="ml-3 text-blue-500 hover:text-blue-600 font-semibold"
              >
                Olvide mi contraseña
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs, InputsErrors } from "@/types/form.register.types";
import { Form1 } from "./Form1";
import { Form2 } from "./Form2";
import { Form3 } from "./Form3";
import { BACKEND_URL } from "@/constants/constants";
import toast from "react-hot-toast";

const errorsFormDefault: InputsErrors = {
  emptyForm1: true,
  emptyForm2: true,
  emptyForm3: true,
};

export const MultiStepForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
  });
  const [step, setStep] = useState<number>(1);
  const [errorsForm, setErrorsForm] = useState<InputsErrors>(errorsFormDefault);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //shipping cost must be a number
    data["shipping_cost"] = Number(data["shipping_cost"]);
    delete data["password_confirmation"];

    const res = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      if (res.status === 400) {
        toast.error("Revisa que todos los campos sean validos");
      }

      if (res.status === 409) {
        toast.error("El email o el url ya estan registrados");
      }

      if (res.status === 500) {
        toast.error("Ha ocurrido un error en el servidor");
      }

      return;
    }

    const json = await res.json();

    toast.success(json.message);

    reset();
    setStep(1);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const validateForm = (validate1: boolean, validate2: boolean): boolean => {
    if (validate1 && validate2) {
      return true;
    }

    return false;
  };

  const validationsForm = () => {
    const vForm1: boolean = validateForm(
      getValues()["password"] === getValues()["password_confirmation"],
      getValues()["name"] !== "" &&
        getValues()["email"] !== "" &&
        getValues()["password"] !== "" &&
        getValues()["password_confirmation"] !== ""
    );

    const vForm2: boolean = validateForm(
      getValues()["name_url"] !== "" &&
        getValues()["holder"] !== "" &&
        getValues()["whatsapp_contact"] !== "" &&
        getValues()["locality"] !== "" &&
        getValues()["shipping_cost"] !== null,
      //validate whatsapp number by pattern: string of 10 numbers
      getValues()["whatsapp_contact"]?.length === 10
    );

    const vForm3: boolean = validateForm(
      getValues()["contact_name"] !== "" &&
        getValues()["number_contact"] !== "",
      getValues()["number_contact"]?.length === 10
    );

    setErrorsForm({
      emptyForm1: !vForm1,
      emptyForm2: !vForm2,
      emptyForm3: !vForm3,
    });
  };

  useEffect(() => {
    const subscription = watch((_value) => {
      validationsForm();
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-violet-600">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          Crea tu cuenta de negocio!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {step === 1 && (
            <Form1
              register={register}
              handleNext={handleNext}
              handleBack={handleBack}
              errors={errorsForm}
              errorsReactHookForm={errors}
            />
          )}
          {step === 2 && (
            <Form2
              register={register}
              handleNext={handleNext}
              handleBack={handleBack}
              errors={errorsForm}
              errorsReactHookForm={errors}
            />
          )}
          {step === 3 && (
            <Form3
              register={register}
              handleNext={handleNext}
              handleBack={handleBack}
              errors={errorsForm}
              errorsReactHookForm={errors}
            />
          )}
        </form>
      </div>
    </div>
  );
};

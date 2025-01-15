import React from "react";
import { MultiStepForm } from "@/components/Multi-step-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../utils/authOptions";
export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session && session.user && new Date().getTime() < session.expiresIn) {
    return redirect("/store");
  }

  return (
    <>
      <MultiStepForm />
    </>
  );
}

import React from "react";
import { MultiStepForm } from "@/components/Multi-step-form";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

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

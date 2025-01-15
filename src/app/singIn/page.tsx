import React from "react";
import { SingInForm } from "@/components/SingInForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import { redirect } from "next/navigation";
export default async function SingIn() {
  const session = await getServerSession(authOptions);

  if (session && session.user && new Date().getTime() < session.expiresIn) {
    return redirect("/store");
  }

  return (
    <>
      <SingInForm />
    </>
  );
}

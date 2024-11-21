import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { NavBarStore } from "@/components/NavBarStore";
import { Footer } from "@/components/Footer";
export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session && session.user && new Date().getTime() < session.expiresIn) {
    return (
      <>
        <NavBarStore />
        {children}
        <Footer />
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">
        Please{" "}
        <a className="underline" href="/singIn">
          {" "}
          Login
        </a>
      </h1>
    </div>
  );
}

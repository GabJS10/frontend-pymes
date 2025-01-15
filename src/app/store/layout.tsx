import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session && session.user && new Date().getTime() < session.expiresIn) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="p-8 bg-gray-800 rounded-lg shadow-xl text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-100">
          Your session has expired
        </h1>
        <p className="mt-4 text-gray-400 text-lg">
          Please{" "}
          <a
            href="/singIn"
            className="text-teal-400 underline hover:text-teal-300 transition-colors duration-200"
          >
            login
          </a>{" "}
          to continue.
        </p>
      </div>
    </div>
  );
}

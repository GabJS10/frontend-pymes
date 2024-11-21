"use client";
import React, { useEffect } from "react";
import { DashboardContent } from "./DashboardContent";
import { BACKEND_URL, View } from "@/constants/constants";
import { UserBussines } from "@/types/user_bussines.types";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

//fetch user data

const fetchUserData = async (
  id: number,
  token: string
): Promise<UserBussines> => {
  const res = await fetch(`${BACKEND_URL}/user-bussiness/${id}`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data: UserBussines = await res.json();
  console.log(data);

  return data;
};

export const Dashboard = () => {
  const [view, setView] = React.useState<View>(View.profile);
  const [data, setData] = React.useState<Partial<UserBussines> | null>(null);
  const [image_profile, setImageProfile] = React.useState<string>(
    "static/images/profile_base_image.png"
  );
  const { data: session, status } = useSession();
  useEffect(() => {
    //use the getSession function from NextAuth

    const getSession = async () => {
      if (session && status === "authenticated") {
        const token = session.backendTokens.token;
        const id = session.user.id;
        if (token && id) {
          const userData = await fetchUserData(id, token);
          setData(userData);
          setImageProfile(
            userData.image_profile ? userData.image_profile : image_profile
          );
        }
      }
    };

    getSession();
  }, [session]);

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="flex min-h-screen h-min bg-gray-100 p-14">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-300">
              <img
                src={image_profile}
                alt="Profile"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="ml-4">
              <p className="text-lg font-semibold">{data.name}</p>
              <p className="text-sm text-gray-500">Mi perfil</p>
            </div>
          </div>
          <ul>
            <li className="mb-3">
              <button
                className="flex items-center text-gray-700 hover:text-gray-900
                border-b border-gray-200
                "
                onClick={() => setView(View.profile)}
              >
                Ajustes de cuenta
              </button>
            </li>
            <li className="mb-3">
              <button
                className="flex items-center text-gray-700 hover:text-gray-900
                border-b border-gray-200
                "
                onClick={() => setView(View.principal)}
              >
                Ajustes pagina principal
              </button>
            </li>
            <li className="mb-3">
              <button
                className="flex items-center text-gray-700 hover:text-gray-900
                border-b border-gray-200
                "
                onClick={() => setView(View.productos)}
              >
                Tus productos
              </button>
            </li>
            <li className="mb-3">
              <button
                className="flex items-center text-gray-700 hover:text-gray-900
                border-b border-gray-200
                "
              >
                Metricas
              </button>
            </li>
            <li className="mb-3">
              <button
                className="flex items-center text-gray-700 hover:text-gray-900
                border-b border-gray-200
                "
              >
                Otros ajustes
              </button>
            </li>
          </ul>
        </div>

        {/* Main content */}
        <DashboardContent data={data} view={view} />
      </div>
    </>
  );
};

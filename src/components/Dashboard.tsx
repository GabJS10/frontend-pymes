"use client";
import React, { useEffect } from "react";
import { DashboardContent } from "./DashboardContent";
import { BACKEND_URL, View } from "@/constants/constants";
import { UserBussines } from "@/types/user_bussines.types";
import { useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";
import { NavBarStore } from "./NavBarStore";
import { Footer } from "./Footer";
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

  return data;
};

export const Dashboard = () => {
  const [view, setView] = React.useState<View>(View.profile);
  const [data, setData] = React.useState<Partial<UserBussines> | null>(null);
  const [image_profile, setImageProfile] = React.useState<string>(
    "static/images/profile_base_image.png"
  );
  const [loading, setLoading] = React.useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    //use the getSession function from NextAuth

    const getSession = async () => {
      setLoading(true);
      try {
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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, [session]);

  if (!data) {
    return null;
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="min-h-screen bg-gray-50">
        <NavBarStore />
        <div className="flex h-full px-10 py-8 gap-8">
          {/* Sidebar */}
          <div className="w-1/4 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <img
                src={image_profile}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover shadow"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {data.name}
                </h2>
                <p className="text-sm text-gray-500">Mi perfil</p>
              </div>
            </div>
            <ul className="space-y-4">
              {[
                { label: "Ajustes de cuenta", view: View.profile },
                { label: "Ajustes página principal", view: View.principal },
                { label: "Tus productos", view: View.productos },
                { label: "Métricas", view: null },
                { label: "Otros ajustes", view: null },
              ].map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => item.view && setView(item.view)}
                    className="w-full text-left text-gray-700 font-medium hover:bg-gray-100 px-4 py-2 rounded-lg transition"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <DashboardContent data={data} view={view} />
        </div>
        <Footer />
      </div>
    </>
  );
};

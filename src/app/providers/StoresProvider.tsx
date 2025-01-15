"use client";

import React, { createContext, useState, useEffect } from "react";
import { UserBussines } from "@/types/user_bussines.types";
import { BACKEND_URL } from "@/constants/constants";

export const StoresContext = createContext({
  query: "",
  stores: [] as UserBussines[],
  handleQuery: (_query: string) => {},
});

export const StoresProvider = ({ children }: { children: React.ReactNode }) => {
  const [stores, setStores] = useState<UserBussines[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadStores = async (query: string | null) => {
      const url = query
        ? `${BACKEND_URL}/user-bussiness/search/${query}`
        : `${BACKEND_URL}/user-bussiness`;
      try {
        const response = await fetch(`${url}`);
        const stores = await response.json();
        setStores(stores);
      } catch (error) {
        console.log(error);
        setStores([]);
      }
    };

    loadStores(query);
  }, [query]);

  const handleQuery = (query: string) => {
    setQuery(query);
  };

  return (
    <StoresContext.Provider value={{ query, stores, handleQuery }}>
      {children}
    </StoresContext.Provider>
  );
};

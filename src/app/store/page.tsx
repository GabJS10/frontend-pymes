import React from "react";
import { Dashboard } from "@/components/Dashboard";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
export default function StorePage() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Dashboard />
      </Suspense>
    </>
  );
}

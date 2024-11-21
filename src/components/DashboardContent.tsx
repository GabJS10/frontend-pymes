import React from "react";
import { UserBussines } from "@/types/user_bussines.types";
import { DashboardInputsProfile } from "./DashboardInputsProfile";
import { DashBoardInputsPagePrincipal } from "./DashBoardInputsPagePrincipal";
import { getPrincipalData, getProfileData } from "@/helpers/helpers";
import { DashboardProducts } from "./DashboardProducts";

export const DashboardContent = ({
  data,
  view,
}: {
  data: Partial<UserBussines>;
  view: string;
}) => {
  const whatRender = () => {
    switch (view) {
      case "profile": {
        return (
          <DashboardInputsProfile data={getProfileData(data)} id={data.id} />
        );
      }
      case "principal": {
        return (
          <DashBoardInputsPagePrincipal
            data={getPrincipalData(data)}
            id={data.id}
          />
        );
      }
      case "productos": {
        return <DashboardProducts />;
      }
      default: {
        return (
          <div>
            <p>No hay vista</p>
          </div>
        );
      }
    }
  };

  return (
    <div className="w-3/4  bg-white p-8 rounded-lg shadow-md ml-6">
      {whatRender()}
    </div>
  );
};

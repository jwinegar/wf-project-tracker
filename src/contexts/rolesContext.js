import React from "react";
import useFetch from "../hooks/fetch";

export const RolesContext = React.createContext();

export const RolesProvider = ({ children }) => {
  const apiRoles = "data/_roles.json";

  const [rolesData, setLoadingRoles] = useFetch(apiRoles);

  return (
    <RolesContext.Provider value={[rolesData, setLoadingRoles]}>
      {children}
    </RolesContext.Provider>
  );
};

import React, { useState, createContext } from "react";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [filterRole, setFilterRole] = useState("");

  return (
    <RoleContext.Provider value={[filterRole, setFilterRole]}>
      {children}
    </RoleContext.Provider>
  );
};

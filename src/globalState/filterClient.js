import React, { useState, createContext } from "react";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [filterClient, setFilterClient] = useState("");

  return (
    <ClientContext.Provider value={[filterClient, setFilterClient]}>
      {children}
    </ClientContext.Provider>
  );
};

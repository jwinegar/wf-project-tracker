import React, { useState, createContext } from "react";

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filterClient, setFilterClient] = useState("");
  const [filterProgram, setFilterProgram] = useState("");
  const [filterProjectName, setFilterProjectName] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const [filteredProjectCount, setFilteredProjectCount] = useState(0);

  return (
    <FiltersContext.Provider
      value={{
        filterClient,
        setFilterClient,
        filterProgram,
        setFilterProgram,
        filterProjectName,
        setFilterProjectName,
        filterRole,
        setFilterRole,
        filteredProjectCount,
        setFilteredProjectCount
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

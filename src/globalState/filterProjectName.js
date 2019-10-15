import React, { useState, createContext } from "react";

export const ProjectNameContext = createContext();

export const ProjectNameProvider = ({ children }) => {
  const [projectNameFilter, setProjectNameFilter] = useState("");

  return (
    <ProjectNameContext.Provider
      value={[projectNameFilter, setProjectNameFilter]}
    >
      {children}
    </ProjectNameContext.Provider>
  );
};

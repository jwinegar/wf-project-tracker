import React, { useState, createContext } from "react";

export const ProgramContext = createContext();

export const ProgramProvider = ({ children }) => {
  const [filterProgram, setFilterProgram] = useState("");

  return (
    <ProgramContext.Provider value={[filterProgram, setFilterProgram]}>
      {children}
    </ProgramContext.Provider>
  );
};

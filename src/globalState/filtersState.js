import React, { createContext, useReducer } from "react";

export const FiltersContext = createContext();

const initialState = {
  clientFilter: "",
  programFilter: "",
  roleFilter: "",
  searchFilter: "",
  filteredCount: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CLIENTFILTER":
      return { ...state, clientFilter: action.payload };
    case "CLEAR_CLIENTFILTER":
      return { ...state, clientFilter: "" };

    case "UPDATE_PROGRAMFILTER":
      return { ...state, programFilter: action.payload };
    case "CLEAR_PROGRAMFILTER":
      return { ...state, programFilter: "" };

    case "UPDATE_ROLEFILTER":
      return { ...state, roleFilter: action.payload };
    case "CLEAR_ROLEFILTER":
      return { ...state, roleFilter: "" };

    case "UPDATE_SEARCHFILTER":
      return { ...state, searchFilter: action.payload };
    case "CLEAR_SEARCHFILTER":
      return { ...state, searchFilter: "" };

    case "CLEAR_FILTERS":
      return {
        ...state,
        clientFilter: "",
        programFilter: "",
        roleFilter: "",
        searchFilter: ""
      };

    case "UPDATE_FILTEREDCOUNT":
      return { ...state, filteredCount: action.payload };

    default:
      throw new Error("Action type must be defined");
  }
};

export const FiltersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FiltersContext.Provider value={[state, dispatch]}>
      {children}
    </FiltersContext.Provider>
  );
};

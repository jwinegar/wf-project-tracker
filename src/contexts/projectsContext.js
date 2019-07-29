import React from "react";
import useFetch from "../hooks/fetch";

export const ProjectsContext = React.createContext();

export const ProjectsProvider = ({ children }) => {
  const apiProj = "data/_apiRes.json";

  const [projData, setLoadingProjects] = useFetch(apiProj);

  const projects = projData
    .filter(
      project =>
        new Date(project.plannedCompletionDate.slice(0, 19)).getTime() >=
        new Date().getTime()
    )
    .sort((a, b) =>
      a.plannedCompletionDate > b.plannedCompletionDate ? 1 : -1
    );

  return (
    <ProjectsContext.Provider value={[projects, setLoadingProjects]}>
      {children}
    </ProjectsContext.Provider>
  );
};

import React from "react";
import useFetch from "../hooks/fetch";

export const ProjectContext = React.createContext();

// HOURS: https://wunderman.my.workfront.com/attask/api/v10.0/hour/search?fields=*&$$LIMIT=2000

export const ProjectProvider = ({ children }) => {
  // const apiProj =
  //   "https://wunderman.my.workfront.com/attask/api/v10.0/proj/search?companyID=5bb4e87f014b901f76f2603f2d7eb098&status=CUR&fields=DE:Wun%20LA%20Program%20for%20Innocean%20HMA,DE:Wun%20LA%20Program%20for%20Innocean%20GMA,plannedCompletionDate,tasks:name,tasks:roleID,tasks:workRequired,tasks:hours:hours,tasks:hours:roleID&$$LIMIT=2000";
  const apiProj = "data/_apiRes.json";

  const [projData, setLoading] = useFetch(apiProj);

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
    <ProjectContext.Provider value={[projects, setLoading]}>
      {children}
    </ProjectContext.Provider>
  );
};

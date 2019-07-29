import React from "react";
import { ProjectsProvider } from "./contexts/projectsContext";
import { RolesProvider } from "./contexts/rolesContext";
import ProjectsList from "./components/ProjectsList";

const App = () => {
  return (
    <div className="App">
      <ProjectsProvider>
        <RolesProvider>
          <ProjectsList />
        </RolesProvider>
      </ProjectsProvider>
    </div>
  );
};

export default App;

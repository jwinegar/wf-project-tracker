import React from "react";
import { ProjectProvider } from "./contexts/projectContext";
import ProjectsList from "./components/ProjectsList";

const App = () => {
  return (
    <div className="App">
      <ProjectProvider>
        <ProjectsList />
      </ProjectProvider>
    </div>
  );
};

export default App;

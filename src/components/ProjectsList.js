import React, { useState, useContext } from "react";
import styled from "styled-components/macro";
import { ProjectContext } from "../contexts/projectContext";

import ProjectFilters from "./ProjectFilters";
import ProjectContent from "./ProjectContent";

const Loading = styled.div`
  padding: 1.25em 4.2667%;
`;
const ListingContainer = styled.main`
  width: 100%;
  padding: 2.5em 4.2667%;
`;
const Project = styled.article`
  width: 100%;
  padding: 1.5em 2em 2em;
  background-color: white;
  border-radius: 5px;

  & + & {
    margin-top: 2em;
  }
`;

const ProjectsList = () => {
  const [projects, setLoading] = useContext(ProjectContext);
  const [projectFilters, setProjectFilters] = useState({
    projectName: "",
    client: "",
    program: "",
    role: ""
  });

  const filteredProjects = projects
    .filter(project =>
      project.name.toLowerCase().includes(projectFilters.client.toLowerCase())
    )
    .filter(project =>
      project.name
        .toLowerCase()
        .includes(projectFilters.projectName.toLowerCase())
    )
    .filter(project =>
      !!projectFilters.program
        ? (project["DE:Wun LA Program for Innocean HMA"] ||
            project["DE:Wun LA Program for Innocean GMA"]) &&
          (
            project["DE:Wun LA Program for Innocean HMA"] ||
            project["DE:Wun LA Program for Innocean GMA"]
          ).includes(projectFilters.program)
        : project
    );

  const updateClientFilter = client => {
    setProjectFilters({ ...projectFilters, client });
  };
  const updateProjectFilter = projectName => {
    setProjectFilters({ ...projectFilters, projectName });
  };
  const updateProgramFilter = program => {
    setProjectFilters({ ...projectFilters, program });
  };
  const updateRoleFilter = role => {
    setProjectFilters({ ...projectFilters, role });
  };

  return (
    <React.Fragment>
      <ProjectFilters
        filteredProjectsCount={filteredProjects.length}
        updateClientFilter={updateClientFilter}
        updateProjectFilter={updateProjectFilter}
        updateProgramFilter={updateProgramFilter}
        updateRoleFilter={updateRoleFilter}
      />
      {setLoading ? (
        <Loading>Loading Projects...</Loading>
      ) : (
        <ListingContainer className="projects">
          {filteredProjects.map(project => (
            <Project className="project" key={project.ID}>
              <ProjectContent project={project} />
            </Project>
          ))}
        </ListingContainer>
      )}
    </React.Fragment>
  );
};

export default ProjectsList;

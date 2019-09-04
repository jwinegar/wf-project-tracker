import React, { useState, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components/macro";

import ProjectFilters from "./ProjectFilters";
import Project from "./Project";
import RoleOverview from "./RoleOverview";

const PROJECTS_QUERY = gql`
  query projectsQuery {
    projects {
      id
      name
      program
      expireDate
      tasks {
        roleID
        role
        hoursScoped
      }
      hours {
        roleID
        role
        hoursLogged
      }
    }
  }
`;

const Message = styled.div`
  padding: 1.25em 4.2667%;
`;
const Container = styled.main`
  width: 100%;
  padding: 0 4.2667% 3.5em;

  & > * + * {
    margin-top: 2em;
  }
`;

const ProjectsList = () => {
  const { data, loading, error } = useQuery(PROJECTS_QUERY);

  const [filters, setFilters] = useState({
    projectName: "",
    client: "",
    program: "",
    role: ""
  });
  const { projectName, client, program } = filters;

  const updateProjectFilter = useCallback(
    val => {
      setFilters(f => {
        return { ...f, projectName: val };
      });
    },
    [setFilters]
  );
  const updateClientFilter = useCallback(
    val => {
      setFilters(f => {
        return { ...f, client: val };
      });
    },
    [setFilters]
  );
  const updateProgramFilter = useCallback(
    val => {
      setFilters(f => {
        return { ...f, program: val };
      });
    },
    [setFilters]
  );
  const updateRoleFilter = useCallback(
    val => {
      setFilters(f => {
        return { ...f, role: val };
      });
    },
    [setFilters]
  );

  // get list of projects by role
  const getProjectsByRole = (data, role) =>
    role
      ? data.filter(project => project.tasks.some(task => task.role === role))
      : data;

  const filterProjects = projects =>
    projects
      // filter by client
      .filter(project =>
        project.name.toLowerCase().includes(client.toLowerCase())
      )
      // filter by project name
      .filter(project =>
        project.name.toLowerCase().includes(projectName.toLowerCase())
      )
      // filter by program
      .filter(project =>
        program ? project.program.includes(program) : project
      )
      // sort projects by name
      .sort((a, b) => (a.name > b.name ? -1 : 1))
      // sort projects by expiration: closest to furthest
      .sort((a, b) => (a.expireDate > b.expireDate ? 1 : -1));

  if (loading) return <Message>Loading Projects...</Message>;
  if (error) return <Message>{error.message}</Message>;
  if (!data || !data.projects) return <Message>No projects found</Message>;

  return (
    <>
      <ProjectFilters
        projects={data.projects}
        updateProjectFilter={updateProjectFilter}
        updateClientFilter={updateClientFilter}
        updateProgramFilter={updateProgramFilter}
        updateRoleFilter={updateRoleFilter}
        filteredProjectsCount={
          getProjectsByRole(filterProjects(data.projects), filters.role).length
        }
      />
      <Container>
        {filters.role ? (
          <RoleOverview
            role={filters.role}
            projects={getProjectsByRole(
              filterProjects(data.projects),
              filters.role
            )}
          />
        ) : (
          filterProjects(data.projects).map(project => (
            <Project key={project.id} project={project} />
          ))
        )}
      </Container>
    </>
  );
};

export default ProjectsList;

import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components/macro";

import { FiltersContext } from "../globalState";
import { useStatusDelay } from "../hooks/statusDelay";

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
const MainContainer = styled.main`
  width: 100%;
  padding: 0 4.2667% 3.5em;

  & > * + * {
    margin-top: 2em;
  }
`;

const ProjectsList = () => {
  const { data, loading, error } = useQuery(PROJECTS_QUERY);

  const loadingLabel = useStatusDelay("Retrieving Projects...");

  const {
    filterClient,
    filterProgram,
    filterProjectName,
    filterRole,
    setFilteredProjectCount
  } = useContext(FiltersContext);

  // get list of projects by role
  const getProjectsByRole = (data, role) =>
    role
      ? data.filter(project => project.tasks.some(task => task.role === role))
      : data;

  const filterProjects = projects =>
    projects
      // filter by client
      .filter(project => project.name.includes(filterClient))
      // filter by project name
      .filter(project =>
        project.name.toLowerCase().includes(filterProjectName.toLowerCase())
      )
      // filter by program
      .filter(project =>
        filterProgram ? project.program.includes(filterProgram) : project
      )
      // sort projects by name alphabetically
      .sort((a, b) => (a.name > b.name ? -1 : 1))
      // sort projects by expiration: closest to furthest
      .sort((a, b) => (a.expireDate > b.expireDate ? 1 : -1));

  if (loading) return <Message>{loadingLabel}</Message>;
  if (error) return <Message>{error.message}</Message>;
  if (!data || !data.projects) return <Message>No projects found</Message>;

  setFilteredProjectCount(
    getProjectsByRole(filterProjects(data.projects), filterRole).length
  );

  return (
    <>
      <MainContainer>
        {filterRole ? (
          <RoleOverview
            role={filterRole}
            projects={getProjectsByRole(
              filterProjects(data.projects),
              filterRole
            )}
          />
        ) : (
          filterProjects(data.projects).map(project => (
            <Project key={project.id} project={project} />
          ))
        )}
      </MainContainer>
    </>
  );
};

export default ProjectsList;

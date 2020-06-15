import React, { useContext } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components/macro";

import { FiltersContext } from "../globalState";
import useDelayOutput from "../hooks/useDelayOutput";

import Project from "./Project";
import RoleOverview from "./RoleOverview";

export const PROJECTS_QUERY = gql`
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

// get list of projects by role
const getProjectsByRole = (data, role) =>
  role
    ? data.filter((project) =>
        project.tasks.filter((task) => task).some((task) => task.role === role)
      )
    : data;

const ProjectsList = () => {
  const { loading, error, data } = useQuery(PROJECTS_QUERY);
  const [
    { clientFilter, programFilter, roleFilter, searchFilter, setFilteredCount },
  ] = useContext(FiltersContext);

  const loadingLabel = useDelayOutput("Retrieving Projects...", 1000);

  const filterProjects = (projects) =>
    projects
      // filter by client
      .filter((project) => project.name.includes(clientFilter))
      // filter by project name
      .filter((project) =>
        project.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
      // filter by program
      .filter((project) =>
        programFilter ? project.program.includes(programFilter) : project
      )
      // sort projects by name alphabetically
      .sort((a, b) => (a.name > b.name ? -1 : 1))
      // sort projects by expiration: closest to furthest
      .sort((a, b) => (a.expireDate > b.expireDate ? 1 : -1));

  if (loading) return <Message>{loadingLabel}</Message>;
  if (error) return <Message>{error.message}</Message>;
  if (!data || !data.projects || data.projects.length === 0)
    return <Message>No projects found</Message>;

  // TODO: Fix how this is set.
  // Warning: Cannot update a component from inside the function body of a different component.
  setFilteredCount(
    getProjectsByRole(filterProjects(data.projects), roleFilter).length
  );

  return (
    <>
      <MainContainer>
        {roleFilter ? (
          <RoleOverview
            projects={getProjectsByRole(
              filterProjects(data.projects),
              roleFilter
            )}
          />
        ) : (
          filterProjects(data.projects).map((project) => (
            <Project key={project.id} project={project} />
          ))
        )}
      </MainContainer>
    </>
  );
};

export default ProjectsList;

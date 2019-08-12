import React, { Fragment, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components/macro";

import parseISODateString from "./parseISODateString";
import ProjectFilters from "./ProjectFilters";
import Project from "./Project";

const PROJECTS_QUERY = gql`
  query projectsQuery {
    projects {
      id
      name
      program
      expireDate
      tasks {
        id
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
const ListingContainer = styled.main`
  width: 100%;
  padding: 2.5em 4.2667%;
`;

const ProjectsList = () => {
  const { data, loading, error } = useQuery(PROJECTS_QUERY);

  const [filters, setFilters] = useState({
    projectName: "",
    client: "",
    program: ""
  });

  const currentProjects = projects =>
    projects
      // filter by date expiring
      .filter(
        project =>
          parseISODateString(project.expireDate).getTime() >=
          new Date().getTime()
      )
      // sort projects by expiration: closest to furthest
      .sort((a, b) => (a.expireDate > b.expireDate ? 1 : -1));

  const filterProjects = projects =>
    projects
      // filter by client
      .filter(project =>
        project.name.toLowerCase().includes(filters.client.toLowerCase())
      )
      // filter by project name
      .filter(project =>
        project.name.toLowerCase().includes(filters.projectName.toLowerCase())
      )
      // filter by program
      .filter(project =>
        filters.program ? project.program.includes(filters.program) : project
      );

  const updateClientFilter = client => {
    setFilters({ ...filters, client });
  };
  const updateProjectFilter = projectName => {
    setFilters({ ...filters, projectName });
  };
  const updateProgramFilter = program => {
    setFilters({ ...filters, program });
  };

  if (loading) return <Message>Loading Projects...</Message>;
  if (error) return <Message>{error.message}</Message>;
  if (!data || !data.projects) return <Message>No projects found</Message>;

  return (
    <Fragment>
      <ProjectFilters
        currentProjects={currentProjects(data.projects)}
        filteredProjectsCount={
          filterProjects(currentProjects(data.projects)).length
        }
        updateClientFilter={updateClientFilter}
        updateProjectFilter={updateProjectFilter}
        updateProgramFilter={updateProgramFilter}
      />
      <ListingContainer>
        {filterProjects(currentProjects(data.projects)).map(project => (
          <Project key={project.id} project={project} />
        ))}
      </ListingContainer>
    </Fragment>
  );
};

export default ProjectsList;

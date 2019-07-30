import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components/macro";

import parseISODateString from "./parseISODateString";
// import ProjectFilters from "./ProjectFilters";
import Project from "./Project";

const GET_PROJECTS = gql`
  query getProjects {
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
  const { loading, data } = useQuery(GET_PROJECTS);

  return (
    <Fragment>
      {loading ? (
        <Message>Loading Projects...</Message>
      ) : (
        <ListingContainer className="projects">
          {data.projects
            .filter(
              project =>
                parseISODateString(project.expireDate).getTime() >=
                new Date().getTime()
            )
            .sort((a, b) => (a.expireDate > b.expireDate ? 1 : -1))
            .map(project => (
              <Project key={project.id} project={project} />
            ))}
        </ListingContainer>
      )}
    </Fragment>
  );
};

export default ProjectsList;

import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components/macro";

import parseISODateString from "./parseISODateString";
// import ProjectFilters from "./ProjectFilters";
import Project from "./Project";

const PROJECTS_QUERY = gql`
  query ProjectsQuery {
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
  return (
    <Fragment>
      <Query query={PROJECTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Message>Loading Projects...</Message>;
          }
          if (error) {
            console.log(error);
          }

          return (
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
          );
        }}
      </Query>
    </Fragment>
  );
};

export default ProjectsList;

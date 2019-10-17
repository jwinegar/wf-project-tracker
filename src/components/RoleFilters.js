import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { FiltersContext } from "../globalState";

import { Button } from "./globalStyledComponents";

const ROLES_QUERY = gql`
  query rolesQuery {
    projects {
      tasks {
        role
      }
      hours {
        role
      }
    }
  }
`;

const RoleFilters = () => {
  const { data, loading, error } = useQuery(ROLES_QUERY);
  const { filterRole, setFilterRole } = useContext(FiltersContext);

  if (loading)
    return (
      <span>
        <small>Loading...</small>
      </span>
    );
  if (error)
    return (
      <span>
        <small>{error.message}</small>
      </span>
    );
  if (!data || !data.projects)
    return (
      <span>
        <small>No roles found</small>
      </span>
    );

  const tasks = data.projects
    .map(project => project.tasks.map(task => task.role))
    .flat();
  const hours = data.projects
    .map(project => project.hours.map(hour => hour.role))
    .flat();

  const roles = [...tasks, ...hours]
    .filter((role, index) => [...tasks, ...hours].indexOf(role) === index)
    .sort();

  return (
    <span>
      {roles.map((role, index) => (
        <Button
          type="button"
          key={index}
          name="role"
          value={role}
          className={filterRole === role && "active"}
          onClick={e => {
            setFilterRole(e.currentTarget.value);
          }}
        >
          {role}
        </Button>
      ))}
    </span>
  );
};

export default RoleFilters;

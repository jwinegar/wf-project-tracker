import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { FiltersContext } from "../globalState";
import { useStatusDelay } from "../hooks/statusDelay";

import { Button } from "./globalStyles";

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
  const loadingLabel = useStatusDelay("Loading...");

  if (loading)
    return (
      <span>
        <small>{loadingLabel}</small>
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
            filterRole !== role
              ? setFilterRole(e.currentTarget.value)
              : setFilterRole("");
          }}
        >
          {role}
        </Button>
      ))}
    </span>
  );
};

export default RoleFilters;

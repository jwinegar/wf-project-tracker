import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { FiltersContext } from "../globalState";
import useDelayOutput from "../hooks/useDelayOutput";

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
  const [{ roleFilter }, dispatch] = useContext(FiltersContext);

  const loadingLabel = useDelayOutput("Gathering Roles...", 1000);

  if (loading) return <small>{loadingLabel}</small>;
  if (error) return <small>{error.message}</small>;
  if (!data || !data.projects || data.projects.length === 0)
    return <small>--</small>;

  const tasks = data.projects
    .map(project => project.tasks.filter(task => task).map(task => task.role))
    .flat();
  const hours = data.projects
    .map(project => project.hours.filter(hour => hour).map(hour => hour.role))
    .flat();

  const roles = [...tasks, ...hours]
    .filter((role, index) => [...tasks, ...hours].indexOf(role) === index)
    .sort();

  return (
    <div>
      {roles.map((role, index) => (
        <Button
          type="button"
          key={index}
          name="role"
          value={role}
          className={roleFilter === role && "active"}
          onClick={e => {
            roleFilter !== role
              ? dispatch({
                  type: "UPDATE_ROLEFILTER",
                  payload: role
                })
              : dispatch({ type: "CLEAR_ROLEFILTER" });
          }}
        >
          {role}
        </Button>
      ))}
    </div>
  );
};

export default RoleFilters;

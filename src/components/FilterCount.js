import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { FiltersContext } from "../globalState";
import { useDelayStatus } from "../hooks/delayStatus";

const FilterCount = () => {
  const { data, loading, error } = useQuery(
    gql`
      query totalProjectsQuery {
        projects {
          id
        }
      }
    `
  );
  const [{ filteredCount }] = useContext(FiltersContext);

  const loadingLabel = useDelayStatus("Loading...");

  let totalCount = 0;

  if (loading) return <small>{loadingLabel}</small>;
  if (error) return <small>{error.message}</small>;
  if (!data || !data.projects) return <small>No projects found</small>;

  totalCount = data.projects.length;

  return (
    <small>
      {filteredCount} of {totalCount} projects showing
    </small>
  );
};

export default FilterCount;

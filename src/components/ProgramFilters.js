import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { FiltersContext } from "../globalState";
import { useDelayStatus } from "../hooks/delayStatus";

import { Button } from "./globalStyles";

const PROGRAMS_QUERY = gql`
  query programsQuery {
    projects {
      program
    }
  }
`;

const ProgramFilters = () => {
  const { data, loading, error } = useQuery(PROGRAMS_QUERY);
  const [{ programFilter }, dispatch] = useContext(FiltersContext);

  const loadingLabel = useDelayStatus("Gathering Programs...");

  if (loading) return <small>{loadingLabel}</small>;
  if (error) return <small>{error.message}</small>;
  if (!data || !data.projects) return <small>No programs found</small>;

  const programs = data.projects
    .filter(project => project.program)
    .map(project => project.program)
    .reduce((acc, cur) => {
      if (acc.indexOf(cur) === -1) {
        acc.push(cur);
      }
      return acc;
    }, [])
    .sort();

  return (
    <span>
      {programs.map((program, index) => (
        <Button
          type="button"
          key={index}
          name="program"
          value={program}
          className={programFilter === program && "active"}
          onClick={() => {
            programFilter !== program
              ? dispatch({
                  type: "UPDATE_PROGRAMFILTER",
                  payload: program
                })
              : dispatch({ type: "CLIENT_PROGRAMFILTER" });
          }}
        >
          {program}
        </Button>
      ))}
    </span>
  );
};

export default ProgramFilters;

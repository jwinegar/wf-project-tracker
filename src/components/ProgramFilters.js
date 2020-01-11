import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { FiltersContext } from "../globalState";
import useDelayOutput from "../hooks/useDelayOutput";

import { Button } from "./globalStyles";

const PROGRAMS_QUERY = gql`
  query programsQuery {
    projects {
      program
    }
  }
`;

const ProgramFilters = () => {
  const { loading, error, data } = useQuery(PROGRAMS_QUERY);
  const [{ programFilter }, dispatch] = useContext(FiltersContext);

  const loadingLabel = useDelayOutput("Gathering Programs...", 1000);

  if (loading) return <small>{loadingLabel}</small>;
  if (error) return <small>{error.message}</small>;
  if (!data || !data.projects || data.projects.length === 0)
    return <small>--</small>;

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
    <div>
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
              : dispatch({ type: "CLEAR_PROGRAMFILTER" });
          }}
        >
          {program}
        </Button>
      ))}
    </div>
  );
};

export default ProgramFilters;

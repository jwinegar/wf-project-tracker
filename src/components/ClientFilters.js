import React, { useContext } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { FiltersContext } from "../globalState";
import useDelayOutput from "../hooks/useDelayOutput";

import { Button } from "./globalStyles";

const CLIENT_QUERY = gql`
  query clientsQuery {
    projects {
      client
    }
  }
`;

const ClientFilters = () => {
  const { loading, error, data } = useQuery(CLIENT_QUERY);
  const [{ clientFilter }, dispatch] = useContext(FiltersContext);

  const loadingLabel = useDelayOutput("Gathering Clients...", 1000);

  if (loading) return <small>{loadingLabel}</small>;
  if (error) return <small>{error.message}</small>;
  if (!data || !data.projects || data.projects.length === 0)
    return <small>--</small>;

  const clients = data.projects
    .filter(project => project.client)
    .map(project =>
      project.client === "Innocean (GMA)"
        ? "GMA"
        : project.client === "Innocean (HMA)"
        ? "HMA"
        : project.client
    )
    .reduce((acc, cur) => {
      if (acc.indexOf(cur) === -1) {
        acc.push(cur);
      }
      return acc;
    }, [])
    .sort();

  return (
    <div>
      {clients.map((client, index) => (
        <Button
          type="button"
          key={index}
          name="client"
          value={client}
          className={clientFilter === client && "active"}
          onClick={() => {
            clientFilter !== client
              ? dispatch({
                  type: "UPDATE_CLIENTFILTER",
                  payload: client
                })
              : dispatch({ type: "CLEAR_CLIENTFILTER" });
          }}
        >
          {client}
        </Button>
      ))}
    </div>
  );
};

export default ClientFilters;

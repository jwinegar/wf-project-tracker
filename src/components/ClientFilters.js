import React, { useContext } from "react";
import { FiltersContext } from "../globalState";

import { Button } from "./globalStyles";

const clientArr = ["HMA", "GMA"];

const ClientFilters = () => {
  const { filterClient, setFilterClient } = useContext(FiltersContext);

  return (
    <span>
      {clientArr.map((client, index) => (
        <Button
          type="button"
          key={index}
          name="client"
          value={client}
          className={filterClient === client && "active"}
          onClick={e => {
            filterClient !== client
              ? setFilterClient(e.currentTarget.value)
              : setFilterClient("");
          }}
        >
          {client}
        </Button>
      ))}
    </span>
  );
};

export default ClientFilters;

import React, { useContext } from "react";
import { FiltersContext } from "../globalState";

import { Button } from "./globalStyledComponents";

const clientArr = ["HMA", "GMA"];

const ClientFilters = () => {
  const { setFilterClient } = useContext(FiltersContext);

  return (
    <span>
      {clientArr.map((client, index) => (
        <Button
          type="button"
          key={index}
          name="client"
          value={client}
          onClick={e => {
            setFilterClient(e.currentTarget.value);
          }}
        >
          {client}
        </Button>
      ))}
    </span>
  );
};

export default ClientFilters;
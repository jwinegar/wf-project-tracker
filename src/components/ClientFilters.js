import React, { useContext } from "react";
import { FiltersContext } from "../globalState";

import { Button } from "./globalStyles";

const clientArr = ["HMA", "GMA"];

const ClientFilters = () => {
  const [{ clientFilter }, dispatch] = useContext(FiltersContext);

  return (
    <div>
      {clientArr.map((client, index) => (
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

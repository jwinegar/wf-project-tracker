import React from "react";
import { ListingContainer } from "./globalStyles";

import { setExpiring } from "./utils";
import Tasks from "./Tasks";

const Project = ({ project }) => {
  const { name, program, expireDate } = project;

  return (
    <ListingContainer>
      <header>
        <p>Program: {program}</p>
        <h2>
          {name}
          <br />
          <small style={{ fontSize: "65%" }}>
            (Expires {setExpiring(expireDate)})
          </small>
        </h2>
      </header>
      <Tasks project={project} />
    </ListingContainer>
  );
};

export default Project;

import React from "react";
import styled from "styled-components/macro";

import { setExpiring } from "./utils";
import Tasks from "./Tasks";

const Container = styled.article`
  width: 100%;
  padding: 1.5em 2em 2em;
  background-color: white;
  border-radius: 5px;
`;

const Project = ({ project }) => {
  const { name, program, expireDate } = project;

  return (
    <Container>
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
    </Container>
  );
};

export default Project;

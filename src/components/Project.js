import React from "react";
import styled from "styled-components/macro";

import { parseISODateString } from "./utils";
import Tasks from "./Tasks";

const Container = styled.article`
  width: 100%;
  padding: 1.5em 2em 2em;
  background-color: white;
  border-radius: 5px;
`;

const Project = ({ project }) => {
  const { name, program, expireDate } = project;
  const setExpiring = expireDate => {
    const dayDiff =
      parseISODateString(expireDate).getTime() - new Date().getTime();
    const daysLeft = Math.floor(dayDiff / 8.64e7);
    let relDays;

    switch (true) {
      case daysLeft === 0:
        relDays = "Today";
        break;
      case daysLeft === 1:
        relDays = "Tomorrow";
        break;
      default:
        relDays = `in ${daysLeft} Days`;
    }

    return relDays;
  };

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

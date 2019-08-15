import React from "react";
import styled from "styled-components/macro";

import parseISODateString from "./parseISODateString";
import Tasks from "./Tasks";

const Container = styled.article`
  width: 100%;
  padding: 1.5em 2em 2em;
  background-color: white;
  border-radius: 5px;

  & + & {
    margin-top: 2em;
  }
`;

const Project = ({ project: { id, name, program, expireDate } }) => {
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
          <small>(Expires {setExpiring(expireDate)})</small>
        </h2>
      </header>
      <Tasks projectID={id} />
    </Container>
  );
};

export default Project;

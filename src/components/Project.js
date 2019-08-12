import React from "react";
import styled from "styled-components/macro";

import parseISODateString from "./parseISODateString";

const Container = styled.article`
  width: 100%;
  padding: 1.5em 2em 2em;
  background-color: white;
  border-radius: 5px;

  & + & {
    margin-top: 2em;
  }
`;
const DataTable = styled.table`
  width: 100%;
  table-layout: fixed;
  margin-top: 0.8125em;
`;
const DataTableHeading = styled.th`
  vertical-align: bottom;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-size: 80%;
  line-height: 1;
  padding: 2px 10px 5px;
  border-bottom: solid 1px;
`;
const DataTableRow = styled.tr`
  td {
    background-color: rgba(0, 0, 0, 0);
    transition: backgound-color 0.5s;
  }

  &.hrs-over td {
    color: red;
  }
  &.hrs-met td {
    color: rgba(0, 0, 0, 0.2);
  }

  &:hover,
  &:focus {
    td {
      background-color: rgba(0, 0, 0, 0.05);
    }
    &.hrs-over td {
      background-color: rgba(255, 0, 0, 0.1);
    }
  }
`;
const DataTableCell = styled.td`
  position: relative;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  padding: 5px 10px;
  
  ${DataTableRow} + ${DataTableRow} > & {
    border-top: solid 1px rgba(0, 0, 0, 0.1);
  }
`;

const Project = ({ project: { name, program, expireDate, tasks, hours } }) => {
  const tasksHours = [
    ...tasks
      .concat(hours)
      .reduce(
        (m, o) => m.set(o.roleID, Object.assign(m.get(o.roleID) || {}, o)),
        new Map()
      )
      .values()
  ];

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
  const setHrsLabel = hours => (hours === 1 || hours === -1 ? "hr" : "hrs");
  const checkHoursLogged = hours => (hours ? hours : 0);

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
      {tasksHours.length > 0 ? (
        <DataTable width="100%" border="0" cellPadding="5" cellSpacing="0">
          <tbody>
            <tr>
              <DataTableHeading width="40%">Role:</DataTableHeading>
              <DataTableHeading>Scoped Hours:</DataTableHeading>
              <DataTableHeading>Logged Hours:</DataTableHeading>
              <DataTableHeading>Remaining Hours:</DataTableHeading>
              <DataTableHeading width="10%">Completed:</DataTableHeading>
            </tr>
            {tasksHours
              .sort((a, b) => (a.role > b.role ? 1 : -1))
              .map(task => (
                <DataTableRow key={task.id ? task.id : task.roleID}>
                  <DataTableCell>{task.role}</DataTableCell>
                  <DataTableCell>
                    {task.hoursScoped
                      ? task.hoursScoped + setHrsLabel(task.hoursScoped)
                      : "Not Scoped"}
                  </DataTableCell>
                  <DataTableCell>
                    {checkHoursLogged(task.hoursLogged) +
                      setHrsLabel(checkHoursLogged(task.hoursLogged))}
                  </DataTableCell>
                  <DataTableCell>
                    {task.hoursScoped
                      ? task.hoursScoped -
                        checkHoursLogged(task.hoursLogged) +
                        setHrsLabel(
                          task.hoursScoped - checkHoursLogged(task.hoursLogged)
                        )
                      : "-"}
                  </DataTableCell>
                  <DataTableCell>
                    {task.hoursScoped
                      ? `${Math.round(
                          (checkHoursLogged(task.hoursLogged) /
                            task.hoursScoped) *
                            100 *
                            10
                        ) / 10}%`
                      : "-"}
                  </DataTableCell>
                </DataTableRow>
              ))}
          </tbody>
        </DataTable>
      ) : (
        <div style={{ lineHeight: "0.85", marginTop: "0.8125em" }}>
          No tasks assigned
        </div>
      )}
    </Container>
  );
};

export default Project;

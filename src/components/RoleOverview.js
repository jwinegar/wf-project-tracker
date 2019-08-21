import React from "react";
import styled from "styled-components/macro";

import { checkHoursLogged, setHrsLabel } from "./utils";

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

  &.alert-error {
    color: red;
  }
  &.alert-accomplished td {
    color: rgba(0, 0, 0, 0.2);
  }

  &:hover,
  &:focus {
    td {
      background-color: rgba(0, 0, 0, 0.05);
    }
    &.alert-error td {
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

const RoleOverview = ({ role, projects }) => {
  // console.log(projects);

  const roleHours = (role, data) => {
    const { tasks, hours } = data;
    const task = tasks.filter(task => task.role.includes(role));

    const roleObj = [
      ...task
        .concat(hours)
        .reduce(
          (m, o) => m.set(o.roleID, Object.assign(m.get(o.roleID) || {}, o)),
          new Map()
        )
        .values()
    ][0];

    return !Array.isArray(data) && roleObj;
  };

  return (
    <Container>
      <header>
        <h2>
          {role}
          <br />
          <small style={{ fontSize: "65%" }}>
            Total Scoped Hours: Total Logged Hours:
          </small>
        </h2>
      </header>
      <DataTable width="100%" border="0" cellPadding="5" cellSpacing="0">
        <tbody>
          <tr>
            <DataTableHeading width="40%">Project:</DataTableHeading>
            <DataTableHeading>Scoped Hours:</DataTableHeading>
            <DataTableHeading>Logged Hours:</DataTableHeading>
            <DataTableHeading>Remaining Hours:</DataTableHeading>
            <DataTableHeading width="10%">Completed:</DataTableHeading>
          </tr>
          {projects
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map(project => (
              <DataTableRow key={project.id}>
                <DataTableCell>{project.name}</DataTableCell>
                <DataTableCell>
                  {roleHours(role, project).hoursScoped
                    ? roleHours(role, project).hoursScoped +
                      setHrsLabel(roleHours(role, project).hoursScoped)
                    : "Not Scoped"}
                </DataTableCell>
                <DataTableCell>
                  {checkHoursLogged(roleHours(role, project).hoursLogged) +
                    setHrsLabel(
                      checkHoursLogged(roleHours(role, project).hoursLogged)
                    )}
                </DataTableCell>
                <DataTableCell>
                  {roleHours(role, project).hoursScoped
                    ? roleHours(role, project).hoursScoped -
                      checkHoursLogged(roleHours(role, project).hoursLogged) +
                      setHrsLabel(
                        roleHours(role, project).hoursScoped -
                          checkHoursLogged(roleHours(role, project).hoursLogged)
                      )
                    : "-"}
                </DataTableCell>
                <DataTableCell>
                  {roleHours(role, project).hoursScoped
                    ? `${Math.round(
                        (checkHoursLogged(
                          roleHours(role, project).hoursLogged
                        ) /
                          roleHours(role, project).hoursScoped) *
                          100 *
                          10
                      ) / 10}%`
                    : "-"}
                </DataTableCell>
              </DataTableRow>
            ))}
        </tbody>
      </DataTable>
    </Container>
  );
};

export default RoleOverview;

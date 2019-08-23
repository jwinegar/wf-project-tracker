import React from "react";
import styled from "styled-components/macro";

import { checkHoursLogged, setHrsLabel, percentComplete } from "./utils";

const Container = styled.article`
  width: 100%;
  padding: 1.5em 2em 2em;
  background-color: white;
  border-radius: 5px;

  & + & {
    margin-top: 2em;
  }
`;
const Message = styled.div`
  line-height: 0.85;
  margin-top: 0.8125em;
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

const getRoleHours = (role, data) => {
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

  return roleObj;
};

const getRoleHoursTotal = (role, dataArr, hrsType) => {
  const seen = new Map();

  const accHours = dataArr
    .map(project => getRoleHours(role, project))
    .filter(hour => {
      let prev;

      if (seen.hasOwnProperty(hour.roleID)) {
        prev = seen[hour.roleID];
        prev.hoursLogged.push(hour.hoursLogged);
        prev.hoursScoped.push(hour.hoursScoped);

        return false;
      }

      if (!Array.isArray(hour.hoursLogged)) {
        hour.hoursLogged = [hour.hoursLogged];
      }
      if (!Array.isArray(hour.hoursScoped)) {
        hour.hoursScoped = [hour.hoursScoped];
      }

      seen[hour.roleID] = hour;

      return true;
    });

  const totalHours =
    accHours.length > 0 &&
    accHours[0][hrsType].filter(hrs => hrs).length > 0 &&
    accHours[0][hrsType]
      .filter(hrs => hrs)
      .reduce((acc, cur) => {
        const total = parseInt(acc) + parseInt(cur);
        return total.toString();
      });

  return totalHours || "0";
};

const RoleOverview = ({ role, projects }) => {
  return (
    <Container>
      <header>
        <h2>
          {role}
          <br />
          <small style={{ fontSize: "65%" }}>
            <span style={{ display: "inline-block" }}>
              Total Scoped: {getRoleHoursTotal(role, projects, "hoursScoped")}
              hrs
            </span>{" "}
            <span style={{ display: "inline-block" }}>
              Total Logged: {getRoleHoursTotal(role, projects, "hoursLogged")}
              hrs
            </span>{" "}
            <span style={{ display: "inline-block" }}>
              Total Utilization:{" "}
              {getRoleHoursTotal(role, projects, "hoursScoped") !== "0"
                ? percentComplete(
                    getRoleHoursTotal(role, projects, "hoursLogged"),
                    getRoleHoursTotal(role, projects, "hoursScoped")
                  )
                : "--"}
            </span>
          </small>
        </h2>
      </header>
      {projects.length === 0 ? (
        <Message>No projects assigned</Message>
      ) : (
        <DataTable width="100%" border="0" cellPadding="5" cellSpacing="0">
          <tbody>
            <tr>
              <DataTableHeading width="40%">Project:</DataTableHeading>
              <DataTableHeading>Scoped:</DataTableHeading>
              <DataTableHeading>Logged:</DataTableHeading>
              <DataTableHeading>Remaining:</DataTableHeading>
              <DataTableHeading width="12%">Utilization:</DataTableHeading>
            </tr>
            {projects
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map(project => (
                <DataTableRow key={project.id}>
                  <DataTableCell>{project.name}</DataTableCell>
                  <DataTableCell>
                    {getRoleHours(role, project).hoursScoped
                      ? getRoleHours(role, project).hoursScoped +
                        setHrsLabel(getRoleHours(role, project).hoursScoped)
                      : "Not Scoped"}
                  </DataTableCell>
                  <DataTableCell>
                    {checkHoursLogged(getRoleHours(role, project).hoursLogged) +
                      setHrsLabel(
                        checkHoursLogged(
                          getRoleHours(role, project).hoursLogged
                        )
                      )}
                  </DataTableCell>
                  <DataTableCell>
                    {getRoleHours(role, project).hoursScoped
                      ? getRoleHours(role, project).hoursScoped -
                        checkHoursLogged(
                          getRoleHours(role, project).hoursLogged
                        ) +
                        setHrsLabel(
                          getRoleHours(role, project).hoursScoped -
                            checkHoursLogged(
                              getRoleHours(role, project).hoursLogged
                            )
                        )
                      : "--"}
                  </DataTableCell>
                  <DataTableCell>
                    {getRoleHours(role, project).hoursScoped
                      ? percentComplete(
                          checkHoursLogged(
                            getRoleHours(role, project).hoursLogged
                          ),
                          getRoleHours(role, project).hoursScoped
                        )
                      : "--"}
                  </DataTableCell>
                </DataTableRow>
              ))}
          </tbody>
        </DataTable>
      )}
    </Container>
  );
};

export default RoleOverview;

import React, { useContext } from "react";
import styled from "styled-components/macro";
import { FiltersContext } from "../globalState";

import { setHours, setHrsLabel, setDaysLeft, percentComplete } from "./utils";
import {
  DataTable,
  DataTableHeading,
  DataTableRow,
  DataTableCell
} from "./globalStyles";

const Container = styled.article`
  width: 100%;
  padding: 1.5em 2em 2em;
  background-color: white;
  border-radius: 5px;

  & + & {
    margin-top: 2em;
  }
`;
const CalloutContainer = styled.div``;
const CalloutItem = styled.div`
  display: inline-block;

  &:not(:last-child) {
    margin-right: 20px;
  }
`;
const Message = styled.div`
  line-height: 0.85;
  margin-top: 0.8125em;
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

const RoleOverview = ({ projects }) => {
  const [{ roleFilter: role }] = useContext(FiltersContext);

  return (
    <Container>
      <header>
        <h2>
          {role}
          <br />
          <CalloutContainer>
            <CalloutItem>
              <CalloutItem>
                <small style={{ fontSize: "65%" }}>
                  Total Scoped Hours:{" "}
                  {getRoleHoursTotal(role, projects, "hoursScoped") !== "0"
                    ? getRoleHoursTotal(role, projects, "hoursScoped") +
                      setHrsLabel(
                        getRoleHoursTotal(role, projects, "hoursScoped")
                      )
                    : "--"}
                </small>
              </CalloutItem>
              <CalloutItem>
                <small style={{ fontSize: "65%" }}>
                  Total Logged Hours:{" "}
                  {getRoleHoursTotal(role, projects, "hoursScoped") !== "0" &&
                  getRoleHoursTotal(role, projects, "hoursLogged")
                    ? getRoleHoursTotal(role, projects, "hoursLogged") +
                      setHrsLabel(
                        getRoleHoursTotal(role, projects, "hoursLogged")
                      )
                    : "--"}
                </small>
              </CalloutItem>
            </CalloutItem>
            <CalloutItem>
              <small style={{ fontSize: "65%" }}>
                Total % Complete:{" "}
                {getRoleHoursTotal(role, projects, "hoursScoped") !== "0"
                  ? percentComplete(
                      getRoleHoursTotal(role, projects, "hoursLogged"),
                      getRoleHoursTotal(role, projects, "hoursScoped")
                    )
                  : "--"}
              </small>
            </CalloutItem>
          </CalloutContainer>
        </h2>
      </header>
      {projects.length === 0 ? (
        <Message>No projects assigned</Message>
      ) : (
        <DataTable width="100%" border="0" cellPadding="5" cellSpacing="0">
          <tbody>
            <tr>
              <DataTableHeading width="45%">Project Name:</DataTableHeading>
              <DataTableHeading>Days Remaining:</DataTableHeading>
              <DataTableHeading>Scoped Hours:</DataTableHeading>
              <DataTableHeading>Logged Hours:</DataTableHeading>
              <DataTableHeading>Remaining Hours:</DataTableHeading>
              <DataTableHeading width="12%">% Complete:</DataTableHeading>
            </tr>
            {projects
              .sort((a, b) => (a.name > b.name ? -1 : 1))
              .sort((a, b) => (a.expireDate > b.expireDate ? 1 : -1))
              .map(project => (
                <DataTableRow key={project.id}>
                  <DataTableCell>{project.name}</DataTableCell>
                  <DataTableCell>
                    {setDaysLeft(project.expireDate)}
                  </DataTableCell>
                  <DataTableCell>
                    {getRoleHours(role, project).hoursScoped
                      ? getRoleHours(role, project).hoursScoped +
                        setHrsLabel(getRoleHours(role, project).hoursScoped)
                      : "Not Scoped"}
                  </DataTableCell>
                  <DataTableCell>
                    {setHours(getRoleHours(role, project).hoursLogged) +
                      setHrsLabel(
                        setHours(getRoleHours(role, project).hoursLogged)
                      )}
                  </DataTableCell>
                  <DataTableCell>
                    {getRoleHours(role, project).hoursScoped
                      ? getRoleHours(role, project).hoursScoped -
                        setHours(getRoleHours(role, project).hoursLogged) +
                        setHrsLabel(
                          getRoleHours(role, project).hoursScoped -
                            setHours(getRoleHours(role, project).hoursLogged)
                        )
                      : "--"}
                  </DataTableCell>
                  <DataTableCell>
                    {getRoleHours(role, project).hoursScoped
                      ? percentComplete(
                          setHours(getRoleHours(role, project).hoursLogged),
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

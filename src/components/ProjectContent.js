import React, { useContext } from "react";
import styled from "styled-components/macro";
import { RolesContext } from "../contexts/rolesContext";

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

const ProjectContent = ({ project }) => {
  const {
    name,
    plannedCompletionDate,
    tasks,
    "DE:Wun LA Program for Innocean HMA": hmaProgram,
    "DE:Wun LA Program for Innocean GMA": gmaProgram
  } = project;

  const NON_ROLES = ["ALL HOURS - TIMESHEET TASK"];

  const assignedTasks = tasks.filter(
    task => task.roleID && !NON_ROLES.includes(task.name)
  );

  const [roles, setLoadingRoles] = useContext(RolesContext);

  const loggedHoursByRoleIDTotals = tasks
    .map(task => task.hours)
    .flat()
    .reduce((hours, task) => {
      hours[task.roleID] = task.hours + (hours[task.roleID] || 0);
      return hours;
    }, {});
  const hourTotalsByRoleID = Object.keys(loggedHoursByRoleIDTotals).map(
    hours => {
      return { ID: hours, hours: loggedHoursByRoleIDTotals[hours] };
    }
  );

  console.log(hourTotalsByRoleID);

  const rolesWithHours = [
    ...roles
      .concat(hourTotalsByRoleID)
      .reduce(
        (map, task) =>
          map.set(task.ID, Object.assign(map.get(task.ID) || {}, task)),
        new Map()
      )
      .values()
  ].filter(role => role.hours);

  const assignedTasksWithHours = [
    ...assignedTasks
      .concat(rolesWithHours)
      .reduce(
        (map, task) =>
          map.set(task.roleID, Object.assign(map.get(task.ID) || {}, task)),
        new Map()
      )
      .values()
  ].reduce((acc, cur) => {
    if (acc.indexOf(cur) === -1) {
      acc.push(cur);
    }
    return acc;
  }, []);

  const setExpire = expireDate => {
    const endDate = new Date(expireDate.slice(0, 19));
    const dayDiff = endDate.getTime() - new Date().getTime();
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

  const setHours = hours => (!Array.isArray(hours) ? hours : 0);
  const setHrsLabel = hours => (hours === 1 || hours === -1 ? "hr" : "hrs");

  const setHrsTrackedFlag = task => {
    const scopedHrs = task.workRequired / 60;
    const usedHrs = task.hours;

    return scopedHrs - usedHrs === 0
      ? "hrs-met"
      : scopedHrs - usedHrs < 0
      ? "hrs-over"
      : "";
  };

  return (
    <React.Fragment>
      <header>
        {(hmaProgram || gmaProgram) && (
          <p>
            Program: {(hmaProgram && hmaProgram) || (gmaProgram && gmaProgram)}
          </p>
        )}
        <h2>
          {name}
          <br />
          <small>(Expires {setExpire(plannedCompletionDate)})</small>
        </h2>
      </header>
      {setLoadingRoles ? (
        <div>Collecting Hours...</div>
      ) : assignedTasksWithHours.length > 0 ? (
        <DataTable width="100%" border="0" cellPadding="5" cellSpacing="0">
          <tbody>
            <tr>
              <DataTableHeading width="40%">Role:</DataTableHeading>
              <DataTableHeading>Scoped:</DataTableHeading>
              <DataTableHeading>Logged:</DataTableHeading>
              <DataTableHeading>Remaining:</DataTableHeading>
              <DataTableHeading width="10%">Complete:</DataTableHeading>
            </tr>
            {assignedTasksWithHours
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map(task => (
                <DataTableRow
                  key={task.ID ? task.ID : task.roleID}
                  className={setHrsTrackedFlag(task)}
                >
                  <DataTableCell className="task-role">
                    {task.name ? task.name : task.roleID}
                  </DataTableCell>
                  <DataTableCell className="task-scoped-hrs">
                    {task.workRequired
                      ? task.workRequired / 60 +
                        setHrsLabel(task.workRequired / 60)
                      : "Not Scoped"}
                  </DataTableCell>
                  <DataTableCell className="task-used-hrs">
                    {setHours(task.hours)}
                    {setHrsLabel(setHours(task.hours))}
                  </DataTableCell>
                  <DataTableCell className="task-remaining-hrs">
                    {task.workRequired
                      ? task.workRequired / 60 -
                        setHours(task.hours) +
                        setHrsLabel(
                          task.workRequired / 60 - setHours(task.hours)
                        )
                      : "-"}
                  </DataTableCell>
                  <DataTableCell className="task-percent-complete">
                    {task.workRequired
                      ? `${Math.round(
                          (setHours(task.hours) / (task.workRequired / 60)) *
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
        "No roles available"
      )}
    </React.Fragment>
  );
};

export default ProjectContent;

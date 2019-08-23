import React from "react";
import styled from "styled-components/macro";

import { checkHoursLogged, setHrsLabel, percentComplete } from "./utils";

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

const Tasks = ({ project }) => {
  const tasksHours = data => {
    const { tasks, hours } = data;

    return [
      ...tasks
        .concat(hours)
        .reduce(
          (m, o) => m.set(o.roleID, Object.assign(m.get(o.roleID) || {}, o)),
          new Map()
        )
        .values()
    ];
  };

  const setHoursFlag = task => {
    const { hoursScoped, hoursLogged } = task;

    return !hoursScoped || hoursScoped - hoursLogged < 0
      ? "alert-error"
      : hoursScoped - hoursLogged === 0 && "alert-accomplished";
  };

  if (tasksHours(project).length === 0)
    return <Message>No tasks assigned</Message>;

  return (
    <DataTable width="100%" border="0" cellPadding="5" cellSpacing="0">
      <tbody>
        <tr>
          <DataTableHeading width="40%">Role:</DataTableHeading>
          <DataTableHeading>Scoped:</DataTableHeading>
          <DataTableHeading>Logged:</DataTableHeading>
          <DataTableHeading>Remaining:</DataTableHeading>
          <DataTableHeading width="10%">Utilized:</DataTableHeading>
        </tr>
        {tasksHours(project)
          .sort((a, b) => (a.role > b.role ? 1 : -1))
          .map(task => (
            <DataTableRow
              key={task.id ? task.id : task.roleID}
              className={setHoursFlag(task)}
            >
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
                  : "--"}
              </DataTableCell>
              <DataTableCell>
                {task.hoursScoped
                  ? percentComplete(
                      checkHoursLogged(task.hoursLogged),
                      task.hoursScoped
                    )
                  : "--"}
              </DataTableCell>
            </DataTableRow>
          ))}
      </tbody>
    </DataTable>
  );
};

export default Tasks;

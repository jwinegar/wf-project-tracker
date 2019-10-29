import React from "react";
import styled from "styled-components/macro";

import { setHours, setHrsLabel, percentComplete } from "./utils";
import {
  DataTable,
  DataTableHeading,
  DataTableRow,
  DataTableCell
} from "./globalStyles";

const Message = styled.div`
  line-height: 0.85;
  margin-top: 0.8125em;
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
          <DataTableHeading width="45%">Role:</DataTableHeading>
          <DataTableHeading>Scoped Hours:</DataTableHeading>
          <DataTableHeading>Logged Hours:</DataTableHeading>
          <DataTableHeading>Remaining Hours:</DataTableHeading>
          <DataTableHeading width="10%">% Complete:</DataTableHeading>
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
                {setHours(task.hoursLogged) +
                  setHrsLabel(setHours(task.hoursLogged))}
              </DataTableCell>
              <DataTableCell>
                {task.hoursScoped
                  ? task.hoursScoped -
                    setHours(task.hoursLogged) +
                    setHrsLabel(task.hoursScoped - setHours(task.hoursLogged))
                  : "--"}
              </DataTableCell>
              <DataTableCell>
                {task.hoursScoped
                  ? percentComplete(
                      setHours(task.hoursLogged),
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

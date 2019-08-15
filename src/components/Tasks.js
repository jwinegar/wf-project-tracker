import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components/macro";

const TASKS_QUERY = gql`
  query tasksQuery($projectID: String!) {
    project(id: $projectID) {
      tasks {
        id
        roleID
        role
        hoursScoped
      }
      hours {
        roleID
        role
        hoursLogged
      }
    }
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

const Tasks = ({ projectID }) => {
  const { data, loading, error } = useQuery(TASKS_QUERY, {
    variables: { projectID }
  });

  const tasksHours = data => {
    const {
      project: { tasks, hours }
    } = data;

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

  const setHrsLabel = hours => (hours === 1 || hours === -1 ? "hr" : "hrs");
  const checkHoursLogged = hours => (hours ? hours : 0);

  if (loading) return <Message>Loading Tasks...</Message>;
  if (error) return <Message>{error.message}</Message>;
  if (!data || !data.project || tasksHours(data).length === 0)
    return <Message>No tasks assigned</Message>;

  return (
    <DataTable width="100%" border="0" cellPadding="5" cellSpacing="0">
      <tbody>
        <tr>
          <DataTableHeading width="40%">Role:</DataTableHeading>
          <DataTableHeading>Scoped Hours:</DataTableHeading>
          <DataTableHeading>Logged Hours:</DataTableHeading>
          <DataTableHeading>Remaining Hours:</DataTableHeading>
          <DataTableHeading width="10%">Completed:</DataTableHeading>
        </tr>
        {tasksHours(data)
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
                      (checkHoursLogged(task.hoursLogged) / task.hoursScoped) *
                        100 *
                        10
                    ) / 10}%`
                  : "-"}
              </DataTableCell>
            </DataTableRow>
          ))}
      </tbody>
    </DataTable>
  );
};

export default Tasks;

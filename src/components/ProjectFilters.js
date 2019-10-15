import React, { useEffect, useContext } from "react";
import styled from "styled-components/macro";
import {
  ClientContext,
  ProgramContext,
  ProjectNameContext,
  RoleContext
} from "../globalState";

// TODO: Create Styled Theme
const color = {
  primary: "#007BC5"
};

const MainHeader = styled.header`
  width: 100%;
  padding: 1.5em 4.2667% 1.25em;
  background-color: rgba(0, 0, 0, 0.075);
  border-bottom: solid 1px rgba(0, 0, 0, 0.075);
`;
const Container = styled.div`
  width: 100%;
  padding: 1em 4.2667%;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  padding: 0.5em 1em 0.55em;
  background-color: transparent;
`;
const Button = styled.button`
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 0.5em 0.65em 0.65em;
  background-color: rgba(255, 255, 255, 0.35);
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;

  &.active {
    color: ${color.primary};
    border-color: ${color.primary};
    background-color: rgba(255, 255, 255, 0.75);
  }

  & + & {
    margin-left: 0.5em;
  }
`;
const SearchField = styled.span`
  display: inline-block;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 425px;
  line-height: 0;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 8px;
  margin-bottom: 0.25em;
  padding-right: 1.35em;
`;
const ClearInput = styled.span`
  display: block;
  position: absolute;
  top: calc(50% + 0.5px);
  transform: translateY(-50%);
  right: 0.35em;
  width: 0.9em;
  height: 0.9em;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 1px;
    background-color: white;
    border: solid 0.5px white;
    border-radius: 999px;
  }
  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const updateActiveFilter = (inputName, filterType) => {
  const inputs = document.getElementsByName(inputName);
  let activeFilter;

  if (!filterType) {
    inputs.forEach(input => {
      input.classList.remove("active");
      input.disabled = false;
    });
    return;
  }
  activeFilter = [...inputs].find(input => input.value === filterType);

  inputs.forEach(input => {
    input.classList.remove("active");
    input.disabled = false;
  });
  activeFilter.classList.add("active");
  activeFilter.disabled = true;
};

const activeFiltersArr = (...filters) => {
  const activeArr = [];

  filters.forEach(filter => {
    if (!!filter) {
      filter && activeArr.push(filter);
    }
  });

  return activeArr;
};

const ProjectFilters = ({ projects, filteredProjectsCount }) => {
  const [filterClient, setFilterClient] = useContext(ClientContext);
  const [filterProgram, setFilterProgram] = useContext(ProgramContext);
  const [filterProjectName, setFilterProjectName] = useContext(
    ProjectNameContext
  );
  const [filterRole, setFilterRole] = useContext(RoleContext);

  const programs = projects
    .filter(project => project.program)
    .map(project => project.program)
    .reduce((acc, cur) => {
      if (acc.indexOf(cur) === -1) {
        acc.push(cur);
      }
      return acc;
    }, [])
    .sort();

  const tasks = projects
    .map(project => project.tasks.map(task => task.role))
    .flat();
  const hours = projects
    .map(project => project.hours.map(hour => hour.role))
    .flat();

  const roles = [...tasks, ...hours]
    .filter((role, index) => [...tasks, ...hours].indexOf(role) === index)
    .sort();

  const resetFilters = () => {
    !!filterProjectName && setFilterProjectName("");
    !!filterClient && setFilterClient("");
    !!filterProgram && setFilterProgram("");
    !!filterRole && setFilterRole("");
  };

  useEffect(() => {
    updateActiveFilter("client", filterClient);
  }, [filterClient]);

  useEffect(() => {
    updateActiveFilter("program", filterProgram);
  }, [filterProgram]);

  useEffect(() => {
    updateActiveFilter("role", filterRole);
  }, [filterRole]);

  return (
    <>
      <MainHeader>
        <SearchField>
          <Input
            type="text"
            placeholder="Search Projects"
            value={filterProjectName}
            onKeyDown={e => e.keyCode === 27 && setFilterProjectName("")}
            onChange={e => setFilterProjectName(e.currentTarget.value)}
          />
          {filterProjectName && (
            <ClearInput onClick={e => setFilterProjectName("")} />
          )}
        </SearchField>
        <div>
          <span>
            <small>Client:</small>
          </span>{" "}
          <span>
            <Button
              type="button"
              name="client"
              value="HMA"
              onClick={e => {
                setFilterClient(e.currentTarget.value);
              }}
            >
              HMA
            </Button>
            <Button
              type="button"
              name="client"
              value="GMA"
              onClick={e => {
                setFilterClient(e.currentTarget.value);
              }}
            >
              GMA
            </Button>
          </span>
        </div>
        <div>
          <span>
            <small>Program:</small>
          </span>{" "}
          <span>
            {programs.map((program, index) => (
              <Button
                type="button"
                key={index}
                name="program"
                value={program}
                onClick={e => {
                  setFilterProgram(e.currentTarget.value);
                }}
              >
                {program}
              </Button>
            ))}
          </span>
        </div>
        <div>
          <span>
            <small>Role:</small>
          </span>{" "}
          <span>
            {roles.map((role, index) => (
              <Button
                type="button"
                key={index}
                name="role"
                value={role}
                onClick={e => {
                  setFilterRole(e.currentTarget.value);
                }}
              >
                {role}
              </Button>
            ))}
          </span>
        </div>
        <div style={{ paddingTop: "0.5em" }}>
          <small>
            {filteredProjectsCount} of {projects.length} projects showing
          </small>
        </div>
      </MainHeader>
      <Container>
        <div style={{ height: "1.3496125em", lineHeight: "0.85" }}>
          {!!activeFiltersArr(filterClient, filterProgram, filterRole)
            .length && (
            <>
              <span>
                <small>Filters ({filteredProjectsCount} results):</small>
              </span>{" "}
              {!!filterClient && (
                <Button
                  type="button"
                  name="filter"
                  value=""
                  onClick={e => {
                    setFilterClient(e.currentTarget.value);
                  }}
                >
                  {filterClient} &nbsp;&times;
                </Button>
              )}
              {!!filterProgram && (
                <Button
                  type="button"
                  name="filter"
                  value=""
                  onClick={e => {
                    setFilterProgram(e.currentTarget.value);
                  }}
                >
                  {filterProgram} &nbsp;&times;
                </Button>
              )}
              {!!filterRole && (
                <Button
                  type="button"
                  name="filter"
                  value=""
                  onClick={e => {
                    setFilterRole(e.currentTarget.value);
                  }}
                >
                  {filterRole} &nbsp;&times;
                </Button>
              )}
              <Button
                type="button"
                name="filter"
                value=""
                onClick={e => {
                  resetFilters();
                }}
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                Clear All
              </Button>
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default ProjectFilters;

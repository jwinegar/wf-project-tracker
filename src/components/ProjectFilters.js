import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

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
const Input = styled.input`
  width: 100%;
  border: none;
  padding: 0.5em 1em 0.55em;
  background-color: transparent;
`;
const Button = styled.button`
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 0.25em 0.55em 0.35em;
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

const ProjectFilters = ({
  currentProjects,
  filteredProjectsCount,
  updateClientFilter,
  updateProjectFilter,
  updateProgramFilter
}) => {
  const [projectFilter, setProjectFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [activeClient, setActiveClient] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [activeProgram, setActiveProgram] = useState("");

  const updateActiveFilter = (inputName, activeFilterName) => {
    const filters = document.getElementsByName(inputName);
    const activeFilter = [...filters].find(
      filter => filter.value === activeFilterName
    );

    filters.forEach(filter => {
      filter.classList.remove("active");
      filter.disabled = false;
    });
    activeFilter.classList.add("active");
    activeFilter.disabled = true;
  };

  const programs = currentProjects
    .filter(project => project.program)
    .map(project => project.program)
    .reduce((acc, cur) => {
      if (acc.indexOf(cur) === -1) {
        acc.push(cur);
      }
      return acc;
    }, [])
    .sort();

  // const tasks = currentProjects
  //   .map(project => project.tasks.map(task => task.role))
  //   .flat();
  // const hours = currentProjects
  //   .map(project => project.hours.map(hour => hour.role))
  //   .flat();

  // const roles = [...tasks, ...hours]
  //   .filter((role, index) => [...tasks, ...hours].indexOf(role) === index)
  //   .sort();

  // console.log(roles);

  useEffect(() => {
    updateProjectFilter(projectFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectFilter]);
  useEffect(() => {
    updateActiveFilter("client", activeClient);
    updateClientFilter(clientFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientFilter]);
  useEffect(() => {
    updateActiveFilter("program", activeProgram);
    updateProgramFilter(programFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programFilter]);

  return (
    <MainHeader>
      <SearchField>
        <Input
          type="text"
          placeholder="Search Projects"
          value={projectFilter}
          onKeyDown={e => e.keyCode === 27 && setProjectFilter("")}
          onChange={e => setProjectFilter(e.target.value)}
        />
        {projectFilter && <ClearInput onClick={e => setProjectFilter("")} />}
      </SearchField>
      <div>
        <span>
          <small>Client:</small>
        </span>{" "}
        <span>
          <Button
            name="client"
            value=""
            onClick={e => {
              setClientFilter(e.target.value);
              setActiveClient(e.target.value);
            }}
          >
            All
          </Button>
          <Button
            name="client"
            value="HMA"
            onClick={e => {
              setClientFilter(e.target.value);
              setActiveClient(e.target.value);
            }}
          >
            HMA
          </Button>
          <Button
            name="client"
            value="GMA"
            onClick={e => {
              setClientFilter(e.target.value);
              setActiveClient(e.target.value);
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
          <Button
            name="program"
            value=""
            onClick={e => {
              setProgramFilter(e.target.value);
              setActiveProgram(e.target.value);
            }}
          >
            All
          </Button>
          {programs.map((program, index) => (
            <Button
              key={index}
              name="program"
              value={program}
              onClick={e => {
                setProgramFilter(e.target.value);
                setActiveProgram(e.target.value);
              }}
            >
              {program}
            </Button>
          ))}
        </span>
      </div>
      {/* <div>
        <span>
          <small>Role:</small>
        </span>{" "}
        <span>
          <Button
            name="program"
            value=""
            onClick={e => {
              setProgramFilter(e.target.value);
              setActiveProgram(e.target.value);
            }}
          >
            All
          </Button>
          {roles.map((role, index) => (
            <Button
              key={index}
              name="role"
              value={role}
              onClick={e => {
                setProgramFilter(e.target.value);
                setActiveProgram(e.target.value);
              }}
            >
              {role}
            </Button>
          ))}
        </span>
      </div> */}
      <div>
        <small>
          {filteredProjectsCount} of {currentProjects.length} projects showing
        </small>
      </div>
    </MainHeader>
  );
};

export default ProjectFilters;

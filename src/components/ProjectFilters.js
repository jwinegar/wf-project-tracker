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
  projects,
  updateProjectFilter,
  updateClientFilter,
  updateProgramFilter,
  filteredProjectsCount
}) => {
  const [projectFilter, setProjectFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");

  const updateActiveFilter = (inputName, filterType) => {
    const inputs = document.getElementsByName(inputName);
    const activeFilter = [...inputs].find(input => input.value === filterType);

    inputs.forEach(input => {
      input.classList.remove("active");
      input.disabled = false;
    });
    activeFilter.classList.add("active");
    activeFilter.disabled = true;
  };

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

  // const tasks = projects
  //   .map(project => project.tasks.map(task => task.role))
  //   .flat();
  // const hours = projects
  //   .map(project => project.hours.map(hour => hour.role))
  //   .flat();

  // const roles = [...tasks, ...hours]
  //   .filter((role, index) => [...tasks, ...hours].indexOf(role) === index)
  //   .sort();

  // console.log(roles);

  useEffect(() => {
    updateProjectFilter(projectFilter);
  }, [projectFilter, updateProjectFilter]);

  useEffect(() => {
    updateClientFilter(clientFilter);

    updateActiveFilter("client", clientFilter);
  }, [clientFilter, updateClientFilter]);

  useEffect(() => {
    updateProgramFilter(programFilter);

    updateActiveFilter("program", programFilter);
  }, [programFilter, updateProgramFilter]);

  return (
    <MainHeader>
      <SearchField>
        <Input
          type="text"
          placeholder="Search Projects"
          value={projectFilter}
          onKeyDown={e => e.keyCode === 27 && setProjectFilter("")}
          onChange={e => setProjectFilter(e.currentTarget.value)}
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
              setClientFilter(e.currentTarget.value);
            }}
          >
            All
          </Button>
          <Button
            name="client"
            value="HMA"
            onClick={e => {
              setClientFilter(e.currentTarget.value);
            }}
          >
            HMA
          </Button>
          <Button
            name="client"
            value="GMA"
            onClick={e => {
              setClientFilter(e.currentTarget.value);
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
              setProgramFilter(e.currentTarget.value);
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
                setProgramFilter(e.currentTarget.value);
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
              setProgramFilter(e.currentTarget.value);
              setActiveProgram(e.currentTarget.value);
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
                setProgramFilter(e.currentTarget.value);
                setActiveProgram(e.currentTarget.value);
              }}
            >
              {role}
            </Button>
          ))}
        </span>
      </div> */}
      <div>
        <small>
          {filteredProjectsCount} of {projects.length} projects showing
        </small>
      </div>
    </MainHeader>
  );
};

export default ProjectFilters;

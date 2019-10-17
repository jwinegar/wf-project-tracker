import React, { useEffect, useContext } from "react";
import styled from "styled-components/macro";
import { FiltersContext } from "../globalState";

import ActiveFilters from "./ActiveFilters";
import SearchProjects from "./SearchProjects";
import ClientFilters from "./ClientFilters";
import ProgramFilters from "./ProgramFilters";
import RoleFilters from "./RoleFilters";

const MainHeader = styled.header`
  width: 100%;
  padding: 1.5em 4.2667% 1.25em;
  background-color: rgba(0, 0, 0, 0.075);
  border-bottom: solid 1px rgba(0, 0, 0, 0.075);
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

const ProjectFilters = ({ totalProjectsCount }) => {
  const {
    filterClient,
    filterProgram,
    filterRole,
    filteredProjectCount
  } = useContext(FiltersContext);

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
        <SearchProjects />
        <div>
          <span>
            <small>Client:</small>
          </span>{" "}
          <ClientFilters />
        </div>
        <div>
          <span>
            <small>Program:</small>
          </span>{" "}
          <ProgramFilters />
        </div>
        <div>
          <span>
            <small>Role:</small>
          </span>{" "}
          <RoleFilters />
        </div>
        <div style={{ paddingTop: "0.5em" }}>
          <small>
            {filteredProjectCount} of {totalProjectsCount} projects showing
          </small>
        </div>
      </MainHeader>
      <ActiveFilters />
    </>
  );
};

export default ProjectFilters;

import React from "react";
import styled from "styled-components/macro";

import ActiveFilters from "./ActiveFilters";
import SearchProjects from "./SearchProjects";
import ClientFilters from "./ClientFilters";
import ProgramFilters from "./ProgramFilters";
import RoleFilters from "./RoleFilters";
import FilterCount from "./FilterCount";

const MainHeader = styled.header`
  width: 100%;
  padding: 1.5em 4.2667% 1.25em;
  background-color: rgba(0, 0, 0, 0.075);
  border-bottom: solid 1px rgba(0, 0, 0, 0.075);
`;

const ProjectFilters = () => (
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
        <FilterCount />
      </div>
    </MainHeader>
    <ActiveFilters />
  </>
);

export default ProjectFilters;

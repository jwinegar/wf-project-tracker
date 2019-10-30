import React from "react";
import styled from "styled-components/macro";

import ActiveFilters from "./ActiveFilters";
import SearchProjects from "./SearchProjects";
import ClientFilters from "./ClientFilters";
import ProgramFilters from "./ProgramFilters";
import RoleFilters from "./RoleFilters";
import FilterCount from "./FilterCount";

import { color, boxShadow } from "./globalStyles";
import { ReactComponent as Icon } from "../wf-lion.svg";

const MainHeader = styled.header`
  width: 100%;
  padding: 1.5em 4.2667% 1.25em;
  background-color: white;
  ${boxShadow}
`;
const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px 40px;
`;
const WfLogo = styled.div`
  width: 2rem;
  display: inline-block;
  vertical-align: middle;
  line-height: 0.8;

  a {
    display: block;

    &:hover svg,
    &:focus svg {
      fill: #f7931e;
      transition: fill 0.2s ease;
    }
  }

  svg {
    fill: ${color.dkGray};
  }
`;

const ProjectFilters = () => (
  <>
    <MainHeader>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <SearchProjects />

        <WfLogo style={{ marginRight: "2px", marginLeft: "10px" }}>
          <a
            href="https://wunderman.my.workfront.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="My Workfront"
          >
            <Icon />
          </a>
        </WfLogo>
      </div>
      <FilterGrid style={{ paddingTop: "10px" }}>
        <div>
          <div
            style={{ lineHeight: "1", fontWeight: "bold", marginBottom: "2px" }}
          >
            <small style={{ fontSize: "68.75%", paddingLeft: "0.375em" }}>
              Client:
            </small>
          </div>{" "}
          <ClientFilters />
        </div>
        <div>
          <div
            style={{ lineHeight: "1", fontWeight: "bold", marginBottom: "2px" }}
          >
            <small style={{ fontSize: "68.75%", paddingLeft: "0.375em" }}>
              Program:
            </small>
          </div>{" "}
          <ProgramFilters />
        </div>
        <div style={{ gridArea: "2 / 1 / auto / 3" }}>
          <div
            style={{ lineHeight: "1", fontWeight: "bold", marginBottom: "2px" }}
          >
            <small style={{ fontSize: "68.75%", paddingLeft: "0.375em" }}>
              Role:
            </small>
          </div>{" "}
          <RoleFilters />
        </div>
      </FilterGrid>
      <div style={{ paddingTop: "0.5em" }}>
        <FilterCount />
      </div>
    </MainHeader>
    <ActiveFilters />
  </>
);

export default ProjectFilters;

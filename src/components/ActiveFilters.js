import React, { useContext } from "react";
import { FiltersContext } from "../globalState";
import styled from "styled-components/macro";

import { Button } from "./globalStyles";

export const Container = styled.div`
  width: 100%;
  padding: 1em 4.2667%;
`;

const activeFiltersArr = (...filters) => {
  const activeArr = [];

  filters.forEach(filter => {
    if (!!filter) {
      filter && activeArr.push(filter);
    }
  });

  return activeArr;
};

const ActiveFilters = () => {
  const {
    filterClient,
    setFilterClient,
    filterProgram,
    setFilterProgram,
    filterProjectName,
    setFilterProjectName,
    filterRole,
    setFilterRole,
    filteredProjectCount
  } = useContext(FiltersContext);

  const resetFilters = () => {
    !!filterProjectName && setFilterProjectName("");
    !!filterClient && setFilterClient("");
    !!filterProgram && setFilterProgram("");
    !!filterRole && setFilterRole("");
  };

  return (
    <Container>
      <div style={{ height: "1.3496125em", lineHeight: "0.85" }}>
        {!!activeFiltersArr(filterClient, filterProgram, filterRole).length && (
          <>
            <span>
              <small>Filters ({filteredProjectCount} results):</small>
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
  );
};

export default ActiveFilters;

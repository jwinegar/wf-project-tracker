import React, { useContext } from "react";
import { FiltersContext } from "../globalState";
import styled from "styled-components/macro";

import { Button } from "./globalStyles";

export const Container = styled.div`
  width: 100%;
  padding: 1em 4.2667%;
`;

const activeFiltersArr = (...values) =>
  values.filter(value => value !== null && value !== "" && value);

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

  const resetAllFilters = () => {
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
                onClick={() => {
                  setFilterClient("");
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
                onClick={() => {
                  setFilterProgram("");
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
                onClick={() => {
                  setFilterRole("");
                }}
              >
                {filterRole} &nbsp;&times;
              </Button>
            )}
            <Button
              type="button"
              name="filter"
              value=""
              onClick={() => {
                resetAllFilters();
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

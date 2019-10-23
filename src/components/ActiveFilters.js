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
  const [
    { clientFilter, programFilter, roleFilter, filteredCount },
    dispatch
  ] = useContext(FiltersContext);

  return (
    <Container>
      <div style={{ height: "1.3496125em", lineHeight: "0.85" }}>
        {!!activeFiltersArr(clientFilter, programFilter, roleFilter).length && (
          <>
            <span>
              <small>Filters ({filteredCount} results):</small>
            </span>{" "}
            {!!clientFilter && (
              <Button
                type="button"
                name="filter"
                value=""
                onClick={() => {
                  dispatch({ type: "CLEAR_CLIENTFILTER" });
                }}
              >
                {clientFilter} &nbsp;&times;
              </Button>
            )}
            {!!programFilter && (
              <Button
                type="button"
                name="filter"
                value=""
                onClick={() => {
                  dispatch({ type: "CLEAR_PROGRAMFILTER" });
                }}
              >
                {programFilter} &nbsp;&times;
              </Button>
            )}
            {!!roleFilter && (
              <Button
                type="button"
                name="filter"
                value=""
                onClick={() => {
                  dispatch({ type: "CLEAR_ROLEFILTER" });
                }}
              >
                {roleFilter} &nbsp;&times;
              </Button>
            )}
            <Button
              type="button"
              name="filter"
              value=""
              onClick={() => {
                dispatch({ type: "CLEAR_FILTERS" });
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

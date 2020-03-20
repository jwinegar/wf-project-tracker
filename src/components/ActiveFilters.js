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

  const filtersArr = [
    {
      filter: clientFilter,
      dispatchType: "CLEAR_CLIENTFILTER"
    },
    {
      filter: programFilter,
      dispatchType: "CLEAR_PROGRAMFILTER"
    },
    {
      filter: roleFilter,
      dispatchType: "CLEAR_ROLEFILTER"
    }
  ];

  return (
    <Container>
      <div style={{ height: "1.3496125em", lineHeight: "0.85" }}>
        {!!activeFiltersArr(clientFilter, programFilter, roleFilter).length && (
          <>
            <span>
              <small>Filters ({filteredCount} results):</small>
            </span>{" "}
            {filtersArr.map(
              (filter, index) =>
                !!filter.filter && (
                  <Button
                    key={index}
                    type="button"
                    name="filter"
                    value=""
                    onClick={() => {
                      dispatch({ type: filter.dispatchType });
                    }}
                  >
                    {filter.filter} &nbsp;&times;
                  </Button>
                )
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

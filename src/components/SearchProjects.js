import React, { useContext } from "react";
import styled from "styled-components/macro";
import { FiltersContext } from "../globalState";

const Input = styled.input`
  width: 100%;
  border: none;
  padding: 0.5em 1em 0.55em;
  background-color: transparent;
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

const SearchProjects = () => {
  const [{ searchFilter }, dispatch] = useContext(FiltersContext);

  return (
    <SearchField>
      <Input
        type="text"
        placeholder="Search Projects"
        value={searchFilter}
        aria-label="Search Projects"
        onKeyDown={e =>
          e.keyCode === 27 && dispatch({ type: "CLEAR_SEARCHFILTER" })
        }
        onChange={e =>
          dispatch({
            type: "UPDATE_SEARCHFILTER",
            payload: e.currentTarget.value
          })
        }
      />
      {searchFilter && (
        <ClearInput onClick={() => dispatch({ type: "CLEAR_SEARCHFILTER" })} />
      )}
    </SearchField>
  );
};

export default SearchProjects;

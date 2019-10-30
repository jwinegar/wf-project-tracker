import React, { useContext } from "react";
import styled from "styled-components/macro";
import { FiltersContext } from "../globalState";

import { color } from "./globalStyles";

const Input = styled.input`
  width: 100%;
  border: none;
  padding: 0.5em 1em 0.55em;
  background-color: transparent;
  -moz-appearance: none;
  -webkit-appearance: none;
`;
const SearchField = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  width: 100%;
  max-width: 425px;
  font-size: 0.875rem;
  line-height: 0;
  background-color: ${color.mdGray};
  border-radius: 50px;
  padding-right: 1.35em;
  padding-left: 1.35em;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: calc(50% + 0.625px);
    transform: translateY(-50%);
    left: 0.875em;
    width: 1em;
    height: 1em;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="30.239px" height="30.239px" viewBox="0 0 30.239 30.239" xml:space="preserve"><path fill="currentColor" d="M20.194 3.46c-4.613-4.613-12.121-4.613-16.734 0 -4.612 4.614-4.612 12.121 0 16.735 4.108 4.107 10.506 4.547 15.116 1.34 0.097 0.459 0.319 0.897 0.676 1.254l6.718 6.718c0.979 0.977 2.561 0.977 3.535 0 0.978-0.978 0.978-2.56 0-3.535l-6.718-6.72c-0.355-0.354-0.794-0.577-1.253-0.674C24.743 13.967 24.303 7.57 20.194 3.46zM18.073 18.074c-3.444 3.444-9.049 3.444-12.492 0 -3.442-3.444-3.442-9.048 0-12.492 3.443-3.443 9.048-3.443 12.492 0C21.517 9.026 21.517 14.63 18.073 18.074z"/></svg>');
    background-size: contain;
    background-position: center;
  }
`;
const ClearInput = styled.span`
  display: block;
  position: absolute;
  top: calc(50% + 0.625px);
  transform: translateY(-50%);
  right: 0.75em;
  width: 1em;
  height: 1em;
  background-color: #969bab;
  border-radius: 50%;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: calc(100% - 6px);
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

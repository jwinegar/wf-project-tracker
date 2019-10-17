import styled from "styled-components/macro";

const color = {
  primary: "#007BC5"
};

export const Container = styled.div`
  width: 100%;
  padding: 1em 4.2667%;
`;

export const Button = styled.button`
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 0.5em 0.65em 0.65em;
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

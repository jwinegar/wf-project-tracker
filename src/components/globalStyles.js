import styled from "styled-components/macro";

export const color = {
  primary: "#424346", // Black
  accent: "#007bc5", // Blue
  dkGray: "#d9dce1",
  mdGray: "#f2f3f5"
};

export const boxShadow = `box-shadow: 0px 3px 8px -3px ${color.dkGray}`;

export const Button = styled.button`
  cursor: pointer;
  color: #5a5e61;
  border: solid 1px ${color.dkGray};
  border-radius: 5px;
  padding: 0.5em 0.65em 0.65em;
  background-color: white;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;

  &:hover,
  &:focus {
    color: currentColor;
    border-color: #a8abaf;
    background-color: #f7f7f9;
  }

  &.active {
    color: white;
    border-color: ${color.accent};
    background-color: ${color.accent};
  }

  &:not(:last-child) {
    margin-right: 5px;
  }
`;

export const ListingContainer = styled.article`
  width: 100%;
  padding: 1.5em 2em 2em;
  background-color: white;
  border-radius: 5px;
  ${boxShadow}
`;

export const DataTable = styled.table`
  width: 100%;
  table-layout: fixed;
  margin-top: 0.8125em;
`;
export const DataTableHeading = styled.th`
  position: sticky;
  top: 0;
  z-index: 1;
  vertical-align: bottom;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-size: 80%;
  line-height: 1;
  padding: 10px;
  background-color: white;
  border-bottom: solid 1px ${color.primary};
`;
export const DataTableRow = styled.tr`
  td {
    background-color: rgba(0, 0, 0, 0);
    transition: backgound-color 0.5s;
  }

  &.alert-error {
    color: red;
  }
  &.alert-accomplished td {
    color: ${color.dkGray};
  }

  &:hover,
  &:focus {
    td {
      background-color: ${color.mdGray};
    }
    &.alert-error td {
      background-color: rgba(255, 0, 0, 0.1);
    }
  }
`;
export const DataTableCell = styled.td`
  position: relative;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  padding: 5px 10px;
  
  ${DataTableRow} + ${DataTableRow} > & {
    border-top: solid 1px ${color.dkGray};
  }
`;

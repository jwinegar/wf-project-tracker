import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

xit("renders without crashing", () => {
  const { getByText } = render(<App />);
  expect(getByText("Client:")).toBeInTheDocument();
});

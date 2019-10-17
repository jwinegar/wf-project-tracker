import React, { cloneElement } from "react";
import { FiltersProvider } from "./index";

const ProviderComposer = ({ contexts, children }) =>
  contexts.reduceRight(
    (kids, parent) =>
      cloneElement(parent, {
        children: kids
      }),
    children
  );

const ContextProvider = ({ children }) => (
  <ProviderComposer contexts={[<FiltersProvider />]}>
    {children}
  </ProviderComposer>
);

export { ContextProvider };

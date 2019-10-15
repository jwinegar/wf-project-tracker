import React, { cloneElement } from "react";
import {
  ClientProvider,
  ProgramProvider,
  ProjectNameProvider,
  RoleProvider
} from "./index";

const ProviderComposer = ({ contexts, children }) =>
  contexts.reduceRight(
    (kids, parent) =>
      cloneElement(parent, {
        children: kids
      }),
    children
  );

const ContextProvider = ({ children }) => (
  <ProviderComposer
    contexts={[
      <ClientProvider />,
      <ProjectNameProvider />,
      <ProgramProvider />,
      <RoleProvider />
    ]}
  >
    {children}
  </ProviderComposer>
);

export { ContextProvider };

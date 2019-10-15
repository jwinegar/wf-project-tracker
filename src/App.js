import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import ProjectsList from "./components/ProjectsList";
import { ContextProvider } from "./globalState/state";

const client = new ApolloClient({
  uri: "http://localhost:2045/graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <ContextProvider>
      <div className="App">
        <ProjectsList />
      </div>
    </ContextProvider>
  </ApolloProvider>
);

export default App;

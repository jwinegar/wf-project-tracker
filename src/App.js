import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import ProjectsList from "./components/ProjectsList";

const client = new ApolloClient({
  uri: "http://localhost:2045/graphql"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ProjectsList />
      </div>
    </ApolloProvider>
  );
};

export default App;

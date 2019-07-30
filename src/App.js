import React from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

import ProjectsList from "./components/ProjectsList";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:2045/graphql"
});

const client = new ApolloClient({
  cache,
  link
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

import { InMemoryCache, ApolloClient } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_APOLLO_GRAPHQL_URI });

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_APOLLO_SUBSCRIPTION_URI,
  options: {
    reconnect: true,
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const Apolloclient = new ApolloClient({

  cache: new InMemoryCache(),
});

import { InMemoryCache, ApolloClient } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const httpLink = new HttpLink({
  uri: 'http://localhost:7000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const cache = new InMemoryCache();

const setHeaders = (operation) => operation.setContext({ headers: { authorization: localStorage.getItem('token') } });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  request: setHeaders,
});

export default client;

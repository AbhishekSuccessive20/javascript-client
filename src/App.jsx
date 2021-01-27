import React from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import ls from 'local-storage';
import { ApolloProvider } from '@apollo/react-hooks';

import { AuthRoute, PrivateRoute } from './routes';

import { SnackBarProvider } from './contexts';

import apolloclient from './lib/apollo-client';

function App() {
  return (
    <>
      <SnackBarProvider>
        <ApolloProvider client={apolloclient}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route path="/login" component={AuthRoute} />
              <Route default component={PrivateRoute} />
            </Switch>
          </Router>
        </ApolloProvider>
      </SnackBarProvider>
    </>
  );
}

export default App;

import React from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import ls from 'local-storage';
import { ApolloProvider } from '@apollo/react-hooks';

import { AuthRoute, PrivateRoute } from './routes/index';

import { SnackBarProvider } from './contexts/index';

import {
  TextFieldDemo,
  InputDemo,
  Trainee,
  ChildrenDemo,
  Login,
  NoMatch,
} from './pages/index';

import apolloclient from './lib/apollo-client';

const App = () => (
  <div>
    <SnackBarProvider>
      <ApolloProvider client={apolloclient}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/trainee" />
            </Route>
            <AuthRoute path="/login" component={Login} />
            <PrivateRoute path="/childrenDemo" component={ChildrenDemo} />
            <PrivateRoute path="/textFieldDemo" component={TextFieldDemo} />
            <PrivateRoute path="/inputDemo" component={InputDemo} />
            <PrivateRoute path="/trainee" component={Trainee} />
            <PrivateRoute component={NoMatch} />
          </Switch>
        </Router>
      </ApolloProvider>
    </SnackBarProvider>
  </div>
);

export default App;

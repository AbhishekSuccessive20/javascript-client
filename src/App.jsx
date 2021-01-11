import React from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import ls from 'local-storage';

import {
  Trainee, Login, NoMatch, ChildrenDemo, InputDemo, TextFieldDemo,
} from './pages';

import { AuthRoute, PrivateRoute } from './routes';

import { SnackBarProvider } from './contexts';

function App() {
  return (
    <>
      <SnackBarProvider>
        {
          ls.get('token') ? (
            <Router>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/login" />
                </Route>
                <PrivateRoute path="/trainee" component={Trainee} />
                <AuthRoute path="/login" component={Login} />
                <PrivateRoute path="/text-field" component={TextFieldDemo} />
                <PrivateRoute path="/input-demo" component={InputDemo} />
                <PrivateRoute path="/children-demo" component={ChildrenDemo} />
                <PrivateRoute component={NoMatch} />
              </Switch>
            </Router>
          ) : (
            <Router>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/login" />
                </Route>
                <AuthRoute path="/login" component={Login} />
                <PrivateRoute path="/ChildrenDemo" component={ChildrenDemo} />
                <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
                <PrivateRoute path="/InputDemo" component={InputDemo} />
                <PrivateRoute path="/trainee" component={Trainee} />
                <PrivateRoute component={NoMatch} />
              </Switch>
            </Router>
          )
        }
      </SnackBarProvider>
    </>
  );
}

export default App;

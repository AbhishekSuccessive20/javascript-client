import React from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import {
  Trainee, Login, NoMatch, ChildrenDemo, InputDemo, TextFieldDemo,
} from './pages';

import { AuthRoute, PrivateRoute } from './routes';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <PrivateRoute component={Trainee} />
          </Route>
          <AuthRoute path="/login" component={Login} />
          <PrivateRoute path="/text-field" component={TextFieldDemo} />
          <PrivateRoute path="/input-demo" component={InputDemo} />
          <PrivateRoute path="/children-demo" component={ChildrenDemo} />
          <PrivateRoute component={NoMatch} />
        </Switch>
      </Router>
    </>
  );
}
export default App;

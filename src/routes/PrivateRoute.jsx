/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { PrivateLayout } from '../layouts';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => {
      if (localStorage.getItem('token')) {
        return (
          <PrivateLayout>
            <br />
            <Component {...matchProps} />
          </PrivateLayout>
        );
      }
      return (
        <Route>
          <Redirect to="/login" />
        </Route>
      );
    }}
  />
);

PrivateRoute.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.any.isRequired,
};

export default PrivateRoute;

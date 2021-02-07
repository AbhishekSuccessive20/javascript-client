import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from '../../lib/apollo-client';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

const Trainee = ({ match }) => (
  <Switch>
    <ApolloProvider client {ApolloClient}>
    <Route exact path={match.path} component={TraineeList} />
    <Route exact path={`${match.path}/:id`} component={TraineeDetail} />
    </ApolloProvider>
  </Switch>
);

Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Trainee;

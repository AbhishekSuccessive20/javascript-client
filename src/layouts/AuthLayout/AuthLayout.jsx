import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';

const AuthLayout = ({ children, ...rest }) => (
  <div>
    {children}
    <Footer />
  </div>
);
AuthLayout.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AuthLayout;

import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../components';

const PrivateLayout = ({ children, ...rest }) => (
  <>
    <Navbar />
    <div style={{ alignContent: 'center', paddingLeft: '20px' }}>
      {children}
    </div>
  </>
);

PrivateLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array.isRequired,
};

export default PrivateLayout;

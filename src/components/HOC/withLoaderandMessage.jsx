import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function withLoaderAndMessage(WrappedComponent) {
  function Higher(props) {
    const { loader, dataLength } = props;
    if (loader) {
      return (
        <div style={{ marginTop: 200, marginLeft: 550 }}><CircularProgress size={20} /></div>
      );
    }
    if (dataLength === 0) {
      return (
        <div style={{
          fontSize: '20px',
          marginTop: '15%',
          textAlign: 'center',
        }}
        >
          OOPS!, No More Trainees
        </div>
      );
    }
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <WrappedComponent {...props} />
    );
  }
  Higher.propTypes = {
    loader: PropTypes.bool.isRequired,
    dataLength: PropTypes.number.isRequired,
  };
  return Higher;
}

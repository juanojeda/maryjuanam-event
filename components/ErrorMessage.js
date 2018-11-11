import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ message }) => <aside>{message}</aside>;

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;

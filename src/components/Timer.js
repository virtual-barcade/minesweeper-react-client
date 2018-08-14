import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({ time, mines }) => (
  <div>
    {mines} || {time}
  </div>
);

const { number, string } = PropTypes;

Timer.propTypes = {
  time: number.isRequired,
  mines: string.isRequired,
};

export default Timer;

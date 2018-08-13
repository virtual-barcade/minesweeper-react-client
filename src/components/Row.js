import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell';

const Row = ({ row, i }) => {
  const gridState = row.map((value, j) => (
    <Cell key={`${i}${j}`} x={i} y={j} value={value} />
  ));
  return <div>{gridState}</div>;
};

const { arrayOf, string } = PropTypes;

Row.propTypes = {
  row: arrayOf(string).isRequired,
};

export default Row;

import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell';

const Row = ({ row, i, checkCell, cellIsFlagged }) => {
  const gridState = row.map((value, j) => (
    <Cell
      key={`${i}${j}`}
      x={i}
      y={j.toString()}
      value={value}
      checkCell={checkCell}
      flagged={cellIsFlagged(i, j)}
    />
  ));
  return <div>{gridState}</div>;
};

const { arrayOf, string, func } = PropTypes;

Row.propTypes = {
  row: arrayOf(string).isRequired,
  i: string.isRequired,
  checkCell: func.isRequired,
  cellIsFlagged: func.isRequired,
};

export default Row;

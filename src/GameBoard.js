import React from 'react';
import Row from './components/Row';

// import React from 'react';

const GameBoard = ({ grid, checkCell }) => (
  <div>
    {grid.map((row, i) => (
      <Row key={i} row={row} i={i.toString()} checkCell={checkCell} />
    ))}
  </div>
);

export default GameBoard;

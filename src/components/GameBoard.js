import React from 'react';
import Row from './Row';
import '../styles/GameBoard.css';

const GameBoard = ({ grid, checkCell, status }) => {
  const className = status === 'lost' ? 'game-over' : 'game-board';
  console.log(className);
  return (
    <div className={className}>
      {grid.map((row, i) => (
        <Row key={i} row={row} i={i.toString()} checkCell={checkCell} />
      ))}
    </div>
  );
};

export default GameBoard;

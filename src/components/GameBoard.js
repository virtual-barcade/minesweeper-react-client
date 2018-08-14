import React from 'react';
import Row from './Row';
import '../styles/GameBoard.css';

const GameBoard = ({ grid, checkCell, status, cellIsFlagged }) => {
  const className = status === 'lost' ? 'game-over' : 'game-board';
  return (
    <div className={className}>
      {grid.map((row, i) => (
        <Row
          key={i}
          row={row}
          i={i.toString()}
          checkCell={checkCell}
          cellIsFlagged={cellIsFlagged}
        />
      ))}
    </div>
  );
};

export default GameBoard;

import React from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import Row from './Row';
import '../styles/GameBoard.css';

const GameBoard = ({
  grid,
  handleClick,
  status,
  cellIsFlagged,
  stopTimer,
  time,
  mines,
}) => {
  const className = status === 'lost' ? 'game-over' : 'game-board';
  if (status === 'lost') stopTimer();
  return (
    <div className={className}>
      <Timer time={time} mines={mines} />
      <div>
        {grid.map((row, i) => (
          <Row
            key={i}
            row={row}
            i={i.toString()}
            handleClick={handleClick}
            cellIsFlagged={cellIsFlagged}
          />
        ))}
      </div>
    </div>
  );
};

const { arrayOf, string, func, number } = PropTypes;

GameBoard.propTypes = {
  grid: arrayOf(arrayOf(string)).isRequired,
  handleClick: func.isRequired,
  status: string.isRequired,
  cellIsFlagged: func.isRequired,
  stopTimer: func.isRequired,
  time: number.isRequired,
  mines: string.isRequired,
};

export default GameBoard;

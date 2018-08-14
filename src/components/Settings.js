import React from 'react';
import PropTypes from 'prop-types';
import DifficultySelect from './DifficultySelect';
import CustomSelect from './CustomSelect';

const Settings = ({
  handleChange,
  changeDifficulty,
  difficulty,
  width,
  height,
  mines,
}) => (
  <div>
    <form onSubmit={changeDifficulty}>
      <DifficultySelect
        handleChange={handleChange}
        difficultySetting={difficulty}
      />
      {difficulty === 'custom' ? (
        <CustomSelect
          handleChange={handleChange}
          width={width}
          height={height}
          mines={mines}
        />
      ) : (
        <div />
      )}
      <button type="submit">New Game</button>
    </form>
  </div>
);

const { func, string } = PropTypes;

Settings.propTypes = {
  handleChange: func.isRequired,
  changeDifficulty: func.isRequired,
  difficulty: string.isRequired,
  width: string.isRequired,
  height: string.isRequired,
  mines: string.isRequired,
};

export default Settings;

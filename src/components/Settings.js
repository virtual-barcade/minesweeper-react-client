import React from 'react';
import PropTypes from 'prop-types';
import DifficultySelect from './DifficultySelect';
import CustomSelect from './CustomSelect';

const Settings = ({ handleChange, difficulty, width, height, mines }) => (
  <div>
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
  </div>
);

const { func, string } = PropTypes;

Settings.propTypes = {
  handleChange: func.isRequired,
  difficulty: string.isRequired,
  width: string.isRequired,
  height: string.isRequired,
  mines: string.isRequired,
};

export default Settings;

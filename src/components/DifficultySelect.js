import React from 'react';
import PropTypes from 'prop-types';

const DifficultySelect = ({ handleChange, difficultySetting }) => (
  <select name="difficulty" value={difficultySetting} onChange={handleChange}>
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="hard">Hard</option>
    <option value="custom">Custom</option>
  </select>
);

const { func, string } = PropTypes;

DifficultySelect.propTypes = {
  handleChange: func.isRequired,
  difficultySetting: string.isRequired,
};

export default DifficultySelect;

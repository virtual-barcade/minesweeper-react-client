import React from 'react';
import PropTypes from 'prop-types';

const CustomSelect = ({ handleChange, width, height, mines }) => (
  <fieldset>
    <legend>Minefield Settings</legend>
    <div className="flex-container">
      <label htmlFor="width">
        Width:
        {width}
        <input
          onChange={handleChange}
          type="range"
          id="width"
          name="width"
          min="1"
          max="1000"
          value={width}
          step="1"
        />
      </label>

      <label htmlFor="height">
        Height:
        {height}
        <input
          onChange={handleChange}
          type="range"
          id="height"
          name="height"
          min="1"
          max="1000"
          value={height}
          step="1"
        />
      </label>

      <label htmlFor="mines">
        Mines:
        {mines}
        <input
          onChange={handleChange}
          type="range"
          id="mines"
          name="mines"
          min="1"
          max="1000"
          value={mines}
          step="1"
        />
      </label>
    </div>
  </fieldset>
);

const { func, string } = PropTypes;

CustomSelect.propTypes = {
  handleChange: func.isRequired,
  width: string.isRequired,
  height: string.isRequired,
  mines: string.isRequired,
};

export default CustomSelect;

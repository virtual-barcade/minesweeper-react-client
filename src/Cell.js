import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    const { x, y, value } = props;
    this.state = {
      x,
      y,
      value,
    };
  }

  render() {
    const { x, y, value } = this.state;
    const { checkCell } = this.props;
    return (
      <span className="cell" onClick={() => checkCell(x, y)}>
        {value}
      </span>
    );
  }
}

const { string, func } = PropTypes;

Cell.propTypes = {
  x: string.isRequired,
  y: string.isRequired,
  value: string.isRequired,
  checkCell: func.isRequired,
};

export default Cell;

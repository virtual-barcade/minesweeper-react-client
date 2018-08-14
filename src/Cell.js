import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { countToColorMapping } from './helpers/index';
import './styles/Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    const { x, y } = props;
    this.state = {
      x,
      y,
    };
  }

  render() {
    const { x, y } = this.state;
    const { checkCell, value } = this.props;
    const style = {
      color: countToColorMapping[value],
    };
    return (
      <span style={style} className="cell" onClick={() => checkCell(x, y)}>
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

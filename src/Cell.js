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
    const { handleClick, value, flagged } = this.props;
    const style = {
      color: countToColorMapping[value],
    };
    const className =
      value !== '_' ? 'cell noselect revealed' : 'cell noselect';
    return (
      <span
        style={style}
        className={className}
        onClick={e => handleClick(e, x, y)}
        onContextMenu={e => handleClick(e, x, y)}
      >
        {flagged ? '?' : value}
      </span>
    );
  }
}

const { string, func, bool } = PropTypes;

Cell.propTypes = {
  x: string.isRequired,
  y: string.isRequired,
  value: string.isRequired,
  handleClick: func.isRequired,
  flagged: bool.isRequired,
};

export default Cell;

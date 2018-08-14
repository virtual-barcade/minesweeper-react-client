import React, { Component } from 'react';
import PropTypes from 'prop-types';
import countToColorMapping from './helpers/index';
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

  respondToValueChange = (value, flagged) => {
    let className;
    let item;

    if (value !== '_') className = 'cell noselect revealed';
    else className = 'cell noselect';

    if (flagged) item = '?';
    else item = value;

    return [className, item];
  };

  render() {
    const { x, y } = this.state;
    const { handleClick, value, flagged } = this.props;
    const style = {
      color: countToColorMapping[value],
    };
    const [className, item] = this.respondToValueChange(value, flagged);
    return (
      <span
        style={style}
        className={className}
        onClick={e => handleClick(e, x, y)}
        onContextMenu={e => handleClick(e, x, y)}
      >
        {item}
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

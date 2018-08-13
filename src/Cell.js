import React, { Component } from 'react';

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
    console.log(`${x}${y}`);
    return <span>{value}</span>;
  }
}

export default Cell;

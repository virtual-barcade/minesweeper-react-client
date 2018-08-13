import React, { Component } from 'react';
import Settings from './components/Settings';
import logo from './logo.svg';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: 'easy',
      width: '9',
      height: '9',
      mines: '10',
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () =>
      console.log(this.state),
    );
  };

  render() {
    const { difficulty, width, height, mines } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Settings
          handleChange={this.handleChange}
          difficulty={difficulty}
          width={width}
          height={height}
          mines={mines}
        />
      </div>
    );
  }
}

export default App;

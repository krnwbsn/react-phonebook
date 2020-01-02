import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReduxDemo from './ReduxDemo';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <ReduxDemo />
    </div>
  );
}

export default App;

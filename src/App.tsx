import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const userDateOfBirth = Date;

  return (
    <div className="App bg-slate-700">
      <header className="App-header">
        <h1 className="App-title">Dayz On Earth 🌍</h1>
      </header>
        <h2 className="App-intro">Input your Date Of Birth</h2>
        <input type="date" id="datepicker" name="DateOfBirth" />
    </div>
  );
}

export default App;

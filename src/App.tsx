import React from 'react';
import { TimeStamp } from './components/TimeStamp';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <header className="App-header">
          <h1 className="App-title">Dayz On Earth 🌍</h1>
        </header>
        <TimeStamp />
      </div>
      <footer className="App-footer">
        Made with 💖 by{" "}
        <span>
          <a href="https://kcmicheal.com" className="underline">
            KCM
          </a>
        </span>{" "}
        {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;

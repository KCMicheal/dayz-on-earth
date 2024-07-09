import React from 'react';
import { TimeStamp } from './components/TimeStamp';
import Logo from './assets/logo-no-background.png';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <header className="App-header">
          <img src={Logo} className="mx-auto w-44" alt="Logo" />
          <h1 className="App-title">Dayz On Earth 🌍</h1>
        </header>
        <TimeStamp />
      </div>
      <footer className="App-footer">
        Made with 💖 by{" "}
        <span>
          <a href="https://kcmicheal.vercel.app" className="underline">
            KCM
          </a>
        </span>{" "}
        {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;

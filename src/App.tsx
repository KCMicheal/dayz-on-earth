import React from 'react';
import { TimeStamp } from './components/TimeStamp';
import './App.css';

function App() {
  
  return (
    <div className="App bg-slate-700 m-auto">
      <div className="border-red-700 border-4 p-5">
        <header className="App-header">
          <h1 className="App-title">Dayz On Earth 🌍<span>NEW</span></h1>
        </header>
        <TimeStamp />
      </div>
      <footer className="App-footer">2023</footer>
    </div>
  );
}

export default App;

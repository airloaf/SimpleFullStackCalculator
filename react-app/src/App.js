import React from 'react';
import './App.css';

import Calculator from "./pages/Calculator.js"
import History from "./pages/History.js"

function App() {
  return (
    <div className="App">
        <Calculator />
        <History />
    </div>
  );
}

export default App;

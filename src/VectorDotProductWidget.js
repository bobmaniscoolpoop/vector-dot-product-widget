import React from 'react';
import './App.css';
import VectorDotProductWidget from './VectorDotProductWidget';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Vector Dot Product Visualization</h1>
      </header>
      <main>
        <VectorDotProductWidget />
      </main>
      <footer>
        <p>Created with React</p>
      </footer>
    </div>
  );
}

export default App;